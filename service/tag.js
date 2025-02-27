import { db } from "../database/db.js"

export class TagService {
    /**
     * Only creates tags which don't exist yet.
     */
    async createTag(tagData) {
        const { tags } = tagData;

        // fetch existing tags in db
        const existingTags = await db('tag').whereIn("name", tags).pluck("name");

        // filter out existing tags
        const tagsToAdd = tags.filter(tag => !existingTags.includes(tag))

        // insert only new tags
        if (tagsToAdd.length > 0) {
            await db('tag').insert(tagsToAdd.map(name => ({name})))
        }

        return tagsToAdd.length;
    }

    /**
     * Assumes file and all tags exist in db already
     */
    async assignTag(tagData) {
        const { filename, tags } = tagData;
        
        // find id of file
        const { id: file_id } = await db('media').select('id').where("filename", filename).first();

        // find id of each tag
        const tag_ids = await db('tag').select('id').whereIn("name", tags);

        // insert a mapping bettween the file and each tag
        await db('media_tag_assignment').insert(tag_ids.map(({id}) => ({media_id: file_id, tag_id: id})))

        return tags.length
    }

    /**
     * Retrieves all the tags associated with a single filename
     */
    async getFileTags(filename) {
        const tagList = await db('tag as t')
            .select('t.name')
            .join('media_tag_assignment as mt', 't.id', 'mt.tag_id')
            .join('media as m', 'm.id', 'mt.media_id')
            .where('m.filename', filename);

        return tagList.map(tag => tag.name)
    }
}