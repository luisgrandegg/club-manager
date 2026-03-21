import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiClient } from '@club-manager/sdk';
import type { components } from '@club-manager/sdk';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormField,
  Input,
  Textarea,
} from '@club-manager/design-system';
import { useAuth } from '../context/AuthContext';
import styles from './ClubDetailPage.module.css';

type Club = components['schemas']['Club'];
type Membership = components['schemas']['Membership'];

export default function ClubDetailPage() {
  const { id } = useParams<{ id: string }>();
  const clubId = Number(id);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [club, setClub] = useState<Club | null>(null);
  const [members, setMembers] = useState<Membership[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  // Edit state
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  // Delete state
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [clubRes, membersRes] = await Promise.all([
        apiClient.GET('/api/clubs/{id}', { params: { path: { id: clubId } } }),
        apiClient.GET('/api/clubs/{clubId}/members', {
          params: { path: { clubId } },
        }),
      ]);

      if (clubRes.error) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setClub(clubRes.data ?? null);
      const memberList = membersRes.data ?? [];
      setMembers(memberList);
      setIsMember(memberList.some((m) => m.userId === currentUser?.id));
      setLoading(false);
    }
    fetchData();
  }, [clubId, currentUser]);

  async function handleJoin() {
    setActionLoading(true);
    const { data, error } = await apiClient.POST(
      '/api/clubs/{clubId}/members/join',
      { params: { path: { clubId } } },
    );
    if (data && !error) {
      setMembers((prev) => [...prev, data]);
      setIsMember(true);
    }
    setActionLoading(false);
  }

  async function handleLeave() {
    setActionLoading(true);
    const { error } = await apiClient.DELETE(
      '/api/clubs/{clubId}/members/leave',
      { params: { path: { clubId } } },
    );
    if (!error) {
      setMembers((prev) => prev.filter((m) => m.userId !== currentUser?.id));
      setIsMember(false);
    }
    setActionLoading(false);
  }

  function startEdit() {
    if (!club) return;
    setEditName(club.name);
    setEditDescription(club.description ?? '');
    setEditCity(club.city);
    setEditError('');
    setEditing(true);
  }

  async function handleSaveEdit() {
    if (!editName.trim()) {
      setEditError('Name is required');
      return;
    }
    if (!editCity.trim()) {
      setEditError('City is required');
      return;
    }
    setEditLoading(true);
    const { data, error } = await apiClient.PATCH('/api/clubs/{id}', {
      params: { path: { id: clubId } },
      body: { name: editName, description: editDescription, city: editCity },
    });
    if (data && !error) {
      setClub(data);
      setEditing(false);
    } else {
      setEditError('Failed to save changes');
    }
    setEditLoading(false);
  }

  async function handleDelete() {
    setActionLoading(true);
    const { error } = await apiClient.DELETE('/api/clubs/{id}', {
      params: { path: { id: clubId } },
    });
    if (!error) {
      navigate('/dashboard');
    } else {
      setError('Failed to delete club');
      setConfirmDelete(false);
    }
    setActionLoading(false);
  }

  if (loading) {
    return (
      <div className={styles.layout}>
        <div className={styles.loading}>Loading…</div>
      </div>
    );
  }

  if (notFound || !club) {
    return (
      <div className={styles.layout}>
        <div className={styles.notFound}>
          <h2>Club not found</h2>
          <Link to="/dashboard">Back to dashboard</Link>
        </div>
      </div>
    );
  }

  const isOwner = currentUser?.id === club.ownerId;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/dashboard" className={styles.back}>
          ← Dashboard
        </Link>
      </header>

      <main className={styles.main}>
        {error && <p className={styles.error}>{error}</p>}

        <Card className={styles.clubCard}>
          <CardHeader
            title={editing ? 'Edit club' : club.name}
            action={
              !editing && (
                <div className={styles.actions}>
                  {isOwner ? (
                    <>
                      <Button variant="secondary" size="sm" onClick={startEdit}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setConfirmDelete(true)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : isMember ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      loading={actionLoading}
                      onClick={handleLeave}
                    >
                      Leave
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      loading={actionLoading}
                      onClick={handleJoin}
                    >
                      Join
                    </Button>
                  )}
                </div>
              )
            }
          />
          <CardBody>
            {editing ? (
              <div className={styles.editForm}>
                {editError && <p className={styles.error}>{editError}</p>}

                <FormField label="Name" required>
                  {(id) => (
                    <Input
                      id={id}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  )}
                </FormField>

                <FormField label="City" required style={{ marginTop: '1rem' }}>
                  {(id) => (
                    <Input
                      id={id}
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                    />
                  )}
                </FormField>

                <FormField label="Description" style={{ marginTop: '1rem' }}>
                  {(id) => (
                    <Textarea
                      id={id}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={3}
                    />
                  )}
                </FormField>

                <div className={styles.editActions}>
                  <Button
                    variant="primary"
                    loading={editLoading}
                    onClick={handleSaveEdit}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <dl className={styles.details}>
                <dt>City</dt>
                <dd>{club.city}</dd>
                {club.description && (
                  <>
                    <dt>Description</dt>
                    <dd>{club.description}</dd>
                  </>
                )}
                <dt>Members</dt>
                <dd>{members.length}</dd>
                <dt>Your status</dt>
                <dd>
                  {isOwner ? (
                    <Badge variant="warning">Owner</Badge>
                  ) : isMember ? (
                    <Badge variant="success">Member</Badge>
                  ) : (
                    <Badge>Not a member</Badge>
                  )}
                </dd>
              </dl>
            )}
          </CardBody>
        </Card>

        {confirmDelete && (
          <div className={styles.overlay}>
            <Card className={styles.dialog}>
              <CardHeader title="Delete club?" />
              <CardBody>
                <p>
                  This will permanently delete <strong>{club.name}</strong> and
                  all its members. This action cannot be undone.
                </p>
                <div className={styles.dialogActions}>
                  <Button
                    variant="danger"
                    loading={actionLoading}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        <Card className={styles.membersCard}>
          <CardHeader title={`Members (${members.length})`} />
          <CardBody>
            {members.length === 0 ? (
              <p className={styles.noMembers}>No members yet.</p>
            ) : (
              <ul className={styles.memberList}>
                {members.map((m) => (
                  <li key={m.id} className={styles.memberItem}>
                    <span className={styles.memberId}>User #{m.userId}</span>
                    {m.userId === club.ownerId && (
                      <Badge variant="warning">Owner</Badge>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
