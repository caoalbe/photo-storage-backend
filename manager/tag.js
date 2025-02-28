import { TagService } from "../service/tag.js";

// SERVICES
const tagService = new TagService();

export class TagManager {
    /**
     * Route: /tagMedia
     * Return Example: ["tag1", "tag2", "tag3"]
     */
    async assignTag(req, res) {
        const assignedTags = await tagService.assignTag(req.body);
        return {
            "assignedTags": assignedTags
        }
    }

    /**
     * Route: /fileTags
     * Return Example: ['tag1', 'tag2', 'tag3']
     */
    async getFileTags(req, res) {
        const fileTags = await tagService.getFileTags(req.query.filename)
        return fileTags;
    }

    /**
     * Route: /tagMedia
     * Return Example: ["tag1", "tag2", "tag3"]
     */
    async tagMedia(req, res) {
        await tagService.createTag(req.body)
        await tagService.assignTag(req.body)
    }
}