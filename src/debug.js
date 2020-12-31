import config from './config.js'

function Entry (item) {
  let contents = item
  if (item instanceof HTMLElement) {
    contents = item.outerHTML
  } else if (item instanceof Object) {
    contents = JSON.stringify(item)
  }

  const logItem = document.createElement('pre')
  logItem.innerText = contents
  return logItem
}

const logElem = document.createElement('div')
logElem.style.top = '0'
logElem.style.left = '0'
logElem.style.position = 'absolute'
logElem.appendChild(Entry('Live DB Active'))

export function renderLogger() {
  if (config.debug) {
    document.body.appendChild(logElem)
  }
}

export function log (...items) {
  if (config.debug) {
    items.forEach(item => {
      logElem.insertBefore(Entry(item), logElem.firstChild)
    })
  } 
}
