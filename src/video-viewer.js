import { make } from './util.js'
import { VideoAsset, getVideoDimensions, onVideoLoad } from './asset.js'

window.activeMedia = window.activeMedia || {}

export function VideoViewer ({ videos, lightIntensity,  ...rest }) {
  const group = make({ type: 'entity', ...rest })

  const wall = make({
    type: 'box',
    'static-body': '',
    depth: `8.2`,
    height: "9.4",
    width: "1",
    position: `0 0 0`,
    rotation: "0 0 0",
    color: 'grey',
  })

  const videoScreen = make({
    type: 'a-video',
    'static-body': '',
    height: "4.5",
    width: "8",
    position: `-0.51 2.35 0`,
    rotation: "0 270 0",
    color: 'white',
  })

  window.activeMedia.video = {
    select: (video) => {
      window.activeMedia.video.pause()

      const vidElem = VideoAsset(video.src, {}, false)
      window.activeMedia.video.data = video
      window.activeMedia.video.srcId = '#' + vidElem.id
      videoScreen.setAttribute('src', window.activeMedia.video.srcId)

      window.activeMedia.video.controlElem = vidElem
    },
    play: () => {
      const ctrl = window.activeMedia.video.controlElem
      if (ctrl) {
        ctrl.play()
        window.activeMedia.video.isPlaying = true
      }
    },
    pause: () => {
      const ctrl = window.activeMedia.video.controlElem
      if (ctrl) {
        ctrl.pause()
        window.activeMedia.video.isPlaying = false
      }
    },
    togglePlay: () => {
      if (window.activeMedia.video.isPlaying) {
        window.activeMedia.video.pause()
      } else {
        window.activeMedia.video.play()
      }
    },
  }

  // Test this out
  window.activeMedia.video.select(window._videos[0])

  group.appendChild(wall)
  group.appendChild(videoScreen)
  return group
}