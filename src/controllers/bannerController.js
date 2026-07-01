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
        return await prisma.banners.findMany()
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function buscarUm(id) {
    try {
        let req = await prisma.banners.findFirst({
            where: {
                id: Number(id)
            }
        })
        if (!req) {
            return {
                tipo: "error",
                mensagem: "Registro não encontrado."
            }
        }
        return req;
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function editar(req) {
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
                    return;
                }

                const filenameOriginal = files.imagem[0].originalFilename;

                if (!filenameOriginal.includes("png") && !filenameOriginal.includes("jpg") && !filenameOriginal.includes("webp")) {
                    resolve({
                        tipo: "warning",
                        mensagem: 'O arquivo precisa ser do tipo PNG, JPG ou WEBP'
                    });
                }

                const oldpath = files.imagem[0].filepath;
                const filename = filenameOriginal.split('.');
                const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
                const newpath = path.join(__dirname, '../uploads/banners', newFilename);

                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);

                await prisma.banners.update({
                    where:{
                        id: Number(req.params.id)
                    },
                    data: {
                        link: req.body.link,
                        imagem: `${req.protocol}://${req.headers.host}/uploads/banners/${newFilename}`
                    }
                });
                resolve({
                    tipo: "success",
                    mensagem: 'Registro atualizado com sucesso!'
                });
            });

        })
        return resultado;
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function deletar(id) {
    try {
        let req = await prisma.banners.delete({
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

async function criar(req) {
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
                    return;
                }

                const filenameOriginal = files.imagem[0].originalFilename;

                if (!filenameOriginal.includes("png") && !filenameOriginal.includes("jpg") && !filenameOriginal.includes("webp")) {
                    resolve({
                        tipo: "warning",
                        mensagem: 'O arquivo precisa ser do tipo PNG, JPG ou WEBP'
                    });
                }

                const oldpath = files.imagem[0].filepath;
                const filename = filenameOriginal.split('.');
                const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
                const newpath = path.join(__dirname, '../uploads/banners', newFilename);

                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);

                await prisma.banners.create({
                    data: {
                        link: fields.link[0],
                        imagem: `${req.protocol}://${req.headers.host}/uploads/banners/${newFilename}`
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
}