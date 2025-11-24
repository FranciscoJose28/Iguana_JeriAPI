import { prisma } from "../utils/index.js";

async function buscarTodos() {
    try {
        return await prisma.pedido.findMany()
    } catch (error) {
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

async function buscarUm(id) {
    try {
        let req = await prisma.pedido.findFirst({
            where:{
                id: Number(id)
            }
        })
        if(req){
            return {
                tipo: "error",
                mensagem: "Registro não encontrado."
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

async function criar(dados) {
    try {
        let req = await prisma.pedido.create({
            data: dados
        })
        if(req){
            return {
                tipo: "success",
                mensagem: "Registro criado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

async function editar(dados, id) {
    try {
        let req = await prisma.pedido.update({
            where:{
                id: Number(id)
            },
            data: dados
        })
        if(req){
            return {
                tipo: "success",
                mensagem: "Registro editado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

async function deletar(id) {
    try {
        let req = await prisma.pedido.delete({
            where:{
                id: Number(id)
            }
        })
        if(req){
            return {
                tipo: "success",
                mensagem: "Registro deletado com sucesso!"
            }
        }
    } catch (error) {
        if (error.code === "P2003") {
            return {
                tipo: "error",
                mensagem:
                    "Não é possível excluir este registro, pois está sendo utilizado.",
            };
        }
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

export {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}