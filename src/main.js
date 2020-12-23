import './vendor/aframe.js'
import './vendor/aframe-extras.js'
import './vendor/aframe-teleport-controls.js'

import { fetchImages } from './mock-media-endpoint.js'
import scene, { MediaViewer } from './scene.js'

const viewer = new MediaViewer()
fetchImages().then(images => viewer.showImages(images))

document.body.appendChild(scene)