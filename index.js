import qrcode from 'qrcode-terminal'
import axios from 'axios'
import { Client, MessageMedia } from 'whatsapp-web.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client()

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async msg => {
  if (msg.body == 'gato') {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg&limit=1', {
      headers: {
        'x-api-key': process.env.THECAT_API_KEY
      }
    })

    const media = await MessageMedia.fromUrl(data[0].url)

    msg.reply(media)
  }
});

client.initialize();