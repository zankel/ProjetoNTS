import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.disciplina, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').index().notNullable();

      table.comment('Tabela usada para armazenar disciplina do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.disciplina}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.disciplina)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.disciplina}`);
    });
}
