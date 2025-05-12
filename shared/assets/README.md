# Assets

This folder contains assets related this project, like Amimation ,fonts and Images all are used across the project. The `index.ts` file aggregates all exports for easy imports in other parts of the project.

## Dependency Graph

```mermaid
graph TD;
    A[assets] --> B[src]
    B --> B1[Animation]
    B --> B2[Fonts]
    B --> B3[Images]
    B3--> B4[pngs]
    B3--> B5[svgs]

```
