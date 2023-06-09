import axios from 'axios';

async function api(url, body, method) {
  // const token = await getData(USER_TOKEN);
  const options = Object.assign(
    {method},
    body ? {body: JSON.stringify(body)} : null,
  );
  options.headers = {
    'Content-type': 'application/json',
    // Authorization: `Bearer ${token}`
  };
  options.redirect = 'follow';
  console.log(url);
  console.log(options);

  return axios({
    method: method,
    url: url,
    data: body,
  })
    .then(res => {
      res.json();
      console.log(res);
    })
    .then(res => res)
    .catch(err => err);
}
export const get = url =>
  axios({
    method: 'get',
    url: url,
  });
export const post = (url, params) =>
  axios({
    method: 'post',
    url: url,
    data: params,
  });
