# George Yazji Portfolio

Source for [GeorgeYazji.com](https://georgeyazji.com), deployed as a static site with Cloudflare Pages.

## Local checks

Node.js 18 or newer is required. The project has no third-party runtime or build dependencies.

```sh
npm run check
npm run build
```

The checks verify local HTML references and reject any individual asset larger than Cloudflare Pages' 25 MiB limit. The build copies only the public website into `dist/`.

## Cloudflare Pages settings

Use these settings when connecting the GitHub repository in **Workers & Pages**:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

No environment variables are required.

In the Pages project, add both `georgeyazji.com` and `www.georgeyazji.com` under **Custom domains**. Because the domain's nameservers are already managed by Cloudflare, Cloudflare can create the required DNS records. Configure a redirect rule from `www.georgeyazji.com` to the apex domain so `https://georgeyazji.com` remains canonical.

## Video assets

Cloudflare Pages rejects a single site asset larger than 25 MiB. The three videos that previously exceeded this limit were renamed and optimized with deployment headroom:

| Video | Size |
| --- | ---: |
| `projects/boxingRobot/media/boxing-robot-demo.mp4` | 19.73 MiB |
| `projects/MaConnect/media/app-walkthrough.mp4` | 17.56 MiB |
| `projects/RcCarFollowingModel/media/gipps-model-demo.mp4` | 8.81 MiB |

Keep future video files below 25 MiB. Prefer a target of 20 MiB or less for comfortable headroom. If a larger original must be preserved, store it in Cloudflare R2 (optionally behind a media subdomain such as `media.georgeyazji.com`) and reference its public URL instead of placing it in the Pages build.

## Cutover from GitHub Pages

Do the cutover in this order to avoid downtime:

1. Merge the migration branch into `main` and push it.
2. Connect the repository to Cloudflare Pages with the settings above and confirm the `pages.dev` deployment works.
3. Attach `georgeyazji.com` and `www.georgeyazji.com`, then verify HTTPS and redirects.
4. In the GitHub repository's **Settings > Pages**, set the publishing source to **Disabled**.
5. Rename the GitHub repository from the reserved user-site name `george536.github.io` to `george-yazji-portfolio`. After renaming, confirm Cloudflare's Git integration still points to the repository and update the local remote if needed:

   ```sh
   git remote set-url origin https://github.com/george536/george-yazji-portfolio.git
   ```

The repository rename and GitHub Pages shutdown should happen only after the Cloudflare custom domain is live.
