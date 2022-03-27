import axios from 'axios'
import { MessageMedia } from 'whatsapp-web.js'

export const catCommand = {
  name: 'gato',
  execute: async () => {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg&limit=1', {
      headers: {
        'x-api-key': process.env.THECAT_API_KEY
      }
    })

    return MessageMedia.fromUrl(data[0].url)
  }
}
