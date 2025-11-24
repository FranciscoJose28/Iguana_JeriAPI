import { PrismaClient } from "../../generated/prisma/client.js";
import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();

export function rotaProtegida(req, res, next){
    if(req.headers.authorization){
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT, (error) => {
            if(error){
                res.json({
                    tipo: "warning",
                    mensagem: "Token é necessário"
                })
            } else{
                next();
            }
        })
    }else{
        res.json({
            tipo: "error", 
            mensagem: "Token é necessário"
        })
    }
}
