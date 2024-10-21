const path            = require('path')
const moment          = require('moment')
const m_prod_kategori = require('../model/m_master_produk_kategori')
const m_master_produk = require('../model/m_master_produk')

module.exports = {
    halaman_beranda: async function(req, res) {
        let data = {
            kategoriProduk: await m_prod_kategori.getAll()
        }
        res.render('v_olshop/beranda', data)
    },

    halaman_index_produk: async function(req, res) {
        let data = {
            kategoriProduk: await m_prod_kategori.getAll(),
            produkJual    : await m_master_produk.getAll(),
            // notification  : req.query.notification,
        }
        res.render('v_olshop/produk/index', data)
    },

    halaman_form_tambah: async function(req, res) {
        let data = {
            kategoriProduk: await m_prod_kategori.getAll()
        }
        res.render('v_olshop/produk/form-tambah', data)
    },

    proses_insert_produk: async function(req, res) {
        let foto            = req.files.form_foto1

        // ganti nama file asli
        let email           = req.session.user[0].email.replaceAll('.','-')
        let dateTime        = moment().format('YYYMMDD_HHmmss')
        let file_name       = username + '_' + dateTime + '-' + foto1.name
        let folder_simpan   = path.join(__dirname, '../public/upload/produk-foto')

        try {
            let insert = await m_master_produk.insert(req)
            if (insert.affectedRows > 0) {
                res.redirect('/olshop/produk?notification=Berhasil input produk baru')
            }
        } catch (error) {
            throw error
        }
    },

    
}