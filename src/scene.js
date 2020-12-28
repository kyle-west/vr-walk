import { make, append } from './util.js'
import { assets } from './asset.js'
import { leftHand, rightHand } from './controllers.js'
import environment from './env.js'
import { generateImageWalls } from './layout.js'

// Fire DOM event when camera position changes
(() => {
  let x,y,z;

  AFRAME.registerComponent('camera-listener', {
    tick: function () {
      const cameraEl = this.el.sceneEl.camera.el;
      const { x:dx, y:dy, z:dz } = cameraEl.getAttribute('position');
      
      if (x !== dx || y !== dy || z !== dz) {
        x = dx; y = dy; z = dz;
        document.dispatchEvent(new CustomEvent('player:position', { detail: { x,y,z }}))
      }
    }
  });
})()


const scene = make({ type: 'scene' })
const cameraRig = make({ id: 'cameraRig', type: 'entity' })

export function addToScene (...nodes) {
  return append(scene, ...nodes)
}

addToScene(assets, environment, cameraRig)

const camera = make({ id: 'head', type: 'entity', position: "0 1.5 0", camera: '', 'wasd-controls': '', 'look-controls': '', 'camera-listener': '' })
append(cameraRig, camera, leftHand(), rightHand())

export class MediaViewer {
  showImages(images = []) {
    images && generateImageWalls(images)
  }
}

export default scene
