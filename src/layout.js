import { ImageWall } from './image-wall.js'
import { addToWorld } from './env.js'

export function generateImageWalls (images) {
  if (images.length < 18) {
    const lightIntensity = 0.075
    const h1 = [...images]
    const h2 = h1.splice(0, Math.floor(h1.length / 2))
    
    addToWorld(
      ImageWall({ images: h1, rotation: '0 90 0', position: '3 0 -3', lightIntensity }),
      ImageWall({ images: h2, rotation: '0 270 0', position: '-8 0 3', lightIntensity })
      )
  } else {
    const lightIntensity = images.length > 25 ? 0.05 : 0.075
    const h1 = [...images]
    const h2 = h1.splice(0, Math.floor(h1.length / 2))
    const h3 = h1.splice(0, Math.ceil(h1.length * 1 / 3))
    const h4 = h2.splice(0, Math.ceil(h2.length * 1 / 3))
  
    addToWorld(
      ImageWall({ images: h1, rotation: '0 90 0', position: '3 0 -3', lightIntensity }),
      ImageWall({ images: h2, rotation: '0 270 0', position: '-8 0 3', lightIntensity }),

      ImageWall({ images: h3, rotation: '0 180 0', position: `3.13 0 -${h3.length * 2 + 3.13}`, lightIntensity }),
      ImageWall({ images: h4, rotation: '0 0 0', position: `-8.13 0 ${h4.length * 2 + 3.13}`, lightIntensity }),
    )
  }
}
