'use strict';

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

var userController = {
    login: function (req, res) {
        try {
            var user = req.body;
            if (user) {
                User.findOne({
                    where: {
                        email: user.email,
                        password: user.password
                    }
                }).then(function (user) {
                    if (user) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                            expiresIn: '7d' // expires in 5min
                        });
                        res.status(200).send({type:'success', message:'Usuário logado com sucesso', auth: true, token: token, 'data': user });
                    } else {
                        res.status(404).send({type: 'error', message: 'Usuário não encontrado!'});
                    }
                });
            } else {
                res.status(401).send({type: 'error', message: 'Usuário não informado!'});
            }
        } catch (error) {
            res.status(500).send({type: 'error', message: 'Erro ao realizar login!', error: error});
        }
    },
    verifyToken: function (req, res, next) {
        try{
            var token = req.headers['x-access-token'];
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                // se tudo estiver ok, salva no request para uso posterior
                req.userId = decoded.id;
                next();
            });
        } catch (error) {
            res.status(500).send({type: 'error', message: 'Erro ao verificar token!', error: error});
        }
    },
    myUser: function (req, res) {
        //get user by id from token
        try{
            var token = req.headers['x-access-token'];
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                // se tudo estiver ok, salva no request para uso posterior
                req.userId = decoded.id;
                User.findOne({
                    where: {
                        id: req.userId
                    }
                }).then(function (user) {
                    if (user) {
                        res.status(200).send({type:'success', message:'Usuário encontrado com sucesso', auth: true, 'data': user });
                    } else {
                        res.status(404).send({type: 'error', message: 'Usuário não encontrado!'});
                    }
                });
            });
        } catch (error) {
            res.status(500).send({type: 'error', message: 'Erro ao buscar usuário!', error: error});
        }
    },
    saveUser: function (req, res) {
        try {
            var user = req.body;
            console.log(user)
            if(!user.email) {
                res.status(401).send({type: 'error', message: 'E-mail não informado!'});
            } else if(!user.password) {
                res.status(401).send({type: 'error', message: 'Senha não informada!'});
            } else if(!user.name) {
                res.status(401).send({type: 'error', message: 'Nome não informado!'});
            }
            if (user) {
                User.findOne({
                    where: {
                        email: user.email
                    }
                }).then(function (findUser) {
                    if (findUser) {
                        res.status(401).send({type: 'error', message: 'Usuário já cadastrado!'});
                    } else {
                        User.create(user).then(function (user) {
                            res.status(200).send({type: 'success', message: 'Usuário cadastrado com sucesso!', user: user});
                        });
                    }
                });
            } else {
                res.status(400).send({type: 'error', message: 'Usuário não informado!'});
            }
        } catch (error) {
            res.status(500).send({type: 'error', message: 'Erro ao cadastrar usuário!', error: error});
        }
    },
    getUsers: function (req, res) {
        try {
            User.findAll().then(function (users) {
                if (users) {
                    res.status(200).send({type: 'success', message: 'Usuários encontrados!', users: users});
                } else {
                    res.status(404).send({type: 'error', message: 'Nenhum usuário encontrado!'});
                }
            });
        } catch (error) {
            res.status(500).send({type: 'error', message: 'Erro ao buscar usuários!', error: error});
        }
    },
    getUser: function (req, res) {
        try {
            var id = req.params.id;
            if (id) {
                User.findOne({
                    where: {
                        id: id
                    }
                }).then(function (user) {
                    if (user) {
                        res.status(200).send({type: 'success', message: 'Usuário encontrado!', data:user});
                    } else {
                        res.status(404).send({ type: 'error', message: 'Usuário não encontrado!', 'data': null });
                    }
                });
            } else {
                res.status(400).send('Bad request!');
            }
        } catch (error) {
            res.status(500).send({type: 'error', message: 'Erro ao buscar usuário!', error: error});
        }
    },
    updateUser: function (req, res) {
        try {
            var id = req.params.id;
            var user = req.body;
            if (id && user) {
                User.update(user, {
                    where: {
                        id: id
                    }
                }).then(function (user) {
                    if (user) {
                        res.status(200).send({type: 'success', message: 'Usuário atualizado com sucesso!', data: user});
                    } else {
                        res.status(404).send({type: 'error', message: 'Usuário não encontrado!'});
                    }
                });
            } else {
                res.status(400).send({type: 'error', message: 'Usuário não informado!'});
            }
        } catch (error) {
            res.status(500).send({type: 'error', message: 'Erro ao atualizar usuário!', error: error});
        }
    },
    deleteUser: function (req, res) {
        try {
            var id = req.params.id;
            if (id) {
                User.destroy({
                    where: {
                        id: id
                    }
                }).then(function (user) {
                    if (user) {
                        res.status(200).send({type: 'success', message: 'Usuário deletado com sucesso!', data: user});
                    } else {
                        res.status(404).send({type: 'error', message: 'Usuário não encontrado!'});
                    }
                });
            } else {
                res.status(400).send({type: 'error', message: 'Usuário não informado!'});
            }
        } catch (error) {
            res.status(500).send({type: 'error', message: 'Erro ao deletar usuário!', error: error});
        }
    }
};

module.exports = userController;