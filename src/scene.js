import { make, append } from './util.js'
import { assets } from './asset.js'
import { leftHand, rightHand } from './controllers.js'
import environment from './env.js'

const scene = make({ type: 'scene' })

const cameraRig = make({ id: 'cameraRig', type: 'entity' })
const camera = make({ id: 'head', type: 'entity', position: "0 1 0", camera: '', 'wasd-controls': '', 'look-controls': '' })
append(cameraRig, camera, leftHand, rightHand)

export function addToScene (...nodes) {
  return append(scene, ...nodes)
}

addToScene(assets, environment, cameraRig)

export default scene
