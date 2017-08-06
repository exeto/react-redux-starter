import Apist, { urlJoin, queryStringify } from 'redux-apist';

export default class CustomApist extends Apist {
  constructor(resource) {
    super(resource);
    this.host = 'https://hacker-news.firebaseio.com';
    this.namespace = 'v0';
  }

  buildUrl(id, query) {
    query = query && `?${queryStringify(query)}`;
    const url = urlJoin(this.host, this.namespace, this.resource, id);

    return urlJoin(`${url}.json`, query);
  }
}
