const userRoutes = require('./users.routes');
const productRoutes = require('./products.routes');
const categoryRoutes = require('./category.routes');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({ storage: storage });

function routes(app) {
    app.post('/api/register', userRoutes);
    app.post('/api/login', userRoutes);

    ///// product
    app.post('/api/products', productRoutes);

    //// category
    app.post('/api/create-category', categoryRoutes);
    app.get('/api/get-all-category', categoryRoutes);
    app.delete('/api/delete-category', categoryRoutes);
    app.post('/api/update-category', categoryRoutes);

    app.post('/api/upload', upload.single('image'), (req, res) => {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({
            message: 'Uploaded successfully',
            image: `http://localhost:3000/uploads/images/${file.filename}`,
        });
    });

    app.post('/api/uploads', upload.array('images'), (req, res) => {
        const file = req.files;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const images = file.map((file) => {
            return `http://localhost:3000/uploads/images/${file.filename}`;
        });
        res.json({
            message: 'Uploaded successfully',
            images,
        });
    });
}

module.exports = routes;
