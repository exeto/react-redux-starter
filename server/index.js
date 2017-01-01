import 'isomorphic-fetch';

import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import configureStore from '../client/store';
import routes from '../client/routes';
import actionsTopstories from '../client/actions/topstories';
import assets from '../tmp/assets.json';
import config from '../webpack/config';

const app = new Express();

app.set('views', './server');
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.use('/', Express.static(path.resolve(__dirname, '../public')));

app.get('*', (req, res) => {
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore();
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      store.dispatch(actionsTopstories.fetchAll())
        .then(() => {
          const html = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );

          const initialState = store.getState();

          res.render('template', { assets, data: { html, initialState } });
        });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

app.listen(config.port, () => {
  console.log(`==> 🌎  Server running at ${config.publicPath}`);
});
