if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express')
const errorHandler = require('./middleware/errorHandle')
const cors = require('cors')


const app = express()
const port = 3000

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use("/", require('./routers'))
app.use(errorHandler)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app