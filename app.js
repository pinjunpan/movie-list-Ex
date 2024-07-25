const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public')) //載入靜態檔案

app.get('/', (req, res) => {
  res.redirect('/movies') //重新導向，首頁顯示電影清單
})

app.get('/movies', (req, res) => {
  res.render('index')
})

app.get('/movie/:id', (req, res) => {
  const id = req.params.id //params設動態路由
  res.send(`read movie: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})