import * as rc from 'rc9'

export const RC_FILENAME = '.nuxtrc'

export function setRC(dir: string, key: string, val: string | number | boolean) {
  const update = { [key]: val }

  rc.update(update, { name: RC_FILENAME, dir })
}
