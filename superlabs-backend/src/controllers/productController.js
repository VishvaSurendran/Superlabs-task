const productService = require('../services/productService');

exports.search = async (req, res) => {
    try {
        const { q, page = 1 } = req.query;
        const products = await productService.getSearchProducts(q, page);
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getDetail = async (req, res) => {
    try {
        const product = await productService.getProductBySku(req.params.sku);
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const product = await productService.createNewProduct(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }

};

exports.update = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await productService.removeProduct(req.params.id);
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};