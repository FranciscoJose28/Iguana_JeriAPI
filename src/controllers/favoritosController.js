import { prisma } from "../utils/index.js";

async function criar(dados) {
    try {
        delete dados.token;
        let req = await prisma.favoritos.create({
            data: dados
        })
        if (req) {
            return {
                tipo: "success",
                mensagem: "Favorito criado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function buscarTodos() {
    try {
        return await prisma.favoritos.findMany()
    } catch (error) {
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

async function deletar(id) {
    try {
        let req = await prisma.favoritos.delete({
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
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

export { criar, deletar, buscarTodos };