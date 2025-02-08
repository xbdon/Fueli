import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
    const token = req.headers['Authorization']

    // undefined token edge case was already put in front-end but this step will be added regardless
    if (!token) { return res.status(401).json({ message: "No token provided" }) }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ message: "invalid token" }) }
        req.userId = decoded.id
        next()

    })
}

export default authMiddleware