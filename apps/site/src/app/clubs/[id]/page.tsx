import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const API_URL = process.env.API_URL ?? 'http://localhost:3001';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clubmanager.example.com';

interface Club {
  id: number;
  name: string;
  description: string;
  city: string;
  ownerId: number;
  createdAt: string;
}

async function fetchClub(id: number): Promise<Club | null> {
  const res = await fetch(`${API_URL}/api/clubs/${id}`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return res.json() as Promise<Club>;
}

async function fetchAllIds(): Promise<number[]> {
  const res = await fetch(`${API_URL}/api/clubs?limit=1000`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { items: Club[] };
  return data.items.map((c) => c.id);
}

export async function generateStaticParams() {
  const ids = await fetchAllIds().catch(() => []);
  return ids.map((id) => ({ id: String(id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const club = await fetchClub(Number(id));
  if (!club) return { title: 'Club not found' };

  const canonicalUrl = `${SITE_URL}/clubs/${club.id}`;

  return {
    title: club.name,
    description: club.description || `${club.name} — based in ${club.city}. Join on Club Manager.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${club.name} | Club Manager`,
      description: club.description || `${club.name} is based in ${club.city}.`,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const club = await fetchClub(Number(id));

  if (!club) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: club.name,
    description: club.description || undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: club.city,
    },
    url: `${SITE_URL}/clubs/${club.id}`,
    foundingDate: club.createdAt.slice(0, 10),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header style={{ borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: '1.125rem', textDecoration: 'none', color: '#111827' }}>
            Club Manager
          </Link>
          <span style={{ color: '#d1d5db' }}>/</span>
          <Link href="/clubs" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9375rem' }}>
            Directory
          </Link>
          <span style={{ color: '#d1d5db' }}>/</span>
          <span style={{ color: '#374151', fontSize: '0.9375rem' }}>{club.name}</span>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <article>
          <header style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{club.name}</h1>
            <p style={{ color: '#6b7280', fontSize: '1rem', margin: 0 }}>
              📍 {club.city}
            </p>
          </header>

          {club.description && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>About</h2>
              <p style={{ color: '#374151', lineHeight: 1.7 }}>{club.description}</p>
            </section>
          )}

          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr',
              gap: '0.5rem 1rem',
              background: '#f9fafb',
              borderRadius: 8,
              padding: '1.25rem',
              border: '1px solid #e5e7eb',
              marginBottom: '2rem',
            }}
          >
            <dt style={{ color: '#6b7280', fontWeight: 500, fontSize: '0.9rem' }}>City</dt>
            <dd style={{ margin: 0, color: '#111827' }}>{club.city}</dd>
            <dt style={{ color: '#6b7280', fontWeight: 500, fontSize: '0.9rem' }}>Founded</dt>
            <dd style={{ margin: 0, color: '#111827' }}>
              {new Date(club.createdAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </dd>
          </dl>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={`${process.env.NEXT_PUBLIC_WEB_URL ?? 'http://localhost:3000'}/register`}
              style={{
                background: '#2563eb',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '0.9375rem',
              }}
            >
              Join this club
            </a>
            <Link
              href="/clubs"
              style={{
                color: '#374151',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontWeight: 500,
                fontSize: '0.9375rem',
              }}
            >
              Back to directory
            </Link>
          </div>
        </article>
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
