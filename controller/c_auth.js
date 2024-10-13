const bcrypt        = require('bcryptjs')
const model_user    = require('../model/m_user')

module.exports = {
    halaman_login: function(req, res) {
        if (req.session.user) {
            res.redirect('/toko')
        } else {
            let data = {
                notification: req.query.notification,
            }
            res.render('v_auth/login', data)
        }
    },

    proses_login: async function(req, res) {
        // ambil inputan dari halaman login
        let form_email    = req.body.form_email
        let form_password = req.body.form_password
        
        // cek email yang diinput, ada ngga di db
        let email_exist   = await model_user.cari_email(form_email)
        // console.log(email)
        
        if (email_exist.length > 0) {
            // cek password
            let password_cocok = bcrypt.compareSync(form_password, email_exist[0].password)
            if (password_cocok) {
                // arahkan ke halaman utama sistem
                req.session.user = email_exist
                res.redirect('/toko')
            } else {
                // tendang ke halaman login
                let pesan = `Password salah`
                res.redirect(`/auth/login?notification=${pesan}`)
            }
        } else {
            // tendang ke halaman register
            let pesan = `Email Anda belum terdaftar, silakan registrasi lebih dulu.`
            res.redirect(`/auth/login?notification=${pesan}`)
        }
    },

    cek_login: function(req, res, next) {
        if (req.session.user) {
            next()
        } else {
            let pesan = `Sesi Anda sudah habis, silakan login lagi.`
            res.redirect(`/auth/login?notification=${pesan}`)
        }
    },


}