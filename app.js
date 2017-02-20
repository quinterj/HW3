const express = require('express') 
// require the npm library
const bodyParser= require('body-parser')
const app = express() 
// create a var for the app to be built using express
// app is the global variable namespace for the program we are building
const MongoClient = require('mongodb').MongoClient
const port = 9000
//const port = 45639
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://pio_peps:hello123@ds145639.mlab.com:45639/pio', (err, database) => {
   if (err) return console.log(err)
    db = database
  // app.listen(port, () => {
  //   console.log(`Listening on port ${port}!`)
  // })
})

//app.use(express.static('public'))
//app.get('/', (req, res) => res.send('Hello World!')) // our first route

// app.get('/', (req, res) => {
//   // console.log(__dirname)
//   res.sendFile(__dirname + '/index.html')
// })

// app.get('/', (req, res) => {
//   var cursor = db.collection('entries').find()
//   console.log(cursor)
//   res.sendFile(__dirname + '/index.html')
// })

// app.get('/', (req, res) => {
//   db.collection('entries').find().toArray((err, results) => {
//     console.log(results)
//     res.sendFile(__dirname + '/index.html')
//   })
// })

app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {entries: result})
  })
})

// app.get('/watchlist', function(req, res){
//   res.send(`
//     <h1>Watchlist</h1>
//     <p>Commentary on Watchlists will go here.</p>
//     `)
// })

// app.get('/entry/:name?', function(req, res){
//   let name = req.params.name
//   res.send(`
//     <h1>${name}</h1>
//     <p>Commentary on ${name} will go here.</p>
//     `)
// })

app.get('/entry/:name?/:link?', function(req, res){
  let name = req.params.name
  let hashlink = `#${req.params.link}`
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    <p>${hashlink}
    `)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
})

app.get('*', function(req, res){
  res.send(`
    <h1>Page not found</h1>
    `)
})

// app.post('/entries', (req, res) => {
//   //console.log('Hello')
//   console.log(req.body)
// })

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
