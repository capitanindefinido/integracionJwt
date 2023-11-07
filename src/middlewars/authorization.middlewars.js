exports.authorization = roleArray => {
    return async (req, res, next) => {
        try {
            if(!req.user) return res.status(401).send({status: 'error', error: 'Unauthorized'})
            // if(role !== req.user.role)
            if(!roleArray.includes(req.user.role.toUpperCase())) return res.status(401).send({status: 'error', error: 'Not permissions'})
            next()
        } catch (error) {
            console.log(error)
        }
    }
}