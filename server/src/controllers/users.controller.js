const modelUser = require('../models/users.model');

const { BadUserRequestError } = require('../core/error.response');
const { OK } = require('../core/success.response');
const { createApiKey, createRefreshToken, createToken, verifyToken } = require('../services/tokenServices');

const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');

class controllerUser {
    async registerUser(req, res) {
        const { fullName, phone, address, email, password } = req.body;
        if (!fullName || !phone || !address || !email || !password) {
            throw new BadUserRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const findUser = await modelUser.findOne({ where: { email } });
        if (findUser) {
            throw new BadUserRequestError('Email đã tồn tại');
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = bcrypt.hashSync(password, salt);
        const dataUser = await modelUser.create({
            fullName,
            phone,
            address,
            email,
            password: passwordHash,
        });

        await dataUser.save();
        await createApiKey(dataUser.id);
        const token = await createToken({ id: dataUser.id, isAdmin: dataUser.isAdmin });
        const refreshToken = await createRefreshToken({ id: dataUser.id });
        res.cookie('token', token, {
            httpOnly: true, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'Strict', // Chống tấn công CSRF
            maxAge: 15 * 60 * 1000, // 15 phút
        });

        res.cookie('logged', 1, {
            httpOnly: false, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'Strict', // Chống tấn công CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });

        // Đặt cookie HTTP-Only cho refreshToken (tùy chọn)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });

        new OK({ message: 'Đăng nhập thành công', metadata: { token, refreshToken } }).send(res);
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadUserRequestError('Vui lòng nhập đầy đủ thông tin');
        }
        const findUser = await modelUser.findOne({ where: { email } });
        if (!findUser) {
            throw new BadUserRequestError('Tài khoản hoặc mật khẩu không chính xác');
        }
        const isPasswordValid = bcrypt.compareSync(password, findUser.password);
        if (!isPasswordValid) {
            throw new BadUserRequestError('Tài khoản hoặc mật khẩu không chính xác');
        }
        const token = await createToken({ id: findUser.id, isAdmin: findUser.isAdmin });
        const refreshToken = await createRefreshToken({ id: findUser.id });
        res.cookie('token', token, {
            httpOnly: true, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'Strict', // Chống tấn công CSRF
            maxAge: 15 * 60 * 1000, // 15 phút
        });
        res.cookie('logged', 1, {
            httpOnly: false, // Chặn truy cập từ JavaScript (bảo mật hơn)
            secure: true, // Chỉ gửi trên HTTPS (để đảm bảo an toàn)
            sameSite: 'Strict', // Chống tấn công CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });
        new OK({ message: 'Đăng nhập thành công', metadata: { token, refreshToken } }).send(res);
    }
}

module.exports = new controllerUser();
