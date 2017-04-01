import 'isomorphic-fetch';

import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../client/store';
import Routes from '../client/Routes';
import actionsTopstories from '../client/actions/topstories';
import assets from '../tmp/assets.json';
import config from '../webpack/config';

const app = new Express();

app.set('views', './server');
app.set('view engine', 'ejs');
app.set('x-powered-by', false);

app.use('/', Express.static(path.resolve(__dirname, '../public')));

app.get('*', (req, res) => {
  const store = configureStore();

  store.dispatch(actionsTopstories.fetchAll())
    .then(() => {
      const context = {};

      const html = renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}
          >
            <Routes />
          </StaticRouter>
        </Provider>
      );

      const initialState = store.getState();

      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(context.status || 200);
        res.render('template', { assets, data: { html, initialState } });
      }
    });
});

app.listen(config.port, () => {
  console.log(`==> 🌎  Server running at ${config.publicPath}`);
});
