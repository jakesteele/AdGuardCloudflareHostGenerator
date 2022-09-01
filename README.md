# AdGuardCloudflareHostGenerator
Use a cloudflare worker to generate a up to date list from FireBog's ticked list found at https://v.firebog.net/hosts/lists.php?type=tick

## Demo URL
- https://adguardlist.jakedev.workers.dev/ (This is my url, please don't use it in your system, setup your own :D)

## Steps to setup a free cloudflare worker
- Sign up for a cloudflare account (free) at cloudflare.com
- On the left hand side bar, click on the Workers tab.
- Click on the Create a Service button.
- ^ You may need to setup a sub-domain first (if this is your first time), make sure you select the *free* tier after you pick a unique sub domain.
- Give your new service a name, leave it on http handler and click "create service" in the bottom right.
- Click on the blue "Quick Edit" button in the Resource tab.
- Copy and paste the worker.js from this repo into the left hand script editor. 
- Click "Send" once on the right hand side to test that it works.
- Click on the "Save and Deploy" button and you are all set.
- Copy the URL for your new service into your AdGuard Home block list.

## Requirements:
- [x] Support AdGuard Home with list.
- [x] Make sure list is up to date when AdGuard checks. 
- [x] Make sure it supports the free tier of cloudflare (don't spend money on this). 
- [x] Make sure girlfriend doesn't get mad her sites are blocked (used ticked list).
- [ ] Rewrite list responses to be more AdGuard looking @@xxx.com^
- [ ] Verify entries in responses are in AdGuard format
- [ ] Improve fetch time without going over max connection limit (Promise.WaitAll won't work but could do batches).

## Next Steps
- [ ] Create a white list re-write version for AdGuard Home

## Whitelists
- https://github.com/anudeepND/whitelist
- https://discourse.pi-hole.net/t/commonly-whitelisted-domains/212