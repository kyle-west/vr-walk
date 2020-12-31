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
    // X-button 
    this.el.addEventListener('xbuttondown', function (e) {
      this.emit('teleportstart');
    });
    this.el.addEventListener('xbuttonup', function (e) {
      this.emit('teleportend');
    });


    // Thumbstick
    this.el.addEventListener('thumbstickmoved', function (e) {
      if (evt.detail.y < -0.95) { console.log("UP"); 
        this.emit('teleportstart');
      }
      // if (evt.detail.y > 0.95) { console.log("DOWN"); }
      // if (evt.detail.x < -0.95) { console.log("LEFT"); }
      // if (evt.detail.x > 0.95) { console.log("RIGHT"); }
    });
    this.el.addEventListener('thumbstickup', function (e) {
      this.emit('teleportend');
    });


    // A-button Pressed 
    this.el.addEventListener('abuttondown', function (e) {
      this.emit('teleportstart');
    });
    this.el.addEventListener('abuttonup', function (e) {
      this.emit('teleportend');
    });


    // B-button 
    this.el.addEventListener('bbuttonup', function (e) {
      // if (window.rotateEnv) window.rotateEnv()
      window.activeMedia.video.togglePlay()
    });
    

    // Y-button 
    this.el.addEventListener('ybuttonup', function (e) {
      window.activeMedia.video.togglePlay()
    });
  }
});

export { leftHand, rightHand }