import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    book_id!: number;

    @Column()
    author_id!: number;

    @Column()
    publisher_id!: number;

    @Column()
    title!: string;

    @Column()
    place_publication!: string;

    @Column()
    category_id!: number;

    @Column()
    published_dt!: number;

    @Column()
    isbn!: number;

    @Column()
    status!: boolean;
}
