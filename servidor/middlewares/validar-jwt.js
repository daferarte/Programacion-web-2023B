const { response } = require('express');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

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

const encriptar = async(data)=>{
    const encript = await CryptoJS.AES.encript(data, process.env.AUTH_AES_SECRET).toString();
    return encript
}

const desencriptar = async (data)=>{
    let bytes = await CryptoJS.AES.decrypt(data, process.env.AUTH_AES_SECRET);
    let decryptData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptData;
}

module.exports = {
    validarJWT,
    crearJWT,
    encriptar,
    desencriptar
}