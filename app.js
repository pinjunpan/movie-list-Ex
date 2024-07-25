const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public')) //載入靜態檔案

app.get('/', (req, res) => {
  res.redirect('/movies') //重新導向，首頁顯示電影清單
})

app.get('/movies', (req, res) => {
  res.send('listing movies')
})

app.get('/movie/:id', (req, res) => {
  const id = req.params.id //params設動態路由
  res.send(`read movie: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})