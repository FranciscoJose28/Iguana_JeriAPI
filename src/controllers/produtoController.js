import { prisma } from "../utils/index.js";
import { formidable } from "formidable";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const copyFileAsync = promisify(fs.copyFile);
const unlinkAsync = promisify(fs.unlink);

async function buscarTodos() {
    try {
        return await prisma.produto.findMany({
            include: {
                produto_imagem: true,
                categoria: true
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
        let req = await prisma.produto.findFirst({
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
        let req = await prisma.produto.create({
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
        let req = await prisma.produto.update({
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
        let req = await prisma.produto.delete({
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

async function criarImagem(req) {
    try {
        const form = formidable({});

        const resultado = new Promise((resolve, reject) => {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    resolve({
                        tipo: "error",
                        mensagem: error.message
                    });
                }

                if (!files.imagem) {
                    resolve({
                        tipo: "warning",
                        mensagem: 'O arquivo é obrigatório'
                    });
                }

                const filenameOriginal = files.imagem[0].originalFilename;

                if (!filenameOriginal.includes("png") && !filenameOriginal.includes("jpg")) {
                    resolve({
                        tipo: "warning",
                        mensagem: 'O arquivo precisa ser do tipo PNG ou JPG'
                    });
                }

                const oldpath = files.imagem[0].filepath;
                const filename = filenameOriginal.split('.');
                const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
                const newpath = path.join(__dirname, '../uploads/produtos', newFilename);

                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);

                await prisma.produto_imagem.create({
                    data: {
                        id_produto: Number(fields.id_produto[0]),
                        imagem: `${req.protocol}://${req.headers.host}/uploads/produtos/${newFilename}`
                    }
                });
                resolve({
                    tipo: "success",
                    mensagem: 'Registro criado com sucesso!'
                });
            });

        })
        return resultado;
    } catch (error) {
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

async function buscarTodasImagens() {
    try {
        return await prisma.produto_imagem.findMany()
    } catch (error) {
        return {
            tipo: "error",
            mensagem:error.message
        }
    }
}

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

        const filePath = path.join(process.cwd(), "uploads/produtos", imagem.imagem);

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
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar,
    criarImagem,
    buscarTodasImagens,
    deletarImagem
}