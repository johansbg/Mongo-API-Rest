const allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        const role  = req.user.rol;
        if(!(accessLevel & role)) {
            res.status(403).json({ msg: 'No cuenta con permisos para ejecutar esta tarea'})
            return;
        }

        callback(req, res)
    }

    return checkUserRole;
}

export { allowOnly }