// Conexión a Base de datos
import mongoose from 'mongoose';
require('dotenv').config()

const connectDB = () => {
    const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pfqhc.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))
}

export{
    connectDB
}