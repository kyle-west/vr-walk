import { make, append } from './util.js'

export const assets = make({ type: 'assets' })

export function addAssets (...nodes) {
  return append(assets, ...nodes)
}

function makeAssetLoader(tagname, srcKey = 'src') {
  const items = {}

  function Asset (name = '', props = {}, returnID = true) {
    const external = name.startsWith('http')
    const url = external ? name : `./assets/${name}`
    const config = { ...props, type: tagname, [srcKey]: url, id: name }
    if (external) {
      config.crossorigin = 'anonymous'
    }
    const item = items[name] || make(config)
    if (!items[name]) {
      items[name] = item
      addAssets(item)
    }
    return returnID ? '#' + item.id: item
  }

  const getDimensions = (name, { fixedWidth, maxHeight }) => {
    const url = name.replace('#', '')
    let { width, height } = items[url] || {}
    if (fixedWidth && (width || height)) {
      const newHeight = (fixedWidth / width) * height
      if (maxHeight && maxHeight < newHeight) {
        width = (maxHeight / height) * width
        height = maxHeight
      } else {
        height = newHeight
        width = fixedWidth
      }
    }
    return [width, height]
  }

  const onLoad = (name, cb) => {
    const url = name.replace('#', '')
    const item = items[url];
    item.addEventListener('load', cb, { once : true })
  }

  return { items, Asset, getDimensions, onLoad }
}


const { Asset: ImageAsset, onLoad: onImageLoad, getDimensions: getImageDimensions } = makeAssetLoader('img')
export { ImageAsset, onImageLoad, getImageDimensions }

const { Asset: VideoAsset, onLoad: onVideoLoad, getDimensions: getVideoDimensions } = makeAssetLoader('video')
export { VideoAsset, onVideoLoad, getVideoDimensions }