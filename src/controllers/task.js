import Task from '../models/task';
import jwt from 'jsonwebtoken';
import {schemaCreateTask, schemaUpdatetask} from '../validations/task'
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

const createTask = async (req, res) => {
    // validate Task
    const { error } = schemaCreateTask.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    //Se puede enviar el id del usuario o obtener el payload del token para obtener el id.
    
    const task = new Task({
        author: getUserLoggedId(req, res),
        title: req.body.title,
        description: req.body.description,
    });
    try {
        const savedTask = await task.save();
        res.status(200).json({
            error: null,
            data: savedTask
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

const showAllTask = async (req, res) => {
    // get All task
    try {
        const task = await Task.find().populate('author').populate( {path:'comments', model:'Comment'});
        res.status(200).json({
            error: null,
            data: task
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

const showAllTaskByLoggedUserId = async (req, res) => {
    // get All task
    try {
        const task = await Task.find({ author: getUserLoggedId(req, res) }).populate('author');
        res.status(200).json({
            error: null,
            data: task
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

const showAllTaskByUserId = async (req, res) => {
    // get All task
    try {
        const task = await Task.find({ author: req.params.userId }).populate('author');
        res.status(200).json({
            error: null,
            data: task
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

const showTaskByTaskId = async (req, res) => {
    // get All task
    try {
        const task = await Task.find({ _id: req.params.taskId }).populate('author');
        res.status(200).json({
            error: null,
            data: task
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

const updateTask = async (req, res) => {
    //Depende del envio se valida o no
    const { error } = schemaUpdatetask.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }

    try {
        await Task.findOneAndUpdate({ _id: req.params.taskId }, req.body ,{upsert: true});
        res.status(200).json({
            error: null,
            message: "Actualizado con exito"
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

const deleteTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.taskId });
        res.status(200).json({
            error: null,
            message: "Eliminado con exito"
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

export { 
    createTask,
    showAllTask,
    showAllTaskByLoggedUserId,
    showAllTaskByUserId,
    showTaskByTaskId,
    updateTask,
    deleteTask
}