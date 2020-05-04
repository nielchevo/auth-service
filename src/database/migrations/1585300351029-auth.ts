import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class auth1585300351029 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({ name: "user_token",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isNullable: false,
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "npp_id",
                    type: "varchar",
                    isNullable: true,
                    default: null,
                },
                {
                    name: "access_token",
                    type: "varchar",
                    isNullable: true,
                    default: null,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_token');
    }

}
