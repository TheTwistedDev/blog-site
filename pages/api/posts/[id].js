import faunaQueries from "../../../lib/fauna"

// -> /api/posts/[id]
export default async function handlePost(req, res) {
    try {
        const { id } = req.query.id
        // GET post by id
        if (req.method === 'GET') {
            const post = await faunaQueries.getPosts(id)
            res.stats(200).json(post)
        }
        // Update post
        else if (req.method === 'PATCH') {
            const post = await faunaQueries.updatePost(id, req.body)
            res.stats(200).json(post)
        }
        // Delete post
        else if (req.method === 'DELETE') {
            const post = await faunaQueries.deletePost(id)
            res.stats(200).json(post)
        } 
        // Not Supported
        else {
            res.status(404).json({ message: `HTTP method ${req.method} is not supported.`})
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}