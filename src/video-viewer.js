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
      return new Promise(res => {
        if (vidElem.hasLoadedBefore) {
          res(vidElem)
        } else {
          vidElem.addEventListener('loadeddata', () => {
            vidElem.hasLoadedBefore = true
            res(vidElem)
          }, {once: true})
        }
      })
    },
    getNext: () => {
      const { data } = window.activeMedia.video
      let idx = videos.findIndex(vid => vid === data)
      if (idx >= videos.length - 1) idx = -1
      return videos[idx + 1]
    },
    getPrev: () => {
      const { data } = window.activeMedia.video
      let idx = videos.findIndex(vid => vid === data)
      if (idx - 1 < 0) idx = videos.length
      return videos[idx - 1]
    },
    getQueueText: () => {
      let main, left, right;
      // TODO: this does not correctly handle empty videos array
      main = window.activeMedia.video.data && window.activeMedia.video.data.title
      left = window.activeMedia.video.getPrev().title
      right = window.activeMedia.video.getNext().title
      return { main, left, right }
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

  group.appendChild(wall)
  group.appendChild(videoScreen)
  return group
}