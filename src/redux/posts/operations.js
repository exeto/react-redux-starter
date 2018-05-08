import { posts } from '@/api';
import { toNotFound } from '@/redux/router/actions';
import { findSuccess, findRecordSuccess } from './actions';

export const find = () => dispatch =>
  posts.find().then(data => dispatch(findSuccess(data)));

export const findRecord = id => dispatch =>
  posts
    .findRecord(id)
    .then(data => dispatch(findRecordSuccess(data)))
    .catch(err => {
      if (err.response.status === 404) {
        dispatch(toNotFound());
      }

      throw err;
    });
