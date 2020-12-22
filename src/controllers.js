import { make } from './util.js'

const leftHand = make({
  type: 'entity',
  id: 'leftController',

  'static-body': "shape: sphere; sphereRadius: 0.005;",
  'vive-controls': "hand: left",
  'oculus-touch-controls': "hand: left",
  'sphere-collider': "objects: .throwable",
  'name': "left-hand",
  'haptics': "events: triggerdown; dur: 50; force: 0.25",
  // 'teleport-controls': "cameraRig: #cameraRig; teleportOrigin: #head;",

  grab: '',
  'super-hands': '',
})

const rightHand = make({
  type: 'entity',
  id: 'rightController',

  'static-body': "shape: sphere; sphereRadius: 0.005;",
  'vive-controls': "hand: right",
  'oculus-touch-controls': "hand: right",
  'sphere-collider': "objects: .throwable",
  'name': "right-hand",
  'haptics': "events: triggerdown; dur: 50; force: 0.25",
  // 'teleport-controls': "cameraRig: #cameraRig; teleportOrigin: #head;",

  grab: '',
  'super-hands': '',
})

export { leftHand, rightHand }