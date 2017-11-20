const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/transcript', (req, res) => {
    let getTranscript = require('./transcript')
    let transcript = getTranscript(req.query.page)
    if (transcript) {
      res.send(transcript)
    } else {
      res.status(404).send({ reason: 'transcript not found' })
    }
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})