export const getPosts = ({ entities }) => Object.values(entities.posts);

export const getPost = ({ entities }, id) => entities.posts[id];
