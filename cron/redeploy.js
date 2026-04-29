export default {
  async scheduled(event, env, ctx) {
    const hookUrl = env.PAGES_DEPLOY_HOOK_URL;

    if (!hookUrl) {
      console.error('Missing PAGES_DEPLOY_HOOK_URL secret');
      return;
    }

    const res = await fetch(hookUrl, {
      method: 'POST',
      headers: {
        'user-agent': 'site-index-nightly-redeploy/1.0',
      },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Deploy hook failed: ${res.status} ${res.statusText} :: ${body}`);
      return;
    }

    console.log(`Pages redeploy triggered at ${new Date().toISOString()}`);
  },
};
