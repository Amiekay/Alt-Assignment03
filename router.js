
const{getAllBooks, addBook, updateBooks, deleteBooks} = require('./utils')
const {authenticateUser} = require('./authentication')

// request handling
const requestHandler = function(req, res){
    res.setHeader("Content-Type", "application/json")
    
    
    if(req.url === '/books' && req.method === 'GET'){
        authenticateUser(req, res)
        .then(()=>{
            getAllBooks(req, res)
        })
        .catch((err)=>{
            res.writeHead('404')
            res.end(JSON.stringify(
               {message: err}
            ))
        })
       
    }
    else if(req.url === '/books' && req.method === 'POST'){
        addBook(req, res)
    }
    else if(req.url === '/books' && req.method === 'PUT'){
        updateBooks(req, res)
    }
    else if(req.url === '/books' && req.method === 'DELETE'){
        deleteBooks(req, res)
    }
    else{
        res.writeHead('404')
        res.end(json.stringify(
            "message: Not supported"
        ))
    }
    
    }
    
   module.exports = {
    requestHandler
   } 