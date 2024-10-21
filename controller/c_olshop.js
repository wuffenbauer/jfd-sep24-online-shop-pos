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
            notification  : req.query.notification,
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
        let foto1            = req.files.form_foto1
        let foto2            = req.files.form_foto2
        let foto3            = req.files.form_foto3

        // ganti nama file asli
        let email           = req.session.user[0].email.replaceAll('.','-')
        let datetime        = moment().format('YYYYMMDD_HHmmss')

        let filename_foto1  = email + '_' + datetime + '_' + ((foto1) ? foto1.name : '')
        let filename_foto2  = email + '_' + datetime + '_' + ((foto2) ? foto2.name : '')
        let filename_foto3  = email + '_' + datetime + '_' + ((foto3) ? foto3.name : '')

        let folder1_simpan  = path.join(__dirname, '../public/upload/produk-foto', filename_foto1)
        let folder2_simpan  = path.join(__dirname, '../public/upload/produk-foto', filename_foto2)
        let folder3_simpan  = path.join(__dirname, '../public/upload/produk-foto', filename_foto3)

        let pesan_upload    = ''

        foto1.mv(folder1_simpan, async function(err) {
            if (err) {
                pesan_upload += `<br>Gagal upload Foto 1`
            } else {
                pesan_upload += `<br>Berhasil upload foto 1`
            }
        })

        foto2.mv(folder2_simpan, async function(err) {
            if (err) {
                pesan_upload += `<br>Gagal upload Foto 2`
            } else {
                pesan_upload += `<br>Berhasil upload Foto 2`
            }
        })

        foto3.mv(folder3_simpan, async function(err) {
            if (err) {
                pesan_upload += `<br>Gagal upload Foto 3`
            } else {
                pesan_upload += `<br>Berhasil upload Foto 3`
            }
        })

        try {
            let insert = await m_master_produk.insert(req, filename_foto1, filename_foto2, filename_foto3)
            if (insert.affectedRows > 0) {
                res.redirect('/olshop/produk?notification=Berhasil input produk baru')
            }
        } catch (error) {
            throw error
        }
    },

    
}