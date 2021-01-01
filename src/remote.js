import { make } from './util.js'

window.remotes = window.remotes || {}

export function Remote ({ name, color = 'black', btnColor = 'blue',  ...rest }) {
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
  
  remote.addEventListener('grab-start', (evt) => {
    const hand = evt.detail.hand.id
    window.remotes[name] = { active: true, hand }
    hand && window.controllers[hand].hideMesh()
  })
  remote.addEventListener('grab-end', (evt) => {
    const hand = evt.detail.hand.id
    window.remotes[name] = { active: false, hand }
    hand && window.controllers[hand].restoreMesh()
  })
  
  remote.appendChild(topBtn)
  return remote
}