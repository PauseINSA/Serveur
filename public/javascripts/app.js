
var machines = {};
var socket = io.connect();

/*
 * Lorsque l'on reçoit les données initiales à la connexion
 */
socket.on('updateAll', function(data){
    machines = data;
    displayMachinesByBatiment();
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
            addMachineByBatiment(this);
        // une autre boisson et la machine vend des canettes
        } else if (boisson != 'cafe' && this.type == 'canette'){
            for(i in this.boissons) // pour chaque boisson dans la machine
            {
                if(this.boissons[i].nom.toLowerCase() == boisson && this.boissons[i].status == true) // la boisson est dispo
                {
                    addMachineByBatiment(this); // on ajoute à la liste
                }
            }
        }
    });
    $("#liste-machine").listview('refresh');
});

/*
 * Demande d'affichage de toutes les machines
 */
$("#menu-display-batiment").click(function(){
    displayMachinesByBatiment();
});

/*
 * Afficher toutes les machines en triant par bâtiment
 */
function displayMachinesByBatiment()
{
    $("#liste-machine").empty();
    $.each(machines, function(){
        addMachineByBatiment(this);
    });
    $("#liste-machine").listview('refresh');
}

/*
 * Ajouter une machine à la liste en mettant les batiments comme séparateur
 */
function addMachineByBatiment(machine)
{
    // si le séparateur existe pas, on le créé
    if($("li#bat-"+machine.batiment['id']).length == 0)
    {
        $("<li data-role=\"list-divider\" id=\"bat-"+machine.batiment['id']+"\">"+machine.batiment['nom']+"</ul>").appendTo("#liste-machine");
    }

    // on ajoute la machine juste après le bon séparateur
    $("<li>"+
            "<a href=\"#page-infos\" data-transition=\"slide\">"+
                "<img src=\"/images/"+getPointMachine(machine)+"-point.png\" class=\"ui-li-icon\"/>"+machine.description+
            "</a>" +
      "</li>").insertAfter("li#bat-"+machine.batiment['id'])
}

/*
 * Renvoie la couleur du point à afficher devant la machine
 */
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
