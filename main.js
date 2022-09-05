const qrcode = require('qrcode')
const generatePayload = require('promptpay-qr')
let exp = require('express')
let app = exp()

let port = 1980

app.set('view engine', 'ejs')

// Static Setting Up
app.use(exp.static('static'))

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/:telNo', (req, res) => {
  let amount = parseInt(0)
  const payload = generatePayload(req.params.telNo, { amount })

  async function qrRoller() {
    const options = { type: 'svg', color: { dark: '#2e2f2f', light: '#f5f5f5' } }
    await new Promise((resolve, reject) => {
      qrcode.toString(payload, options, (err, svg) => {
        if (err) return reject(err)
  
        resolve(svg)
        res.set('Content-Type', 'image/svg+xml');
        res.send(svg)
      })
    })
  }

  qrRoller()
})

app.get('/:telNo/:amount', (req, res) => {
  let amount = parseInt(req.params.amount)
  const payload = generatePayload(req.params.telNo, { amount })

  // res.send(payload)

  async function qrRoller() {
    const options = { type: 'svg', color: { dark: '#2e2f2f', light: '#f5f5f5' } }
    await new Promise((resolve, reject) => {
      qrcode.toString(payload, options, (err, svg) => {
        if (err) return reject(err)
  
        resolve(svg)
        res.set('Content-Type', 'image/svg+xml');
        res.send(svg)
      })
    })
  }

  qrRoller()
})

app.listen(port, () => {
  console.log('Live on http://localhost:' + port);
})