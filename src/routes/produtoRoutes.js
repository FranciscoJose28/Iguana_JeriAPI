import {Router} from "express"
import { buscarTodos, buscarUm, criar, deletar, editar, criarImagem, buscarTodasImagens } from "../controllers/produtoController.js"

export const produtoRoutes = Router()

produtoRoutes.get("/", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Retorna lista de produtos'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de produtos',
            schema: [{
                id: 1,
                nome: "Nome do produto",
                descricao: "Descrição do produto",
                tamanha: "Tamanho do produto",
                cor: "Cor do produto",
                valor: "Valor do produto",
                estoque: "Quantidade disponível do produto",
                desconto: "Desconto do produto"
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

// produtoRoutes.get("/imagem", async (req, res) => {
//     // #swagger.tags = ['Imagens']
//     // #swagger.description = 'Retorna lista de imagens'
//     /* #swagger.responses[200] = {
//             description: 'Retorna lista de imagens',
//             schema: [{
//                 id: 1,
//                 imagem: "endereço da imagem",
//                 id_produto: 1
//             }]
//     } */
//     /* #swagger.responses[422] = {
//             description: 'Erro interno',
//             schema: {
//                 tipo: "error",
//                 mensagem: 'mensagem do sistema'
//             }
//     } */
//    console.log("teste");
   
//     res.json(await buscarTodasImagens())
// })

produtoRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Retorna um produto'
    /* #swagger.responses[200] = {
            description: 'Retorna um produto',
            schema: {
                id: 1,
                nome: "Nome do produto",
                descricao: "Descrição do produto",
                tamanha: "Tamanho do produto",
                cor: "Cor do produto",
                valor: "Valor do produto",
                estoque: "Quantidade disponível do produto",
                desconto: "Desconto do produto"
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
   
   if(req.params.id == "imagem"){
        console.log(req.params.id);
        res.json(await buscarTodasImagens())
    } else{
        res.json(await buscarUm(req.params.id))
    }
})

produtoRoutes.post("/", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Registra um produto'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $nome: "Nome do produto",
                    $descricao: "Descrição do produto",
                    $tamanha: "Tamanho do produto",
                    $cor: "Cor do produto",
                    $valor: "Valor do produto",
                    $estoque: "Quantidade disponível do produto",
                    $desconto: "Desconto do produto"
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

produtoRoutes.post("/imagem", async (req, res) => {
    res.json(await criarImagem(req));
})

produtoRoutes.put("/:id", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Edita um produto'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $id: 1,
                    $nome: "Nome do produto",
                    $descricao: "Descrição do produto",
                    $tamanha: "Tamanho do produto",
                    $cor: "Cor do produto",
                    $valor: "Valor do produto",
                    $estoque: "Quantidade disponível do produto",
                    $desconto: "Desconto do produto"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Produto atualizado.',
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

produtoRoutes.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Deleta um produto.'
    /* #swagger.responses[200] = {
            description: 'Produto deletado',
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

produtoRoutes.delete("/imagem/:id", async (req, res) => {
    // #swagger.tags = ['Produto Imagem']
    // #swagger.description = 'Deleta uma imagem de produto'
    /* #swagger.responses[200] = {
            description: 'Imagem deletada',
            schema: {
                mensagem: 'Imagem deletada com sucesso.',
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
   res.json(await deletarImagem(req.params.id));
});