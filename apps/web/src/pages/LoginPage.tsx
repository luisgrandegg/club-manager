import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  FormField,
  Input,
  Card,
  CardHeader,
  CardBody,
} from '@club-manager/design-system';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!email) return setError('Email is required');
    if (!password) return setError('Password is required');

    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader title="Sign in to Club Manager" />
        <CardBody>
          <form onSubmit={handleSubmit} noValidate>
            <FormField label="Email" required error={error && !email ? error : undefined}>
              {(id) => (
                <Input
                  id={id}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              )}
            </FormField>

            <FormField
              label="Password"
              required
              error={error && email ? error : undefined}
              style={{ marginTop: '1rem' }}
            >
              {(id) => (
                <Input
                  id={id}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
              )}
            </FormField>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              style={{ marginTop: '1.5rem', width: '100%' }}
            >
              Sign in
            </Button>
          </form>

          <p className={styles.switchLink}>
            Don't have an account?{' '}
            <Link to="/register">Create one</Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
