class HelloController{
    async index(req, res){
       return res.json({Status:'Conectado'})
    }
}
export default new HelloController()