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
const { MostrarUsuarios, AgregarUsuario, ActualizarUsuarios } = require('../controllers/usuarios.controller');

router.get('/', MostrarUsuarios);
router.post('/',AgregarUsuario);
router.put('/',ActualizarUsuarios);


module.exports = router;