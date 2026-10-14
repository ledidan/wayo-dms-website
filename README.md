# Wayo DMS website

Vietnamese-first marketing website built with React 19, TypeScript, Vite and Lucide icons. English product terminology and tagline are included; a full English locale is not implemented.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

Production assets are generated in `dist/`. Deploy this folder to any static hosting service. No deployment has been configured in this repository.

## Demo integration

Copy `.env.example` to `.env.local` and configure:

- `VITE_DEMO_ENDPOINT`: endpoint accepting JSON POST and returning a 2xx response only when the lead was accepted.
- `VITE_LOGIN_URL`: actual customer login URL. Defaults to https://dms.wayo.vn/vi/auth/login.

Payload: `{ name, company, email, phone, teamSize, source }`. Required fields use native accessible browser validation, with additional trimmed name/company validation. The form shows loading, success, network/server error and missing-configuration states. Requests time out after 15 seconds. With no endpoint, nothing is transmitted or stored and the form explicitly says so. No credentials belong in VITE variables, which are public. Backend validation, CORS, anti-spam controls, retention and lead routing are integration responsibilities.

## Content

Desktop and iPhone dashboard screenshots were captured from the actual Wayo DMS product on 2026-10-14. The iPhone capture comes from the running iOS Simulator. Smaller feature-preview cards retain illustrative data. Product screenshots are presentation images, not interactive DMS controls. The original transparent Wayo logo is sourced from the product branding asset and rendered in #1000FF or white using a CSS mask. Pricing requires consultation; no customer logos, testimonials or uplift claims are invented. Contact details and legal text require business-approved content before public launch. Footer legal links open keyboard-accessible native dialogs.

## Design and accessibility

Reusable Button, Logo, Dashboard, Phone, DemoForm and LegalDialog components. Responsive grids, mobile navigation, native FAQ disclosure, visible focus rings, native modal focus management, reduced-motion support and semantic form labels. The detailed dashboard scrolls horizontally on small screens to preserve its layout. Google Fonts loads Be Vietnam Pro with system fallback.

## Verification

`npm run build` runs TypeScript checks and Vite production bundling. Browser QA covers internal anchors, FAQ, mobile menu and unconfigured form submission. Real backend success/error delivery requires a configured endpoint; authenticated desktop/mobile screenshots have been verified; live demo delivery remains untested.
# wayo-dms-website
# wayo-dms-website

## Mobile app downloads

`/tai-ung-dung` is linked from the desktop/mobile menu and footer. Banner artwork is saved locally under `public/images/stores/`.

Distribution URLs are maintained in `src/config/downloads.ts`. Android banners link directly to the user-provided R2 APK. iPhone installation uses `itms-services://?action=download-manifest&url=...` with the current published site's HTTPS manifest at `/ios-distribution/manifest.plist`. Optional `VITE_IOS_MANIFEST_URL` overrides this with another HTTPS manifest. Restart/rebuild after changing env configuration.

The supplied R2 manifest originally referenced `https://download.autuna.net/ios/app.ipa`, whose domain did not resolve during verification. The local corrected manifest references the supplied R2 `wayodms.ipa`, bundle ID `com.wayo.dms`, build `8` (version `1.0.8`) and title `WAYO DMS`, matching the IPA's Info.plist. Minimum iOS version in the IPA is 15.1.

`public/downloads/wayo-dms-ios.zip` contains both `wayodms.ipa` and the corrected `manifest.plist` for one-click download. Individual file links are also provided. Refresh the ZIP and manifest metadata when releasing a new IPA.

These links distribute app packages directly. They are not store listings. iOS OTA installation requires a publicly reachable HTTPS site, a suitable signing/provisioning profile and a physical compatible iPhone; localhost shows instructions instead of a broken installation link. Android installation is completed on the user's device through its normal installation prompts. No device installation or signing validity has been verified by this frontend check.

Static hosting must serve `index.html` for `/tai-ung-dung` (SPA fallback) and expose manifest and download files without authentication.
