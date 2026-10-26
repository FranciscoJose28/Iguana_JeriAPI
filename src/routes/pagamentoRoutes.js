import {Router} from "express"
import { buscarTodos, buscarUm, criar, deletar, editar, webhook } from "../controllers/pagamentoController.js"

export const pagamentoRoutes = Router()

// pagamentoRoutes.post("/webhook", async (req, res) => {
//     // #swagger.tags = ['Pagamentos']
//     // #swagger.description = 'Recebe notificações de pagamento do Mercado Pago e atualiza o pedido correspondente.'
//     /* #swagger.parameters['obj'] = {
//             in: 'body',
//             schema: {
//                 type: 'payment',
//                 data: { id: '123456789' }
//             }
//     } */
//     /* #swagger.responses[200] = {
//             description: 'Notificação processada ou ignorada.'
//     } */
//     /* #swagger.responses[400] = {
//             description: 'ID do pagamento inválido ou ausente.'
//     } */
//     /* #swagger.responses[404] = {
//             description: 'Pagamento não encontrado.'
//     } */
//     try {
//         const resultado = await webhook(req)
//         res.status(resultado.status).json(resultado.body)
//     } catch (error) {
//         console.error("Erro ao processar webhook do Mercado Pago:", error);
//         res.status(500).json({
//             tipo: "error",
//             mensagem: "Erro interno ao processar a notificação."
//         });
//     }
// })

pagamentoRoutes.get("/", async (req, res) => {
    // #swagger.tags = ['Pagamentos']
    // #swagger.description = 'Retorna lista de pagamentos'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de pagamentos',
            schema: [{
                id: 1,
                metodo: "Metodo de pagamento",
                status: "Status do pagamento",
                data_pagamento: "Data do pagamento",
                valor: "Valor total"
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

pagamentoRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Pagamentos']
    // #swagger.description = 'Retorna um pagamento'
    /* #swagger.responses[200] = {
            description: 'Retorna um pagamento',
            schema: {
                id: 1,
                metodo: "Metodo de pagamento",
                status: "Status do pagamento",
                data_pagamento: "Data do pagamento",
                valor: "Valor total"
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

pagamentoRoutes.post("/", async (req, res) => {
    // #swagger.tags = ['Pagamentos']
    // #swagger.description = 'Registra um pagamento'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $metodo: "Metodo de pagamento",
                    $status: "Status do pagamento",
                    $data_pagamento: "Data do pagamento",
                    $valor: "Valor total"
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
    res.json(await criar(req))
})

pagamentoRoutes.put("/:id", async (req, res) => {
    // #swagger.tags = ['Pagamentos']
    // #swagger.description = 'Edita um pagamento'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $id: 1,
                    $metodo: "Metodo de pagamento",
                    $status: "Status do pagamento",
                    $data_pagamento: "Data do pagamento",
                    $valor: "Valor total"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Pagamento atualizado.',
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

pagamentoRoutes.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Pagamentos']
    // #swagger.description = 'Deleta um pagamento.'
    /* #swagger.responses[200] = {
            description: 'Pagamento deletado',
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
