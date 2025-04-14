const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description } = newProduct;

        
        try {
            const checkProduct = await Product.findOne({ 
                name: name
            });

            if (checkProduct !== null) {
                return resolve({
                    status: 'OK',
                    message: 'The name of product is already in use',
                });
            }
        

            const createProduct = await Product.create({
                name,  image, type, countInStock, price, rating, description
            });
            

            if (createProduct) {
                return resolve({
                    status: 'OK',
                    message: 'PRODUCT CREATED SUCCESSFULLY',
                    data: createProduct
                });
            }

        } catch (e) {
            return reject(e);
        }
    });
};

const updateProduct = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
           

            if (checkProduct === null) {
                return resolve({
                    status: "OK",
                    message: "The product is not defined"
                });
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            return resolve({
                status: "OK",
                message: "Product updated successfully",
                data: updateProduct
            });

        } catch (e) {
            return reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ 
                _id: id 
            });

            if (checkProduct === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined"
                });
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: "OK",
                message: "Product deleted successfully"
            });

        } catch (e) {
            return reject(e);
        }
    });
};


const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();

            // Xử lý sắp xếp (sort)
            let sortObj = {};
            if (sort) {
                const sortFields = sort.split(",");
                sortFields.forEach(field => {
                    sortObj[field] = 1;
                });
            }

            // Xử lý bộ lọc (filter)
            let objectFilter = {};
            if (filter) {
                const filterArr = filter.split(","); // Mảng chứa các bộ lọc, ví dụ: ["name:iphone", "type:electronics"]
                filterArr.forEach(f => {
                    const [field, value] = f.split(":"); // Phân tách theo dấu ":"
                    if (field && value) {
                        objectFilter[field] = { $regex: value, $options: "i" }; // Tìm kiếm không phân biệt hoa thường
                    }
                });
            }

            console.log("Filter applied:", objectFilter); // Kiểm tra filter trước khi query

            // Truy vấn MongoDB
            const allProducts = await Product.find(objectFilter)
                .limit(limit)
                .skip(page * limit)
                .sort(sortObj);

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allProducts,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit),
            });

        } catch (e) {
            return reject(e);
        }
    });
};

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ 
                _id: id 
            });

            if (product === null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined"
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product
            });

        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}


