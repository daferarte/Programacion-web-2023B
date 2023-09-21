const { response } = require('express');
const jwt = require('jsonwebtoken');

const crearJWT = (data) =>{
    const {id, email, password} =data;

    const token = jwt.sign({
        email: email,
        id: id
    }, process.env.AUTH_JWT_SECRET
    )

    return token
}

const validarJWT=(req, res=response, next)=>{
    
    let token = req.header('authorization');

    if(!token){
        return res.status(401).json({
            msg:'error en el token'
        })
    }

    try{
        token=token.replace('Bearer ','');

        const {id, email}=jwt.verify(token, process.env.AUTH_JWT_SECRET);
        console.log(id, email)
    }catch(error){
        return res.status(401).json({
            msg:'Token no valido'
        })
    }

    next()
}

module.exports = {
    validarJWT,
    crearJWT
}