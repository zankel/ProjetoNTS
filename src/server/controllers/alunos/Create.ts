import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { AlunosProvider } from './../../database/providers/alunos';
import { validation } from '../../shared/middleware';
import { IAluno } from './../../database/models';


interface IBodyProps extends Omit<IAluno, 'id'> { }

export const createValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3),
    telefone: yup.string().required().max(20),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await AlunosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
