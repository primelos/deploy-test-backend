// require your server and launch it
const server = require('./api/server')


const port = 4001

server.listen(port, () => {
  console.log('🐸 working on '+ port + ' 🐞');
})