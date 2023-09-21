/**
 * @author Daniel Arteaga
 * @version 1.0.0
 * 
 * Rutas de usuario
 * en esta clase se definen las rutas de ususario
 */

const { Router } = require('express');

const router= Router();

/**
 * Importando metodos
 */
const { MostrarUsuarios, AgregarUsuario, ActualizarUsuarios, EliminarUsuario, iniciarSesion } = require('../controllers/usuarios.controller');
const { validarJWT }=require('../middlewares/validar-jwt');

router.get('/', validarJWT, MostrarUsuarios);
router.post('/',AgregarUsuario);
router.put('/:id',ActualizarUsuarios);
router.delete('/:id', EliminarUsuario);

router.post('/login/', iniciarSesion)

module.exports = router;