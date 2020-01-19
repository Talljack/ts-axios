import axios from '../../src/index';

/**
 * 参数为数组
 * => /base/get?foo[]=bar&foo[]=baz
 */
axios({
  method: "get",
  url: "/base/get",
  params: {
    foo: ["bar", "baz"]
  }
});

/**
 * 参数为对象
 * => /base/get?foo=%7B%22bar%22:%22baz%22%7D
 */
axios({
  method: "get",
  url: "/base/get",
  params: {
    foo: {
      bar: "baz"
    }
  }
});

/**
 * 参数为时间
 * => /base/get?date=2019-07-31T03:17:28.099Z
 */
axios({
  method: "get",
  url: "/base/get",
  params: {
    date: new Date()
  }
});

/**
 * 参数为特殊字符
 * => /base/get?foo=@:$+
 */
axios({
  method: "get",
  url: "/base/get",
  params: {
    foo: "@:$ "
  }
});

/**
 * 参数中存在null
 * => /base/get?foo=bar
 */
axios({
  method: "get",
  url: "/base/get",
  params: {
    foo: "bar",
    baz: null,
  }
});

/**
 * URL中带Hash
 * => /base/get?foo=bar
 */
axios({
  method: "get",
  url: "/base/get#hash",
  params: {
    foo: "bar"
  }
});

/**
 * URL中带参数
 * => /base/get?foo=bar&bar=baz
 */
axios({
  method: "get",
  url: "/base/get?foo=bar",
  params: {
    bar: "baz"
  }
});

/**
 * 发送json对象的post请求
 */
// axios({
//   method: "post",
//   url: "/base/post",
//   data: {
//     a: 1,
//     b: 2
//   }
// });

/**
 * 发送Buffer的post请求
 */
// axios({
//   method: "post",
//   url: "/base/buffer",
//   data: new Int32Array([21, 31])
// });

// /**
//  * 设置headers的post请求
//  */
// axios({
//   method: "post",
//   url: "/base/post",
//   headers: {
//     "content-type": "application/json",
//     "Accept": "application/json, text/plain, */*"
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// });

// /**
//  * 发送FormData的post请求
//  */
// axios({
//   method: "post",
//   url: "/base/post",
//   data: new URLSearchParams("q=URLUtils.searchParams&topic=api")
// });

// /**
//  * 发送json对象的post请求，设置返回数据类型为json，并通过.then()获取返回数据
//  */
// axios({
//   method: "post",
//   url: "/base/post",
//   // responseType: "json",
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then(response => {
//   console.log(response);
// });
