const express = require('express');
const app = express();
const port = 3000;

const { connectDB } = require('./config/index');
const routes = require('./routes/index');

const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
routes(app);

app.use(express.static(path.join(__dirname, '../src')));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Lỗi server',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
