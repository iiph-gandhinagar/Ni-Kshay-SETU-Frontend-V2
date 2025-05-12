# Constants Folder

This folder contains constant values, configuration settings, and enums used across the project. The `index.ts` file aggregates all exports for easy imports in other parts of the project.

## Dependency Graph

```mermaid
graph TD;
    A[constants] --> B[lib]

    B --> B1[colorCode.ts]
    B --> B2[constants.ts]
    B --> B3[enums.ts]
    B --> B4[formikValidation.ts]
    B --> B5[globalConfig.ts]
    B --> B6[reactNativeNavigationConfig.ts]
    B --> B7[reactNativeStyles.ts]
    B --> B8[urls.ts]
```
