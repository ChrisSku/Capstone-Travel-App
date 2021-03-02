const app = require('../server/app')
const port = 80

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}/ !\n`)
)
