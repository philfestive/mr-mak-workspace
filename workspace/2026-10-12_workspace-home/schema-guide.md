# Index and schema preparation

The project's source index and schema files own their definitions. This guide
lists what to resolve before building, without inventing a game's data model.

## Source index

Link the GDD, accepted amendments, schemas, inputs, implementation, task board
and evidence. Keep original external projects in their existing homes.
[Projects](#/team-hub/1) is the workspace directory; it is not a copied GDD.

## Each schema needs

- Entity names, stable IDs and field types.
- Required/optional values, defaults, enums and constraints.
- Relationships, ownership and lifecycle.
- Versioning and migration expectations.
- Validation rules and valid/invalid examples.
- The GDD requirement each contract supports.

Resolve contradictory or missing rules through [Questions](#/team-hub/8).
Keep future possibilities separate from the accepted scope. The
[output standard](#/workspace-organization/5) owns the design/evidence distinction.
