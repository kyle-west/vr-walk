import { make } from './util.js'
import { log } from './debug.js'

window.remotes = window.remotes || {}

export function Remote ({ name, color = 'white',  ...rest }) {
  const config = {
    type: 'box',
    id: `remote_${name}`,
    depth: `0.08`,
    height: "0.02",
    width: "0.15",
    color,
    ...rest,
    'dynamic-body': '',
    hoverable: '', 
    draggable: '', 
    dropppable: '',
    grabbable: '',
    class: "throwable"
  }

  const remote = make(config)

  remote.addEventListener('grab-start', (evt) => {
    const hand = evt.detail.hand.id
    window.remotes[name] = { active: true, hand }
    hand && window.controllers[hand].replaceMesh()
    log(`${hand}::replaceMesh() called`)
  })
  remote.addEventListener('grab-end', (evt) => {
    const hand = evt.detail.hand.id
    window.remotes[name] = { active: false, hand }
    hand && window.controllers[hand].restoreMesh()
    // hand && window.controllers[hand].restoreMesh(make(config))
    log(`${hand}::restoreMesh() called`)
  })


  return remote
}