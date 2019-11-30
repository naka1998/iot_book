/*
openDBのAPI(https://openbd.jp/)と
楽天Kobo電子書籍検索API(https://webservice.rakuten.co.jp/api/koboebooksearch/)を用いた。
バーコード認識にもAPIを用いる予定。
*/
async function get_title(value) {
  return fetch('https://api.openbd.jp/v1/get?isbn=' + value)
    .catch(error => {
      return "error"
    })
    .then(response => {
      console.log("status=" + response.status);
      const responseBodyPromise = response.json();
      return responseBodyPromise
    })
  // .then(function (data) {
  //   console.log("data:" + data);
  //   const title = data;
  //   return title;
  // });
};
async function search_with_raku(title) {
  return fetch('https://app.rakuten.co.jp/services/api/Kobo/EbookSearch/20170426?' +
    'applicationId=1021728831808575275&' +
    'title=' + encodeURI(title))
    .then(function (response) {
      console.log("status=" + response.status);
      return response.json();
    }).then(function (data) {
      return data.hits;
    }).catch(error => {
      console.error(error);
    });
};