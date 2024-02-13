// password authentication

const http = require('http');
const path = require('path');
const fs = require('fs');

const userDbPath = path.join(__dirname, "db", "users.json")
console.log(userDbPath)


function getAllUsers (){
   return new Promise((resolve, reject) => {

        fs.readFile(userDbPath, "utf8", (err, users)=>{
        if (err){
            reject(err)
        }
        resolve(JSON.parse(users))
    }
        )
    
})

   
 }

 function authenticateUser(req, res){
 return new Promise((resolve, reject) => {
     const body = []
    req.on('data', (chunk)=>{
        body.push(chunk)
    })
   
   req.on('end', async()=>{
    const parsedBody = Buffer.concat(body).toString()
    
    console.log(parsedBody)
    if(!parsedBody){
      reject('No username and Password')
     }

     const loginDetails = JSON.parse(parsedBody)
     console.log(loginDetails)

const users =  await getAllUsers()
console.log(users)

const userFound = users.find((user)=>{
    return user.username === loginDetails.username})

console.log(userFound)
      if (!userFound){
        reject('User not found')
      }
 if (userFound.password !== loginDetails.password){
    reject('Invalid username or Password') 
 }
 resolve()
   })
})
}





module.exports= {
    authenticateUser
}


// Token based authentication

// require('dotenv').config()
// const TOKEN = process.env.API_KEY


// function authenticateUser(req, res){
//     return new Promise((resolve, reject) => {
//         console.log(req.headers)

// let token = req.headers.authorization
// if (!token){
//     reject('No token provided')
// }
// token = token.split(" ")[1]

// console.log(token)


// if (token !== TOKEN){
//     reject('invalid token')
// }
// resolve()
//     })

// }

// module.exports = {
//     authenticateUser
// }

// Access based authentication

