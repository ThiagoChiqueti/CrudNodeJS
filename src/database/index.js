import mongoose from 'mongoose';

import config from '../config/database';
import database from '../config/database';

class DataBase{
    constructor(){
        this.connection = mongoose.connect(
            //Conexão com o MongoDb
            config.url,
            //Confirgurações do mongoose
            {
                useUnifiedTopology: true,
            }
        )
    }
}
export default new DataBase()