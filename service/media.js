import { db } from "../database/db.js"

export class MediaService {
    async createMedia(mediaData) {
        try {
            const { filename } = mediaData;
            const [id] = await db('media').insert({
                filename: filename,
            }).returning('id')
            return id;
        } catch (error) {
            if (error.message.includes("duplicate key value violates unique constraint")) {
                throw new Error("Filename already exists")
            } else {
                throw new Error(error.message)
            }
        }
    }

    /**
     * Retrieves all the files which satisfy the given list of tags
     */
    async fetchMedia(tagData) {
        try {
            const { tags } = tagData;

            // finds the tag_id's which correspond to given tag's
            const tagIds = await db('tag').whereIn('name', tags).pluck('id');

            // joins with the media table to find filenames
            const filenames = await db('media_tag_assignment as mt')
                .select("m.filename")
                .join('media as m', 'mt.media_id', 'm.id')
                .whereIn('mt.tag_id', tagIds)
                .groupBy('m.id', 'm.filename')
                .havingRaw("COUNT(DISTINCT mt.tag_id) = ?", [tags.length])

            return filenames.map(({filename}) => filename)
        } catch (error) {
            throw new Error(error.message)
        }
    }

}