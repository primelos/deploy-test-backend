// require your server and launch it
const server = require('./api/server')

// console.log(process.env)
const port = process.env.PORT || 4001

server.listen(port, () => {
  console.log('🐸 working on '+ port + ' 🐞');
})