// PostPilot — thin Buffer API relay.
//
// Buffer's GraphQL API (api.buffer.com) only returns CORS headers for
// Buffer's own origin, so a browser app hosted anywhere else cannot read
// its responses directly. This function forwards the request server-side
// from the same site the app is served from.
//
// It stores nothing: the caller's own Buffer access token passes through
// in the Authorization header and is never logged or persisted.

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  const body = await req.text();
  const headers = { 'Content-Type': 'application/json' };
  const auth = req.headers.get('authorization');
  if (auth) headers['Authorization'] = auth;
  const upstream = await fetch('https://api.buffer.com/', {
    method: 'POST',
    headers,
    body
  });
  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/buffer' };
