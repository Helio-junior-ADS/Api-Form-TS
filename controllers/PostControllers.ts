/* eslint-disable linebreak-style */
import { prisma } from '../db/index';
import {Request,Response} from 'express'

export default {
  async createPost(request:Request, response:Response){
    try {
      const { title, content, userId } = request.body;


      const post = await prisma.post.create({
        data : {
          title,
          content,
          userId
        }
      });

      return response.json({
        error: false,
        message: 'Post cadastrado com sucesso!!',
        post
      });

    }catch(err){
      return response.json({message:err.message})
    }
  },

  async listPost(request:Request, response:Response){
    try {
      const { id } = request.params;

      const post = await prisma.post.findUnique({where:{id: Number(id)}})
      if (!post) {
        return response.json({
          error: true,
          message: 'Erro::Post não encrontrado !!'
        });
      }
      return response.json({
        error: false,
        message: 'Post cadastrado com sucesso!!',
        post
      });

    }catch(err){
      return response.json({message:err.message})
    }
  },

  async updatePost(request:Request, response:Response){
    try {
      const { id, title, content } = request.body;

      const postExist = await prisma.post.findUnique({where:{id: Number(id)}});

      if (!postExist) {
        return response.json({
          error: true,
          message: 'Erro::Post não encrontrado !!'
        });
      }

      const post = await prisma.post.update({
        where: {
          id: Number(request.body.id)
        }, data: {
          title,
          content
        }
      });

      return response.json({
        error: false,
        message: 'Post Atualizado com sucesso!!',
        post
      });

    }catch(err){
      return response.json({message:err.message})
    }
  },

  async deletePost(request:Request, response:Response){
    try {
      const { id } = request.params;

      const postExist = await prisma.post.findUnique({where:{id: Number(id)}});

      if (!postExist) {
        return response.json({
          error: true,
          message: 'Erro::Post não encrontrado !!'
        });
      }

      const post = await prisma.post.delete({
        where:{id:Number(id)}
      });

      if(post){
        return response.json({
          error: false,
          message: 'Post DELETADO com sucesso!!',
          post
        });
      } else {
        return response.status(400).json({
          error: true,
          message: 'Erro:: Post não encontrado!!',
          post
        });
      }

    }catch(err){
      return response.json({message:err.message})
    }
  },


}