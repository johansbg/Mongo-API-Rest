import passport from 'passport';
import config from '../middleware/config';
import { allowOnly } from '../helpers/routesHelper';
import { createComment, updateComment, deleteComment} from '../controllers/comment'

module.exports = (app) => {
    // create a new task
    app.post('/api/comment/create',
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, createComment));

    app.put('/api/comment/update/:taskId', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, updateComment));

    app.delete('/api/comment/delete/:taskId', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.user, deleteComment));

};