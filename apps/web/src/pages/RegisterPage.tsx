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

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!email) errs.email = 'Email is required';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 8)
      errs.password = 'Password must be at least 8 characters';
    if (password !== confirm) errs.confirm = 'Passwords do not match';
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({
        form: err instanceof Error ? err.message : 'Registration failed',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader title="Create your account" />
        <CardBody>
          <form onSubmit={handleSubmit} noValidate>
            {errors.form && (
              <p style={{ color: 'var(--color-danger, #dc2626)', marginBottom: '1rem' }}>
                {errors.form}
              </p>
            )}

            <FormField label="Email" required error={errors.email}>
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
              error={errors.password}
              style={{ marginTop: '1rem' }}
            >
              {(id) => (
                <Input
                  id={id}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                />
              )}
            </FormField>

            <FormField
              label="Confirm password"
              required
              error={errors.confirm}
              style={{ marginTop: '1rem' }}
            >
              {(id) => (
                <Input
                  id={id}
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
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
              Create account
            </Button>
          </form>

          <p className={styles.switchLink}>
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
