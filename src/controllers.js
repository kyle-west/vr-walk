import './vendor/aframe.js'
import './vendor/aframe-teleport-controls.js'
import { make } from './util.js'

const common = {
  type: 'entity',
  'teleport-controls': "cameraRig: #cameraRig; teleportOrigin: #head; startEvents: teleportstart; endEvents: teleportend; curveShootingSpeed: 10",
  'input-listen': '',
  'haptics': "events: triggerdown; dur: 50; force: 0.25",
  
  'static-body': "shape: sphere; sphereRadius: 0.005;",
  'sphere-collider': "objects: .throwable",
  grab: '',
  'super-hands': '',
}

const leftHand = () => make({
  ...common,
  id: 'leftController',
  'vive-controls': "hand: left",
  'oculus-touch-controls': "hand: left",
  'name': "left-hand",
})

const rightHand = () => make({
  ...common,
  id: 'rightController',
  'vive-controls': "hand: right",
  'oculus-touch-controls': "hand: right",
  'name': "right-hand",
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