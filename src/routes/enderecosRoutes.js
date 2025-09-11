import {Router} from "express"
import { buscarTodos, buscarUm, criar, deletar, editar } from "../controllers/enderecosController.js"

export const enderecosRoutes = Router()

enderecosRoutes.get("/", async (req, res) => {
    // #swagger.tags = ['Endereços']
    // #swagger.description = 'Retorna lista de endereços'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de endereços',
            schema: [{
                id: 1,
                logradouro: "Texto do endereço",
                bairro: "Bairro do cliente",
                cidade: "Cidade que o cliente mora",
                estado: "Estado que o cliente mora"
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

enderecosRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Endereços']
    // #swagger.description = 'Retorna um endereço'
    /* #swagger.responses[200] = {
            description: 'Retorna um endereço',
            schema: {
                id: 1,
                logradouro: "Endereço registrado",
                bairro: "Bairro registrado",
                cidade: "Cidade registrada",
                estado: "Estado registrado"
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

enderecosRoutes.post("/", async (req, res) => {
    // #swagger.tags = ['Endereços']
    // #swagger.description = 'Registra um endereço'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $logradouro: "Endereço registrado",
                    $bairro: "Bairro registrado",
                    $cidade: "Cidade registrada",
                    $estado: "Estado registrado"
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

enderecosRoutes.put("/:id", async (req, res) => {
    // #swagger.tags = ['Endereços']
    // #swagger.description = 'Edita um endereço'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $id: 1,
                    $logradouro: "Endereço registrado",
                    $bairro: "Bairro registrado",
                    $cidade: "Cidade registrada",
                    $estado: "Estado registrado"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Endereço atualizado.',
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

enderecosRoutes.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Endereços']
    // #swagger.description = 'Deleta um endereço.'
    /* #swagger.responses[200] = {
            description: 'Endereço deletado',
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
