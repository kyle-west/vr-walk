import './vendor/aframe.js'
import './vendor/aframe-extras.js'
import './vendor/aframe-teleport-controls.js'
import './vendor/aframe-physics-system.js'

import { renderLogger } from './debug.js'
import { fetchImages, fetchVideos, fetchRecordings } from './mock-media-endpoint.js'
import scene, { MediaViewer } from './scene.js'

const viewer = new MediaViewer()
fetchImages().then(images => viewer.showImages(images))
fetchVideos().then(videos => viewer.showVideos(videos))
fetchRecordings().then(sounds => viewer.showSounds(sounds))

document.body.appendChild(scene)
renderLogger()