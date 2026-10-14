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
