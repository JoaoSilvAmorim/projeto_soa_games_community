'use strict';

const userController = require('../src/controllers/userController');

module.exports = async (app) => {
    await app.route('/login').post(userController.login);
    await app.route('/verify_token').post(userController.verifyToken);
    await app.route('/my_user').post(userController.myUser);
    await app.route('/user').post(userController.saveUser);
    await app.route('/user').get(userController.verifyToken,userController.getUsers);
    await app.route('/user/:id').get(userController.verifyToken, userController.verifyToken, userController.getUser);
    await app.route('/user/:id').put(userController.verifyToken, userController.updateUser);
    await app.route('/user/:id').delete(userController.verifyToken, userController.deleteUser);
};