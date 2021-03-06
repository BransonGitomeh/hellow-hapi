//mother lib
var Hapi = require('hapi');

//lib for logging server events
var Good = require('good');

//some weird shit they call relative files

//TODO explain wth this is when i get it

//---ddnt get it :-p
var Path = require('path');

//make a new server object
var server = new Hapi.Server({
  connections:{
    routes:{
      files:{
        relativeTo:Path.join('/home/bransongk/Downloads','public')
      }
    }
  }
});


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

//endpoint for random picture from fs
//old method
server.route({
  method:'GET',
  path:'/randomPicture',
  handler:function(request,reply){
    reply.file('/home/bransongk/Downloads/husky.jpg')
  }
})

//endpoint for random picture from fs
//new method now with relative paths
server.route({
  method:'GET',
  path:'/husky.jpg',
  handler:function(request,reply){
    reply.file('/home/bransongk/Downloads/husky.jpg')
  }
})

// server.route({
//     method: 'GET',
//     path: '/{filename}',
//     handler: {
//         file: function (request) {
//             return request.params.filename;
//         }
//     }
// });

server.route({
  method:'GET',
  path:'/pictures/{filename}',
  handler:function(request,reply){
    var path  = '/home/bransongk/Downloads/' + request.params.filename;
    console.log(path);
    reply.file(path)
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
