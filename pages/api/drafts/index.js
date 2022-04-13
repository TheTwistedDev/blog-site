import faunaQueries from "../../../lib/fauna"

// GET -> /api/drafts
export default async function handler (req, res) {
    try {
        // GET /api/posts
        if (req.method === 'GET') {
            const {author = '', size = 10, cursor = undefined} = req.query
            const posts = await faunaQueries.getDrafts({
                author, 
                size,
                after: faunaQueries.toExpr(cursor),
            })
            res.status(200).json(posts)
        }
        // // POST /api/posts
        // else if (req.method === 'POST') {
        //     const post = await faunaQueries.createPosts(req.body)
        //     res.status(200).json(post)
        // }
        // // Not Supported  
        // else {
        //     res.status(404).json({ message: `HTTP method ${req.method} is not supported.`})
        // }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}