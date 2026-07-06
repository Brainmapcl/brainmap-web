# Brainmap Design System

## Overview

**Brainmap** is a premium boutique consultancy specializing in *Ingeniería Empática* (Empathic Engineering). The company helps mid-size companies, corporations, and avant-garde entrepreneurs scale their operational automation while transforming customer and employee experience (CX/EX).

**Three core service pillars:**
1. **Alfabetización IA Adaptativa** — AI literacy diagnosis and cultural integration in teams; maximizes productivity organically without human replacement.
2. **Hiperautomatización de Procesos** — Digital infrastructure design and implementation from scratch; autonomous, clean, transparent systems that scale without forced subscriptions.
3. **Diseño de Servicios del Futuro** — Comprehensive CX consulting to resolve operational friction in the real world; immediate, automatic, personalized responses.

**Brand philosophy:** *"Nuestra propuesta de valor es profunda, no superficial. Tus clientes no se van por precio. Se van por una mala orquestación."*

**Design concept:** **"Warm White Tech"** — the antithesis of dark-mode cyberpunk. Premium warmth meets technical precision. Think: Apple product designed by a human-centered architect.

---

## Sources

All materials were provided as uploaded files. No Figma links or GitHub repositories were attached.

| File | Description |
|---|---|
| `uploads/Logos brainmap.jpeg` | Logo system reference: hero mark ("Core Nodes / Systems"), variations, elements & tones, metallic swatches |
| `uploads/System Design example.jpeg` | Design system reference: typography specimens, texture palette, 3D element library, UI controls |
| `uploads/front-view-woman-posing-futuristic-portrait (1).jpg` | Brand imagery: futuristic human, introspective (closed eyes) |
| `uploads/front-view-woman-posing-futuristic-portrait (2).jpg` | Brand imagery: futuristic human, assertive (direct gaze) |
| `uploads/structure-abstract-background-with-copy-space (1).jpg` | Brand texture: organic curved white architecture, warm bone shadows |
| `uploads/structure-abstract-background-with-copy-space.jpg` | Brand texture: curved white lattice architectural facade |
| `uploads/vertical-shot-white-abstract-architectural-construction.jpg` | Brand texture: symmetric white structural lattice |

---

## Content Fundamentals

### Language & Market
- Primary: **Spanish** (Latin American professional register)
- Secondary: English for international-facing materials
- Never mix languages in the same sentence

### Voice & Tone
- **Authoritative without arrogance.** Speaks as a knowledgeable peer, not a distant expert.
- **Direct.** No corporate buzzwords. No filler. Headlines make claims, not promises.
- **Empathic.** Behind every automated flow is a human obsession with the end user's peace of mind.
- **Precise.** Technical concepts explained with clarity — never dumbed down, never jargon-overloaded.

### Copy Patterns
| Pattern | Example |
|---|---|
| Declarative headline | *"Automatización y Experiencia Humana, Fusionadas."* |
| Three-word triads | *"Diagnóstico. Diseño. Implementación."* |
| First person plural | *"Nuestra metodología", "Nuestros sistemas"* — never passive voice |
| Direct client address | *"Tus clientes", "Tu operación"* — intimate, peer-level |
| Coral-highlighted phrases | Key claim within body text gets `color: var(--color-text-accent)` |

### Casing Rules
- Headlines: **Sentence case** — only proper nouns capitalized
- Navigation labels: Sentence case, never ALL CAPS
- Technical terms: canonical casing — APIs, CRM, n8n, Power Automate, etc.
- Badge/tag labels: UPPERCASE with wide tracking

### No-no List
- No emoji in professional contexts
- No exclamation marks in headlines
- No passive voice (*"se puede implementar"* → *"implementamos"*)
- No vague corporate jargon (synergies, paradigm shifts, best-in-class)
- No British formality — warm but never overly casual

---

## Visual Foundations

### Color System
| Token | Value | Usage |
|---|---|---|
| `--color-canvas` | `#FBFBFA` | Main background — warm white matte, imperceptible sand undertone |
| `--color-canvas-subtle` | `#F5F4F1` | Section alternation, inset areas |
| `--color-canvas-elevated` | `#FFFFFF` | Pure white cards on subtle backgrounds |
| `--color-text-primary` | `#1E1E1F` | Headlines, high-contrast text |
| `--color-text-secondary` | `#606266` | Body copy, subtitles |
| `--color-text-muted` | `#9B9DA3` | Captions, placeholders, labels |
| `--color-accent` | `#F3A98B` | Coral peach — active states, highlights, CTA fills |
| `--color-rose-gold` | `#C9956A` | Warm metallic — decorative rings, icon accents |
| `--color-titanium` | `#A8A8AA` | Cool metallic — structural decorative elements |
| `--color-chrome` | `#C8C8C8` | Neutral chrome — surfaces, gradients |

The accent `#F3A98B` is used **sparingly** — never as a large background fill. Use it for: highlighted phrases, active toggle fills, focus rings, CTA buttons (when the primary action is explicit), and soft radial glows behind hero elements.

### Typography

> ⚠️ **Font substitution:** Brief specifies **Clash Display** for H1/H2. Not available on Google Fonts. **Space Grotesk 700** is used as the closest substitute. Provide Clash Display `.woff2` files to upgrade.

| Role | Font | Weight | Tracking | Leading |
|---|---|---|---|---|
| Display (H1, H2) | Space Grotesk | 700 | −0.035em | 1.06–1.10 |
| Subtitle (H3) | Plus Jakarta Sans | 500–600 | −0.015em | 1.22 |
| Body | Inter | 400–500 | 0 | 1.62 |
| Mono/data | System mono | 400 | 0 | 1.5 |

### Backgrounds & Textures
- Main: `var(--color-canvas)` — no gradients, no patterns
- Sections alternate between `--color-canvas` and `--color-canvas-subtle`
- Background imagery: architectural abstract photos at 30–50% opacity as section decoration; never behind text without contrast protection
- Radial coral glow (`--color-accent-glow`) behind hero marks and key icons

### Neumorphism System
All interactive surfaces use **soft neumorphism** — a highlight from the top-left, shadow at bottom-right:
```css
/* Raised element */
box-shadow: var(--shadow-neumorph);
/* → 5px 5px 12px rgba(0,0,0,0.08), -3px -3px 7px rgba(255,255,255,0.92) */

/* Pressed/inset */
box-shadow: var(--shadow-neumorph-inset);
/* → inset 3px 3px 7px rgba(0,0,0,0.07), inset -2px -2px 5px rgba(255,255,255,0.85) */
```

### Glassmorphism System
Sticky nav, floating menus, and overlays:
```css
background: var(--glass-bg);          /* rgba(251,251,250,0.85) */
backdrop-filter: var(--glass-blur);   /* blur(18px) saturate(180%) */
border: var(--glass-border);          /* 1px solid rgba(255,255,255,0.65) */
```

### Shadows
- Level 0: No shadow (embedded/inset)
- Level 1: `--shadow-sm` — subtle presence on flat surfaces
- Level 2: `--shadow-neumorph` / `--shadow-md` — cards, inputs
- Level 3: `--shadow-lg` — floating panels, dialogs
- Level 4: `--shadow-xl` — modals, deep overlays
- Special: `--shadow-glow` — coral radiance behind accent elements

### Radii
- Cards: `--radius-2xl` (24px)
- Buttons: `--radius-full` (pill)
- Inputs: `--radius-lg` (16px)
- Badges/Tags: `--radius-full`

### Hover & Interaction States
| Element | Hover | Active/Press |
|---|---|---|
| Primary button | `translateY(-2px)` + expanded coral glow | `translateY(+1px)` + inset shadow |
| Secondary button | Expanded neumorphic shadow | Deboss inset |
| Card | `translateY(-3px)` + larger shadow | — |
| Input | Coral border + glow ring | — |
| Toggle | — | Coral fill + coral glow |

### Motion Principles
- Duration: 120ms (micro), 200ms (base), 350ms (shadow transitions)
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — smooth deceleration, **no bounce**
- Entrances: `opacity 0 → 1` + `translateY(20px → 0)`
- No looping decorative animations on UI elements in production
- Logo mark may animate as a slow 5s rotation in hero contexts only

### Imagery Style
- **Dominant palette:** all-white to warm-bone; very low saturation; high key (bright)
- **Subject types:** futuristic pale human figures (contemplative); abstract white architecture; 3D metallic spirals; node network diagrams
- **Never:** dark environments, saturated color, street photography, distressed subjects
- **Color grade:** cool-white with warm shadow tones; slight desaturation; no grain

---

## Iconography

**No proprietary icon set.** Use **Phosphor Icons** (regular/light weight) via CDN:
```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
```

- Weight: light/regular — consistent 1.5px stroke feel
- Sizes: 20px (UI inline), 24px (navigation), 32px+ (illustrative)
- Active/selected state: switch to `ph-fill` variant in `--color-accent`
- No emoji in interface contexts
- No unicode character icon substitutes
- No hand-rolled SVG icons

**Assets available:**
- `assets/logos/Logos brainmap.jpeg` — full logo reference sheet
- `assets/imagery/portrait-1.jpg` — futuristic human (introspective)
- `assets/imagery/portrait-2.jpg` — futuristic human (assertive)
- `assets/imagery/texture-arch-warm.jpg` — organic curved architecture
- `assets/imagery/texture-arch-lattice.jpg` — curved lattice facade
- `assets/imagery/texture-structural.jpg` — symmetric structural lattice

---

## File Index

```
styles.css                              Root CSS entry — @imports all tokens
tokens/
  colors.css                            Color custom properties (canvas, text, accent, metallic, semantic)
  typography.css                        Google Fonts + font/size/weight/leading/tracking tokens
  spacing.css                           Space scale + semantic gap/section aliases
  shadows.css                           Neumorphic, elevation, glass, glow shadow tokens
  radii.css                             Border radius scale + semantic aliases
  motion.css                            Duration, easing, transition string tokens

assets/
  logos/
    Logos brainmap.jpeg                 Full logo system reference sheet
  imagery/
    portrait-1.jpg                      Brand human (introspective)
    portrait-2.jpg                      Brand human (assertive)
    texture-arch-warm.jpg               Organic curved architecture
    texture-arch-lattice.jpg            Curved lattice facade
    texture-structural.jpg              Symmetric structural lattice

components/
  core/
    Button.jsx / .d.ts / .prompt.md     Primary, secondary, ghost, accent variants
    Input.jsx / .d.ts / .prompt.md      Neumorphic field with coral focus
    Card.jsx / .d.ts / .prompt.md       default, glass, elevated, accent, flat
    Badge.jsx / .d.ts / .prompt.md      Status label — uppercase pill
    Toggle.jsx / .d.ts / .prompt.md     Neumorphic on/off switch
    Avatar.jsx / .d.ts / .prompt.md     Circular with initials fallback + metallic ring
    Tag.jsx / .d.ts / .prompt.md        Dismissible content label pill
    buttons.card.html                   @dsCard: button specimens
    forms.card.html                     @dsCard: input + toggle specimens
    surfaces.card.html                  @dsCard: card, badge, avatar, tag specimens

guidelines/
  colors-canvas.card.html              @dsCard Colors: surface colors
  colors-text.card.html                @dsCard Colors: text hierarchy
  colors-accent.card.html              @dsCard Colors: coral accent scale
  colors-metallic.card.html            @dsCard Colors: metallic palette
  colors-semantic.card.html            @dsCard Colors: semantic status
  type-display.card.html               @dsCard Type: H1/H2 display
  type-subtitle.card.html              @dsCard Type: H3 subtitle
  type-body.card.html                  @dsCard Type: body copy
  type-scale.card.html                 @dsCard Type: full scale
  spacing.card.html                    @dsCard Spacing: space scale
  spacing-radii.card.html              @dsCard Spacing: border radius
  shadows-neumorph.card.html           @dsCard Shadows: neumorphic system
  shadows-elevation.card.html          @dsCard Shadows: elevation system
  shadows-glass.card.html              @dsCard Shadows: glow + glass
  brand-logo.card.html                 @dsCard Brand: logo system
  brand-imagery.card.html              @dsCard Brand: imagery style
  brand-voice.card.html                @dsCard Brand: voice & tone
  brand-motion.card.html               @dsCard Brand: motion principles

ui_kits/
  website/
    index.html                         Brainmap website prototype (hero, services, quote, contact)

readme.md                              This file
SKILL.md                               Agent skill definition
```

---

## Quick Start

Link `styles.css` in your HTML, then use the CSS custom properties:

```html
<link rel="stylesheet" href="/path/to/styles.css">
```

```css
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-tightest);
  color: var(--color-text-primary);
}

.card {
  background: var(--color-canvas);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-neumorph);
  padding: var(--card-padding);
}
```

For React components, load `_ds_bundle.js` and access via `window.Brainmap.Button`, etc.
