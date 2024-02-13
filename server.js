const http = require('http');
const {requestHandler} = require('./router')



const PORT = 8700;
const HOSTNAME =  'localhost';

    
// create server and listen

const server = http.createServer(requestHandler)

server.listen(PORT, HOSTNAME, ()=>{
    console.log(`server listening on http://${HOSTNAME}:${PORT}`)
})