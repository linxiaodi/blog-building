'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');

var APP = function () {
    function APP() {
        _classCallCheck(this, APP);

        this.arrMiddlewear = [];
        this.middlewearChain = Promise.resolve();
    }

    _createClass(APP, [{
        key: 'use',
        value: function use(middlewear) {
            this.arrMiddlewear.push(middlewear);
        }
    }, {
        key: 'composeMiddlewear',
        value: function composeMiddlewear(context) {
            var _this = this;

            var _loop = function _loop(i) {
                _this.middlewearChain = _this.middlewearChain.then(function () {
                    return _this.arrMiddlewear[i](context);
                });
            };

            for (var i = 0; i < this.arrMiddlewear.length; i++) {
                _loop(i);
            }
            return this.middlewearChain;
        }
    }, {
        key: 'initSever',
        value: function initSever() {
            var _this2 = this;

            return function (request, response) {

                var context = {
                    req: request,
                    reqCtx: {
                        body: '', //post 的数据
                        query: {} //get 的数据
                    },
                    res: response,
                    resCtx: {
                        hasUser: false,
                        statusCode: 200,
                        statusMsg: 'resolved ok',
                        header: { 'X-powered-by': 'Node.js' }, //返回头
                        body: '' //返回给前端数据
                    }
                };
                _this2.composeMiddlewear(context).then(function () {
                    var _context$resCtx = context.resCtx,
                        statusCode = _context$resCtx.statusCode,
                        statusMsg = _context$resCtx.statusMsg,
                        header = _context$resCtx.header,
                        body = _context$resCtx.body;

                    response.writeHead(statusCode, statusMsg, header);
                    response.end(context.resCtx.body);
                });
            };
        }
    }]);

    return APP;
}();

module.exports = APP;