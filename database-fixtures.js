
/*
 * Fichier de données pour l'INSA de Toulouse
 */

var db = require('./models');

// Utils functions
function addBoissonToMachine(boisson, machine)
{
    db.Boissons.create({nom: boisson, status: true}).complete(function(err, boisson){
        boisson.setMachine(machine);
    });
}

function addMachineToBatiment(machine, batiment)
{
    db.Machines.create({description: machine['description'], status: true, type: machine['type']}).complete(function(err, mach){
        mach.setBatiment(batiment);
        for(i in machine['boissons'])
        {
            addBoissonToMachine(machine['boissons'][i], mach);
        }
    });
}

function addBatiment(batiment, machines)
{
    db.Batiments.create({nom: batiment}).complete(function(err, batiment){
        for(i in machines)
        {
            addMachineToBatiment(machines[i], batiment);
        }
    });
}

db.sequelize.sync().complete(function(err){
    if(!err)
    {
        addBatiment('Bâtiment STPI', [{description: 'Machine de gauche', type: 'cafe'},
                            {description: 'Machine de droite', type: 'cafe'},
                            {description: 'Machine du milieu', type: 'canette', boissons: ['Eau', 'Coca', 'Fanta']}
                            ]);

        addBatiment('Bâtiment Génie Mecanique', [{description: 'Machine de droite', type: 'cafe'},
                                {description: 'Machine de gauche', type: 'canette', boissons: ['Eau', 'Coca', 'Fanta']}
                                ]);

        addBatiment('Centre des Science Humaines', [{description: 'Machine de droite', type: 'cafe'},
                                {description: 'Machine de gauche', type: 'canette', boissons: ['Eau', 'Coca', 'Fanta']}
                                ]);

        addBatiment('Bâtiment GEI', [{description: 'Machine au premier étage', type: 'cafe'}]);

    } else {
        throw err;
    }
});
