const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/api/ping', (req, res) => {
  res.status(200).send({ "success": true });
})

// middlewares
app.use('/api', require('./api'))

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    console.log(`http://localhost:${port}/`)
  })
}

module.exports = app
