import { make, append } from './util.js'

const world = make({ type: 'entity', id: 'world' })

const sky = make({
  type: 'sky',
  height:"2048",
  radius:"100",
  'theta-length':"90",
  width:"2048",

  position:"0 0 0",
  rotation:"0 0 0",
  
  color: 'cyan',
  // src:"#sky",
  // repeat: "5 5",
})

const ground = make({
  type: 'plane',
  'static-body': '',
  width: '60',
  height: '60',

  position:"0 0 0",
  rotation:"-90 0 0",
  
  color: 'grey',
})

const totem = make({
  type: 'cylinder',
  'dynamic-body': '',
  
  radius: "0.25",
  height: "0.5",

  position:"1 1 1",
  rotation:"-90 0 0",
  
  color: 'red',
})

export function addToWorld (...nodes) {
  return append(world, ...nodes)
}

addToWorld(ground, sky, totem)

export default world