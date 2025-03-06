# Nuxt Maintenizr

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

> Maintenance module for [Nuxt.js](https://nuxt.com/)

- [Release Notes](https://github.com/roncallyt/nuxt-maintenizr/releases)
- [Documentation](https://nuxt-maintenizr.t7n.dev)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-maintenizr?file=playground%2Fapp.vue) -->

## Features

<!-- Highlight some of the features your module provide here -->
- Nuxt 3 ready
- Typescript support
- Override default maintenance page
- CLI to manage maintenance status of application

## Quick Setup

1. Add `nuxt-maintenizr` dependency to your project:

```bash
npx nuxi module add nuxt-maintenizr
```

2. Add `nuxt-maintenizr` to the `modules` section of `nuxt.config.ts`:

```js
export default defineNuxtConfig({
  modules: ['nuxt-maintenizr'],
});
```
That's it! You can now use a beautiful and modern maintenance mode in your Nuxt app ✨

## How to use

1. Show current status of the application:

```bash
npx nuxt-maintenizr status 
```

2. Enable maintenance mode (Turn off the application):

```bash
npx nuxt-maintenizr down
```

3. Disable maintenance mode (Turn on the application):

```bash
npx nuxt-maintenizr up
```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

## Support

Hi, I am Thomerson Roncally, a Fullstack Developer that love to build things to help other developers. If you like my work and want to support me, you can donate here:

[![ko-fi](https://www.ko-fi.com/img/donate_sm.png)](https://ko-fi.com/roncallyt)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-maintenizr/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-maintenizr

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-maintenizr.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-maintenizr

[license-src]: https://img.shields.io/npm/l/nuxt-maintenizr.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-maintenizr

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
