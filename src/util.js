const boolAttributes = {
  dynamicBody: 'dynamic-body',
  staticBody: 'static-body',
}

const isAFrame = (type) => Boolean([
 'scene',
 'assets',
 'entity',
 'box',
 'cylinder',
 'cone',
 'triangle',
 'sphere',
 'sky',
 'plane',
 'light',
 // todo: enumerate this list
].includes(type))


export function rand(min = 0, max = 100) {
  const sign = Math.random() > 0.5 ? -1 : 1;
  const num = (sign * (Math.random() * (max - min) + min))
  return num
}

export function randomTriad({ max = [], min = [], x, y, z } = {}) {
  const [xMax = 10, yMax = 10, zMax = 10] = Array.isArray(max) ? max : new Array(3).fill(max)
  const [xMin = 0, yMin = 0, zMin = 0] = Array.isArray(min) ? min : new Array(3).fill(min)
  return [x || rand(xMin, xMax), y || rand(yMin, yMax), z || rand(zMin, zMax)].join(' ')
}

export function relativePos({ elem, value }) {
  let { x, y , z } = elem.getAttribute('position')
  if (!(x || y || z)) {
    [x, y, z] = elem.getAttributeNode('position').value.split(' ').map(Number)
  }
  const [ dx, dy, dz ] = value.split(' ').map(Number)
  return [x + dx, y + dy, z + dz].join(' ')
}

export function relativeRot({ elem, value }) {
  const { x, y , z } = elem.getAttribute('rotation')
  const [ dx, dy, dz ] = value.split(' ').map(Number)
  return [x + dx, y + dy, z + dz].join(' ')
}

export function make ({ type = 'entity', under, relative, ...attrs }, events = {}) {
  const elem = document.createElement(isAFrame(type) ? `a-${type}` : type);
  const parentElem = document.querySelector(under)
  if (parentElem) {
    parentElem.appendChild(elem)
  }

  Object.entries(attrs).forEach(([name, value]) => {
    const boolName = boolAttributes[name]
    if (boolName) {
      elem.setAttribute(boolName, '')
    } else if (name === '_type') {
      elem.setAttribute(name, 'type')
    } else if (name === 'position' && relative && parentElem) {
      const newPos = relativePos({ elem: parentElem, value })
      elem.setAttribute(name, newPos)
    } else {
      elem.setAttribute(name, value)
    }
  });

  Object.entries(events).forEach(([evt, handler]) => {
    const name = evt.replace(/^on/, '').toLowerCase()
    elem.addEventListener(name, handler)
  })

  return elem
}

export function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function randomColor (colors) {
  const getHex = () => Math.random() > 0.5 ? 'CC' : '22';
  return colors ? randomItem(colors) : (
    `#${getHex()}${getHex()}${getHex()}`
  )
}

export const debounce = (fn, { time = 500, debug = false } = {}) => {
  let timeout = null
  const clear = () => {
    clearTimeout(timeout)
    timeout = null
  }
  return (...args) => {
    if (!timeout) {
      debug && console.log('firing')
      fn(...args)
    } else {
      debug && console.log('ignoring')
    }
    clear()
    timeout = setTimeout(() => {
      debug && console.log('cleared by time')
      clear()
    }, time)
  }
}

export function append (node, ...children) {
  return node && children.map((child) => child && node.appendChild(child))
}