import { make } from './util.js'
import { log } from './debug.js'

let order = 0;
export function Remote ({ videos, name = `remote${order++}`, color = 'blue',  ...rest }) {
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
    log('grab-start', evt.detail)
    log('grab-start', evt.detail.hand)
    group.setAttribute('color', 'cyan')
  })
  group.addEventListener('grab-end', (evt) => {
    log('grab-end', evt.detail)
    log('grab-end', evt.detail.hand)
    group.setAttribute('color', 'blue')
  })

  return group
}