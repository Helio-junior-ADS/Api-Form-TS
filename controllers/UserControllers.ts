/* eslint-disable linebreak-style */
import { prisma } from '../db/index';
import {Request,Response} from 'express'

export default {
  async createUser(request:Request, response:Response){
    try {
      const {name,email} = request.body
      const userExist = await prisma.user.findUnique({where:{ email }});

      if(userExist){
        return response.json({
          error: true,
          message: 'Erro:: Usuário já existe'
        });
      };

      const user = await prisma.user.create({
        data : {
          name,
          email
        }
      });

      return response.json({
        error: false,
        message: 'Usuário cadastrado com sucesso!!',
        user
      });

    }catch(err){
      return response.json({message:err.message})
    }
  }

}