import { prisma } from "../utils/index.js";

async function criar(dados) {
    try {
        delete dados.token;
        let favorito = await prisma.favoritos.findFirst({
            where: {
                id_cliente: Number(dados.id_cliente),
                id_produto: Number(dados.id_produto)
            }
        });
        if (favorito) {
            await deletar(favorito.id)
            return {
                    tipo: "success",
                    mensagem: "Item removido!"
                }
        } else {
            let req = await prisma.favoritos.create({
                data: dados
            })
            if (req) {
                return {
                    tipo: "success",
                    mensagem: "Favorito criado com sucesso!"
                }
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function buscarTodos(id) {
    try {
        return await prisma.favoritos.findMany({
            where: {
                id_cliente: Number(id)
            },
            include: {
                produto: {
                    include: {
                        produto_imagem: true
                    }
                }
            }
        })
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