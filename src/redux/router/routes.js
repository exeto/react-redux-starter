import * as posts from '@/redux/posts/operations';
import { findPost } from './operations';
import { LIST, ITEM } from './types';

export default {
  [LIST]: { path: '/', thunk: posts.find() },
  [ITEM]: { path: '/:id', thunk: findPost() },
};
