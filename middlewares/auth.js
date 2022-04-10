const ROLE = {
  ADMIN: 'GC',
  USER: 'UR',
};

const authRole = (role) => (req, res, next) => {
  const { user } = req.session;

  if (user) {
    if (!role) {
      // Si registrado intenta acceder a una ruta para NO registrados se redirige a pagina principal
      res.redirect('/');
    } else if (user.role !== role) {
      // Si el rol no coincide no se permite acceso
      const err = new Error('Forbidden');
      err.status = 403;
      next(err);
    } else {
      // Si el rol es correcto se permite
      next();
    }
  } else if (role) {
    // Si no registrado intenta acceder a una ruta para registrados se redirige a login
    res.redirect('/login');
  } else {
    // NO registrado intenta acceder a una ruta para NO registrados
    next();
  }
};

module.exports = { ROLE, authRole };
