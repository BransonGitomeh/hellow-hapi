//mother lib
var Hapi = require('hapi');

//lib for logging server events
var Good = require('good');

//make a new server object
var server = new Hapi.Server();


//this must be there or it wiil throw a stupid error
server.connection({port:3000});

//start the new server since all dependencies are now present
server.start(function(){
  console.log('server running at: ', server.info.uri);
});

//Routes-------------------------------------------------------
//simple endpoint no complications
server.route({
  method:'GET',
  path:'/',
  handler:function(request,reply){
    reply('Heeey, im happy')
  }
})

//endpoint with dynamic data
server.route({
  method:'GET',
  path:'/{name}',
  handler:function(request,reply){
    reply('Heeey ' + encodeURIComponent(request.params.name) + ', im happy')
  }
})

//endpoint with more than one dynamic end
server.route({
  method:'GET',
  path:'/{name}/{age}',
  handler:function(request,reply){

    //since the good console logger is now part of the server you can use it
    server.log('info', 'server running at ; ' + server.info.uri)
    reply('Heeey, ' + encodeURIComponent(request.params.name) + ' ' + encodeURIComponent(request.params.age) + ' im happy')
  }
})

//Plugins-----------------------------------------------------------------

//add the good plugin to the server to be used
server.register({
  register:Good,
  options:{
    reporters:[{
      reporter: require('good-console'),
      events:{
        responce:'*',
        log:'*'
      }
    }]
  }
},function(err){
  if(err){
    throw err;
    //couldnt load the good girl plugin
  }
});

//add the inert file plugin to your project to serve content from server
server.register(
    require('inert'),function(err){
  if(err){
    throw err;
    //couldnt load the good girl plugin
  }
});
