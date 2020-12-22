import './vendor/aframe.js'
import './vendor/aframe-teleport-controls.js'
import { make } from './util.js'

const leftHand = () => make({
  type: 'entity',
  id: 'leftController',

  'static-body': "shape: sphere; sphereRadius: 0.005;",
  'vive-controls': "hand: left",
  'oculus-touch-controls': "hand: left",
  'sphere-collider': "objects: .throwable",
  'name': "left-hand",
  'haptics': "events: triggerdown; dur: 50; force: 0.25",
  'teleport-controls': "cameraRig: #cameraRig; teleportOrigin: #head; startEvents: teleportstart; endEvents: teleportend",
  'input-listen': '',

  grab: '',
  'super-hands': '',
})

const rightHand = () => make({
  type: 'entity',
  id: 'rightController',

  'static-body': "shape: sphere; sphereRadius: 0.005;",
  'vive-controls': "hand: right",
  'oculus-touch-controls': "hand: right",
  'sphere-collider': "objects: .throwable",
  'name': "right-hand",
  'haptics': "events: triggerdown; dur: 50; force: 0.25",
  'teleport-controls': "cameraRig: #cameraRig; teleportOrigin: #head; startEvents: teleportstart; endEvents: teleportend",
  'input-listen': '',

  grab: '',
  'super-hands': '',
})

AFRAME.registerComponent('input-listen', {
  init: function () {
    //X-button Pressed 
    this.el.addEventListener('xbuttondown', function (e) {
      this.emit('teleportstart');
    });

    //X-button Released 
    this.el.addEventListener('xbuttonup', function (e) {
      this.emit('teleportend');
    });

    //A-button Pressed 
    this.el.addEventListener('abuttondown', function (e) {
      this.emit('teleportstart');
    });

    //A-button Released 
    this.el.addEventListener('abuttonup', function (e) {
      this.emit('teleportend');
    });
  }
});

export { leftHand, rightHand }