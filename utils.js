const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, 'db', 'books.json');

function getAllBooks(req, res){
    fs.readFile(booksPath, 'utf8', (err, data)=>{
   if (err){
       console.log(err)
   } else {
       res.end(data)
   
       // url/books/author  GET author
       const dataObj = JSON.parse(data)
   const allauthors = dataObj.filter( i =>'author' in i)
   for(let [key, values]of allauthors.entries() ){
       console.log(values.author)
   }
   }
   
   
   })
   }
   
   function addBook(req, res){
   
   const body = []
   
   req.on("data", (chunk)=>{
       body.push(chunk)
   })
   
   req.on("end", ()=> {
       const bufferBody = Buffer.concat(body).toString()
       const parsedBook = JSON.parse(bufferBody)
       console.log(parsedBook)
   
   
   fs.readFile(booksPath, 'utf8', (err, data)=>{
   if (err){
       res.end(err)}
   
       const oldBooks = JSON.parse(data)
       // console.log(oldBooks)
   
       const lastBookId = oldBooks.length
       console.log (lastBookId)
   
        parsedBook.id = lastBookId + 1;
   
       console.log (parsedBook)
       const allBooks = [...oldBooks, parsedBook]
       
   
       fs.writeFile(booksPath, JSON.stringify(allBooks), (err)=>{
           if (err){
               res.end(err)
           }
           res.end(JSON.stringify(allBooks))
       })
   
   })
   
   })
   }
   
   function updateBooks(req, res){
       const body = []
   
   req.on("data", (chunk)=>{
       body.push(chunk)
   })
   
   req.on("end", ()=> {
       const bufferBody = Buffer.concat(body).toString()
       const detailsToUpdate= JSON.parse(bufferBody)
       // console.log(detailsToUpdate)
   const bookId = detailsToUpdate.id
   
   fs.readFile(booksPath, 'utf8', (err, data)=>{
   if (err){
       res.end(err)}
   
       const oldBooks = JSON.parse(data)
       console.log(oldBooks)
      const bookIndex = oldBooks.findIndex((book)=>bookId === book.id)
   
      console.log(bookIndex)
   
      if (bookIndex === -1){
       res.end('Not a valid ID');
       return;
      }
      
   const updatedBooks = {...oldBooks[bookIndex], ...detailsToUpdate}
   
       console.log(updatedBooks)
       oldBooks[bookIndex] = updatedBooks
       console.log(oldBooks)
       fs.writeFile(booksPath, JSON.stringify(oldBooks), (err)=>{
           if (err){
               res.end(err)
           }
           res.end('books updated succesfully')
       })
   
   
   
   
   })
   })
   }
   function deleteBooks(req, res){
       const body = []
   
   req.on("data", (chunk)=>{
       body.push(chunk)
   })
   
   req.on("end", ()=> {
       const bufferBody = Buffer.concat(body).toString()
       const bodyId= JSON.parse(bufferBody)
   const bookId = bodyId.id
   
   fs.readFile(booksPath, 'utf8', (err, data)=>{
   if (err){
       res.end(err)}
   
       const oldBooks = JSON.parse(data)
       console.log(oldBooks)
      const bookIndex = oldBooks.findIndex((book)=>bookId === book.id)
   
      console.log(bookIndex)
   
      if (bookIndex === -1){
       res.end('Not a valid ID');
       return;
      }
        oldBooks.splice(bookIndex, 3)
   
       fs.writeFile(booksPath, JSON.stringify(oldBooks), (err)=>{
           if (err){
               res.end(err)
           }
           res.end('book deleted succesfully')
       })
   
   
   
   
   })
   })
   }
      

module.exports = {
getAllBooks,
addBook,
updateBooks,
deleteBooks

}
