import { make } from './util.js'

export function Remote ({ videos, color = 'red',  ...rest }) {
  const group = make({
    type: 'box',
    depth: `0.1`,
    height: "0.02",
    width: "0.3",
    color,
    ...rest,
    'dynamic-body': '',
    hoverable: '', 
    draggable: '', 
    dropppable: '',
    grabbable: '',
    class: "throwable"
  })

  group.addEventListener('grab-start', (evt) => {
    window.activeMedia.video.play()
  })
  group.addEventListener('grab-end', (evt) => {
    window.activeMedia.video.pause()
  })

  return group
}