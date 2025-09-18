import { PrismaClient } from "../../generated/prisma/client.js";

export const prisma = new PrismaClient();

export function rotaProtegida(req, res, next){
    if(req.headers.authorization){
        next();
    }else{
        res.json({
            tipo: "error", 
            mensagem: "Token é necessário"
        })
    }
}
