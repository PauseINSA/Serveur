
var machines = {};
var socket = io.connect();

socket.on('update', function(data){
    machines = data;
});

$(".menu-trier").click(function(){
    
});
