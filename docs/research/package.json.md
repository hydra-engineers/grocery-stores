# package.json
this contains research on the package.json files within each wrapper

## main
- dist/index.js

## types
- dist/index.d.ts

## dependencies
> **Note**
> execute the following command to update all dependencies for each wrapper
>
> ```
> pnpm add axios date-fns && pnpm update *@latest
> ```

- axios (v1.2.3)
- date-fns (v2.29.3)

## devDependencies
> **Note**
> execute the following command to update all devDependencies for each wrapper
>
> ```
> pnpm add --save-dev @rollup/plugin-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser @types/jest @types/node @types/node-fetch dotenv rollup prettier jest ts-jest ts-node tslib typescript && pnpm update *@latest
> ```

- @rollup/plugin-typescript (v11.0.0)
- @typescript-eslint/eslint-plugin (v5.49.0)
- @typescript-eslint/parser (v5.49.0)
- @types/jest (v29.4.0)
- @types/node (v18.11.18)
- @types/node-fetch (v2.6.2)
- dotenv (v16.0.3)
- rollup (v3.10.1)
- prettier (v2.8.3)
- jest (v29.4.0)
- ts-jest (v28.0.5)
- ts-node (v10.9.1)
- tslib (v2.4.1)
- typescript (v4.9.4)

## Scripts
- "build":
    - "rollup --config rollup.config.ts --configPlugin typescript",
- "test":
    - "jest"
- "start":
    - "ts-node src/index.ts",   (coop, aldi)
    - "ts-node src/ah.ts",      (albert-heijn)
    - "ts-node src/plus.ts",    (plus)
    - "ts-node src/jumbo.ts",   (jumbo)
- "lint":
    - "eslint --ext .ts,.js .", (albert-heijn)
- "dev":
    - "ts-node src/test.ts",    (jumbo)