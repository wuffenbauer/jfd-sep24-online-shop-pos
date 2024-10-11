const express   = require('express')
const app       = express()
const port      = 3000
const c_beranda = require('./controller/c_beranda')
const c_auth    = require('./controller/c_auth')
const c_toko    = require('./controller/c_toko')

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', './view')

app.get('/', c_beranda.halaman_awal)
app.get('/auth/login', c_auth.halaman_login)
app.post('/auth/proses-login', c_auth.proses_login)

app.get('/toko', c_toko.halaman_utama)

app.listen(port, () => {
    console.log(`Server aktif, buka http://localhost:${port}`)
})