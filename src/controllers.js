import './vendor/aframe.js'
import './vendor/aframe-teleport-controls.js'
import './vendor/super-hands.js'
import { make } from './util.js'


// ==================================================================================

window.controllers = window.controllers || {}

function Wrapper(hand, side) {
  let substituteMesh
  const clearMesh = () => substituteMesh && hand.contains(substituteMesh) && hand.removeChild(substituteMesh)

  return {
    hand,
    id: hand.id,
    restoreMesh: () => {
      clearMesh()
      const config = {
        hand: side,
        model: true
      }
      hand.setAttribute('vive-controls', config);
      hand.setAttribute('oculus-touch-controls', config);
    },
    replaceMesh: (newMesh) => {
      const config = {
        hand: side,
        model: false
      }
      clearMesh()
      substituteMesh = newMesh
      hand.setAttribute('vive-controls', config);
      hand.setAttribute('oculus-touch-controls', config);
    },
  }
}

// ==================================================================================

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

const leftHand = () => {
  const hand = make({
    ...common,
    id: 'leftController',
    'vive-controls': "hand: left",
    'oculus-touch-controls': "hand: left",
    'name': "left-hand",
  })
  window.controllers.leftController = Wrapper(hand, 'left')
  return hand
}

const rightHand = () => {
  const hand = make({
    ...common,
    id: 'rightController',
    'vive-controls': "hand: right",
    'oculus-touch-controls': "hand: right",
    'name': "right-hand",
  })
  window.controllers.rightController = Wrapper(hand, 'right')
  return hand
}

// ==================================================================================

function holdingRemote(remoteName, controller) {
  let beingHeld = window.remotes && window.remotes[remoteName] && window.remotes[remoteName].active
  if (beingHeld && controller) {
    beingHeld &&= (window.remotes[remoteName].hand === controller)
  }
  return beingHeld
}

// ==================================================================================

AFRAME.registerComponent('input-listen', {
  init: function () {
    // Thumbstick
    this.el.addEventListener('thumbstickmoved', function (e) {
      if (e.detail.y < -0.95) { console.log("UP"); 
        this.emit('teleportstart');
      }
      // if (e.detail.y > 0.95) { console.log("DOWN"); }
      // if (e.detail.x < -0.95) { console.log("LEFT"); }
      // if (e.detail.x > 0.95) { console.log("RIGHT"); }
    });
    this.el.addEventListener('thumbsticktouchend', function (e) {
      this.emit('teleportend');
    });


    // X-button
    this.el.addEventListener('xbuttonup', function (e) {
      if (holdingRemote('video', 'leftController')) {
        window.activeMedia.video.togglePlay()
      }
    });

    // Y-button 
    this.el.addEventListener('ybuttonup', function (e) {
      if (holdingRemote('video', 'leftController')) {
        window.activeMedia.video.togglePlay()
      }
    });

    // A-button
    this.el.addEventListener('abuttonup', function (e) {
      if (holdingRemote('video', 'rightController')) {
        window.activeMedia.video.togglePlay()
      }
    });

    // B-button
    this.el.addEventListener('bbuttonup', function (e) {
      if (holdingRemote('video', 'rightController')) {
        window.activeMedia.video.togglePlay()
      }
    });
  }
});

export { leftHand, rightHand }