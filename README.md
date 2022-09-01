# AdGuardCloudflareHostGenerator
Use a cloudflare worker to generate a up to date list from FireBog's ticked list found at https://v.firebog.net/hosts/lists.php?type=tick

Requirements:
- [x] Support AdGuard Home with list.
- [x] Make sure list is up to date when AdGuard checks. 
- [x] Make sure it supports the free tier of cloudflare (don't spend money on this). 
- [x] Make sure girlfriend doesn't get mad her sites are blocked (used ticked list).
- [ ] Rewrite list responses to be more AdGuard looking @@xxx.com^
- [ ] Verify entries in responses are in AdGuard format
- [ ] Improve fetch time without going over max connection limit (Promise.WaitAll won't work but could do batches).

