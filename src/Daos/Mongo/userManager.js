const { userModel } = require("./models/users.model")
// UserDaoMongo
class UserManagerMongo {
    constructor(){
        this.model = userModel
    }

    async getUsers(){
        try {
            return await this.model.find({})
        } catch (error) {
            console.log(error)
        }
    }
    getUserBy = async (uid)=>{
        return await this.model.findOne({_id: uid})
    }
    async createUser(newUser){
        return await this.model.create(newUser)
    }
    async updateUser(){}
    async deleteUser(){}
} 

module.exports = { UserManagerMongo }