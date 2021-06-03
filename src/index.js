import express from 'express';
import bodyparser from 'body-parser';
import passport from 'passport';
import { connectDB } from './models/index'

const app = express();
// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
connectDB()
// import routes
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'Corriendo serivdor Node'
    })
});
require('./routes/auth')(app);
require('./routes/task')(app);
require('./routes/comment')(app);
// passport middleware
app.use(passport.initialize());
// passport config
require('./middleware/passport')(passport);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${PORT}`)
})