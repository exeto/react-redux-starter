import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../client/store';
import routes from '../client/routes';
import assets from '../tmp/assets';

const app = new Express();
const port = process.env.PORT || 3000;

app.set('views', './server');
app.set('view engine', 'ejs');

app.use('/', Express.static(path.resolve(__dirname, '../public')));

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const store = configureStore();

      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );

      const initialState = store.getState();

      res.render('template', { assets, data: { html, initialState } });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

app.listen(port, () => {
  console.log(`==> 🌎  Server running at http://localhost:${port}`);
});
