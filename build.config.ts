import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  failOnWarn: false,
  rollup: {
    cjsBridge: false,
  },
  entries: [
    'src/cli',
  ],
})
