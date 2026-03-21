import { Button } from '@club-manager/design-system';

export default function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Club Manager</h1>
      <p>Welcome to the Club Manager dashboard.</p>
      <Button variant="primary" onClick={() => alert('Hello!')}>
        Get Started
      </Button>
    </main>
  );
}
