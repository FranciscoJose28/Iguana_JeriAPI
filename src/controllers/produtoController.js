import { prisma } from "../utils/index.js";
import { formidable } from "formidable";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
// import mercadopago from 'mercadopago';
import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
    accessToken: "TEST-5187935436662042-032319-8f331312da329d0eb3da0ce801349c3d-586090033",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const copyFileAsync = promisify(fs.copyFile);
const unlinkAsync = promisify(fs.unlink);

async function buscarTodos(cat, ordenacao) {
    try {
        let where = {};
        if (cat) {
            const categorias = cat.split(',').map(c => c.trim());
            where = { categoria: { nome: { in: categorias } } };
        }

        if (ordenacao === 'mais-vendido') {
            // Buscar os 20 produtos mais vendidos
            const topProducts = await prisma.produtos_pedido.groupBy({
                by: ['id_produto'],
                _count: true,
                orderBy: {
                    _count: true
                },
                take: 20
            });

            const productIds = topProducts.map(p => p.id_produto);

            const produtos = await prisma.produto.findMany({
                where: {
                    ...where,
                    id: { in: productIds }
                },
                include: {
                    produto_imagem: true,
                    categoria: true
                }
            });

            // Manter a ordem de vendas
            const vendidos = {};
            topProducts.forEach((p, index) => {
                vendidos[p.id_produto] = index;
            });

            return produtos.sort((a, b) => vendidos[a.id] - vendidos[b.id]);
        }

        let orderBy = {};
        if (ordenacao) {
            switch (ordenacao) {
                case 'menor-preco':
                    orderBy = { valor: 'asc' };
                    break;
                case 'maior-preco':
                    orderBy = { valor: 'desc' };
                    break;
            }
        }

        return await prisma.produto.findMany({
            include: {
                produto_imagem: true,
                categoria: true
            },
            where,
            ...(Object.keys(orderBy).length > 0 && { orderBy })
        })
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function pesquisa(palavra) {
    try {
        return await prisma.produto.findMany({
            include: {
                produto_imagem: true,
                categoria: true
            },
            where: {
                nome: {
                    contains: palavra,
                }
            }
        })
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function buscarUm(id) {
    try {
        let req = await prisma.produto.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                produto_imagem: true,
                categoria: true
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

async function criar(dados) {
    try {
        dados.peso = Number(dados.peso)
        let req = await prisma.produto.create({
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
        dados.peso = Number(dados.peso)
        let req = await prisma.produto.update({
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
        let req = await prisma.produto.delete({
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
        if (error.code === "P2003") {
            return {
                tipo: "error",
                mensagem:
                    "Não é possível excluir este registro, pois está sendo utilizado.",
            };
        }
        return {
            tipo: "error",
            mensagem: error.message
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
            mensagem: error.message
        }
    }
}

async function buscarTodasImagens() {
    try {
        return await prisma.produto_imagem.findMany()
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function deletarImagem(id) {
    try {
        const imagem = await prisma.produto_imagem.findFirst({
            where: { id: Number(id) }
        });
        if (!imagem) {
            return {
                tipo: "error",
                mensagem: "Imagem não encontrada."
            };
        }

        await prisma.produto_imagem.delete({
            where: { id: Number(id) }
        });

        const filePath = path.join(process.cwd(), "uploads/produtos", imagem.imagem);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return {
            tipo: "success",
            mensagem: "Imagem deletada com sucesso."
        };
    } catch (error) {
        if (error.code === "P2003") {
            return {
                tipo: "error",
                mensagem:
                    "Não é possível excluir este registro, pois está sendo utilizado.",
            };
        }
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function criarPreferencia(dados) {
    try {
        const produtos = [];

        for (const item of dados.products) {

            // Buscar produto no banco
            const produto = await prisma.produto.findUnique({
                where: {
                    id: item.id
                }
            });

            if (!produto) {
                throw new Error(`Produto ${item.id} não encontrado.`);
            }

            produtos.push({
                id: produto.id.toString(),
                title: produto.nome,
                quantity: item.quantity,
                currency_id: "BRL",
                unit_price: Number(produto.valor - produto.desconto)
            });
        }

        // adiciona o frete como um item
        if (dados.shipping?.price > 0) {
            produtos.push({
                id: "frete",
                title: `Frete - ${dados.shipping.name}`,
                quantity: 1,
                currency_id: "BRL",
                unit_price: Number(dados.shipping.price)
            });
        }

        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: produtos,
                payer: {
                    email: dados.email,
                    first_name: dados.nome,
                    last_name: dados.sobrenome,
                },

                back_urls: {
                    success: "https://seusite.com/pagamento/sucesso",
                    failure: "https://seusite.com/pagamento/falha",
                    pending: "https://seusite.com/pagamento/pendente"
                },

                auto_return: "approved"
            }
        });

        return response;

    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        };
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
    deletarImagem,
    pesquisa,
    criarPreferencia
}