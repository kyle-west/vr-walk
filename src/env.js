import './vendor/aframe-environment.js'
import { make, append } from './util.js'
// import * as textures from './textures.js'

const world = make({ type: 'entity', id: 'world', environment: 'preset: forest' });

const envPresets = ['default', 'contact', 'egypt', 'checkerboard', 'forest', 'goaland', 'yavapai', 'goldmine', 'threetowers', 'poison', 'arches', 'tron', 'japan', 'dream', 'volcano', 'starry', 'osiris'];
const setEnv = (env) => {
  world.setAttribute('environment', `preset: ${env}`)
}
const rotateEnv = () => {
  const current = document.querySelector('#world').components.environment.data.preset;
  if (current) {
    let idx = envPresets.findIndex(x => x === current) + 1;
    if (idx >= envPresets.length) idx = 0;
    return setEnv(envPresets[idx])
  }
}

window.setEnv = setEnv;
window.rotateEnv = rotateEnv;

// const sky = make({
//   type: 'sky',
//   height:"2048",
//   radius:"100",
//   'theta-length':"90",
//   width:"2048",

//   position:"0 0 0",
//   rotation:"0 0 0",
  
//   color: 'limegreen',
//   src: textures.grid.light,
//   repeat: "15 5",
// })

// const ground = make({
//   type: 'plane',
//   'static-body': '',
//   width: '60',
//   height: '60',

//   position:"0 0 0",
//   rotation:"-90 0 0",
  
//   src: textures.grid.dark,
//   material: "repeat: 120 120",
// })

export function addToWorld (...nodes) {
  return append(world, ...nodes)
}

// addToWorld(ground, sky)

export default world