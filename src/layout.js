import { make } from './util.js'
import { ImageAsset, getImageDimensions, onImageLoad } from './asset.js'
import { addToWorld } from './env.js'

const catImg = (topic = '') => ImageAsset(`https://cataas.com/cat${topic ? `/${topic}` : ''}?cache_bust=${Math.random()}`)

const catImages = [
  { url: catImg('cute'), text: 'cute cat 1' }, { url: catImg('cute'), text: 'cute cat 2' }, { url: catImg('cute'), text: 'cute cat 3' }, { url: catImg('cute'), text: 'cute cat 4' }, { url: catImg('cute'), text: 'cute cat 5' }, { url: catImg('cute'), text: 'cute cat 6' },{ url: catImg('cute'), text: 'cute cat 7' },{ url: catImg('cute'), text: 'cute cat 8' },{ url: catImg('cute'), text: 'cute cat 9' },{ url: catImg('cute'), text: 'cute cat 10' },
  { url: catImg(), text: 'Just a simple cat 1' }, { url: catImg(), text: 'Just a simple cat with a really long name and has overflowing text. We need to make sure that we have good handling for this.' }, { url: catImg(), text: 'Just a simple cat 3' }, { url: catImg(), text: 'Just a simple cat 4' }, { url: catImg(), text: 'Just a simple cat 4' },{ url: catImg(), text: 'Just a simple cat 4' },{ url: catImg(), text: 'Just a simple cat 4' },{ url: catImg(), text: 'Just a simple cat 4' },{ url: catImg(), text: 'Just a simple cat 4' },
]

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

function Light (props) {
  return make({ type: 'light', _type: "point", intensity: '0.075', ...props })
}

function Wall ({ images, ...rest }) {
  const group = make({ type: 'entity', ...rest })

  const wall = make({
    type: 'box',
    'static-body': '',
    depth: `${2 * images.length}`,
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
    group.appendChild(Light({ position: `-1.5 2.5 -${1 + 2 * idx}`, target: '#' + pic.id }))
  });

  group.appendChild(wall)
  return group
}


function generateWalls (images) {
  const h1 = [...images]
  const h2 = h1.splice(0, Math.floor(h1.length / 2))

  addToWorld(
    Wall({ images: h1, rotation: '0 90 0', position: '3 0 -3' }),
    Wall({ images: h2, rotation: '0 270 0', position: '-8 0 3' })
  )
}


generateWalls(catImages)