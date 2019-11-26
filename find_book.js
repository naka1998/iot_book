/*
openDBのAPI(https://openbd.jp/)と
楽天Kobo電子書籍検索API(https://webservice.rakuten.co.jp/api/koboebooksearch/)を用いた。
バーコード認識にもAPIを用いる予定。
*/
async function get_title(value) {
  return fetch('https://api.openbd.jp/v1/get?isbn=' + value)
    .catch(error => {
      console.error(error);
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
async function output(value) {

}
async function btn_click() {
  const value = input_form.value;
  console.log("入力値：" + value);
  let title = await get_title(value);
  if (title[0]) {
    title = title[0].summary.title;
    console.log("title:" + title);
    const result = await search_with_raku(title);
    console.log("楽天API返り値:" + result);
    await output(result);
  } else {
    alert("検索に失敗(ISBNが間違っている可能性)")
  }
}
const input_form = document.getElementById("input_data");
const run_btn = document.getElementById("run_btn");
run_btn.addEventListener("click", btn_click, false);


