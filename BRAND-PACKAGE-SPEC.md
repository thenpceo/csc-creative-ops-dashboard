# Brand Package Specification

## 1. Purpose

A brand package is a portable, versioned source of brand truth. It can be consumed by any agent, skill, application, model, renderer, or production pipeline without embedding assumptions about how the consumer is implemented.

The package answers five questions:

1. What is permanent or defining about this brand?
2. What visual and verbal choices are required, preferred, permitted, or prohibited?
3. What reusable brand-specific patterns are available?
4. Which media can be used, for what purpose, and under what rights?
5. How should an output be evaluated for brand fit?

It does not contain generic design education, workflow state, provider configuration, executable tool code, or frequently changing commercial data.

## 2. Package Structure

```text
<brand-id>/
├── brand.json
├── tokens.json
├── rules.json
├── recipes.json
├── media.json
├── evaluation.json
├── DESIGN.md
├── media/
└── modules/
    └── <capability>.json
```

Required source files:

- `brand.json`
- `tokens.json`
- `rules.json`
- `recipes.json`
- `media.json`
- `evaluation.json`

`DESIGN.md` is generated. `media/` exists only when files are bundled. `modules/` exists only when the brand has one or more evidenced capability extensions.

All JSON files declare `$schema` and `schemaVersion`. Schemas are referenced from a separately versioned package specification and are not copied into each brand.

## 3. Shared Record Semantics

Records use independent dimensions rather than a single ambiguous status field:

```json
{
  "id": "rule.logo.clear-space",
  "authority": "required",
  "lifecycle": "active",
  "confidence": "verified",
  "sourceIds": ["source.official-guideline-2025"],
  "appliesTo": ["all"]
}
```

Allowed classifications:

- `authority`: `required`, `preferred`, `permitted`, `prohibited`, `reference-only`
- `lifecycle`: `active`, `experimental`, `deprecated`
- `confidence`: `verified`, `inferred`, `unknown`
- `variability`, when relevant to generation: `fixed`, `bounded`, `free`

Every rule inferred from public examples rather than an official guide must declare `confidence: inferred` and cite evidence.

## 4. `brand.json`

`brand.json` is the package entrypoint and identity record. It owns:

- brand and package IDs;
- package and schema versions;
- display name and concise description;
- defining proposition and audience summary;
- personality and voice traits at summary level;
- paths to the five other core files;
- declared optional capabilities and their module paths;
- package provenance and last-reviewed date.

Example shape:

```json
{
  "$schema": "https://example.org/brand-package/v1/brand.schema.json",
  "schemaVersion": "1.0.0",
  "packageVersion": "0.1.0",
  "brand": {
    "id": "backcountry",
    "name": "Backcountry",
    "description": "Concise defining statement",
    "proposition": "Brand-specific value proposition",
    "audiences": ["audience.core-outdoor"],
    "traits": ["expert", "adventurous", "direct"]
  },
  "files": {
    "tokens": "tokens.json",
    "rules": "rules.json",
    "recipes": "recipes.json",
    "media": "media.json",
    "evaluation": "evaluation.json"
  },
  "modules": [
    {"capability": "imagery", "path": "modules/imagery.json"}
  ]
}
```

Do not put implementation settings, API configuration, campaign details, prices, current inventory, or duplicated design rules here.

## 5. `tokens.json`

`tokens.json` is the sole owner of reusable values. Tokens are semantic and output-neutral.

Recommended groups:

- color roles;
- typography families, weights, scale, leading, and tracking;
- spacing and layout scale;
- radius and shape;
- border and depth;
- opacity;
- icon and stroke characteristics;
- temporal values that are universal to the brand rather than renderer-specific.

Example:

```json
{
  "$schema": "https://example.org/brand-package/v1/tokens.schema.json",
  "schemaVersion": "1.0.0",
  "color": {
    "surface.primary": {"value": "#FFFFFF", "type": "color"},
    "text.primary": {"value": "#111111", "type": "color"},
    "action.primary": {"value": "#D04A22", "type": "color"}
  },
  "shape": {
    "control.radius": {"value": 2, "unit": "px", "type": "dimension"}
  }
}
```

Consumers may export these values to CSS variables, renderer variables, document styles, or another format. Those exports are build artifacts outside the canonical package.

## 6. `rules.json`

`rules.json` is the sole owner of requirements, preferences, permissions, and prohibitions.

Rule domains may include:

- logo and mark usage;
- typography behavior not reducible to values;
- color relationships;
- layout and hierarchy;
- title, label, action, and button treatment across media;
- voice, tone, terminology, and calls to action;
- imagery subjects and treatment;
- factuality, product truth, claims, and invention policy;
- accessibility and legibility;
- rights and likeness constraints;
- co-branding behavior when broadly applicable.

Example:

```json
{
  "$schema": "https://example.org/brand-package/v1/rules.schema.json",
  "schemaVersion": "1.0.0",
  "rules": [
    {
      "id": "rule.action.copy",
      "authority": "preferred",
      "lifecycle": "active",
      "confidence": "verified",
      "appliesTo": ["all"],
      "statement": "Use short, concrete action language.",
      "rationale": "Preserves the brand's direct expert voice.",
      "tokenRefs": ["typography.action", "color.action.primary"],
      "sourceIds": ["source.official-site-actions"]
    }
  ]
}
```

Rules describe outcomes and constraints. They must not prescribe a framework, renderer, model, or prompt syntax.

## 7. `recipes.json`

`recipes.json` owns evidenced, reusable, brand-specific creative patterns. A recipe combines tokens, rules, content roles, and media references without dictating implementation.

Useful recipe types include:

- product hero;
- editorial feature;
- title card;
- action treatment;
- comparison layout;
- promotional block;
- environmental establishing image;
- product detail image;
- brand-distinctive narrative or transition pattern.

Example:

```json
{
  "$schema": "https://example.org/brand-package/v1/recipes.schema.json",
  "schemaVersion": "1.0.0",
  "recipes": [
    {
      "id": "recipe.product-hero",
      "authority": "preferred",
      "appliesTo": ["interactive", "static", "motion"],
      "inputs": ["product", "headline", "action"],
      "composition": {
        "hierarchy": ["product", "headline", "action"],
        "density": "low",
        "imageRole": "dominant"
      },
      "ruleRefs": ["rule.product.truth", "rule.action.copy"],
      "tokenRefs": ["spacing.section.large"],
      "mediaSelectors": ["role:product-hero-reference"]
    }
  ]
}
```

Do not store generic commercial arcs, generic shot lists, model prompts, HTML templates, or executable compositions. If a pattern is common production knowledge rather than distinctive brand behavior, the consuming tool owns it.

## 8. `media.json`

`media.json` is the single catalog for production assets and evidence. Conceptual differences are expressed through metadata, not separate folder trees.

Catalog roles may include:

- `production-asset`
- `reference`
- `golden-example`
- `anti-reference`
- `template`
- `source-evidence`

Media kinds may include image, video, logo, icon, font, audio, document, 3D model, texture, or another declared MIME type.

Example:

```json
{
  "$schema": "https://example.org/brand-package/v1/media.schema.json",
  "schemaVersion": "1.0.0",
  "items": [
    {
      "id": "media.alpine-hero-01",
      "uri": "media/alpine-hero-01.jpg",
      "kind": "image",
      "roles": ["reference", "golden-example", "environment"],
      "lifecycle": "active",
      "source": {
        "type": "official",
        "uri": "https://example.com/source-page",
        "retrievedAt": "2026-07-21"
      },
      "rights": {
        "status": "reviewed",
        "allowedUses": ["analysis", "generation-reference", "storyboard"],
        "modelUploadAllowed": true
      },
      "annotations": {
        "composition": ["subject-lower-third", "large-environment"],
        "lighting": ["directional-natural"],
        "environment": ["alpine"]
      }
    }
  ]
}
```

Conditional metadata should remain conditional:

- checksum is required only for bundled files;
- expiry is recorded only for expiring rights;
- crop and focal-point data are added only when useful;
- model-upload permission is required before an external model receives the media;
- confidence is required for inferred examples or annotations.

Directory structure inside `media/` is an implementation convenience. Consumers must use catalog IDs rather than infer meaning from folder names.

## 9. `evaluation.json`

`evaluation.json` is the sole owner of brand-specific quality criteria. It supports hard gates and weighted scoring without coupling to a particular evaluator.

It may contain:

- non-negotiable gates;
- scoring dimensions;
- applicable output classes;
- evidence and anti-reference IDs;
- minimum recommended scores;
- criteria that require human review.

Example:

```json
{
  "$schema": "https://example.org/brand-package/v1/evaluation.schema.json",
  "schemaVersion": "1.0.0",
  "gates": [
    {
      "id": "gate.product-truth",
      "appliesTo": ["all"],
      "ruleRefs": ["rule.product.truth"],
      "failure": "reject"
    }
  ],
  "dimensions": [
    {
      "id": "score.visual-character",
      "weight": 0.3,
      "evidenceRefs": ["media.alpine-hero-01"],
      "antiReferenceRefs": ["media.anti-generic-studio-01"]
    }
  ]
}
```

The consumer owns the evaluation model, retry behavior, approval workflow, and operational thresholds.

## 10. Optional Module Contract

A module adds brand-specific knowledge for a capability. It uses the same concepts as core instead of defining a parallel system.

```json
{
  "$schema": "https://example.org/brand-package/v1/module.schema.json",
  "schemaVersion": "1.0.0",
  "id": "module.motion",
  "capability": "motion",
  "version": "0.1.0",
  "extends": {
    "tokens": {},
    "rules": [],
    "recipes": [],
    "evaluation": [],
    "mediaSelectors": []
  }
}
```

Module constraints:

- It is declared in `brand.json`.
- It exists only when supported by verified or clearly labeled inferred evidence.
- It does not repeat core records.
- It refers to core IDs where possible.
- It describes brand intent, not implementation technology.
- It can be ignored by consumers that do not support the capability.
- Its absence means “not specified,” not “prohibited.”

Neutral capability definitions:

| Capability | Brand knowledge it may add |
|---|---|
| `interactive` | responsive hierarchy, state behavior, navigation expression, interaction feedback |
| `static` | fixed-canvas composition and legibility behavior |
| `print` | physical-production constraints that are actually brand-specific |
| `imagery` | casting, environment, camera, lighting, grading, product and lifestyle treatment |
| `motion` | pacing, temporal hierarchy, transitions, kinetic type, deterministic movement intent |
| `generative-image` | structured visual descriptors, bounded variation, negative intent, reference policy |
| `generative-video` | cinematic behavior, temporal continuity, camera movement, generative exclusions |
| `spatial` | material, lighting, camera, scale, depth, effects, and asset-use intent |
| `sequential` | brand-specific narrative rhythm, continuity, and shot hierarchy |
| `commerce` | product hierarchy, offer presentation, price and action treatment—not live values |
| `marketing` | durable campaign families, channel adaptation, variant axes, current-fact boundaries, and rights intent |
| `audio` | brand-specific sonic character and approved assets |

### Reference transformation contract

When a generative capability is expected to transform a supplied product or scene, the module should declare a provider-neutral reference transformation contract. This is the reusable boundary between the brand package and any agent, skill, application, or model adapter.

The contract contains:

- `requiredInputs`: rights-cleared reference media and the intended output role;
- `lockedInvariants`: identity details that must survive unchanged;
- `editableVariables`: scene or motion choices a user may change;
- semantic `promptStructure` blocks with named variables rather than provider syntax;
- `qualityChecks` or `continuityChecks` that compare output against the reference;
- `failureAction`, normally reject and regenerate when identity or continuity changes;
- `mediaSelectors` for internal examples, when rights permit them to be bundled.

For product imagery, locked invariants normally include silhouette, proportions, materials, finish, hardware, seams, and countable details. For image-to-video, also lock room geometry, object placement, light direction, and temporal product identity. Prompt language can reinforce these locks but never replaces evaluation.

The consuming adapter owns provider selection, file upload, prompt serialization, seeds, request polling, retries, and output storage. A reference is not sent to an external model unless its media record permits model upload or the consuming system has separate task-specific authorization.

## 11. Generated `DESIGN.md`

`DESIGN.md` is generated from the six core files and selected modules. It provides:

- a concise brand overview;
- token tables;
- plain-language required and prohibited behavior;
- representative recipes;
- approved and prohibited media examples;
- evaluation criteria;
- provenance, confidence, and package version.

The generator must:

- resolve references by ID;
- show whether guidance is verified or inferred;
- include the source package version;
- produce deterministic output for identical input;
- warn on unresolved references;
- overwrite generated output rather than merge hand edits.

Any consumer-specific flavor of this guide is an external exporter, not an additional source file.

## 12. Loading Contract

Consumers follow this sequence:

1. Load and validate `brand.json`.
2. Load the five referenced core files.
3. Declare the capabilities needed for the requested output.
4. Load only matching modules that exist.
5. Select rules and recipes whose `appliesTo` matches the output.
6. Resolve required media and confirm allowed use.
7. Join external campaign, product, legal, and platform inputs.
8. Compile an internal consumer-specific context.
9. Produce and evaluate the output.
10. Record the package version and IDs consumed.

Consumers must fail closed on invalid rights, unresolved required references, and prohibited rules. They should degrade gracefully when optional modules or preferred recipes are absent.

## 13. Shared Validation

The external package validator checks:

- schema validity;
- unique IDs;
- valid cross-file references;
- valid module declarations;
- no duplicate canonical ownership;
- bundled-file existence and checksums when present;
- rights metadata for external model use;
- confidence and provenance for inferred guidance;
- prohibited implementation vocabulary in canonical source;
- deterministic `DESIGN.md` generation;
- no required empty capability modules.

Tool names may appear in historical source URLs or citation titles. They must not appear as data-model fields, rule semantics, capability names, or implementation instructions.

## 14. Non-Goals

The package does not own:

- campaign briefs or project files;
- catalogs, pricing, offers, or inventory;
- prompt serialization for a particular model;
- rendering source code;
- provider selection or API operation;
- review interfaces or approval state;
- generation records, costs, seeds, and request IDs;
- generic design, film, or marketing knowledge;
- application security, queues, webhooks, or secrets;
- executable validation or build systems.

These responsibilities remain in consuming systems and adapters.
