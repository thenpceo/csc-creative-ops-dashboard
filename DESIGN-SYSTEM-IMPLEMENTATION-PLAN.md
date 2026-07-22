# Modular Brand System

## Implementation Overview

Status: architecture approved for the first brand pass  
Scope: portable brand packages plus storyboard-skill integration  
Out of scope: building the production application or populating a real brand

This revision applies a strict production-usefulness test to the original plan. The required brand package is now limited to six canonical JSON files, one generated human guide, one media directory, and optional capability modules. Storyboarding, renderers, model providers, prompt compilers, web frameworks, and export formats are consumers of the package—not parts of the package.

The detailed contracts are split into:

- [BRAND-PACKAGE-SPEC.md](./BRAND-PACKAGE-SPEC.md): the tool-neutral source of brand truth.
- [STORYBOARD-SKILL-INTEGRATION-PLAN.md](./STORYBOARD-SKILL-INTEGRATION-PLAN.md): how the existing storyboard skill consumes that source.

## 1. Decision

Use this separation:

```text
Brand truth
  -> requested capability modules
  -> consumer-owned adapter
  -> tool, model, renderer, or provider
  -> output
```

The brand package describes the desired result, allowed variation, evidence, and evaluation criteria. A consumer decides how to implement it.

Examples of consumers include a website generator, graphic-layout system, motion renderer, image generator, video generator, presentation tool, print pipeline, or storyboard agent. None receives privileged treatment in the core structure.

## 2. The 85% Filter

A required core field or file must meet all four conditions:

1. It represents brand truth rather than tool behavior.
2. It is useful to nearly every production consumer, or is a non-negotiable rights/factuality control.
3. It changes with the brand, not with the selected tool.
4. It has exactly one canonical owner.

Anything else is handled as follows:

- Brand-specific but medium-specific knowledge becomes an optional capability module.
- Generic production knowledge belongs to the consuming skill or application.
- Tool syntax and runtime behavior belong to adapters.
- Generated representations belong to build output and are never canonical.
- Unsupported capabilities are absent rather than represented by empty folders.

Rights, provenance, prohibited claims, and other high-risk constraints are retained even when they are not exercised in 85% of individual outputs. Their production value comes from preventing rare but serious failures.

## 3. Required Brand Package

```text
<brand-id>/
├── brand.json
├── tokens.json
├── rules.json
├── recipes.json
├── media.json
├── evaluation.json
├── DESIGN.md                 # generated; never hand-edited
├── media/                    # only files actually bundled
└── modules/                  # only evidenced optional modules
    └── <capability>.json
```

The six JSON files are the canonical source. `DESIGN.md` is a generated, readable projection for humans and language agents. Shared JSON Schemas and validators live outside individual brand packages.

## 4. What Was Removed, Merged, or Moved

| Original plan element | Decision | New owner |
|---|---|---|
| `README.md`, `BRAND-STRATEGY.md`, identity, visual-language, and voice document trees | Merge | Six canonical files and generated `DESIGN.md` |
| `AGENT-INSTRUCTIONS.md` | Remove | The consuming agent or skill owns behavior |
| Package-local `CHANGELOG.md` | Remove | Source control and package version |
| Separate color, type, motion, and brand token files | Merge | `tokens.json`; specialized extensions in modules |
| CSS, Tailwind, and renderer token files | Move | External exporters or adapters |
| Per-brand schema folders | Move | One versioned shared specification |
| Separate production-guide folders | Merge or make optional | Core rules/recipes or capability modules |
| Entire HyperFrames tree | Move | External renderer adapter |
| Three.js, WebGL, and GLSL code/recipes | Move | External spatial-rendering adapter |
| Entire brand-owned storyboarding tree | Move | Storyboard integration and runtime profile |
| Provider eligibility, endpoints, queues, and generation records | Move | Provider adapter and storyboard runtime |
| Separate asset and reference manifests | Merge | `media.json` with explicit roles |
| Required asset-type folders | Remove | Media type is metadata, not folder structure |
| Template folder and starter compositions | Move or catalog | Consumer tools, or real brand assets in `media.json` |
| Multiple rubrics and example trees | Merge | `evaluation.json` plus media roles |
| Package-local automated checks | Move | Shared validator and consumer test suites |
| Generic commercial arcs and shot recipes | Move | Storyboard skill knowledge |
| Empty co-branding, print, audio, 3D, shader, and presentation sections | Remove | Add an optional module only when evidence exists |

## 5. Redundancy Rules

- A color, font, radius, timing value, or other primitive appears only in `tokens.json`.
- A requirement, permission, prohibition, or factuality rule appears only in `rules.json`.
- A reusable brand-specific composition or creative pattern appears only in `recipes.json`.
- Every asset, reference, example, anti-reference, template, font, model, or audio file appears only in `media.json`.
- Every scoring dimension or hard evaluation gate appears only in `evaluation.json`.
- Other files refer to canonical IDs instead of copying values or prose.
- Generated `DESIGN.md` resolves those references for readability but never becomes an authority.

## 6. Tool-Neutrality Rules

The canonical package must not contain:

- provider or product names;
- API endpoints, credentials, queues, request IDs, or costs;
- framework classes or source code;
- model-specific prompt strings;
- application workflow or approval state;
- HTML viewer behavior;
- tool-specific eligibility flags;
- copied schemas or generated exports.

Neutral declarations are allowed. For example, a recipe may require editable text, deterministic motion, a reference image, alpha transparency, or spatial rendering. The consumer maps those capabilities to its available implementation.

## 7. Optional Capability Modules

Modules are brand-specific extensions, not mandatory folders. Initial neutral capability names are:

- `interactive`
- `static`
- `print`
- `imagery`
- `motion`
- `generative-image`
- `generative-video`
- `spatial`
- `sequential`
- `commerce`
- `audio`

Do not create all of them for every brand. A module exists only when verified brand evidence adds meaningful rules or recipes beyond core. Module contents use the same token, rule, recipe, media-selector, and evaluation concepts as core.

## 8. External Inputs

The following may inform an output but are not permanent brand-package truth:

- live products, inventory, prices, offers, and availability;
- campaign briefs, budgets, dates, and target placements;
- current legal approvals and market-specific requirements;
- output-platform specifications;
- provider capabilities and model limitations;
- project state, review notes, and approval status.

A production system joins these inputs with the versioned brand package at runtime.

## 9. Precedence

```text
External legal, rights, and product truth
  > required or prohibited brand rules
  > explicit campaign brief
  > preferred brand recipes
  > consumer and adapter defaults
```

No generated document participates in precedence because it is only a view of canonical data.

## 10. Implementation Sequence

### Stage 1: Freeze the portable package specification

- Finalize the six file contracts and module contract.
- Put schemas and validation in one versioned shared specification.
- Build a small synthetic fixture that exercises core plus one optional module.
- Generate `DESIGN.md` deterministically from the fixture.
- Reject duplicated IDs, unresolved references, unsupported fields, and tool names in canonical source.

### Stage 2: Refactor the storyboard skill at the boundary

- Add a loader for the neutral brand package.
- Compile a temporary storyboard context at runtime; do not add a storyboard export to the brand.
- Make decomposition and prompt composition consume rule, recipe, and media IDs.
- Move provider behavior behind provider adapters.
- Move motion-renderer behavior behind renderer adapters.
- Keep project state, approvals, costs, and generation logs inside the storyboard system.

### Stage 3: Populate the first real brand

- Select Backcountry or MotoSport.
- Research and cite evidence before creating rules or modules.
- Populate only supported capabilities; leave unsupported modules absent.
- Run schema, rights, redundancy, tool-neutrality, and visual-quality checks.
- Use the generated `DESIGN.md` as the human audit surface.

### Stage 4: End-to-end storyboard test

- Run one brief through the real brand package and storyboard skill.
- Produce a mixed storyboard using whichever render and generation adapters are appropriate.
- Confirm that changing an adapter requires no edits to the brand package.
- Record package version and all consumed rule, recipe, token, and media IDs.

### Later: build the product

Only after the portable contract and first integration are proven should a UI, database, orchestration service, or multi-brand management tool be designed.

## 11. Acceptance Criteria

The planning architecture is successful when:

- a core brand package has only six hand-authored machine-readable files;
- no core value has two owners;
- the package contains no tool or provider implementation;
- a consumer loads only the modules it requests;
- an unknown or missing optional module fails gracefully;
- every bundled media file has provenance, rights, and an allowed-use declaration;
- a web tool and a storyboard tool can consume the same unmodified package;
- generated `DESIGN.md` matches the canonical source version;
- a provider or renderer can be replaced without changing brand truth;
- unsupported capabilities require no placeholder files;
- the first real brand can be audited from evidence back to each inferred rule.

## 12. Next Pass

The next pass should populate one real brand against [BRAND-PACKAGE-SPEC.md](./BRAND-PACKAGE-SPEC.md). Backcountry remains the stronger stress test because its system needs commerce, outdoor imagery, action, editorial storytelling, and likely motion behavior. MotoSport is a valid alternative if speed and motorsports-specific visual language are more useful for the interview demo.

The existing `design-systems/*/DESIGN.md` files are retained only as legacy research snapshots. They are tool-specific generated artifacts, not partially completed production packages, and should not constrain the first real brand implementation.
