import createHistory from 'history/createMemoryHistory';
import { NOT_FOUND } from 'redux-first-router';

import createStore from '../src/redux/createStore';

export default async ctx => {
  const history = createHistory({ initialEntries: [ctx.path] });
  const { store, thunk } = createStore(history);

  try {
    await thunk(store);
  } catch (err) {
    const { location } = store.getState();

    if (location.type === NOT_FOUND) {
      ctx.status = 404;
    } else {
      err.status = 500;
      ctx.throw(err);
    }
  }

  return store;
};
