import { make, append } from './util.js'

export const assets = make({ type: 'assets' })

export function addAssets (...nodes) {
  return append(assets, ...nodes)
}

const images = {}
export function ImageAsset (name = '') {
  const external = name.startsWith('http')
  const url = external ? name : `./assets/${name}`
  const config = { type: 'img', src: url, id: name }
  if (external) {
    config.crossorigin = 'anonymous'
  }
  const img = images[name] || make(config)
  if (!images[name]) {
    images[name] = img
    addAssets(img)
  }
  return '#' + img.id
}

export const getImageDimensions = (name, { fixedWidth }) => {
  const url = name.replace('#', '')
  let { width, height } = images[url] || {}
  if (fixedWidth && (width || height)) {
    height = (fixedWidth / width) * height
    width = fixedWidth
  }
  return [width, height]
}

export const onImageLoad = (name, cb) => {
  const url = name.replace('#', '')
  const img = images[url];
  img.addEventListener('load', cb, { once : true })
}