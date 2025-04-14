const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {

        const { name, image, type, countInStock, price, rating, description } = req.body;

        if (!name || !image || !type || !countInStock || !price || !rating) {
            return res.status(200).json({
                status: "ERROR",
                message: "The input is required"
            });
        }

        const response = await ProductService.createProduct(req.body);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERROR",
            message: "Internal Server Error"
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data  = req.body

        if (!productId) {
            return res.status(200).json({ status: "ERROR", message: "The productId is required" });
        }

        const response = await ProductService.updateProduct(productId, data);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const token = req.headers
        console.log('token')
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message:"The product ID is require"
            })
        }
        const response=await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
};



const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;

        // Kiểm tra filter có đúng định dạng không (phải có ":")
        if (filter && !filter.includes(":")) {
            return res.status(400).json({ status: "ERROR", message: "Invalid filter format. Use field:value" });
        }

        const response = await ProductService.getAllProduct(
            Number(limit) || 6, 
            Number(page) || 0,  
            sort, 
            filter
        );

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERROR",
            message: "Internal Server Error",
            error: e.message
        });
    }
};


const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id

        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message:"The product Id is require"
            })
        }
        const response=await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
};


module.exports = { 
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct


};
