const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/posts': '/posts',
    '/api/comments': '/comments',
    '/api/tags': '/tags',
    '/api/authors': '/authors',
    '/api/country': '/countries',
    '/api/*': '/$1'
}));

server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next();// continue to JSON Server router
    } else {
        res.sendStatus(401);
    }
});

function isAuthorized(req) {
    return true;
}

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running')
})
