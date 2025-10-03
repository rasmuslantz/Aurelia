// functions/api/subscribe.ts
export const onRequestPost: PagesFunction<{ AURELIA_WAITLIST: KVNamespace }> = async ({ request, env }) => {
  try {
    const { email } = await request.json().catch(() => ({}));
    const ok = typeof email === "string" && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
    if (!ok) return new Response(JSON.stringify({ ok: false, message: "Invalid email" }), { status: 400, headers: { "content-type": "application/json" } });

    const key = `email:${email.toLowerCase()}`;
    await env.AURELIA_WAITLIST.put(key, JSON.stringify({ email, ts: Date.now() }), { metadata: { email } });

    return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ ok: false, message: "Server error" }), { status: 500, headers: { "content-type": "application/json" } });
  }
};
