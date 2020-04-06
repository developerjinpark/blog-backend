// initialize id
let postId = 1;

const posts = [
    {
        id: 1,
        title: 'title',
        body: 'body'
    }
];

// writing post, POST /api/posts {title, body}
exports.write = (ctx) => {
    const { title, body } = ctx.request.body;

    postId += 1;

    const post = { id: postId, title, body };
    posts.push(post);
    ctx.body = post;
};

// listing posts, GET /api/posts
exports.list = (ctx) => {
    ctx.body = posts;
};

// searching post, GET /api/posts/:id
exports.read = (ctx) => {
    const { id } = ctx.params;
    const post = posts.find(p => p.id.toString() === id);

    if (!post) {
        ctx.status = 404;
        ctx.body = { message: 'No post' };
        return;
    }
    ctx.body = post;
}

// deleting post, DELETE /api/:id
exports.remove = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);

    if (index === -1) {
        ctx.status = 404;
        ctx.body = { message: 'No post' };
        return; 
    }
    posts.splice(index, 1);
    // return no content
    ctx.status = 204; 
};

// replacing post, PUT /api/posts/:id { title, body }
exports.replace = (ctx) => {
    // using PUT method for replacing the data not editing
    const { id } = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = { message: 'No post' };
        return;
    }
    // replacing all info except id
    posts[index] = {
        id,
        ...ctx.request.body
    };
    ctx.body = posts[index];
}

// editing post, PATCH /api/posts/:id { title, body }
exports.update = (ctx) => {
    const { id } = ctx.params;

    const index = posts.findIndex(p => p.id.toString() === id);

    if (index === -1) {
        ctx.status = 404;
        ctx.body = {message: 'No post'};
        return;
    }
    // overwriting
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    };
    ctx.body = posts[index];
}
