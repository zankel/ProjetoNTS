import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { AlunosProvider } from '../../database/providers/alunos';
import { validation } from '../../shared/middleware';
import { IAluno } from '../../database/models';


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IAluno, 'id'> { }

export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3),
    telefone: yup.string().required().max(20),
  })),
  params: get<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  const result = await AlunosProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
