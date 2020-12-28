const interpolate = ([key, value]) => {
  if (!isNaN(Number(value))) return [key, Number(value)]

  try {
    return [key, JSON.parse(value)]
  } catch (err) {
    return [key, value]
  }
}

let config = Object.fromEntries([...new URLSearchParams(window.location.search).entries()].map(interpolate))
console.log({config})
export default config