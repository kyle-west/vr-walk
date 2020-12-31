import { make } from './util.js'
import { log } from './debug.js'

window.remotes = window.remotes || {}

export function Remote ({ videos, name, color = 'magenta',  ...rest }) {
  const group = make({
    type: 'box',
    depth: `0.05`,
    height: "0.02",
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
    group.setAttribute('color', 'cyan')
    log('grab-start', window.remotes)
  })
  group.addEventListener('grab-end', (evt) => {
    window.remotes[name] = { active: false, hand: evt.detail.hand.id }
    group.setAttribute('color', 'blue')
    log('grab-end', window.remotes)
  })

  return group
}