import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1788490333201 implements MigrationInterface {
    name = 'CreateTasksTable1788490333201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "titulo" character varying(150) NOT NULL, "descripcion" text, "completado" boolean NOT NULL DEFAULT false, "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
