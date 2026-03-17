import type { Metadata } from 'next';
import { Button } from '@club-manager/design-system';

export const metadata: Metadata = {
  title: 'Club Manager — Manage your sports club effortlessly',
  description:
    'Club Manager helps sports clubs organise members, schedules, and events in one place. Try it free.',
  openGraph: {
    title: 'Club Manager',
    description: 'Manage your sports club effortlessly.',
  },
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          padding: '5rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Manage your sports club,{' '}
          <span style={{ color: '#4fc3f7' }}>effortlessly</span>
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.85 }}>
          Members, schedules, events — all in one place. Built for clubs of every size.
        </p>
        <Button variant="primary" size="lg">
          Get started for free
        </Button>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 2rem', maxWidth: '960px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Everything your club needs</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {['Member management', 'Event scheduling', 'Role-based access', 'Analytics dashboard'].map(
            (feature) => (
              <li
                key={feature}
                style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              >
                <strong>{feature}</strong>
              </li>
            ),
          )}
        </ul>
      </section>
    </main>
  );
}
