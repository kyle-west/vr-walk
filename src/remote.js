import { make } from './util.js'

window.remotes = window.remotes || {}

export function Remote ({ videos, name, color = 'red',  ...rest }) {
  const group = make({
    type: 'box',
    depth: `0.07`,
    height: "0.04",
    width: "0.1",
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
    window.remotes[name] = { active: true, hand: evt.detail.hand.id }
  })
  group.addEventListener('grab-end', (evt) => {
    window.remotes[name] = { active: false, hand: evt.detail.hand.id }
  })

  return group
}