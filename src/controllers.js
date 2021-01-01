import './vendor/aframe.js'
import './vendor/aframe-teleport-controls.js'
import './vendor/super-hands.js'
import { make } from './util.js'
import { log } from './debug.js'


// ==================================================================================

window.controllers = window.controllers || {}

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

function Wrapper(hand, side) {
  // let substituteMesh
  // const clearMesh = () => substituteMesh && hand.contains(substituteMesh) && hand.removeChild(substituteMesh)

  return {
    hand,
    id: hand.id,
    restoreMesh: () => {
      // clearMesh()
      hand.components['gltf-model'].model.visible = true
    },
    hideMesh: (newMesh) => {
      // clearMesh()
      // substituteMesh = newMesh
      hand.components['gltf-model'].model.visible = false
    },
  }
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
    let lastDirection 
    this.el.addEventListener('thumbstickmoved', function (e) {
      let direction
      if (e.detail.y < -0.95) { direction = 'up'}
      if (e.detail.y > 0.95)  { direction = 'down' }
      if (e.detail.x < -0.95) { direction = 'left' }
      if (e.detail.x > 0.95)  { direction = 'right' }

      if (direction === 'up') {
        this.emit('teleportstart'); 
      }
      

      if (direction) {
        lastDirection = direction
        log(`direction: ${direction}`)
      }
    });
    this.el.addEventListener('thumbsticktouchend', function (e) {
      this.emit('teleportend');

      if (lastDirection === 'right' && holdingRemote('video')) {
        window.remotes.video.actions.next()
      }
      if (lastDirection === 'left' && holdingRemote('video')) {
        window.remotes.video.actions.previous()
      }

      log(`lastDirection: ${lastDirection}`)
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