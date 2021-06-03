import passport from 'passport';
import config from '../middleware/config';
import { allowOnly } from '../helpers/routesHelper';
import { register, login, registerAdmin} from '../controllers/auth'

// testing postman Authorization bearer token

module.exports = (app) => {
    // create a new user
    app.post('/api/user/register', register);
    // login user
    app.post('/api/user/login', login);
    // create a new admin user
    app.post('/api/users/register/Admin', 
    passport.authenticate('jwt', {
        session: false,
    }),
    allowOnly(config.accessLevels.admin, registerAdmin));
};