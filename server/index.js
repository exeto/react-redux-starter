import 'isomorphic-fetch';

import path from 'path';
import Koa from 'koa';
import views from 'koa-ejs';
import serve from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../client/store';
import Routes from '../client/Routes';
import actionsTopstories from '../client/actions/topstories';
import assets from '../tmp/assets.json';
import config from '../webpack/config';

const app = new Koa();

views(app, {
  root: './server',
  layout: false,
  viewExt: 'ejs',
  cache: false,
});

app.use(serve(path.resolve(__dirname, '../public')));

app.use(async (ctx) => {
  if (ctx.method !== 'GET') {
    ctx.status = 405;
    return;
  }

  const store = configureStore();

  await store.dispatch(actionsTopstories.fetchAll());

  const routerContext = {};

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={ctx.url}
        context={routerContext}
      >
        <Routes />
      </StaticRouter>
    </Provider>
  );

  const initialState = store.getState();

  if (routerContext.url) {
    ctx.redirect(routerContext.url);
  } else {
    ctx.status = routerContext.status || 200;
    await ctx.render('template', { assets, data: { html, initialState } });
  }
});

app.listen(config.port, (err) => {
  if (err) { return console.log(err); }
  console.log(`==> 🌎  Server running at ${config.publicPath}`);
});
