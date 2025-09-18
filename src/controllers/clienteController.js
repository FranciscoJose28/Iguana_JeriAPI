import { prisma } from "../utils/index.js";
import bcrypt from "bcrypt";

async function buscarTodos() {
    try {
        return await prisma.cliente.findMany()
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function buscarUm(id) {
    try {
        let req = await prisma.cliente.findFirst({
            where: {
                id: Number(id)
            }
        })
        if (req) {
            return {
                tipo: "error",
                mensagem: "Registro não encontrado."
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function criar(dados) {
    try {
        let senhaSegura = await bcrypt.hash(dados.senha, 10);
        dados = { ...dados, senha: senhaSegura };
        let req = await prisma.cliente.create({
            data: dados
        })
        if (req) {
            return {
                tipo: "success",
                mensagem: "Registro criado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function editar(dados, id) {
    try {
        let req = await prisma.cliente.update({
            where: {
                id: Number(id)
            },
            data: dados
        })
        if (req) {
            return {
                tipo: "success",
                mensagem: "Registro editado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function deletar(id) {
    try {
        let req = await prisma.cliente.delete({
            where: {
                id: Number(id)
            }
        })
        if (req) {
            return {
                tipo: "success",
                mensagem: "Registro deletado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function login(dados) {
    try {
        let clienteExiste = await prisma.cliente.findFirst({
            where: {
                email: dados.email
            }
        })
        if (clienteExiste) {
            let senhaEValida = await bcrypt.compare(dados.senha, clienteExiste.senha);
            return senhaEValida;
        }
        return {
            tipo: "warning",
            mensagem: "email ou senha inválido"
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

export {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar,
    login
}