import { Router } from "express";
import { deletarImagem } from "../controllers/imagensController";

export const produtoImagemRoutes = Router();

produtoImagemRoutes.delete("/:id", async (req, res) => {
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