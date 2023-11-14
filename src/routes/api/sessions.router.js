const { Router } = require('express')
const { userModel } = require('../../Daos/Mongo/models/users.model.js')
const { createHash, isValidPassword } = require('../../utils/hashBcryp.js')
const { generateToken } = require('../../utils/jsonWebToken.js')
const { initializePassport } = require('../../config/passportJwt.js')
const passport = require('passport');

// __________________________________________________________ passport _____________________________________________

initializePassport();
const router = Router()

router.post('/login', async (req,res) => {
    const { email, password } = req.body
   
    // validar que venga email y password

    // buscar el usuario 
    const user = await userModel.findOne({email})
    // console.log('user Login',user)
    if (!user) return res.status(401).send({status: 'error', error: 'Usuario no existe'})

    if (!isValidPassword(password, user)) {
        return res.status(401).send({status: 'error', error: 'Datos ingresados incorrectos'})
    }   

    const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    })
    
    // dos formas de enviar el token
    // cookie me sirve para mi habdlebar
    res.cookie('cookieToken', token, {
        maxAge: 60*60*10000,
        httpOnly: true
    }).status(200).send({
        status: 'success',
        // token: token,
        message: 'loggen successfully'
    })

    // res.send('logueado')
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const jwtPayload = req.user;
    res.json(jwtPayload);
});


module.exports = router