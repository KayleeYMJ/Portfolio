//checkbox set focus
function setFocus() {
    document.getElementById('check1').focus()
}

//checkbox lost focus
function loseFocus() {
    document.getElementById('check1').blur()
}

//maker icons setting
var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: '../Images&Files/marker-shadow.png',
        iconSize: [25, 25],
        shadowSize: [35, 35],
    }
});

var ferryIcon = new LeafIcon({
        iconUrl: '../Images&Files/ferry.png'
    }),
    busIcon = new LeafIcon({
        iconUrl: '../Images&Files/bus.png'
    });

//bus layer 
var busStop = L.layerGroup();

//ferry layer 
var ferry = L.layerGroup();

//map
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2F5bGVlc3B5IiwiYSI6ImNrdHFtbnU1MTB4cnMyb2w0NTE0bHNtdHQifQ.EmIQuBNFf9MLO5pXPCPKOw';

var map = L.map('mapid', {
    center: [-87.467, 155],
    zoom: 17,
    layers: [busStop, ferry]
});

L.tileLayer(mbUrl, {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr
}).addTo(map);

//connect bus stop API
function busRecords(busResults) {
    console.log(busResults);

    $.each(busResults.result.records, function(recordID, recordValue) {
        var recordLatitude = recordValue["LATITUDE"];
        var recordLongitude = recordValue["LONGITUDE"];

        if (recordLatitude) {
            if (recordLongitude) {
                var marker = L.marker([recordLatitude, recordLongitude], {
                    icon: busIcon
                }).addTo(busStop);

                if (recordValue["NEAREST_CROSS_STREET"] == "") {
                    popupText = "<strong>" + recordValue["DESCRIPTION"] + "</strong><br>" + "in " + recordValue["STREET_NAME"] + "<br>" + "nearest cross street: None";
                } else {
                    popupText = "<strong>" + recordValue["DESCRIPTION"] + "</strong><br>" + "in " + recordValue["STREET_NAME"] + "<br>" + "nearest cross street: " + recordValue["NEAREST_CROSS_STREET"];
                }
                marker.bindPopup(popupText).openPopup();
            }
        }
    });

}

//connect ferry terminal API
function ferryRecords(ferryResults) {
    console.log(ferryResults);

    $.each(ferryResults.result.records, function(recordIDFerry, recordValueFerry) {

        var recordLatitudef = recordValueFerry["LATITUDE"];
        var recordLongitudef = recordValueFerry["LONGITUDE"];

        if (recordLatitudef) {
            if (recordLongitudef) {
                var marker = L.marker([recordLatitudef, recordLongitudef], {
                    icon: ferryIcon
                }).addTo(ferry);

                popupText = "<strong>" + recordValueFerry["DESCRIPTION"] + "</strong><br>" + "in " + recordValueFerry["STREETNAME"] + "<br>suburb: " + recordValueFerry["SUBURB"];
                marker.bindPopup(popupText).openPopup();
            }
        }
    });
}

// map add layers
var layer = {
    "Bus": busStop,
    "Ferry": ferry,
}

L.control.layers(null, layer).addTo(map);





//API
$(document).ready(function() {
    //bus stops
    var busData = {
        resource_id: "0c4fda19-f96a-4174-a821-be6dad2e45cf",
        limit: 100
    }

    $.ajax({
        url: "https://www.data.brisbane.qld.gov.au/data/api/3/action/datastore_search",
        data: busData,
        dataType: "jsonp",
        cache: true,
        success: function(busResults) {
            busRecords(busResults);
        }
    });

    //Ferry Terminal locations 
    var ferryData = {
        resource_id: "bdffec72-f4b5-4107-b7e3-751652af28f2",
        limit: 100
    }

    $.ajax({
        url: "https://www.data.brisbane.qld.gov.au/data/api/3/action/datastore_search",
        data: ferryData,
        dataType: "jsonp",
        cache: true,
        success: function(ferryResults) {
            ferryRecords(ferryResults);
        }
    });

});