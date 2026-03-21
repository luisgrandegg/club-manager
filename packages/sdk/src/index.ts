import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from './schema';

let authToken: string | null = null;

const authMiddleware: Middleware = {
  onRequest({ request }) {
    if (authToken) {
      request.headers.set('Authorization', `Bearer ${authToken}`);
    }
    return request;
  },
};

/**
 * Pre-configured API client.
 * All request/response types are inferred from the OpenAPI schema.
 *
 * Configure the base URL once during app initialisation:
 * @example
 * import { apiClient, setAuthToken } from '@club-manager/sdk';
 *
 * // List clubs
 * const { data, error } = await apiClient.GET('/api/clubs');
 *
 * // Create a club
 * const { data, error } = await apiClient.POST('/api/clubs', {
 *   body: { name: 'FC Example', city: 'Madrid' },
 * });
 */
export const apiClient = createClient<paths>({
  baseUrl: 'http://localhost:3001',
});

apiClient.use(authMiddleware);

/**
 * Set the Bearer token for subsequent requests.
 * Pass `null` to clear the token.
 */
export function setAuthToken(token: string | null): void {
  authToken = token;
}

export type { paths, components } from './schema';
