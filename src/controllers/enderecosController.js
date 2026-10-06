import { prisma } from "../utils/index.js";

async function buscarTodos() {
    try {
        return await prisma.enderecos.findMany()
    } catch (error) {
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

async function buscarUm(id) {
    try {
        let req = await prisma.enderecos.findFirst({
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
        let req = await prisma.enderecos.create({
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
        let endereco = await prisma.enderecos.count({
            where: {
                id_cliente: Number(id)
            }
        })
        if (endereco == 0) {
            await criar(dados)
            return;
        }
        let req = await prisma.enderecos.update({
            where:{
                id_cliente: Number(id)
            },
            data: {
                cep: dados.cep,
                logradouro: dados.logradouro,
                numero: dados.numero,
                complemento: dados.complemento,
                bairro: dados.bairro,
                cidade: dados.cidade,
                estado: dados.estado
            }
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
        let req = await prisma.enderecos.delete({
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