import express from 'express'
import { GREETING } from '@tamiyo/shared'

const app = express()

app.use(express.json())
app.get('/api', (req, res) => {
    res.send(GREETING)
})

app.listen(8000, () => console.log('Listening'))