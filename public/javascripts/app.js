
var machines = {};
var socket = io.connect();

/*
 * Lorsque l'on reçoit une mise à jour
 */
socket.on('updateAll', function(data){
    machines = data;
    // par defaut on affiche toutes les machines
    $.each(machines, function(){
        addMachine(this);
    });
});

/*
 * Lorsque l'utilisateur choisis une boisson
 */
$("#btn-boisson").click(function(){
    var boisson = $("#select-boisson").val();
    // on vide la liste courrante
    $("#liste-machine").empty();
    // on itère sur chaque machine
    $.each(machines, function(){
        // on a choisi un café, que la machine courrante est une cafetière et qu'elle marche, on ajoute dans la liste
        if(boisson == 'cafe' && this.type == 'cafe' && this.status == true)
        {
            addMachine(this);
        // une autre boisson et la machine vend des canettes
        } else if (boisson != 'cafe' && this.type == 'canette'){
            for(i in this.boissons) // pour chaque boisson dans la machine
            {
                if(this.boissons[i].nom.toLowerCase() == boisson && this.boissons[i].status == true) // la boisson est dispo
                {
                    addMachine(this); // on ajoute à la liste
                }
            }
        }
    });
    $("#liste-machine").listview('refresh');
});

/*
 * Pour traiter les demandes spécifiques de l'utilisateur (menu de droite)
 */
$(".menu-trier").click(function(){
    
});

function addMachine(machine)
{
    $("#liste-machine").append("<li><a href=\"#\"><img src=\"/images/"+getPointMachine(machine)+"-point.png\" class=\"ui-li-icon\"/>"+machine.batiment['nom']+" - "+machine.description+"</a></li>");
}

function getPointMachine(machine)
{
    if(machine.status != true)
    {
        return "red";
    } else if(machine.type == 'canette') {
        for(i in machine.boissons)
        {
            if(machine.boissons[i].status == false)
            {
                return "orange";
            }
        }
    }
    return "green";
}
