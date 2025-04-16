const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó token de autenticación'
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Agregar el ID del usuario al request
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
}; 