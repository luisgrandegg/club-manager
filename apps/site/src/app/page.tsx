import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Club Manager — Manage your sports club effortlessly',
  description:
    'Club Manager helps sports clubs organise members, schedules, and events in one place. Try it free.',
  openGraph: {
    title: 'Club Manager — Manage your sports club effortlessly',
    description:
      'Club Manager helps sports clubs organise members, schedules, and events in one place.',
    type: 'website',
  },
};

const WEB_APP_URL = process.env.NEXT_PUBLIC_WEB_URL ?? 'http://localhost:3000';

const features = [
  {
    icon: '👥',
    title: 'Member management',
    description:
      'Keep track of every member in one place. Join and leave clubs with a single click.',
  },
  {
    icon: '🏆',
    title: 'Club directory',
    description:
      'Discover clubs near you. Browse a public directory of all registered clubs.',
  },
  {
    icon: '🔒',
    title: 'Secure authentication',
    description:
      'JWT-based auth with access and refresh tokens. Your data stays safe.',
  },
  {
    icon: '⚡',
    title: 'Real-time updates',
    description:
      'Member counts and club details update instantly as people join and leave.',
  },
];

const steps = [
  { n: 1, title: 'Create your account', description: 'Sign up with your email in seconds.' },
  { n: 2, title: 'Browse clubs', description: 'Explore the directory and find clubs that match your interests.' },
  { n: 3, title: 'Join & manage', description: 'Join clubs, or create your own and manage its members.' },
];

export default function HomePage() {
  return (
    <>
      {/* Nav */}
      <header style={{ borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Club Manager</span>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/clubs" style={{ color: '#374151', textDecoration: 'none', fontSize: '0.9375rem' }}>
              Browse clubs
            </Link>
            <a
              href={`${WEB_APP_URL}/login`}
              style={{ color: '#374151', textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              Sign in
            </a>
            <a
              href={`${WEB_APP_URL}/register`}
              style={{
                background: '#2563eb',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.4rem 1rem',
                borderRadius: 6,
                fontSize: '0.9375rem',
                fontWeight: 500,
              }}
            >
              Get started
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          style={{
            padding: '6rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1e3a5f 0%, #1a1a2e 100%)',
            color: '#fff',
          }}
        >
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.2, marginBottom: '1.25rem', fontWeight: 800 }}>
            Manage your sports club,{' '}
            <span style={{ color: '#60a5fa' }}>effortlessly</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', marginBottom: '2.5rem', opacity: 0.85, maxWidth: 560, margin: '0 auto 2.5rem' }}>
            Members, clubs, and community — all in one place. Built for clubs of every size.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`${WEB_APP_URL}/register`}
              style={{
                background: '#2563eb',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.875rem 2rem',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Get started for free
            </a>
            <Link
              href="/clubs"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                textDecoration: 'none',
                padding: '0.875rem 2rem',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1rem',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              Browse clubs
            </Link>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '5rem 2rem', background: '#f9fafb' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Everything your club needs
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem', fontSize: '1.0625rem' }}>
              Simple tools that keep clubs running smoothly.
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              }}
            >
              {features.map((f) => (
                <li
                  key={f.title}
                  style={{
                    padding: '1.75rem',
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>{f.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: 700, marginBottom: '3rem' }}>
              How it works
            </h2>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {steps.map((s) => (
                <li key={s.n} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#2563eb',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '0.25rem' }}>{s.title}</h3>
                    <p style={{ color: '#6b7280', margin: 0 }}>{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA banner */}
        <section
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            background: '#1e3a5f',
            color: '#fff',
          }}
        >
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to get started?
          </h2>
          <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
            Join thousands of club managers already using Club Manager.
          </p>
          <a
            href={`${WEB_APP_URL}/register`}
            style={{
              background: '#2563eb',
              color: '#fff',
              textDecoration: 'none',
              padding: '0.875rem 2.5rem',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: '1rem',
              display: 'inline-block',
            }}
          >
            Create your free account
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e7eb', padding: '2rem 2rem', background: '#fff' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          <span>© {new Date().getFullYear()} Club Manager</span>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/clubs" style={{ color: '#6b7280', textDecoration: 'none' }}>
              Club directory
            </Link>
            <a
              href="https://github.com/luisgrandegg/club-manager"
              style={{ color: '#6b7280', textDecoration: 'none' }}
            >
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
