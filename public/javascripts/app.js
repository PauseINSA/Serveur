

var machines;
var socket = io.connect();

/*
 * Lorsque l'on reçoit les données initiales à la connexion
 */
socket.on('updateAll', function(data){
    machines = new Machines();
    machines.parseJson(data);
    machines.displayByBatiment();
});

/*
 * Lorsque l'utilisateur choisis une boisson
 */
$("#btn-boisson").click(function(){
    var boisson = $("#select-boisson").val();
    machines.displayByBoisson(boisson);
});

/*
 * Lorsque l'utilisateur clique sur le nom d'une machine
 */
$("#liste-machine").delegate('li', 'click', function(){

});

/*
 * Demande d'affichage de toutes les machines par batiment
 */
$("#menu-display-batiment").click(function(){
    machines.displayByBatiment();
});

/*
 * Demande d'affichage de toutes les machines par type
 */
$("#menu-display-type").click(function(){
    machines.displayByType();
});
