import { make } from './util.js'
import { ImageAsset } from './asset.js'
import { addToWorld } from './env.js'

const catImg = (topic = 'cute') => ImageAsset(`https://cataas.com/cat/${topic}?cache_bust=${Math.random()}`)

const cuteCats = [
  { url: catImg('cute'), text: 'cute cat 1' }, { url: catImg('cute'), text: 'cute cat 2' }, { url: catImg('cute'), text: 'cute cat 3' }, { url: catImg('cute'), text: 'cute cat 4' }, { url: catImg('cute'), text: 'cute cat 5' }, { url: catImg('cute'), text: 'cute cat 5' },{ url: catImg('cute'), text: 'cute cat 5' },{ url: catImg('cute'), text: 'cute cat 5' },{ url: catImg('cute'), text: 'cute cat 5' },{ url: catImg('cute'), text: 'cute cat 5' },
]
const fatCats = [
  { url: catImg('fat'), text: 'fat cat 1' }, { url: catImg('fat'), text: 'fat cat 2' }, { url: catImg('fat'), text: 'fat cat 3' }, { url: catImg('fat'), text: 'fat cat 4' }, { url: catImg('fat'), text: 'fat cat 4' },{ url: catImg('fat'), text: 'fat cat 4' },{ url: catImg('fat'), text: 'fat cat 4' },{ url: catImg('fat'), text: 'fat cat 4' },{ url: catImg('fat'), text: 'fat cat 4' },
]

function Picture ({ text = 'untitled', url }, offset = 0) {
  const frame = make({ type: 'box', 
    depth: "1.5",
    height: "1.5",
    width: "0.01",
    position: `-0.13 1.5 -${1  + 2 * offset}`,
    src: url,
    // text
  })
  return frame
}

function Wall ({ name, images, ...rest }) {
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
  })

  images.forEach((img, idx) => {
    group.appendChild(Picture(img, idx))
  });

  group.appendChild(wall)
  return group
}

addToWorld(
  Wall({ name: 'Cute Cats', images: cuteCats, rotation: '0 90 0', position: '3 0 -3' }),
  Wall({ name: 'Fat Cats', images: fatCats, rotation: '0 270 0', position: '-8 0 3' })
)