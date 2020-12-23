import { ImageAsset } from './asset.js'

// mock fetching
const fetchReturn = (assets) => new Promise(r => setTimeout(() => r(assets), 500))

const catImg = (topic = '') => ImageAsset(`https://cataas.com/cat${topic ? `/${topic}` : ''}?cache_bust=${Math.random()}`)
export const fetchImages = () => fetchReturn([
  { url: catImg(), text: 'Just a simple cat #1' },
  { url: catImg(), text: 'Just a simple cat #2' },
  { url: catImg(), text: 'Just a simple cat #3' },
  { url: catImg(), text: 'Just a simple cat #4' },
  { url: catImg(), text: 'Just a simple cat #5' },
  { url: catImg(), text: 'Just a simple cat #6' },
  { url: catImg(), text: 'Just a simple cat #7' },
  { url: catImg(), text: 'Just a simple cat #8' },
  { url: catImg(), text: 'Just a simple cat with a really long name and has overflowing text. We need to make sure that we have good handling for this.' },
  { url: catImg('cute'), text: 'A cute cat #1' },
  { url: catImg('cute'), text: 'A cute cat #2' },
  { url: catImg('cute'), text: 'A cute cat #3' },
  { url: catImg('cute'), text: 'A cute cat #4' },
  { url: catImg('cute'), text: 'A cute cat #5' },
  { url: catImg('cute'), text: 'A cute cat #6' },
  { url: catImg('cute'), text: 'A cute cat #7' },
  { url: catImg('cute'), text: 'A cute cat #8' },
  { url: catImg('cute'), text: 'A cute cat #9' },
  { url: catImg('cute'), text: 'A cute cat #10' },
]);
