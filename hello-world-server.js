var http = require('http');
var os = require('os');
var EventEmitter = require('events').EventEmitter;

var toMb = function(f){
	return (Math.round(f/1024/1024)*100/100);
};

var getResource = function(c){
	var e = new EventEmitter();
	process.nextTick(function(){
		var count=0;
		e.emit('start');
		var t = setInterval(function(){
			e.emit('data', ++count);
			if(count === c){
				e.emit('end', count);
				clearInterval(t);
			}
		},10);
	});
	return e;
};

var r = getResource(7);

r.on('start', function(){
	console.log("I've started!");
});

r.on('data', function(d){
	console.log("Recieved data->" + d);
});

r.on('end', function(){
	console.log("The end!");
});

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');


console.log('Host: '+os.hostname());
console.log('Uptime: '+os.uptime());
console.log('Average load: '+os.loadavg());
console.log('Network interfaces: '+os.networkInterfaces().toString());
console.log(toMb(os.freemem())+'Mb of '+ toMb(os.totalmem()) + 'Mb free');
console.log('Number of cpus: '+os.cpus());
console.log('Server running at http://127.0.0.1:1337/');
