import 'regenerator-runtime/runtime.js'
import 'dotenv/config'
import qrcode from 'qrcode-terminal'
import { Client, LocalAuth } from 'whatsapp-web.js'

import * as commands from './commands'

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    ...(process.env.NODE_ENV === 'production' && ({ executablePath: '/app/.apt/usr/bin/google-chrome' })),
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
})

const resolverCommands = Object.keys(commands).map(key => commands[key])

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready!')
})

client.on('message', async msg => {
  const message = msg.body.toLowerCase()

  if (!message) return

  const response = await resolverCommands
    .find(command => message
      .includes(command.name))?.execute()

  if (!response) return

  msg.reply(response)
})

client.initialize()
