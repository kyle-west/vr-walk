import { make, append } from './util.js'

export const assets = make({ type: 'assets' })

export function addAssets (...nodes) {
  return append(assets, ...nodes)
}
