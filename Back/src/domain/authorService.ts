import { Like, getRepository } from 'typeorm';

import { Author } from '../utils';

export const addAuthor = async (
    author_name: string,
    born: number,
    died?: number
): Promise<Author | void> => {
    const authorRepository = getRepository(Author);
    const author = new Author();
    author.author_name = author_name;
    author.born = born;
    if (died) {
        author.died = died;
    }
    const authorCreated = await authorRepository
        .save(author)
        .catch((err) => console.log(err));
    return authorCreated;
};

export const getAllAuthor = async () => {
    const authorRepository = getRepository(Author);
    return await authorRepository.find({
        select: ['author_id', 'author_name', 'born', 'died'],
    });
};

export const getAuthorByReserch = async (
    researchWord: string
): Promise<Author[] | undefined> => {
    const authorRepository = getRepository(Author);
    return await authorRepository.find({
        author_name: Like(`%${researchWord}%`),
    });
};

export const getAuthorId = async (
    id: number
): Promise<Author[] | undefined> => {
    const authorRepository = getRepository(Author);
    return await authorRepository.find({
        where: { author_id: id },
    });
};

export const updateAuthor = async (
    id: number,
    author_name?: string,
    born?: number,
    died?: number | null
): Promise<Author | void> => {
    const authorRepository = getRepository(Author);
    const authorUpdate = await authorRepository.findOne(id);
    if (authorUpdate) {
        if (author_name) {
            authorUpdate.author_name = author_name;
        }
        if (born) {
            authorUpdate.born = born;
        }
        if (died) {
            authorUpdate.died = died;
        }

        return authorRepository
            .save(authorUpdate)
            .catch((err) => console.log(err));
    }
};

export const deleteAuthor = async (id: number): Promise<void> => {
    const authorRepository = getRepository(Author);
    await authorRepository.delete(id);
};
