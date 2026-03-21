import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '@club-manager/sdk';
import type { components } from '@club-manager/sdk';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from '@club-manager/design-system';
import { useAuth } from '../context/AuthContext';
import styles from './DashboardPage.module.css';

type Club = components['schemas']['Club'];
type Membership = components['schemas']['Membership'];

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();

  const [clubs, setClubs] = useState<Club[]>([]);
  const [joinedIds, setJoinedIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: clubPage } = await apiClient.GET('/api/clubs');
        const list = clubPage?.items ?? [];
        setClubs(list);

        // Fetch memberships for all clubs to determine which ones the user has joined
        const membershipResults = await Promise.all(
          list.map((club) =>
            apiClient
              .GET('/api/clubs/{clubId}/members', {
                params: { path: { clubId: club.id } },
              })
              .then(({ data }) =>
                (data ?? []).some((m: Membership) => m.userId === currentUser?.id)
                  ? club.id
                  : null,
              )
              .catch(() => null),
          ),
        );
        setJoinedIds(
          new Set(membershipResults.filter((id): id is number => id !== null)),
        );
      } catch {
        setError('Failed to load clubs');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  async function handleJoin(clubId: number) {
    setJoiningId(clubId);
    // Optimistic update
    setJoinedIds((prev) => new Set([...prev, clubId]));

    const { error } = await apiClient.POST(
      '/api/clubs/{clubId}/members/join',
      { params: { path: { clubId } } },
    );

    if (error) {
      // Rollback
      setJoinedIds((prev) => {
        const next = new Set(prev);
        next.delete(clubId);
        return next;
      });
    }
    setJoiningId(null);
  }

  const filtered = clubs.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.logo}>Club Manager</span>
        <div className={styles.headerRight}>
          <span className={styles.userEmail}>{currentUser?.email}</span>
          <Button variant="ghost" size="sm" onClick={logout}>
            Sign out
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.heading}>Clubs</h1>
          <Input
            type="search"
            placeholder="Search clubs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 280 }}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {loading ? (
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            {search ? `No clubs match "${search}"` : 'No clubs yet.'}
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((club) => {
              const joined = joinedIds.has(club.id);
              return (
                <Card key={club.id} className={styles.clubCard}>
                  <CardHeader
                    title={club.name}
                    action={
                      joined ? (
                        <Badge variant="success">Joined</Badge>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          loading={joiningId === club.id}
                          onClick={() => handleJoin(club.id)}
                        >
                          Join
                        </Button>
                      )
                    }
                  />
                  <CardBody>
                    <p className={styles.city}>{club.city}</p>
                    {club.description && (
                      <p className={styles.description}>{club.description}</p>
                    )}
                    <Link to={`/clubs/${club.id}`} className={styles.viewLink}>
                      View details →
                    </Link>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
