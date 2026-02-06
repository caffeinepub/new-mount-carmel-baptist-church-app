# Specification

## Summary
**Goal:** Build a church livestream app for New Mount Carmel Baptist Church with YouTube/Facebook livestream embeds, Internet Identity member access, an audio input monitor, and a Clover integration placeholder, all within a consistent non-blue/purple-dominant theme.

**Planned changes:**
- Create the core app shell with navigation/routes for: Watch Live (YouTube), Watch Live (Facebook), Audio Input, Member Area (login required), and Clover (Placeholder).
- Add YouTube page: accept embed HTML or a YouTube URL, save the configuration to persist across refresh, and render a responsive embedded player (no chat).
- Add Facebook page: accept embed HTML or a Facebook Live URL, save the configuration to persist across refresh, and render a responsive embedded player (no chat).
- Implement Internet Identity sign in/out UI and gate the Member Area behind authentication with a clear sign-in prompt when logged out.
- Add backend member profiles keyed by Principal with canister methods: `getMyProfile` (optional/none when missing) and `upsertMyProfile` (create/update).
- Add Audio Input page for authenticated members: select an available audio input device, request permission, start/stop monitoring, and adjust monitoring volume.
- Add Clover Integration (Placeholder) page with a non-secret config form (e.g., merchantId, apiBaseUrl, environment) saved to localStorage and clear “not active yet” messaging.
- Apply a coherent, distinctive visual theme across the app (typography, spacing, colors, components) avoiding a blue/purple-dominant palette.
- Add generated static images under `frontend/public/assets/generated` and reference them in the UI (e.g., header/landing areas).

**User-visible outcome:** Users can switch between YouTube and Facebook livestream pages with responsive embeds, members can sign in with Internet Identity to access the Member Area and audio input monitoring tools, and users can view a Clover placeholder page with locally-saved configuration—presented in a consistent church-appropriate theme with custom static imagery.
