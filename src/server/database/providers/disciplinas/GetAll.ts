import { ETableNames } from '../../ETableNames';
import { IDisciplina } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string): Promise<IDisciplina[] | Error> => {
  try {
    const result = await Knex(ETableNames.disciplina)
      .select('*')
      .where('nomeCompleto', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
