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
      res.status(403);
      next(new Error('Forbidden'));
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
