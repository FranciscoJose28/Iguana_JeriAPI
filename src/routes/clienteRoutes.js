import {Router} from "express"
import { buscarTodos, buscarUm, criar, deletar, editar } from "../controllers/clienteController.js"

export const clienteRoutes = Router()

clienteRoutes.get("/", async (req, res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.description = 'Retorna lista de clientes'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de clientes',
            schema: [{
                id: 1,
                nome: "Texto do cliente",
                email: "Email do cliente",
                senha: "Senha do cliente",
                telefone: "Telefone do cliente",
                cpf: "CPF do cliente",
                data_nascimento: "Data de nascimento do cliente"
            }]
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await buscarTodos())
})

clienteRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.description = 'Retorna um cliente'
    /* #swagger.responses[200] = {
            description: 'Retorna um cliente',
            schema: {
                id: 1,
                nome: "Texto do cliente",
                email: "Email do cliente",
                senha: "Senha do cliente",
                telefone: "Telefone do cliente",
                cpf: "CPF do cliente",
                data_nascimento: "Data de nascimento do cliente"
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await buscarUm(req.params.id))
})

clienteRoutes.post("/", async (req, res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.description = 'Registra um cliente'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $nome: "Texto do cliente",
                    $email: "Email do cliente",
                    $senha: "Senha do cliente",
                    $telefone: "Telefone do cliente",
                    $cpf: "CPF do cliente",
                    $data_nascimento: "Data de nascimento do cliente"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Registro criado',
            schema: {
                mensagem: 'Registro criado com sucesso',
                tipo: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await criar(req.body))
})

clienteRoutes.put("/:id", async (req, res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.description = 'Edita um cliente'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $id: 1,
                    $nome: "Texto do cliente",
                    $email: "Email do cliente",
                    $senha: "Senha do cliente",
                    $telefone: "Telefone do cliente",
                    $cpf: "CPF do cliente",
                    $data_nascimento: "Data de nascimento do cliente"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Cliente atualizado.',
            schema: {
                mensagem: 'Registro atualizado com sucesso.',
                tipo: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await editar(req.body, req.params.id))
})

clienteRoutes.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Clientes']
    // #swagger.description = 'Deleta um cliente.'
    /* #swagger.responses[200] = {
            description: 'Cliente deletado',
            schema: {
                mensagem: 'Registro deletado com sucesso.',
                tipo: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await deletar(req.params.id))
})
