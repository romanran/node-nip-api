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
app.get('/', (request, response) => {
    return response.send('OK')
})
app.get('/findByNip/:NIP', async (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    const NIP = request.params.NIP
    if (!NIP) {
        return response.send({ error: true, info: 'Empty NIP param' })
    }
    try {
        const data = await gus.findByNip(NIP)
        return response.send(data)
    } catch (err) {
        console.warn(err)
        return response.send(err.error)
    }
})

app.listen(process.env.PORT || 8080, () => console.log(`Api start`))
