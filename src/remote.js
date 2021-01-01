import { make } from './util.js'
import { log } from './debug.js'

window.remotes = window.remotes || {}

export function Remote ({ name, color = 'red', btnColor = 'blue', actions, ...rest }) {
  const config = {
    type: 'box',
    id: `remote_${name}`,
    depth: `0.08`,
    height: "0.02",
    width: "0.15",
    color,
    'dynamic-body': '',
    hoverable: '', 
    draggable: '', 
    dropppable: '',
    grabbable: '',
    class: "throwable",
    ...rest,
  }

  const remote = make(config)
  const topBtn = make({
    type: 'cylinder',
    radius: `0.01`,
    height: "0.01",
    position: '0 0.0075 0',
    color: btnColor,
  })
  
  window.remotes[name] = { active: false, actions }

  remote.addEventListener('grab-start', (evt) => {
    const hand = evt.detail.hand.id
    window.remotes[name] = { active: true, hand, actions }
    hand && window.controllers[hand].hideMesh()
    log(`<${name}>::grab-start[${hand}] active=false`)
  })
  remote.addEventListener('grab-end', (evt) => {
    const hand = evt.detail.hand.id
    window.remotes[name] = { active: false, hand, actions }
    hand && window.controllers[hand].restoreMesh()
    log(`<${name}>::grab-end[${hand}] active=false`)
  })
  
  remote.appendChild(topBtn)
  return remote
}