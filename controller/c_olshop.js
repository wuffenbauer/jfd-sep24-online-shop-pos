const m_prod_kategori = require('../model/m_master_produk_kategori')

module.exports = {
    halaman_beranda: async function(req, res) {
        let data = {
            kategoriProduk: await m_prod_kategori.getAll()
        }
        res.render('v_olshop/beranda', data)
    },

    halaman_index_produk: function(req, res) {
        res.render('v_olshop/produk/index')
    },

    
}