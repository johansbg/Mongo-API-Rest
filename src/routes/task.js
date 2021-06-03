import passport from 'passport';
import config from '../middleware/config';
import { allowOnly } from '../helpers/routesHelper';
import { createTask, showAllTask, showAllTaskByLoggedUserId, showAllTaskByUserId, showTaskByTaskId, updateTask, deleteTask} from '../controllers/task'

module.exports = (app) => {
    // create a new task
    app.post('/api/task/create',
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, createTask));

    app.get('/api/task', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, showAllTask));

    app.get('/api/task/userLogged', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, showAllTaskByLoggedUserId));

    app.get('/api/task/user/:userId', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, showAllTaskByUserId));

    app.get('/api/task/id/:taskId', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, showTaskByTaskId));

    app.put('/api/task/update/:taskId', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, updateTask));

    app.delete('/api/task/delete/:taskId', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, deleteTask));

};