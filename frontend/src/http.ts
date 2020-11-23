import { webAPIUrl } from './AppSettings';

export interface HttpRequest<req> {
  path: string;
  method?: string;
  body?: req;
  accessToken?: string;
}
export interface HttpResponse<res> extends Response {
  parsedBody?: res;
}

export const http = <req, res>(
  config: HttpRequest<req>,
): Promise<HttpResponse<res>> => {
  return new Promise((resolve, reject) => {
    const request = new Request(`${webAPIUrl}${config.path}`, {
      method: config.method || 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
    });
    if (config.accessToken) {
      request.headers.set('authorization', `bearer ${config.accessToken}`);
    }
    let response: HttpResponse<res>;
    fetch(request)
      .then(res => {
        response = res;
        if (res.headers.get('Content-Type') || ''.indexOf('json') > 0) {
          return res.json();
        } else {
          resolve(response);
        }
      })
      .then(body => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
