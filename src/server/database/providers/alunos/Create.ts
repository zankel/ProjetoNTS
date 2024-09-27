import { ETableNames } from '../../ETableNames';
import { IAluno } from '../../models';
import { Knex } from '../../knex';


export const create = async (aluno: Omit<IAluno, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.aluno)
      .where('id', '=', aluno.cidadeId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('Aluno não encontrado');
    }


    const [result] = await Knex(ETableNames.aluno).insert(aluno).returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
