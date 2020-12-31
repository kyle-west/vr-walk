import './vendor/aframe.js'
import './vendor/aframe-extras.js'
import './vendor/aframe-teleport-controls.js'
import './vendor/aframe-physics-system.js'

import { fetchImages, fetchVideos } from './mock-media-endpoint.js'
import scene, { MediaViewer } from './scene.js'

const viewer = new MediaViewer()
fetchImages().then(images => viewer.showImages(images))
fetchVideos().then(videos => viewer.showVideos(videos))

document.body.appendChild(scene)