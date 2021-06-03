import Joi  from '@hapi/joi';

const schemaRegister = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    rol: Joi.number().min(1).max(8).required()
})

const schemaRegisterAdmin = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(2).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
})

export { 
    schemaRegister,
    schemaRegisterAdmin,
    schemaLogin
}