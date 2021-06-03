import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {schemaRegister, schemaLogin, schemaRegisterAdmin} from '../validations/auth'
require('dotenv').config()

const register = async (req, res) => {

    // validate user
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({error: 'Email ya registrado'})
    }

    if (req.body.rol != 1 && req.body.rol != 2 && req.body.rol != 4 && req.body.rol != 8) return res.status(400).json({ error: 'El rol no existe' });

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        rol: req.body.rol
    });
    try {
        const savedUser = await user.save();
        res.status(200).json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
};


const registerAdmin = async (req, res) => {

    // validate user
    const { error } = schemaRegisterAdmin.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({error: 'Email ya registrado'})
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        rol: 4
    });
    try {
        const savedUser = await user.save();
        res.status(200).json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
};

const login = async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })


    const token = jwt.sign({
        name: user.name,
        _id: user._id
    }, process.env.TOKEN_SECRET)

    res.status(200).json({
        success: true,
        token: 'bearer ' + token,
        role: user.rol,
    });
}

export { 
    register,
    login,
    registerAdmin
}