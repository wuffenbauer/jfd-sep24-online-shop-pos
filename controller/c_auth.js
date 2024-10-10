module.exports = {
    halaman_login: function(req, res) {
        res.render('v_auth/login')
    },

    proses_login: function(req, res) {
        // ambil inputan dari halaman login
        let form_email    = req.body.email
        let form_password = req.body.password        
        // cek email yang diinput, ada ngga di database
    },
}