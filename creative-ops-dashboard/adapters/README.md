# Production adapters

The canonical brand packages are provider-neutral. This directory converts their semantic tokens, rules, recipes, media selectors, and evaluation gates into tool-specific execution.

Each adapter must:

1. Load and validate the requested brand package.
2. Resolve only the capabilities required by the job.
3. Confirm the intended media use before any upload or render.
4. Keep user-editable variables separate from locked brand and product invariants.
5. Serialize the provider request without writing provider syntax back into the package.
6. Evaluate the output against the package and retain the package version plus consumed IDs.
7. Treat generated examples as internal references until separately approved.

Current demonstrations:

- `hyperframes/ONE-KINGS-LANE.md` — deterministic designed motion.
- `fal/ONE-KINGS-LANE.md` — image-to-video visual-plate generation.

