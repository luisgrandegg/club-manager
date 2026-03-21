import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Club Directory',
  description: 'Browse all sports clubs registered on Club Manager. Find clubs near you and join in seconds.',
  openGraph: {
    title: 'Club Directory | Club Manager',
    description: 'Browse all sports clubs registered on Club Manager.',
  },
};

const API_URL = process.env.API_URL ?? 'http://localhost:3001';

interface Club {
  id: number;
  name: string;
  description: string;
  city: string;
  ownerId: number;
  createdAt: string;
}

interface ClubPage {
  items: Club[];
  total: number;
  page: number;
  limit: number;
}

async function fetchClubs(page: number): Promise<ClubPage> {
  const res = await fetch(`${API_URL}/api/clubs?page=${page}&limit=24`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return { items: [], total: 0, page, limit: 24 };
  return res.json() as Promise<ClubPage>;
}

export default async function ClubDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1));
  const { items: clubs, total, limit } = await fetchClubs(page);
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <header style={{ borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: '1.125rem', textDecoration: 'none', color: '#111827' }}>
            Club Manager
          </Link>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.9375rem' }}>
            <Link href="/clubs" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
              Browse clubs
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Club Directory</h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          {total} club{total !== 1 ? 's' : ''} registered
        </p>

        {clubs.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No clubs found.</p>
        ) : (
          <>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 2.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {clubs.map((club) => (
                <li
                  key={club.id}
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                >
                  <Link
                    href={`/clubs/${club.id}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '1.25rem' }}
                  >
                    <h2
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#111827',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {club.name}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.5rem' }}>
                      {club.city}
                    </p>
                    {club.description && (
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: '#374151',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {club.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Pagination" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {page > 1 && (
                  <Link
                    href={`/clubs?page=${page - 1}`}
                    style={linkStyle}
                  >
                    ← Previous
                  </Link>
                )}
                <span style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/clubs?page=${page + 1}`}
                    style={linkStyle}
                  >
                    Next →
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </main>

      <footer style={{ borderTop: '1px solid #e5e7eb', padding: '2rem 1.5rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontSize: '0.875rem', color: '#6b7280' }}>
          © {new Date().getFullYear()} Club Manager ·{' '}
          <Link href="/" style={{ color: '#6b7280' }}>Home</Link>
        </div>
      </footer>
    </>
  );
}

const linkStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  background: '#f3f4f6',
  borderRadius: 6,
  textDecoration: 'none',
  color: '#374151',
  fontSize: '0.875rem',
  fontWeight: 500,
};
