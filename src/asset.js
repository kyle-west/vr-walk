import { make, append } from './util.js'

export const assets = make({ type: 'assets' })

export function addAssets (...nodes) {
  return append(assets, ...nodes)
}

const images = {}
export function ImageAsset (name) {
  const img = images[name] || make({ type: 'img', src: `/assets/${name}`, id: name })
  if (!images[name]) {
    images[name] = img
    addAssets(img)
  }
  return '#' + img.id
}