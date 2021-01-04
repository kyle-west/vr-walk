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
  // { url: catImg(), text: 'Just a simple cat #8' },
  // { url: catImg(), text: 'Just a simple cat #9' },
  // { url: catImg(), text: 'Just a simple cat #10' },
  // { url: catImg(), text: 'Just a simple cat #11' },
  // { url: catImg(), text: 'Just a simple cat #12' },
  // { url: catImg(), text: 'Just a simple cat #13' },
  // { url: catImg(), text: 'Just a simple cat #14' },
  // { url: catImg(), text: 'Just a simple cat #15' },
  { url: catImg(), text: 'Just a simple cat with a really long name and has overflowing text. We need to make sure that we have good handling for this.' },
  { url: catImg('cute'), text: 'A cute cat #1' },
  { url: catImg('cute'), text: 'A cute cat #2' },
  { url: catImg('cute'), text: 'A cute cat #3' },
  { url: catImg('cute'), text: 'A cute cat #4' },
  { url: catImg('cute'), text: 'A cute cat #5' },
  { url: catImg('cute'), text: 'A cute cat #6' },
  { url: catImg('cute'), text: 'A cute cat #7' },
//   { url: catImg('cute'), text: 'A cute cat #8' },
//   { url: catImg('cute'), text: 'A cute cat #9' },
//   { url: catImg('cute'), text: 'A cute cat #10' },
//   { url: catImg('cute'), text: 'A cute cat #11' },
//   { url: catImg('cute'), text: 'A cute cat #12' },
//   { url: catImg('cute'), text: 'A cute cat #13' },
//   { url: catImg('cute'), text: 'A cute cat #14' },
//   { url: catImg('cute'), text: 'A cute cat #15' },
//   { url: catImg('cute'), text: 'A cute cat #16' },
//   { url: catImg('cute'), text: 'A cute cat #17' },
//   { url: catImg('cute'), text: 'A cute cat #18' },
]);


// modified from https://gist.github.com/jsturgis/3b19447b304616f18657
export const fetchVideos = () =>
  fetchReturn([
    {
      description:
        "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
      src:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      subtitle: "By Blender Foundation",
      title: "Big Buck Bunny",
    },
    {
      description: "The first Blender Open Movie from 2006",
      src:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      subtitle: "By Blender Foundation",
      title: "Elephant Dream",
    },
    {
      description:
        "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
      src:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      subtitle: "By Blender Foundation",
      title: "Sintel",
    },
    {
      description:
        "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
      src:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      subtitle: "By Blender Foundation",
      title: "Tears of Steel",
    },
  ]);

export const fetchRecordings = () =>
  fetchReturn([
    // from: https://publicdomainreview.org/collection/edison-reading-mary-had-a-little-lamb-1927
    {
      title: "Edison reading Mary Had a Little Lamb (1927)",
      description:
        "The first words Thomas A. Edison spoke into the phonograph (1927)",
      src:
        "https://archive.org/download/EDIS-SCD-02/EDIS-SCD-02.mp3",
    },

    // from: https://publicdomainreview.org/collection/morning-on-the-farm-1897
    {
      title: "Morning on the Farm (1897)",
      description:
        "A recording from the Library of Congress Berliner collection - the performer N.R. Wood imitates various animal sounds heard during the early morning, including sheep, cattle, cock, hens, guinea hen, turkey, hawk, crow, and other birds. Recorded in Washington, D.C. by Berliner Gramophone, 5th August 1897.",
      src:
        "https://archive.org/download/MorningOnTheFarm/LOC-farmyardnoises.mp3",
    },
  ]);
