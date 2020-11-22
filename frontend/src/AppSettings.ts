export const server = 'http://localhost:5000';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'diego-maquill.us.auth0.com',
  client_id: 'ZT2xAegYlZD5ZQ6oyyv6mgQk09lX5bbl',
  //redirect_uri: window.location.origin + '/signin-callback',
  redirect_uri: 'https://localhost:3000/callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://diego-maquill.us.auth0.com/api/v2/',
};
