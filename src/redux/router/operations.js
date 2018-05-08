import * as posts from '@/redux/posts/operations';

export const findPost = () => (dispatch, getState) => {
  const { id } = getState().location.payload;

  return dispatch(posts.findRecord(id));
};
