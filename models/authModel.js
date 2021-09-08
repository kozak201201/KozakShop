const bcrypt = require('bcrypt');
const ApiError = require('../exceptions/apiError');
const {User} = require('./models');
const tokenModel = require('./tokenModel');

class AuthModel {
    async registration(login, password) {
        const findUser = await User.findOne({where: {login}});

        if (findUser) {
            throw ApiError.BadRequest('User with this login was found');
        }
        
        const hashPassword = bcrypt.hashSync(password, 3);

        let user = await User.create({login, password: hashPassword});
        user = user.get();

        const userDto = {
            id: user.id,
            login: user.login,
            role: user.role
        }

        const tokens = tokenModel.createTokens(userDto);
        return {...tokens, userDto};
    }

    async login(login, password) {
        const findUser = await User.findOne({where: {login}});

        if (!findUser) {
            throw new ApiError.BadRequest("User with this login wasn't found");
        }

        const isValidPassword = bcrypt.compareSync(password, findUser.password);

        if (!isValidPassword) {
            throw new ApiError.BadRequest("Invalid password");
        }

        const userDto = {
            id: findUser.id,
            login: findUser.login,
            role: findUser.role
        }

        const tokens = tokenModel.createTokens(userDto);
        return {...tokens, userDto};
    }

    async refresh(refreshToken) {
        const data = await tokenModel.valideRefreshToken(refreshToken);
        const userDto = {
            id: data.id, 
            login: data.login, 
            role: data.role
        };

        const tokens = tokenModel.createTokens(userDto);

        return {...tokens}
    }

    async logout(refreshToken) {
        const userDto = await tokenModel.valideRefreshToken(refreshToken);
        return await tokenModel.deleteToken(userDto.login);
    }
}

module.exports = new AuthModel();