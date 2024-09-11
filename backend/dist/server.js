"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var PORT = process.env.PORT || 4200;
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../../frontend/public')));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../../frontend/public', 'index.html'));
});
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});