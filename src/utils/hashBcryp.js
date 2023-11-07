const bcrypt = require('bcrypt')

exports.createHash = password => bcrypt.hash(password, bcrypt.genSaltSync(10))

exports.isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)