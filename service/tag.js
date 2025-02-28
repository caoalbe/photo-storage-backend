import { db } from "../database/db.js"

export class TagService {
    /**
     * Only creates tags which don't exist yet.
     */
    async createTag(tagData) {
        try {
            const { tags } = tagData;

            // fetch existing tags in db
            const existingTags = await db('tag').whereIn("name", tags).pluck("name");

            // filter out existing tags
            const tagsToAdd = tags.filter(tag => !existingTags.includes(tag))

            // insert only new tags
            if (tagsToAdd.length > 0) {
                await db('tag').insert(tagsToAdd.map(name => ({name})))
            }

            return tagsToAdd;
        } catch (error) {
            if (error.message.includes("duplicate key value violates unique constraint")) {
                throw new Error("Tag already exists")
            } else {
                throw new Error(error.message)
            }
        }
    }

    /**
     * Assumes file and all tags exist in db already
     */
    async assignTag(tagData) {
        try {
            const { filename, tags } = tagData;
            
            // find id of file
            const { id: file_id } = await db('media').select('id').where("filename", filename).first();

            // find id of each tag
            const tag_ids = await db('tag').select('id').whereIn("name", tags);

            // insert a mapping bettween the file and each tag
            await db('media_tag_assignment').insert(tag_ids.map(({id}) => ({media_id: file_id, tag_id: id})))

            return tags
        } catch (error) {
            if (error.message.includes("duplicate key value violates unique constraint")) {
                throw new Error("Tag assignment already exists")
            } else {
                throw new Error(error.message)
            }
        }
    }

    /**
     * Retrieves all the tags associated with a single filename
     */
    async getFileTags(filename) {       
        try {
            const tagList = await db('tag as t')
                .select('t.name')
                .join('media_tag_assignment as mt', 't.id', 'mt.tag_id')
                .join('media as m', 'm.id', 'mt.media_id')
                .where('m.filename', filename);

            return tagList.map(tag => tag.name)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}