# Types Folder

This folder contains TypeScript type definitions used across the project. The `index.ts` file aggregates all type exports for easy imports in other parts of the project.

## Dependency Graph

```mermaid
graph TD;
    A[types] --> B[assets]
    A --> C[redux]
    A --> D[rootStack]
    A --> E[screens]
    A --> F[themeAndAppConfig]

    B --> B1[CardsTypes.ts]
    B --> B2[InputFieldTypes.ts]

    C --> C1[ActionTypes.ts]
    C --> C2[ReducerTypes.ts]
    C --> C3[SagaTypes.ts]

    D --> D1[RouteStackTypes.ts]

    E --> E4[OnBoardingScreenTypes.ts]


    F --> F1[ColorThemeTypes.ts]
```
