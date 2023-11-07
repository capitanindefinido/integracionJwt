const { connect } = require('mongoose')

const connectDb = async () => {
    try {        
        console.log(`Base de datos conectada`)
        return await connect("mongodb+srv://admin:admin@cluster0.es3hczs.mongodb.net/?retryWrites=true&w=majority")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDb }