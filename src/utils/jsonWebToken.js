const jwt = require('jsonwebtoken')

const private_key = 'SecretKeyQueFuncionaParaFirmarToken'

// usuario sin datos sensibles
exports.generateToken = (user) =>  jwt.sign(user, private_key, { expiresIn: '24h' })