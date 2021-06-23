import express from 'express'

const app = express()

app.get('/test', (req, res) => {
    res.send('Testado')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})