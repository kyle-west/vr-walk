import { make } from './util.js'
import { ImageAsset, getImageDimensions, onImageLoad } from './asset.js'

let order = 0;
function Picture ({ text = 'untitled', url }, offset = 0) {
  const frame = make({ type: 'box', 
    depth: "1.5",
    height: "1.5",
    width: "0.01",
    position: `-0.13 1.5 -${1  + 2 * offset}`,
    src: url,
    id: `frame${order++}`,
  })

  const labelConfig = value => `value: ${value}; baseline: center; align: center; font: exo2bold;`
  const label = make({ 
    type: 'entity',
    text: labelConfig('(Loading...)\n' + text),
    scale: '2 2 2',
    position: '0 1.25 0',
    rotation: '0 -90 0',
  })

  onImageLoad(url, () => {
    const [ width, height ] = getImageDimensions(url, { fixedWidth: 1.5, maxHeight: 2 })
    frame.setAttribute('depth', width)
    frame.setAttribute('height', height)
    label.setAttribute('text', labelConfig(text))
  })
  
  frame.appendChild(label)
  
  return frame
}

function Light ({ lightIntensity = 0.075, ...props }) {
  return make({ type: 'light', _type: "point", intensity: lightIntensity, ...props })
}

export function ImageWall ({ images, lightIntensity,  ...rest }) {
  const group = make({ type: 'entity', ...rest })

  const wall = make({
    type: 'box',
    'static-body': '',
    depth: `${2 * images.length + 0.5}`,
    height: "6",
    width: "0.25",
    position: `0 0 -${images.length}`,
    rotation: "0 0 0",
    color: 'grey',
    src: ImageAsset('concrete.jpg')
  })

  images.forEach((img, idx) => {
    const pic = Picture(img, idx)
    group.appendChild(pic)
    group.appendChild(Light({ position: `-1.5 2.5 -${1 + 2 * idx}`, target: '#' + pic.id, lightIntensity }))
  });

  group.appendChild(wall)
  return group
}