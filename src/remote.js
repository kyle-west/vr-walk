import { make } from './util.js'

export function Remote ({ videos, color = 'blue',  ...rest }) {
  const group = make({
    type: 'entity',
    ...rest,
    'dynamic-body': '',
    hoverable: '', 
    draggable: '', 
    dropppable: '',
    grabbable: '',
    class: "throwable"
  })

  const body = make({
    type: 'box',
    depth: `0.1`,
    height: "0.02",
    width: "0.3",
    position: `0 0 0`,
    rotation: "0 0 0",
    color,
  })

  group.addEventListener('grab-start', (evt) => {
    window.activeMedia.video.play()
  })
  group.addEventListener('grab-end', (evt) => {
    window.activeMedia.video.pause()
  })

  group.appendChild(body)
  return group
}