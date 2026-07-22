# Storyboard Skill Integration Plan

## 1. Objective

Refactor `skill-storyboard-video-creator-v0.1` so it can consume any package that follows [BRAND-PACKAGE-SPEC.md](./BRAND-PACKAGE-SPEC.md), compile brand context at runtime, and route shot intents through replaceable generation and rendering adapters.

The storyboard skill remains responsible for storyboarding. The brand package remains responsible for brand truth. Neither duplicates the other.

## 2. Current Skill Audit

The supplied archive contains:

- a large `SKILL.md` and knowledge base;
- decomposition, element-extraction, and prompt-composition prompts;
- provider and platform guidance;
- visual-consistency and enrichment practices;
- a fixed HTML storyboard viewer;
- a complete narrative example with elements, scenes, prompts, generations, and final frames.

These are useful foundations. The main production risk is that brand direction would currently be added as more prose inside prompts and skill instructions. That would create hidden precedence, duplicated guidance, model-specific coupling, and no traceable record of which brand evidence affected a frame.

## 3. Boundary of Ownership

### Brand package owns

- permanent brand identity and strategy summary;
- semantic tokens;
- required, preferred, permitted, and prohibited rules;
- brand-specific creative recipes;
- approved assets, references, examples, anti-references, rights, and provenance;
- brand-specific evaluation criteria;
- optional imagery, motion, generative, spatial, and sequential knowledge.

### Storyboard skill owns

- campaign-brief schema;
- element, scene, shot, and project schemas;
- generic narrative and commercial structures;
- generic shot and continuity knowledge;
- runtime brand-context compilation;
- prompt compilation order;
- adapter selection;
- generation jobs, state, costs, seeds, and request IDs;
- retries, approvals, and review UI;
- output manifests and audit records.

### Adapters own

- provider-specific prompts and endpoint behavior;
- model limitations and reference-input formats;
- queue, webhook, polling, and error handling;
- renderer-specific code and composition formats;
- export formats for a framework or platform.

## 4. Target Skill Structure

This is a skill-level structure, not a brand-package structure:

```text
skill/
├── SKILL.md
├── README.md
├── knowledge-base.md
├── best-practices/
├── prompts/
│   ├── decomposition.md
│   ├── element-extraction.md
│   └── prompt-composition.md
├── contracts/
│   ├── campaign-brief.schema.json
│   ├── storyboard-project.schema.json
│   ├── brand-context.schema.json
│   └── shot-intent.schema.json
├── integrations/
│   └── brand-package/
│       ├── loader
│       └── context-compiler
├── adapters/
│   ├── providers/
│   ├── renderers/
│   └── exporters/
├── templates/
│   └── storyboard-viewer.html
└── examples/
```

Exact implementation language and filenames can be chosen when the skill is refactored. The architectural requirement is the boundary, not this literal directory spelling.

## 5. Runtime Flow

```text
Campaign brief + external product/legal data
                    |
Brand package -> context compiler
                    |
        normalized brand context
                    |
   elements -> scenes -> shot intents
                    |
       capability-based router
          /         |         \
 image provider  video provider  motion renderer
          \         |         /
            frames and clips
                    |
      brand evaluation + review
                    |
       storyboard + audit record
```

### Phase 0: Load brand context

1. Validate `brand.json` and its core references.
2. Determine the capabilities required by the brief.
3. Load only relevant optional modules.
4. Select applicable rules, recipes, and evaluation criteria.
5. Resolve candidate media and confirm rights for the intended adapters.
6. Compile an immutable runtime `brandContext`.

The runtime context is derived and project-local. It is never written back as a new source of brand truth.

### Phase 1: Normalize the brief

The campaign brief owns:

- objective and audience;
- deliverables and aspect ratios;
- duration and channel constraints;
- required products, offer, and legal copy;
- available source assets;
- desired creative direction;
- approval and deadline requirements.

The skill resolves brief requests against required and prohibited brand rules. A conflict is surfaced before generation.

### Phase 2: Extract elements

Element extraction creates stable entities for:

- people or characters;
- products;
- props;
- environments;
- logos and graphic elements;
- required copy.

Each element stores applicable `ruleRefs`, `mediaRefs`, and external truth references. It does not copy the underlying rules or asset descriptions.

### Phase 3: Plan scenes and shots

The skill uses its generic story knowledge plus brand-specific recipes. Brand recipes may influence hierarchy, pacing, environment, title treatment, or narrative rhythm; they do not replace the skill's general story grammar.

Each shot becomes a neutral shot intent before it becomes a provider prompt.

Example:

```json
{
  "id": "shot.01.03",
  "renderMode": "hybrid",
  "requirements": [
    "reference-image",
    "editable-text",
    "deterministic-motion"
  ],
  "durationSeconds": 3,
  "aspectRatio": "9:16",
  "subjects": ["element.product.01"],
  "environment": "alpine-ridgeline",
  "composition": {
    "scale": "wide",
    "hierarchy": ["environment", "product", "title"]
  },
  "cameraIntent": {
    "framing": "wide",
    "movement": "slow-forward"
  },
  "lightingIntent": ["directional-natural", "high-altitude-clarity"],
  "motionIntent": ["restrained", "weighty"],
  "ruleRefs": ["rule.imagery.environment", "rule.title.treatment"],
  "recipeRefs": ["recipe.environmental-product-reveal"],
  "mediaRefs": ["media.alpine-hero-01"]
}
```

No shot field names a provider, renderer, framework, or model.

### Phase 4: Route by capability

The router matches shot requirements to adapter capabilities.

Examples:

- A photographic frame with reference images may route to an image-generation provider.
- A cinematic continuous shot may route to a video-generation provider.
- Editable titles and deterministic transitions may route to a motion renderer.
- A product asset requiring controllable depth may route to a spatial renderer.
- A hybrid shot may combine outputs from more than one adapter.

The package never declares `providerEligible` or `rendererEligible`. Eligibility is a runtime decision based on declared requirements and available adapter capabilities.

### Phase 5: Compile provider prompts or renderer instructions

Prompt compilation happens after neutral planning. A provider compiler receives:

- the shot intent;
- resolved brand rules and recipes;
- selected media references;
- continuity state from preceding shots;
- current provider capabilities and limitations.

It serializes those inputs into provider-specific syntax. Generic order can remain skill-owned:

```text
subject and action
  + environment
  + composition and camera intent
  + lighting and material intent
  + brand-specific descriptors
  + continuity anchors
  + exclusions
  + provider controls
```

Brand modules should store structured descriptors such as `directional-natural`, not a single frozen prompt paragraph. This allows different compilers to express the same intent correctly.

### Phase 6: Generate, evaluate, and review

For every output:

1. Run required brand gates.
2. Score applicable brand criteria.
3. Run provider- or renderer-specific technical checks.
4. Preserve the output, input lineage, and evaluation result.
5. Retry only according to skill policy; never weaken required brand rules silently.
6. Present outputs in the storyboard viewer for review.

The viewer can derive its visible theme from brand tokens, but its HTML, controls, and approval logic remain skill-owned.

## 6. File-by-File Changes to the Existing Archive

### `skill/SKILL.md`

- Add the Phase 0 brand-package load and capability negotiation.
- Define precedence between external truth, brand rules, brief, recipes, and adapter defaults.
- Replace direct provider assumptions with adapter contracts.
- Require ID-level lineage in every shot and output.
- Keep generic storyboarding and approval workflow here.

### `skill/knowledge-base.md`

- Keep generic film, storyboard, and continuity knowledge.
- Remove any guidance that should vary by brand.
- Route current provider facts to provider adapters or provider documentation.

### `skill/prompts/decomposition.md`

- Accept a normalized brief and compact brand-context summary.
- Return stable scene goals and applicable rule/recipe IDs.
- Do not paste the entire design guide into the prompt.

### `skill/prompts/element-extraction.md`

- Resolve product, character, prop, environment, and graphic elements against media IDs.
- Carry factuality and invention constraints as rule IDs.
- Flag missing or rights-blocked source material before generation.

### `skill/prompts/prompt-composition.md`

- Change from one universal model prompt to an intermediate shot intent.
- Make provider adapters responsible for final serialization.
- Preserve media, rule, recipe, and continuity references.

### `skill/best-practices/`

- Retain generic enrichment and continuity patterns.
- Remove duplicated brand guidance.
- Separate generative continuity advice from deterministic motion-rendering advice.

### Provider documents

- Treat current provider documentation as adapter-owned and replaceable.
- Keep endpoint names, model parameters, queue behavior, and limitations out of `SKILL.md` core flow where practical.
- Version provider adapters independently from brand packages.

### `skill/templates/storyboard-viewer.html`

- Read a project-local resolved theme rather than hard-coded brand styles.
- Display package version, rule references, media provenance, evaluation, and adapter used.
- Keep approval state and interaction behavior in the viewer.

### Existing example

- Preserve the current narrative example as a regression fixture for unbranded story continuity.
- Add one new branded fixture only after the first real brand package exists.
- Do not copy that brand's source into the example; reference the package version used.

## 7. Adapter Contracts

All adapters expose a small common surface:

```json
{
  "id": "adapter.example",
  "version": "1.0.0",
  "capabilities": ["reference-image", "generated-still"],
  "acceptedInputs": ["shot-intent"],
  "producedOutputs": ["image"],
  "limits": {}
}
```

A provider adapter may implement fal.ai or another service. A renderer adapter may implement HyperFrames, Three.js, WebGL, or another renderer. These product names belong in adapter configuration only.

Adapters must not mutate the brand package. They may report that a requested capability cannot be satisfied, allowing the router to select another adapter or request human direction.

## 8. Runtime Project Record

Generation and approval records belong to the storyboard project, not the brand package. At minimum, each output records:

- project, scene, shot, and attempt IDs;
- brand package and schema versions;
- consumed rule, recipe, token, and media IDs;
- campaign/product/legal input versions;
- adapter ID and version;
- final compiled instruction hash;
- provider request metadata where applicable;
- output path and checksum;
- evaluation results;
- approval status and reviewer notes.

This provides reproducibility without contaminating permanent brand truth with workflow state.

## 9. Precedence and Conflicts

```text
External legal, rights, and product truth
  > required or prohibited brand rules
  > explicit campaign brief
  > preferred brand recipes
  > generic storyboard knowledge
  > adapter defaults
```

Conflict handling:

- Required conflicts stop before generation.
- A brief may override a preferred recipe, and the deviation is recorded.
- An adapter limitation never silently overrides a required rule.
- Missing optional brand guidance falls back to generic skill knowledge.
- Live product and legal inputs never get written back into the brand package automatically.

## 10. Implementation Stages

### Stage A: Contract-first fixture

- Implement the shared brand-package schemas and validator.
- Create a synthetic package with one optional imagery module.
- Define `brand-context` and `shot-intent` contracts in the skill.
- Prove that the loader selects relevant data without copying the entire package.

### Stage B: Refactor planning prompts

- Update decomposition and element extraction to emit IDs.
- Add neutral shot intents.
- Preserve continuity as project state.
- Add tests for precedence, missing modules, and rights gating.

### Stage C: Isolate adapters

- Wrap the current fal.ai flow as a provider adapter.
- Add a HyperFrames renderer adapter for deterministic motion-style shots.
- Keep spatial implementations behind a spatial renderer adapter.
- Confirm that adapters can be replaced without package edits.

### Stage D: Viewer and evaluation

- Inject a resolved theme into the existing viewer.
- Surface lineage, version, evaluation, and approval data.
- Add hard-gate and weighted-score handling.

### Stage E: First real brand integration

- Populate Backcountry or MotoSport under the neutral specification.
- Add only the modules supported by the research.
- Run one mixed-mode commercial storyboard.
- Audit visual fit, continuity, factuality, reference rights, and reproducibility.

## 11. Integration Acceptance Tests

- The same brand package loads in a storyboard tool and a non-storyboard consumer.
- No canonical brand file contains an adapter field or provider instruction.
- A missing optional module does not block unrelated outputs.
- A rights-blocked reference never reaches an external provider.
- A required-rule conflict stops before generation.
- Every output identifies the brand version and exact canonical IDs consumed.
- Replacing a provider changes only adapter configuration and generated project records.
- Replacing the motion renderer changes only its adapter.
- The viewer theme can change by loading another package without editing its template.
- The skill does not require a permanent `storyboard-profile.json` inside the brand.
- Brand evaluation and technical evaluation are reported separately.
- Project state never modifies the brand package.

## 12. Explicit Non-Goals for This Pass

- Do not rewrite the skill yet.
- Do not call providers or generate storyboards yet.
- Do not create provider credentials or production queues.
- Do not design the eventual end-user application.
- Do not populate Backcountry or MotoSport in this planning pass.

The next implementation pass begins with the shared specification and a synthetic fixture, followed by the first real brand package.
