import { CategoryEntity } from "src/categories/entities/category.entity";
import { OrderEntity } from "src/orders/entities/order.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { Roles } from "src/utility/common/user_roles.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ unique: true })
    email: string;
    @Column({ select: true })
    password: string;
    @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.ADMIN]})
    roles: Roles
    @CreateDateColumn()
    createdAt: Timestamp
    @UpdateDateColumn()
    updatedAt: Timestamp

    @OneToMany(() => CategoryEntity, (cat) => cat.addedBy)
    categories: CategoryEntity[]

    @OneToMany(() => ProductEntity, (prod) => prod.addedBy)
    products: ProductEntity[]

    @OneToMany(() => ReviewEntity, (rev) => rev.user)
    reviews: ReviewEntity[]

    @OneToMany(() => OrderEntity, (order) => order.updatedBy)
    ordersUpdateBy: OrderEntity[]
}
