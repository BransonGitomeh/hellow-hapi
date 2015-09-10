var Hapi = require('hapi');

//make a new server object
var server = new Hapi.Server();


//this must be there or it wiil throw a stupid error
server.connection({port:3000});

//start the new server since all dependencies are now present
server.start(function(){
  console.log('server running at: ', server.info.uri);
});


//this are the routes that we need
server.route({
  method:'GET',
  path:'/',
  handler:function(request,reply){
    reply('Heeey, im happy')
  }
})

//this are the routes that we need
server.route({
  method:'GET',
  path:'/{name}',
  handler:function(request,reply){
    reply('Heeey ' + encodeURIComponent(request.params.name) + ', im happy')
  }
})

//shows multiple url objects being used

//TODO add optional "params to the route"
server.route({
  method:'GET',
  path:'/{name}/{age}',
  handler:function(request,reply){
    reply('Heeey, ' + encodeURIComponent(request.params.name) + ' ' + encodeURIComponent(request.params.age) + ' im happy')
  }
})
