import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name: 'categories'})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @CreateDateColumn()
    createdAt: Timestamp
    @UpdateDateColumn()
    updaedAt: Timestamp

    @ManyToOne(() => UserEntity, (user) => user.categories)
    addedBy: UserEntity
}
