const express = require('express')
const cors = require("cors")
const tableRouter = require('./routes/testTable.routes')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json())
app.use('/api', tableRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))