import { make } from './util.js'
import { SoundAsset } from './asset.js'

window.activeMedia = window.activeMedia || {}

export function Radio ({ sounds, color = 'brown', ...rest }) {
  const group = make({ type: 'entity', ...rest })

  const box = make({
    type: 'box',
    'static-body': '',
    depth: `0.5`,
    height: "1",
    width: "0.3",
    position: `0 0.5 0`,
    rotation: "0 0 0",
    color,
  })
  const boxAccent = make({
    type: 'box',
    'static-body': '',
    depth: `0.45`,
    height: "0.95",
    width: "0.3",
    position: `-0.01 0.5 0`,
    rotation: "0 0 0",
    color: 'black',
  })


  const top = make({
    type: 'cylinder',
    'static-body': '',
    radius: 0.25,
    height: 0.25,
    position: `0 1 0`,
    rotation: "-90 90 0",
    color,
  })
  const topAccent = make({
    type: 'cylinder',
    'static-body': '',
    radius: 0.23,
    height: 0.2,
    position: `-0.03 1 0`,
    rotation: "-90 90 0",
    color: 'black',
  })
  const topAccent2 = make({
    type: 'cylinder',
    'static-body': '',
    radius: 0.21,
    height: 0.2,
    position: `-0.04 1 0`,
    rotation: "-90 90 0",
    color: 'grey',
  })

  window.activeMedia.radio = {
    select: (sound) => {
      window.activeMedia.radio.pause()

      const audioElem = SoundAsset(sound.src, {}, false)
      window.activeMedia.radio.data = sound
      window.activeMedia.radio.srcId = '#' + audioElem.id

      window.activeMedia.radio.controlElem = audioElem

      return new Promise(res => {
        if (audioElem.hasLoadedBefore) {
          res(audioElem)
        } else {
          audioElem.addEventListener('loadeddata', () => {
            audioElem.hasLoadedBefore = true
            res(audioElem)
          }, {once: true})
        }
      })
    },
    getNext: () => {
      const { data } = window.activeMedia.radio
      let idx = sounds.findIndex(aud => aud === data)
      if (idx >= sounds.length - 1) idx = -1
      return sounds[idx + 1]
    },
    getPrev: () => {
      const { data } = window.activeMedia.radio
      let idx = sounds.findIndex(aud => aud === data)
      if (idx - 1 < 0) idx = sounds.length
      return sounds[idx - 1]
    },
    getQueueText: () => {
      let main, left, right;
      // TODO: this does not correctly handle empty sounds array
      main = window.activeMedia.radio.data && window.activeMedia.radio.data.title
      left = window.activeMedia.radio.getPrev().title
      right = window.activeMedia.radio.getNext().title
      return { main, left, right }
    },
    play: () => {
      const ctrl = window.activeMedia.radio.controlElem
      if (ctrl) {
        ctrl.play()
        window.activeMedia.radio.isPlaying = true
      }
    },
    pause: () => {
      const ctrl = window.activeMedia.radio.controlElem
      if (ctrl) {
        ctrl.pause()
        window.activeMedia.radio.isPlaying = false
      }
    },
    togglePlay: () => {
      if (window.activeMedia.radio.isPlaying) {
        window.activeMedia.radio.pause()
      } else {
        window.activeMedia.radio.play()
      }
    },
  }

  group.appendChild(box)
  group.appendChild(boxAccent)
  group.appendChild(top)
  group.appendChild(topAccent)
  group.appendChild(topAccent2)
  return group
}