# Global Api Wrapper
This repo contains all the api wrappers migrated into one.

## Api Wrappers Migration
This section contains information about api wrappers for different stores.

### (dev)Dependencies
- dependencies
  - axios
  - date-fns
- dev dependencies
  - @rollup/plugin-typescript
  - @typescript-eslint/eslint-plugin
  - @typescript-eslint/parser
  - @types/jest
  - @types/node
  - @types/node-fetch
  - dotenv
  - rollup
  - prettier
  - jest
  - ts-jest
  - ts-node
  - tslib
  - typescript

> **note**
> execute the following command to update all dependencies for each wrapper
> `pnpm add axios date-fns && pnpm add --save-dev @rollup/plugin-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser @types/jest @types/node @types/node-fetch dotenv rollup prettier jest ts-jest ts-node tslib typescript && pnpm update *@latest`

### Scripts
- "build": "rollup --config rollup.config.ts --configPlugin typescript", (all)
- "start": "ts-node src/index.ts", (coop, aldi)
- "start": "ts-node src/ah.ts", (albert-heijn)
- "start": "ts-node src/plus.ts", (plus)
- "start": "ts-node src/jumbo.ts", (jumbo)
- "lint": "eslint --ext .ts,.js .", (albert-heijn)
- "dev": "ts-node src/test.ts", (jumbo)
- "test": "jest" (all)