import { ICidade, IPessoa, IUsuario, IAluno, IDisciplina } from '../../models';


declare module 'knex/types/tables' {
  interface Tables {
    pessoa: IPessoa;
    cidade: ICidade;
    usuario: IUsuario;
    aluno: IAluno;
    disciplina: IDisciplina;
  }
}
