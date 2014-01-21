
var data = {};
var socket = io.connect();

socket.on('update', function(data){
    alert(data);
});

$(".menu-trier").click(function(){
    
});
