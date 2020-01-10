// function postAjax(url, data, success) {
//   var params = typeof data == 'string' ? data : Object.keys(data).map(
//           function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
//       ).join('&');

//   var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
//   xhr.open('POST', url);
//   xhr.onreadystatechange = function() {
//       if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
//   };
//   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//   xhr.send(params);
//   return xhr;
// }

function ajaxPost(url, data, container) {
  var params =
    typeof data == "string"
      ? data
      : Object.keys(data)
          .map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          })
          .join("&");

  let news = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  news.open("POST", url);
  news.onreadystatechange = function() {
    if (news.readyState == 4 && news.status == 200) {
      container.innerHTML = news.responseText;
    }
  };
  news.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  news.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  news.send(params);
}
