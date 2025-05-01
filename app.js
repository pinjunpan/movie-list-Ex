const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000
const movies = require('./public/jsons/movies.json').results
const BASE_IMG_URL = 'https://movie-list.alphacamp.io/posters/'
const helpers = require('./helpers/handlebars-helper')

app.engine('.hbs', engine({extname: '.hbs', helpers}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public')) //載入靜態檔案

app.get('/', (req, res) => {
  res.redirect('/movies') //重新導向，首頁顯示電影清單
})

app.get('/movies', (req, res) => {
  const keyword = req.query.search?.trim()
  const page = Number(req.query.page) || 1
  const MOVIES_PER_PAGE = 8

  //篩選關鍵字
  const matchedMovies = keyword? movies.filter((mv) =>
    Object.values(mv).some((property) =>{
      if(typeof property === 'string'){
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ):movies

  //分頁
  const totalPages = Math.ceil(matchedMovies.length / MOVIES_PER_PAGE)
  const pageMovies = matchedMovies.slice((page - 1) * MOVIES_PER_PAGE, page * MOVIES_PER_PAGE)

  const pages = []
  for (let i = 1; i <= totalPages; i++){
    pages.push(i)
  }
  
  res.render('index', {
    movies: pageMovies,
    BASE_IMG_URL,
    keyword,
    currentPage: page,
    pages
  })
})

app.get('/movie/:id', (req, res) => {
  const id = req.params.id //params設動態路由
  const movie = movies.find((mv) => mv.id.toString() === id)
  res.render('detail', {movie, BASE_IMG_URL})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})