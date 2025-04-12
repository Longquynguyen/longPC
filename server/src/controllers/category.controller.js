const { BadRequestError } = require('../core/error.response');
const { OK, Created } = require('../core/success.response');
const modelCategory = require('../models/category.model');

class controllerCategory {
    async createCategory(req, res) {
        const { name, image } = req.body;
        if (!name || !image) {
            throw new BadRequestError('Tên và ảnh là bắt buộc');
        }
        const category = await modelCategory.create({ name, image });
        new Created({
            message: 'Create category successfully',
            metadata: category,
        }).send(res);
    }

    async getAllCategory(req, res) {
        const categories = await modelCategory.findAll({});
        new OK({
            message: 'Get all category successfully',
            metadata: categories,
        }).send(res);
    }

    async deleteCategory(req, res) {
        const { id } = req.query;
        const category = await modelCategory.findByPk(id);
        if (!category) {
            throw new BadRequestError('Category not found');
        }
        const result = await category.destroy();
        new OK({
            message: 'Delete category successfully',
            metadata: result,
        }).send(res);
    }

    async updateCategory(req, res) {
        const { name, image, id } = req.body;
        console.log(req.body);

        const category = await modelCategory.findByPk(id);
        if (!category) {
            throw new BadRequestError('Category not found');
        }
        const result = await category.update({ name, image });
        new OK({ message: 'Thành công', metadata: result }).send(res);
    }
}

module.exports = new controllerCategory();
