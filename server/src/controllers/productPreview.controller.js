const productPreview = require('../models/productPreview');

const { BadRequestError } = require('../core/error.response');
const { Created, OK } = require('../core/success.response');

class ProductPreviewController {
    static async createProductPreview(req, res) {
        const { productId, rating, content } = req.body;
        if (!productId || !rating || !content) {
            throw new BadRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const { id } = req.user;
        const dataProductPreview = await productPreview.create({ productId, rating, content, userId: id });
        new Created({ message: 'Đánh giá sản phẩm thành công', metadata: dataProductPreview }).send(res);
    }
}

module.exports = ProductPreviewController;
