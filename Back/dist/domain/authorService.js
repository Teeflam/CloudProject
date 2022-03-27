"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updateAuthor = exports.getAuthorId = exports.getAuthorByReserch = exports.getAllAuthor = exports.addAuthor = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../utils");
const addAuthor = async (author_name, born, died) => {
    const authorRepository = (0, typeorm_1.getRepository)(utils_1.Author);
    const author = new utils_1.Author();
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
exports.addAuthor = addAuthor;
const getAllAuthor = async () => {
    const authorRepository = (0, typeorm_1.getRepository)(utils_1.Author);
    return await authorRepository.find({
        select: ['author_id', 'author_name', 'born', 'died'],
    });
};
exports.getAllAuthor = getAllAuthor;
const getAuthorByReserch = async (researchWord) => {
    const authorRepository = (0, typeorm_1.getRepository)(utils_1.Author);
    return await authorRepository.find({
        author_name: (0, typeorm_1.Like)(`%${researchWord}%`),
    });
};
exports.getAuthorByReserch = getAuthorByReserch;
const getAuthorId = async (id) => {
    const authorRepository = (0, typeorm_1.getRepository)(utils_1.Author);
    return await authorRepository.find({
        where: { author_id: id },
    });
};
exports.getAuthorId = getAuthorId;
const updateAuthor = async (id, author_name, born, died) => {
    const authorRepository = (0, typeorm_1.getRepository)(utils_1.Author);
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
exports.updateAuthor = updateAuthor;
const deleteAuthor = async (id) => {
    const authorRepository = (0, typeorm_1.getRepository)(utils_1.Author);
    await authorRepository.delete(id);
};
exports.deleteAuthor = deleteAuthor;
