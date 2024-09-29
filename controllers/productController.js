const { default: slugify } = require("slugify");
const ProductModel = require("../models/Product");

const Get = async (req, res) => {
    try {
        const subOutline = await ProductModel.find();
        res.status(200).json(subOutline);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server gặp lỗi, vui lòng thử lại sau ít phút" });
    }
};

const GetById = async (req, res) => {
    try {
        const { id } = req.params;

        const find = await ProductModel.findById(id);
        if (!find) {
            return res.status(404).json({ message: "Không tìm thấy quiz", status: 404 });
        }

        res.status(200).json(find);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server gặp lỗi, vui lòng thử lại sau ít phút" });
    }
};

const Create = async (req, res) => {
    try {
        const { title, image, price, description } = req.body;
        if (!title || !image || !price || !description) {
            return res.status(400).json({ message: "Vui lòng điền đẩy đủ trường title, image, price, description" });
        }

        const newProduct = new ProductModel({
            slug: slugify(title, { lower: true }) + "-" + Math.floor(Math.random() * 1000),
            title,
            image,
            price,
            description,
            date: new Date(),
        });

        await newProduct.save();
        res.status(201).json({ message: "Thêm thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server gặp lỗi, vui lòng thử lại sau ít phút" });
    }
};

const Update = async (req, res) => {
    try {
        const { title, image, price, description } = req.body;
        const { id } = req.params;
        console.log(id);
        if (!title || !image) {
            return res.status(400).json({ message: "Vui lòng điền đẩy đủ trường title, image, price, description" });
        }

        const updatedQuiz = await ProductModel.findByIdAndUpdate(
            id,
            {
                slug: slugify(title, { lower: true }) + "-" + Math.floor(Math.random() * 1000),
                title,
                price,
                description,
                image,
            },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ message: "Không tìm thấy quiz để cập nhật", status: 404 });
        }

        res.status(200).json({ message: "Cập nhật Quiz thành công", updatedQuiz });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server gặp lỗi, vui lòng thử lại sau ít phút" });
    }
};

const Delete = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server gặp lỗi, vui lòng thử lại sau ít phút" });
    }
};

module.exports = {
    Get,
    GetById,
    Create,
    Update,
    Delete,
};
