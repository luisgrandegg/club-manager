import { SessionUser } from "../auth/SessionUser";

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase service role credentials are not configured.");
  }

  return { url, serviceRoleKey };
}

export async function upsertSupabaseUser(user: SessionUser) {
  const { url, serviceRoleKey } = getSupabaseConfig();

  const response = await fetch(`${url}/rest/v1/user?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify([
      {
        id: user.id,
        role: user.role,
        name: user.name ?? null,
        email: user.email ?? null,
        picture: user.picture ?? null,
      },
    ]),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase user upsert failed: ${response.status} ${response.statusText} ${details}`);
  }
}
