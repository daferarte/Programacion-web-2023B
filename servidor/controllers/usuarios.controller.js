/**
 * @author Daniel Arteaga
 * @version 1.0.0
 * 
 * Controlador de usuarios
 * En este metodo se definen los metodos de usuario
 */

const { PrismaClient } = require('@prisma/client');
const {response, request }=require('express');


const prisma=new PrismaClient();

const MostrarUsuarios = async(req=request, res=response)=>{
    const usuarios = await prisma.user.findMany()
    .catch((e)=>{
        return e.message;
    }).finally((async ()=>{
        await prisma.$disconnect();
    }));

    res.json({
        usuarios
    })

}

const AgregarUsuario = async(req=request, res=response)=>{

    const { email,  password} = req.body;
    
    const result = await prisma.user.create({
        data: {
            email,
            password
        }
    }).catch((e)=>{
        return e.message;
    }).finally((async ()=>{
        await prisma.$disconnect();
    }));

    res.json({
        result
    })
}

const ActualizarUsuarios = async(req=request, res=response)=>{
    
    const {id} = req.params;

    const { email,  password} = req.body;

    const result = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            email,
            password
        }
    }).catch((e)=>{
        return e.message;
    }).finally((async ()=>{
        await prisma.$disconnect();
    }));
    
    res.json({
        msg: 'actualizado',
        result
    })
}

const EliminarUsuario =async(req=request, res=response)=>{
    const {id} = req.params;
    const result = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    }).catch((e)=>{
        return e.message;
    }).finally((async ()=>{
        await prisma.$disconnect();
    }));

    res.json({
        msg: 'Eliminado',
        result
    })
}

module.exports = {
    MostrarUsuarios,
    AgregarUsuario,
    ActualizarUsuarios,
    EliminarUsuario
}