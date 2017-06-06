'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *  路由的映射
 *  17.5.1
 *  router.get('/xxx',ctx=>{})
 */

var Router = function () {
  function Router() {
    _classCallCheck(this, Router);

    this.routerMap = {
      get: {},
      post: {}
    };
  }

  _createClass(Router, [{
    key: 'get',
    value: function get(pathname, handler) {
      this.routerMap.get[pathname] = handler;
    }
  }, {
    key: 'post',
    value: function post(pathname, handler) {
      this.routerMap.post[pathname] = handler;
    }
  }, {
    key: 'routers',
    value: function routers(ctx) {
      var _ctx$reqCtx = ctx.reqCtx,
          pathname = _ctx$reqCtx.pathname,
          method = _ctx$reqCtx.method;

      if (method == 'get' || method == 'post') {
        var handler = this.routerMap[method][pathname];
        if (handler) {
          return Promise.resolve(handler(ctx));
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    }
  }]);

  return Router;
}();

module.exports = new Router();