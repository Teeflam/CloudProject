import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author extends BaseEntity {
    @PrimaryGeneratedColumn()
    author_id!: number;

    @Column()
    author_name!: string;

    @Column()
    born!: number;

    @Column({ nullable: true })
    died!: number;

    @OneToMany(() => Book, (book) => book.author_id, { cascade: true })
    books!: Book[];
}
