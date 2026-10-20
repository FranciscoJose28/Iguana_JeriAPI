import { prisma } from "../utils/index.js";

async function buscarTodos(id_cliente, status, cliente) {
    try {
        const where = {}

        if (id_cliente !== undefined && id_cliente !== null && id_cliente !== "") {
            where.id_cliente = Number(id_cliente)
        }

        if (typeof cliente === "string" && cliente.trim() !== "") {
            const buscaCliente = cliente.trim()
            where.cliente = {
                is: {
                    OR: [
                        { nome: { contains: buscaCliente } },
                        { email: { contains: buscaCliente } }
                    ]
                }
            }
        }

        const statusList = (Array.isArray(status)
            ? status.flatMap(value => String(value).split(","))
            : typeof status === "string"
                ? status.split(",")
                : [])
            .map(value => value.trim())
            .filter(Boolean)

        if (statusList.length > 0) {
            where.status = { in: statusList }
        }

        return await prisma.pedido.findMany({ where, 
            include: {
                cliente: {
                    include: {
                        enderecos:true
                    }
                },
                produtos_pedido: {
                    include: {
                        produto: {
                            include: {produto_imagem: true}
                        }
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