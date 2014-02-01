/*
 * Classe pour la gestion des machines
 * Toutes les fonctions de bases sont gérées ici
 */
 function Machines()
 {

    this.machines = [];
    this.listview = $("#liste-machine");

    /*
     * Parse le json renvoyé par le serv
     */
    this.parseJson = function(machines)
    {
        for(i in machines)
        {
            this.machines.push(new Machine(machines[i]));
        }
    }

    /*
     * Renvois un objet Machine en fonction de l'id
     */
    this.getMachineById = function(id)
    {
        for(i in this.machines)
        {
            if(this.machines[i].id == id)
            {
                return this.machines[i];
            }
        }
    }

    /*
     * Affiche les machines dans la listview
     * Si batname == true, alors le nom du batiment est aussi affiché
     * Si data n'est pas spécifié, on affiche toutes les machines
     */
    this.loadHtml = function(batname,data)
    {
        batname = (typeof batname == 'undefined' ? false : batname);
        data = (typeof data == 'undefined' ? this.machines : data);
        this.listview.empty();
        for(i in data)
        {
            var html = data[i].getHtmlLi(batname);
            this.listview.append(html);
        }
        this.listview.listview('refresh');
    }

    /*
     * Affiche les machines en utilisant les batiments comme séparateur
     * <=> Change le autoDividersSelector en this.dividerBatiment.
     */
    this.displayByBatiment = function()
    {
        this.machines.sort(this.sortBatiment);
        this.loadHtml();
        this.listview.listview({autodividersSelector: this.dividerBatiment});
        this.listview.listview('refresh');
    }

    /*
     * Affiche les machines en utilisant le type comme séparateur
     */
    this.displayByType = function()
    {
        this.machines.sort(this.sortType);
        this.loadHtml(batname=true); // affiche aussi le nom du batiment
        this.listview.listview({autodividersSelector: this.dividerType});
        this.listview.listview('refresh');
    }

    /*
     * Affiches les machines qui ont telle boisson
     */
    this.displayByBoisson = function(boisson)
    {
        // on construit la liste des machines a afficher
        var machs = [];
        for(i in this.machines)
        {
            var mach = this.machines[i];
            if(mach.hasBoisson(boisson))
            {
                machs.push(mach);
            }
        }

        this.loadHtml(batname=false, data=machs);
        this.listview.listview({autodividersSelector: this.dividerBatiment});
        this.listview.listview('refresh');
    }

    /*
     * Divider pour afficher par batiment
     * /!\ this = element du DOM courrant...
     */
    this.dividerBatiment = function(elt)
    {
        var machine = machines.getMachineById(elt.attr('id'));
        return machine.batiment.nom;
    }

    /*
     * Triage des éléments par batiment
     */
    this.sortBatiment = function(a, b)
    {
        var batA = a.batiment.nom;
        var batB = b.batiment.nom;

        if(batA > batB)
        {
            return -1;
        }

        if(batA < batB)
        {
            return 1;
        }

        return 0;
    }

    /*
     * Divider pour afficher par type de machine
     */
    this.dividerType = function(elt)
    {
        var machine = machines.getMachineById(elt.attr('id'));
        if(machine.type == 'cafe')
        {
            return "Cafe";
        } else {
            return "Canette";
        }
        return "ERROR";
    }

    /*
     * Triage des éléments par type de machine
     */
    this.sortType = function(a, b)
    {
        var typeA = a.type;
        var typeB = b.type;

        if(typeA > typeB)
        {
            return -1;
        }

        if(typeA < typeB)
        {
            return 1;
        }

        return 0;
    }

}

/*
 * Objet de type Machine
 */
function Machine(json)
{
    this.id = json['id'];
    this.status = json['status'];
    this.type = json['type'];
    this.description = json['description'];
    this.coords = json['coords'];
    this.qrcode = json['qrcode'];
    this.createdAt = json['createdAt'];
    this.updatedAt = json['updatedAt'];
    this.boissons = [];
    for(i in json['boissons'])
    {
        this.boissons.push(new Boisson(json['boissons'][i]));
    }
    this.batiment = new Batiment(json['batiment']);

    /*
     * Retourne le html de la machine pour l'afficher dans la liste
     */
    this.getHtmlLi = function(batname)
    {
        var html = '<li id="'+this.id+'">';
        html += '<a href="#popup-infos" data-rel="popup" data-position-to="window" data-transition="pop">';
        html += '<img src="/images/'+this.getColorPoint()+'-point.png" class="ui-li-icon"/>';
        if(batname == true)
        {
            html += this.batiment.nom + ' - ';
        }
        html += this.description;
        html += '</a>';
        html += '</li>';
        return html;
    }

    /*
     * Retourne la couleur du point a afficher en fonction du status de la machine
     */
     this.getColorPoint = function()
     {
        if(this.status != true)
        {
            return 'red';
        } else if(this.type == 'canette')
        {
            for(i in this.boissons)
            {
                if(this.boissons[i].status == false)
                {
                    return 'orange';
                }
            }
        }
        return 'green';
     }

    /*
     * Retourne vrai ou faux en fonction de si la machine a ou non la boisson
     */
    this.hasBoisson = function(boisson)
    {
        if(this.type == 'canette' && this.status == true)
        {
            for(i in this.boissons)
            {
                if(this.boissons[i].nom.toLowerCase() == boisson && this.boissons[i].status == true)
                {
                    return true;
                }
            }
        } else if (boisson == 'cafe' && this.type == 'cafe' && this.status == true)
        {
            return true;
        }
        return false;
    }
}

/*
 * Objet de type Batiment
 */
function Batiment(json)
{
    this.id = json['id'];
    this.nom = json['nom'];
    this.createdAt = json['createdAt'];
    this.updatedAt = json['updatedAt'];
}

/*
 * Objet de type Boisson
 */
function Boisson(json)
{
    this.id = json['id'];
    this.nom = json['nom'];
    this.status = json['status'];
    this.createdAt = json['createdAt'];
    this.updatedAt = json['updatedAt'];
}
