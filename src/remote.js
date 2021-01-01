import { make } from './util.js'
import { log } from './debug.js'

window.remotes = window.remotes || {}

export function Remote ({ name, color = 'black', btnColor = 'blue', actions = {}, ...rest }) {
  const config = {
    type: 'box',
    id: `remote_${name}`,
    depth: `0.08`,
    height: "0.02",
    width: "0.15",
    color,
    // 'dynamic-body': '',
    hoverable: '', 
    draggable: '', 
    dropppable: '',
    grabbable: '',
    class: "throwable",
    ...rest,
  }

  const remote = make(config)
  const playBtn1 = make({
    type: 'cylinder',
    radius: `0.01`,
    height: "0.01",
    position: '-0.02 0.0075 0',
    color: btnColor,
  })
  const playBtn2 = make({
    type: 'cylinder',
    radius: `0.01`,
    height: "0.01",
    position: '-0.05 0.0075 0',
    color: btnColor,
  })
  const thumbstickBottom = make({
    type: 'cone',
    'radius-top': 0,
    'radius-bottom': 0.015,
    height: 0.03,
    position: '0.03 0.0075 0',
    color: btnColor,
  })
  const thumbstickTop = make({
    type: 'cylinder',
    radius: `0.006`,
    height: "0.002",
    position: '0.03 0.023 0',
    color: btnColor,
  })
  
  const labelConfig = (value, extras = '') => `value: ${value}; baseline: center; align: center; font: exo2bold; ${extras}`
  const mainLabel = make({ 
    type: 'entity',
    text: labelConfig('Pick Up Remote'),
    position: '0.13 0.05 0',
    rotation: '-60 270 0',
  })
  const leftLabel = make({ 
    type: 'entity',
    text: labelConfig('Move thumbstick left or right to cycle through content', 'width: 0.2; wrapCount: 16;'),
    scale: '0.5 0.5 0.5',
    position: '0.035 0 -0.1',
    rotation: '-90 270 0',
  })
  const rightLabel = make({ 
    type: 'entity',
    text: labelConfig('Move thumbstick left or right to cycle through content', 'width: 0.2; wrapCount: 16;'),
    scale: '0.5 0.5 0.5',
    position: '0.035 0 0.1',
    rotation: '-90 270 0',
  })
  const bottomLabel = make({ 
    type: 'entity',
    text: labelConfig('Press either button on controller to play/pause', 'width: 0.2; wrapCount: 16;'),
    scale: '0.5 0.5 0.5',
    position: '-0.1 0 0',
    rotation: '-90 270 0',
  })
  
  const updateText = ({ main, left, right }) => {
    console.log({ main, left, right })
  }

  window.remotes[name] = { active: false, actions: { ...actions, updateText }, }

  remote.addEventListener('grab-start', (evt) => {
    const hand = evt.detail.hand.id
    window.remotes[name] = { active: true, hand, actions: { ...actions, updateText }, updateText }
    hand && window.controllers[hand].hideMesh()
  })
  remote.addEventListener('grab-end', (evt) => {
    const hand = evt.detail.hand.id
    const wasRecentlyActive = window.remotes[name].active
    window.remotes[name] = { active: false, hand, actions: { ...actions, updateText }, wasRecentlyActive }
    hand && window.controllers[hand].restoreMesh()

    setTimeout(() => window.remotes[name].wasRecentlyActive = false, 500)
  })

  remote.appendChild(playBtn1)
  remote.appendChild(playBtn2)
  remote.appendChild(thumbstickBottom)
  remote.appendChild(thumbstickTop)
  remote.appendChild(mainLabel)
  remote.appendChild(leftLabel)
  remote.appendChild(rightLabel)
  remote.appendChild(bottomLabel)
  return remote
}