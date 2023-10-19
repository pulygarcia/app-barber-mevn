const authMiddleware = (req, res, next) => {
    console.log('From auth middleware');

    next();
}

export default authMiddleware