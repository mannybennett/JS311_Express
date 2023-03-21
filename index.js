const express = require('express')
const app = express()
const port = process.env.PORT || 4000
  
app.use(express.json())

const { users } = require('./state')
const counter = users.length + 1

/* BEGIN - create routes here */

app.get('/users', (req, res) => {
  res.json(users)
})

// app.get('/users/1', (req, res) => {
//   res.json(users[0])
// })

app.post('/users', (req, res) => {
  users.push({
    "_id": 6,
    "name": "Yee Haw",
    "occupation": "Cowboy",
    "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  })
  res.json(users.at(-1))
})

app.post('/users', (req, res) => {
  req.body = { "_id": counter }
  users.push(req.body)
  res.json(users.at(-1))
})

// app.put('/users/1', (req, res) => {
//     users[0].name = "Jimmy John"
//     res.json(users[0])
//   })
  
// app.delete('/users/1', (req, res) => {
//   users.splice(0, 1)
//   res.send("Deleted")
// })
    
/* END - create routes here */
    
app.get('/users/:userId', (req, res) => {
  let user = req.params.userId
  res.json(users.find((obj) => obj._id === parseInt(user)))
})
  
app.put('/users/:userId', (req, res) => {
  let user = req.params.userId
  users[parseInt(user) - 1].name = "Jimmy John"
  res.json(users[parseInt(user) - 1])
})

app.delete('/users/:userId', (req, res) => {
  let user = req.params.userId
  let removedUser = users.slice(user - 1, user)
  removedUser.isActive = false
  users.splice(user - 1, 1)
  console.log(removedUser)
  res.send("Deleted")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))