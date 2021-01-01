import { debounce } from './util.js'
import { ImageWall } from './image-wall.js'
import { VideoViewer } from './video-viewer.js'
import { addToWorld } from './env.js'
import { Remote } from './remote.js'
import config from './config.js'

const imgThreshold = config.imgThreshold || 18

class Clipper {
  constructor (elem, visFn = () => false) {
    this.elem = elem
    this.pos = { x:0, y:0, z:0 }
    this.getVisible = visFn
    document.addEventListener('player:position', this.positionChanged.bind(this))
  }

  set visible (vis) {
    if (vis !== this._visible) {
      this._visible = vis
      this.elem.setAttribute('visible', this._visible)
    }
  }

  positionChanged ({detail: {x,y,z}}) {
    this.visible = this.getVisible({ x,y,z, elem: this.elem })
  }
}


export function generateImageWalls (images) {
  if (images.length < imgThreshold) {
    const lightIntensity = 0.075
    const h1 = [...images]
    const h2 = h1.splice(0, Math.floor(h1.length / 2))
    
    const east = ImageWall({ images: h1, rotation: '0 90 0', position: '3 0 -3', lightIntensity })
    const west = ImageWall({ images: h2, rotation: '0 270 0', position: '-8 0 3', lightIntensity })

    addToWorld(east, west)
  } else {
    const lightIntensity = images.length > 25 ? 0.05 : 0.075
    const h1 = [...images]
    const h2 = h1.splice(0, Math.floor(h1.length / 2))
    const h3 = h1.splice(0, Math.ceil(h1.length * 1 / 3))
    const h4 = h2.splice(0, Math.ceil(h2.length * 1 / 3))

    const east = ImageWall({ images: h1, rotation: '0 90 0', position: '3 0 -3', lightIntensity })
    const west = ImageWall({ images: h2, rotation: '0 270 0', position: '-8 0 3', lightIntensity })
    const south = ImageWall({ images: h3, rotation: '0 180 0', position: `3.13 0 -${h3.length * 2 + 3.13}`, lightIntensity })
    const north = ImageWall({ images: h4, rotation: '0 0 0', position: `-8.13 0 ${h4.length * 2 + 3.13}`, lightIntensity })
  
    // new Clipper(south, ({ x }) => x >= 3)
    // new Clipper(north, ({ x }) => x <= -8)

    addToWorld(north, south, east, west)
  }
}

export function generateVideoViewer (videos) {
  addToWorld(
    VideoViewer({ videos, position: '12 0 -2'}), 
    Remote({
      name: 'video', 
      position: '6 1 -2',
      // position: '0 1.3 -0.5',
      actions: {
        next: debounce(() => {
          if (window.activeMedia && window.activeMedia.video) {
            const { getNext, select, play, getQueueText } = window.activeMedia.video
            select(getNext())
            window.remotes.video.actions.updateText(getQueueText(), true)
            play()
          }
        }), 
        previous: debounce(() => {
          if (window.activeMedia && window.activeMedia.video) {
            const { getPrev, select, play, getQueueText } = window.activeMedia.video
            select(getPrev())
            window.remotes.video.actions.updateText(getQueueText(), true)
            play()
          }
        }) 
      }
    })
  )
}