import { prisma } from "../utils/index.js";
import fs from "fs";
import path from "path";

async function deletarImagem(id) {
    try {
        const imagem = await prisma.produto_imagem.findFirst({
            where: { id: Number(id) }
        });
        if(!imagem) {
            return {
                tipo: "error",
                mensagem: "Imagem não encontrada."
            };
        }

        await prisma.produto_imagem.delete({
            where: { id: Number(id) }
        });

        const filePath = path.join(process.cwd(), "uploads", imagem.nome_arquivo);

        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return {
            tipo: "success",
            mensagem: "Imagem deletada com sucesso."
        };
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

export {
    deletarImagem
}