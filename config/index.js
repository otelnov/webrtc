module.exports = function (app) {
  'use strict';

  require('./config')(app);

  require('./log')(app);
  require('./db')(app);
  require('./passport')(app);
  require('./express')(app);
};
