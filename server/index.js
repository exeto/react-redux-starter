import path from 'path';
import Koa from 'koa';
import views from 'koa-ejs';
import serve from 'koa-static';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { JssProvider, SheetsRegistry } from 'react-jss';

import Root from '@/components/Root';
import createStore from './createStore';
import assets from '../build/assets.json';

const app = new Koa();

views(app, {
  root: './server',
  layout: false,
  viewExt: 'ejs',
  cache: false,
});

app.use(serve(path.resolve(__dirname, '../client')));

app.use(async ctx => {
  if (ctx.method !== 'GET') {
    ctx.status = 405;

    return;
  }

  const sheets = new SheetsRegistry();
  const store = await createStore(ctx);

  const html = renderToString(
    <JssProvider registry={sheets}>
      <Root store={store} />
    </JssProvider>,
  );

  const preloadedState = store.getState();

  await ctx.render('template', {
    assets,
    data: { html, styles: sheets.toString(), preloadedState },
  });
});

app.listen(3000, err => {
  if (err) {
    console.error(err);

    return;
  }

  console.log('==> 🌎  Server running at http://localhost:3000');
});
