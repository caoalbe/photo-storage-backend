import { TagService } from "../service/tag.js";

// SERVICES
const tagService = new TagService();

export class TagManager {
    /**
     * Route: /fileTags
     * Return Example: ['tag1', 'tag2', 'tag3']
     */
    async getFileTags(req, res) {
        const fileTags = await tagService.getFileTags(req.query.filename)
        return fileTags;
    }

}