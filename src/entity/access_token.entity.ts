import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "user_token" })
class UserAuth {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "npp_id"})
    nppId: string;

    @Column()
    accessToken: string;

}

export default UserAuth