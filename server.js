var cluster = require("cluster");
var numCPUs = require('os').cpus().length;
cluster.setupMaster({
  exec : "app.js"
});
for (var i = 0; i < numCPUs - 1; i++) {
  cluster.fork();
}
cluster.on('exit', function(worker, code, signal) {
  'use strict';
  console.log('worker ' + worker.process.pid + ' died');
  cluster.fork();
});
