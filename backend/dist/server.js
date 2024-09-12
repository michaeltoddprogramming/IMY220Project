"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use(_express["default"]["static"](_path["default"].join(__dirname, '..', '..', 'frontend', 'public')));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '..', '..', 'frontend', 'public'));
});
app.listen(4000, function () {
  console.log('Server is running on http://localhost:4000');
});