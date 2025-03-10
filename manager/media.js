import { MediaService } from "../service/media.js";
import { TagService } from "../service/tag.js";

// SERVICES
const mediaService = new MediaService();
const tagService = new TagService();

export class MediaManager {
    /**
     * Route: /media
     * Input Examples: { 'filename': 'newfile', 'tags': ['tag1', 'tag2'] }
     * Description: Creates <'newfile', 'tag1'>, <'newfile', 'tag2'> as entries in table
     * Return Example: { 'filename': 'newfile' }
     */
    async media(req, res) {
        const filename = await tagService.assignTagBatch(req.body)

        return { "filename": filename }
    }

    /**
     * Route: /fetchMedia
     * Input Examples: { 'tags': ['tag1', 'tag2'] }
     * Description: Reads table for which files satisfy all the given tags
     * Return Example: ['file1', 'file2', 'file3']
     */
    async fetchMedia(req, res) {
        const filenames = await mediaService.fetchMedia(req.body);
        return filenames
    }
}