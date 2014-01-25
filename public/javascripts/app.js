
var machines = {};
var userPosition;
var socket = io.connect();

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(successGeoloc, errorGeoloc);
// } else {
//     error('not supported');
// }
// 
// function successGeoloc(position)
// {
//     userPosition = position;
// }
// 
// function errorGeoloc(msg)
// {
//     console.log(msg);
// }

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
 * Lorsque l'utilisateur clique sur le nom d'une machine
 */
$("#liste-machine").delegate('li', 'click', function(){
    var id = $(this).attr('id');
    var machine = getMachineById(id);
    console.log(machine);
    $("#popup-infos div.ui-content").empty();
    $('<p>'+machine.description+'</p>').appendTo("#popup-infos div.ui-content");
});

/*
 * Demande d'affichage par boisson
 */
$("#menu-display-boisson").click(function(){
    $("#nav-panel").panel('close');
});

/*
 * Demande d'affichage de toutes les machines par batiment
 */
$("#menu-display-batiment").click(function(){
    displayMachinesByBatiment();
});

/*
 * Demande d'affichage de toutes les machines par type
 */
$("#menu-display-type").click(function(){
    displayMachinesByType();
});

/*
 * Afficher toutes les machines en triant par type de machine
 */
function displayMachinesByType()
{
    $("#liste-machine").empty();
    $.each(machines, function(){
        addMachineByType(this);
    });
    $("#liste-machine").listview('refresh');
}

/*
 * Ajouter une machine à la liste en mettant son type comme séparateur
 */
function addMachineByType(machine)
{
    if($("li#type-"+machine['type']).length == 0)
    {
        var name = "Machine a café";
        if(machine['type'] == 'canette')
        {
            name = "Machine a canette";
        }
        $('<li data-role="list-divider" id="type-'+machine['type']+'">'+name+'</li>').appendTo("#liste-machine");
    }

    $("<li id=\""+machine['id']+"\">"+
        '<a href="#popup-infos" href="#popup-infos" data-rel="popup" data-position-to="window" data-transition="pop">' + 
            '<img src="/images/'+getPointMachine(machine)+'-point.png" class="ui-li-icon"/>' + machine.batiment['nom'] + ' - ' + machine['description'] +
        '</a>'+
      '</li>').insertAfter('li#type-'+machine['type']);
    
}

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
        $("<li data-role=\"list-divider\" id=\"bat-"+machine.batiment['id']+"\">"+machine.batiment['nom']+"</li>").appendTo("#liste-machine");
    }

    // on ajoute la machine juste après le bon séparateur
    $("<li id=\""+machine['id']+"\">"+
            '<a href="#popup-infos" data-rel="popup" data-position-to="window" data-transition="pop">'+
                "<img src=\"/images/"+getPointMachine(machine)+"-point.png\" class=\"ui-li-icon\"/>"+machine['description']+
            "</a>" +
      "</li>").insertAfter("li#bat-"+machine.batiment['id'])
}

/*
 * Renvoie toutes les infos d'une machine en fonction de son id
 */
function getMachineById(id)
{
    for(i in machines)
    {
        if(machines[i].id == id)
        {
            return machines[i];
        }
    }
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
