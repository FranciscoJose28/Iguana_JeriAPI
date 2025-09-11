import {Router} from "express"
import { buscarTodos, buscarUm, criar, deletar, editar } from "../controllers/pedidoController.js"

export const pedidoRoutes = Router()

pedidoRoutes.get("/", async (req, res) => {
    // #swagger.tags = ['Pedidos']
    // #swagger.description = 'Retorna lista de pedidos'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de pedidos',
            schema: [{
                id: 1,
                data_pedido: "Data do pedido",
                status: "Status do pedido",
                valor: "Valor total",
                transportadora: "Transportadora responsável pela entrega",
                data_envio: "Data do envio",
                data_entrega: "Data da entrega",
                desconto: "Desconto do pedido"
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

pedidoRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Pedidos']
    // #swagger.description = 'Retorna um pedido'
    /* #swagger.responses[200] = {
            description: 'Retorna um pedido',
            schema: {
                id: 1,
                data_pedido: "Data do pedido",
                status: "Status do pedido",
                valor: "Valor total",
                transportadora: "Transportadora responsável pela entrega",
                data_envio: "Data do envio",
                data_entrega: "Data da entrega",
                desconto: "Desconto do pedido"
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

pedidoRoutes.post("/", async (req, res) => {
    // #swagger.tags = ['Pedidos']
    // #swagger.description = 'Registra um pedido'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $data_pedido: "Data do pedido",
                    $status: "Status do pedido",
                    $valor: "Valor total",
                    $transportadora: "Transportadora responsável pela entrega",
                    $data_envio: "Data do envio",
                    $data_entrega: "Data da entrega",
                    $desconto: "Desconto do pedido"
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

pedidoRoutes.put("/:id", async (req, res) => {
    // #swagger.tags = ['Pedidos']
    // #swagger.description = 'Edita um pedido'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $id: 1,
                    $data_pedido: "Data do pedido",
                    $status: "Status do pedido",
                    $valor: "Valor total",
                    $transportadora: "Transportadora responsável pela entrega",
                    $data_envio: "Data do envio",
                    $data_entrega: "Data da entrega",
                    $desconto: "Desconto do pedido"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Pedido atualizado.',
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

pedidoRoutes.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Pedidos']
    // #swagger.description = 'Deleta um pedido.'
    /* #swagger.responses[200] = {
            description: 'Pedido deletado',
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
