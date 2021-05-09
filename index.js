const express = require('express')
const Client = require('node-regon')
const app = new express()

const gus = Client.createClient({
    key: 'abcde12345abcde12345',
    sandbox: true,
    disableAsync: true, // if it is true, you will get returned result, and it will waid for end of call
    captcha: {
        autofill: false,
        apiKey: 'ANTIGATE_API',
    },
})

app.get('/findByNip/:NIP', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const NIP = req.params.NIP
    if (!NIP) {
        return res.send({ error: true, info: 'Empty NIP param' })
    }
    try {
        const data = await gus.findByNip(NIP)
        return res.send(data)
    } catch (err) {
        console.warn(err)
        return res.send(err.error)
    }
})

app.listen(80, () => console.log(`Api start`))
