import Joi  from '@hapi/joi';

const schemaCreateComment = Joi.object({
    task: Joi.string().required(),
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).required()
})

const schemaUpdateComment = Joi.object({
    task: Joi.string().required(),
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).required()
})

export { 
    schemaCreateComment,
    schemaUpdateComment
}