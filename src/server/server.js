const app = require('../server/app')
const port = 80

app.listen(process.env.PORT, () =>
  console.log(
    `Example app listening on port http://localhost:${process.env.PORT}/ !\n`
  )
)
