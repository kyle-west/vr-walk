import { make } from './util.js'
import { log } from './debug.js'

window.remotes = window.remotes || {}

export function Remote ({ videos, name, color = 'red',  ...rest }) {
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
    log('grab-start', evt.detail.hand.id)
    window.remotes[name] = { active: true }
    group.setAttribute('color', 'cyan')
  })
  group.addEventListener('grab-end', (evt) => {
    log('grab-end', evt.detail.hand.id)
    window.remotes[name] = { active: false }
    group.setAttribute('color', 'blue')
  })

  return group
}