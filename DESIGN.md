# Design Brief

## Direction

PHASMA — Decentralized robotics RL simulation platform with a brutalist monochrome analytics dashboard.

## Tone

Brutalist minimal: pure black canvas, white data, zero decoration. Every pixel serves information.

## Differentiation

A medical-grade dark analytics interface where histograms feel like diagnostic readouts — stark, precise, unforgettable.

## Color Palette

| Token      | OKLCH       | Role                        |
| ---------- | ----------- | --------------------------- |
| background | 0 0 0       | Pure black canvas           |
| foreground | 0.985 0 0   | Primary white text          |
| card       | 0.145 0 0   | Elevated surface            |
| primary    | 0.985 0 0   | CTAs, active elements       |
| accent     | 0.371 0 0   | Selected/highlighted states |
| muted      | 0.269 0 0   | Secondary surfaces          |
| chart-1    | 0.985 0 0   | Histogram series A (white)  |
| chart-2    | 0.708 0 0   | Histogram series B (light)  |
| chart-3    | 0.556 0 0   | Histogram series C (mid)    |
| chart-4    | 0.371 0 0   | Histogram series D (dim)    |
| chart-5    | 0.269 0 0   | Histogram series E (dark)   |

## Typography

- Display: Space Grotesk — headings, page titles, hero text
- Body: General Sans — UI labels, card text, descriptions
- Mono: Geist Mono — numbers, metrics, histogram axes
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Flat hierarchy with 1px white borders (`border-white/10`) creating spatial separation. No drop shadows — depth comes from surface darkness and edge definition.

## Structural Zones

| Zone    | Background        | Border                 | Notes                                    |
| ------- | ----------------- | ---------------------- | ---------------------------------------- |
| Header  | `bg-card`         | `border-b border-white/10` | Fixed top, contains logo + nav           |
| Content | `bg-background`   | —                      | Card grid with `gap-6`, alternating none |
| Footer  | `bg-muted/40`     | `border-t border-white/10` | Minimal, no branding text                |

## Spacing & Rhythm

Section gaps `gap-6` to `gap-8`. Cards use `p-6`. Stat cards are compact `p-4`. Histogram card is the dominant element with `min-h-[400px]`.

## Component Patterns

- Buttons: `rounded-sm`, white border, black fill, white text; hover inverts to white fill, black text
- Cards: `rounded-sm`, `bg-card`, `border border-white/10`, no shadow
- Badges: `rounded-full`, `bg-muted`, `text-xs font-mono uppercase tracking-wider`
- Histogram bars: SVG `rect` elements, monochrome grays from `chart-1` to `chart-5`, no rounding

## Motion

- Entrance: `fade-in` on cards, staggered 50ms per card
- Hover: buttons invert colors in `150ms`; cards get `border-white/20` in `150ms`
- Decorative: `pulse-subtle` on live indicators; `bar-grow` on histogram bars when data loads

## Constraints

- Strict monochrome only — no colors, no gradients, no opacity backgrounds
- All analytics visible to everyone — no locked sections or Pro gating
- Histograms are static SVG with 10 bins, no interactivity
- Card-based layout preserved from existing structure

## Signature Detail

The 10-bin monochrome histogram chart where bars grow from zero with a subtle animation, resembling a medical vital-sign readout — stark white data on absolute black.
