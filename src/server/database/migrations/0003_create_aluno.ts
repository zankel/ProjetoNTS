import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.aluno, table => {
      table.bigIncrements('id').primary().index();
      table.string('nomeCompleto').index().notNullable();
      table.string('email').unique().notNullable();
      table.string('telefone').index().notNullable();

      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');


      table.comment('Tabela usada para armazenar aluno do sistema.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.aluno}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.aluno)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.aluno}`);
    });
}
