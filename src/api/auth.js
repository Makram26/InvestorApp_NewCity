import client from './client';

const endpointPostLogin = '/web/session/authenticate';

const login = (username, password) => {
  const loginObj = {
    jsonrpc: '2.0',
    params: {
      login: username,
      password: password,
      db: 'TestOn_30-May-2022',
      // db: 'PROD_20_11_2020',
    },
  };
  console.log("loginObj",loginObj)
  return client.post(endpointPostLogin, loginObj);
};
  
export default {
  login,
};
