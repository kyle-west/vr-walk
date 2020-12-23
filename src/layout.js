import { ImageWall } from './image-wall.js'
import { addToWorld } from './env.js'

export function generateImageWalls (images) {
  const h1 = [...images]
  const h2 = h1.splice(0, Math.floor(h1.length / 2))

  addToWorld(
    ImageWall({ images: h1, rotation: '0 90 0', position: '3 0 -3' }),
    ImageWall({ images: h2, rotation: '0 270 0', position: '-8 0 3' })
  )
}
