/* 
  Starts the server @port
*/
const app = require('../server/app')
const port = 3000

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}/ !\n`)
)
