# CSC portfolio brand packages

This directory contains the canonical portable brand packages. The adjacent `design-systems/` directory is an earlier shallow experiment and is not the production source of truth.

Each package loads from `brand.json`, then resolves `tokens.json`, `rules.json`, `recipes.json`, `media.json`, `evaluation.json`, and only the capability modules required by the consuming system. `DESIGN.md` is the human-readable guide.

## Portfolio

| Brand | Package | Operating evidence |
|---|---|---|
| Backcountry | `backcountry/` | current public surface |
| BikeTiresDirect | `bike-tires-direct/` | current public surface |
| Competitive Cyclist | `competitive-cyclist/` | current public surface |
| Home Consignment Center | `home-consignment-center/` | current public surface |
| Home Designs | `home-designs/` | CSC identity plus Cabinetry Unlimited operating surface |
| Level Nine Sports | `level-nine-sports/` | historical identity; domain redirects to Backcountry Outlet |
| MotoSport | `motosport/` | current public surface |
| One Kings Lane | `one-kings-lane/` | current reference package |
| Seattle Coffee Gear | `seattle-coffee-gear/` | current public surface |
| Steep & Cheap | `steep-and-cheap/` | current public surface |
| Sur La Table | `sur-la-table/` | current public surface |
| TriSports | `trisports/` | historical identity; domain redirects to Competitive Cyclist |
| Western Bikeworks | `western-bikeworks/` | historical identity; domain redirects to BikeTiresDirect |

## Logos and media

The authoritative asset catalog is each package's `media.json`. Do not infer permission or role from a folder or filename.

Bundled identity references are stored at:

```text
<brand>/media/official/logo-primary.<ext>
```

Level Nine Sports contains an archived compact icon rather than a complete wordmark. Obtain an authorized full lockup before production use. Publicly acquired logos and marketing images are reference evidence; production reuse, redistribution, and model upload require rights review and brand authorization.

Current or archived marketing references are stored under:

```text
<brand>/media/marketing-reference/
```

Homepage and historical audit captures are stored under:

```text
<brand>/media/official/homepage-audit.png
<brand>/media/official/historical-homepage-audit.png
```

The historical file exists only when an accepted standalone archive capture is available.

## Portable reuse

For a different repository, copy:

1. `BRAND-PACKAGE-SPEC.md`
2. `brand-system-spec/v1/schemas/`
3. the required directory from `brand-packages/`
4. `scripts/validate-brand-package.mjs`

Keep provider adapters, API credentials, renderer code, campaign briefs, catalogs, offers, and workflow state outside the package.

## Verification

Run one package:

```sh
node scripts/validate-brand-package.mjs brand-packages/backcountry
```

Run the full portfolio audit:

```sh
node scripts/audit-portfolio-packages.mjs
```

The full audit writes `PORTFOLIO-COMPLETION-AUDIT.md` and fails on schema errors, missing assets, uncataloged assets, insufficient package depth, duplicated brand-defining fields, historical-scope omissions, or tool-specific canonical instructions.
