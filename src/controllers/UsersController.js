import User from "../models/user"
import { createPasswordHash } from "../services/auth"

//mostra uma lista con todos os usuários
class UserController{

    async index(req, res){
       try {

        const users = await User.find()
        return res.json(users)

       } catch (err) {

        console.error(err)
        return res.status(500).json({error: "Internal Server Error."})

       }
    }

    //Mostra um usuário especifico
    async show(req, res){
        try {

            const { id } = req.params
            const user = await User.findById(id)
            if(!user){
                return res.status(404).json()
            }

            return res.json(user)
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({error: "Internal Server Error."})
        }
        
    }

    //Cria um novo usuário
    async create(req, res){
        try {

            const {email, password} = req.body;
            const user = await User.findOne({ email }); // verifica se o usuário existe

            if(user){
                return res.status(422).json({Message: `User ${email} already exists.`})
            }

            // cripto password 

            const encryptedPassword = await createPasswordHash(password)
            

            const newUser = await User.create({
                email,
                password: encryptedPassword
                })

            return res.status(201).json(newUser)

        } catch (err) {

            console.log(err)

            return res.status(500).json({error: "Internal Server Error."})

        }
     }

     //Atualiza oos parametros de um usuário
     async update(req, res){

        try {
            const {id} =req.params
            const { email, password} = req.body;

            const user = await User.findById(id)

            if(!user){
                return res.status(404).json
            }

            const encryptedPassword = await createPasswordHash(password)

            await user.updateOne({email, password: encryptedPassword})


            return res.status(200).json()
            
        } catch (err) {

            console.log(err)

            return res.status(500).json({error: "Internal Server Error."})
            
        }
        
     }

     //Deleta um usuário através de um id
     async destroy(req, res){
        try {
            const {id} =req.params
            const user = await User.findById(id)

            if(!user){
                return res.status(404).json()
            }

            await user.deleteOne()

            return res.status(200).json()

        } catch (err) {
            
            console.loh(err)
            return res.status(500).json({error: "Internal Server Error."})

        }
     }
}
export default new UserController()