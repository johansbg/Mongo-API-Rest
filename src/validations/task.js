import Joi  from '@hapi/joi';

const schemaCreateTask = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).required()
})

const schemaUpdatetask = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).required()
})

export { 
    schemaCreateTask,
    schemaUpdatetask
}