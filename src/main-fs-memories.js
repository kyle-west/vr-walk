import './vendor/aframe.js'
import './vendor/aframe-extras.js'
import './vendor/aframe-teleport-controls.js'
import './vendor/aframe-physics-system.js'

import { fetchReturn } from './mock-media-endpoint.js'
import scene, { MediaViewer } from './scene.js'

const viewer = new MediaViewer()

fetchReturn([
  { text: 'Sarah Smith with cat, Caesar', url: 'https://i.pinimg.com/originals/ef/14/ca/ef14cad103b973e1b47d22e05b370b0c.jpg' },
  { text: 'Fifth Avenue and 42nd Street, 1910', url: 'https://i.insider.com/55fc8d0dbd86ef21008bb8c2?width=600&format=jpeg' },
  { text: 'Grandma and Grandpa\'s house', url: 'https://i.insider.com/55fc7b29bd86ef1a008bb86c?width=1300&format=jpeg&auto=webp' },
  { text: 'Charles\' football team', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/1900yale.jpg' },
  { text: 'Great Grandma', url: 'https://images.squarespace-cdn.com/content/v1/540cd7e4e4b0b83340ad9dd8/1488301877058-Z9SZHA9IV4MP24IPKFTC/ke17ZwdGBToddI8pDm48kPb9nsS8coW0WnJ9omNZxQBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxRNrbyNPFT-WuU_vQC5UKhRhmMwoztUnT15rxTuw6je3G2qNmoEIWknnkR8nNRJuI/20s.png' },
  { text: 'Dad and his co-workers', url: 'https://images.squarespace-cdn.com/content/v1/54661df4e4b0c1af99306b69/1578950381298-9BXXPFCXEB6Y6FJWQK61/ke17ZwdGBToddI8pDm48kNIz01GxeNglza_traDdevsUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKck_3oyjxD2E6g656zntaR4vQBwPCV_Yc9BnFEdXAQ6xzMr4wPFfphDwEQcs_2fgoE/1900-Style-Fashion-History-Timeline.jpg' },
  { text: 'Sue and her doll', url: 'https://i.pinimg.com/originals/65/a6/bd/65a6bd85b38e91dd461b051d674c3e8f.jpg' },
  { text: 'Thomas Family', url: 'https://lh3.googleusercontent.com/IhIVNeRr-OKkhchU_Ej8-DmevoUHqlGgQjclclu1o_P7z5dfrUNHn4P-YyHHJcoXihrSS9p_vizq5xNLGKPSW80mBesGIqp726j4gyN7EF6Du-MpnJvttseYg57hepqw1HaY5lLK8Y1M8-Omyl3GZ5kpjpFchg8omSVvmiePlIpFNDcXFu49z0lR7rE6aGXQNYG7U6hrG2bF7my3gHychSAHsBNL1mMuXwdZF9K6OF387oYnIaeybLNbREf4KJmXexRRbGL6fgCxnZofnclOdGAQ3ONirHj5i-wwT-8scia6vWdx7Kx4xmc7eljJjiM1ab4U49JwZyksOi1Yc2bW2PhnVHVSO-ojyqHXPZ_OItFVwgWQ0Ml1IodvKB3FDGZ0enr0gtZfbcUrzYYAT1BRPuQGYMjD5QkXelY83JIIAp9S7T1H0jysS6LZRuSg7O9bcUDvJb5ithWnD6aYj0ItBsR-_vwwoVBaK9jWgct9FIq9zOHz-0GaiUB-uY4vZ9JXADiFd93rBPQce7OrzSx0o56Mtugte9HCWxn7lo84LFP3y1djdK95c-D-Lk2Gxwju8VjIB7edgOo5ayI2D4vKWsq-8LTR5hNYnbDvfxl_75AZU7FIvwSWlQ3wgpj9RSRA9zrqCpAPf8g6Kl1FJGDn6ekotJc9PXen2ZcMtb02yNQ=w1280-h855-no' },
  { text: 'Hurricane in Galveston', url: 'https://cloudfront-us-east-1.images.arcpublishing.com/gmg/CVWDY7X3MRCDXMKFBGFE2OKOKA.jpg' },
  { text: 'Great Grandpa\'s car', url: 'https://www.earlyamericanautomobiles.com/images/autos2906.jpg' },
  { text: 'The Davidson Boys', url: 'https://1tq45j21k9qr27g1703pgsja-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/1900sCorbella13.jpg' },
  { text: 'Warren Children', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmADR8y9uW_hoMpYQPi56Y__EC3Y4l2BIuOg&usqp=CAU' },
  { text: 'Grandpa\'s infantry', url: 'https://i.pinimg.com/236x/19/c5/cf/19c5cf25827003bc133972b36cf3e404--photos-of.jpg' },
  { text: 'Immigrated to New York', url: 'https://immigrants1900.weebly.com/uploads/1/4/4/8/1448115/3950541.jpg?515x382' },
  { text: 'David Corbin working on the railroad', url: 'https://i.insider.com/55fc7afdbd86ef13008bb8b6?width=1300&format=jpeg&auto=webp' },
]).then(imgs => viewer.showImages(imgs))

document.body.appendChild(scene)