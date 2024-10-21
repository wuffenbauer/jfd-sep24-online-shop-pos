const mysql             = require('mysql2')
const config_database   = require('../config/database')
const moment            = require('moment')
const db                = config_database.db
const eksekusi          = config_database.eksekusi

module.exports = {
    getAll: function() {
        let sqlSyntax = mysql.format(
            `SELECT 
                p.*, k.nama AS kategori_nama 
            FROM master_produk AS p
            LEFT JOIN master_produk_kategori AS k ON k.id = p.kategori_id;`
        )
        return eksekusi(sqlSyntax)
    },
    
    insert: function(req) {
        let sqlData = {
            nama            : req.body.form_nama,
            harga           : req.body.form_harga,
            stok            : req.body.form_harga,
            kategori_id     : req.body.form_kategori,
            foto1           : req.body.form_foto1,
            foto2           : req.body.form_foto2,
            foto3           : req.body.form_foto3,
            video           : req.body.form_video,
            deskripsi       : req.body.form_deskripsi,
            spesifikasi     : req.body.form_spesifikasi,
            info_penting    : req.body.form_info_penting,
            created_at      : moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by      : req.session.user[0].id,
        }

        let sqlSyntax = mysql.format(
            `INSERT INTO master_produk SET ?`,
            [sqlData]
        )
        return eksekusi(sqlSyntax)
    },

}