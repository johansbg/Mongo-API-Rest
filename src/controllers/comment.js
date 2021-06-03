import Comment from '../models/comment';
import Task from '../models/task';
import jwt from 'jsonwebtoken';
import {schemaCreateComment, schemaUpdateComment} from '../validations/comment'
require('dotenv').config()

const getUserLoggedId = (req, res) => {
    var authorization = req.headers.authorization.split(' ')[1], decoded;
    try {
        decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    return decoded._id
}

const createComment = async (req, res) => {
    // validate Task
    const { error } = schemaCreateComment.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    //Se puede enviar el id del usuario o obtener el payload del token para obtener el id.
    
    const comment = new Comment({
        author: getUserLoggedId(req, res),
        task: req.body.task,
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedComment = await comment.save();
        Task.findByIdAndUpdate(
            req.body.task, 
            { $push: { "comments": savedComment._id } },
            { upsert: true}
        );
        res.status(200).json({
            error: null,
            data: savedComment
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

const updateComment= async (req, res) => {

    // Este no lo valido

    try {
        await Comment.findOneAndUpdate({ _id: req.params.commentId }, req.body ,{upsert: true});
        res.status(200).json({
            error: null,
            message: "Actualizado con exito"
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

const deleteComment = async (req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.commentId });
        res.status(200).json({
            error: null,
            message: "Eliminado con exito"
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

export { 
    createComment,
    updateComment,
    deleteComment
}