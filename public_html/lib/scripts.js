window.GridsterWars = {};

window.GridsterWars.crewMembers = [];

window.GridsterWars.constants = {
    roleSizes: {
        director: 3,
        actor: 2
    },
    jsonUrl: 'lib/data.json'
};

window.GridsterWars.createCrewElement = function(crewMember) {

    var elementHtmlContent = "<li class='crew-block'";

    //add data attributes
    elementHtmlContent += " data-crew-id='" + crewMember.id + "' >";

    elementHtmlContent += crewMember.name + "<br/>--<br/>";
    if ('character' in crewMember.role) {
        elementHtmlContent += "<b>" + crewMember.role.name + ":</b> <i>" + crewMember.role.character + "</i>";
    } else {
        elementHtmlContent += "<b>" + crewMember.role.name + "</b>";
    }

    elementHtmlContent + "</li>";

    return elementHtmlContent;

};

window.GridsterWars.loadData = function() {
    //Cleanup
    window.GridsterWars.gridster.remove_all_widgets();

    executeLoadData = function (data){
        var i = 0;
        for (i = 0; i < data.length; i++) {
            var crewMember = data[i];
            var crewMemberElement = window.GridsterWars.createCrewElement(crewMember);
            var size = window.GridsterWars.constants.roleSizes[crewMember.role.name.toLowerCase()] || 1;
            var row = crewMember.position[0];
            var col = crewMember.position[1];

            window.GridsterWars.gridster.add_widget(crewMemberElement, size, size, col, row);
        }
    };

    if(_.size(window.GridsterWars.crewMembers) === 0){
        jQuery.getJSON(window.GridsterWars.constants.jsonUrl, function(data) {
            window.GridsterWars.crewMembers = data;
            executeLoadData(data);
        });
    }else{
        executeLoadData(window.GridsterWars.crewMembers);
    }
};

window.GridsterWars.dumpData = function() {
    console.log(JSON.stringify(window.GridsterWars.gridster.serialize()));
};
