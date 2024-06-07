//reference Week6 exercise2 and https://leafletjs.com

//maker icons setting
var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'Images&Files/marker-shadow.png',
            iconSize: [25, 25],
            shadowSize: [35, 35],
        }
    }),
    turcksIcon = L.Icon.extend({
        options: {
            shadowUrl: 'Images&Files/marker-shadow.png',
            iconSize: [55, 55],
            shadowSize: [15, 15],
        }
    });

var ferryIcon = new LeafIcon({
        iconUrl: 'Images&Files/ferry.png'
    }),
    busIcon = new LeafIcon({
        iconUrl: 'Images&Files/bus.png'
    }),
    burgerIcon = new turcksIcon({
        iconUrl: 'Images&Files/burger.png'
    }),
    pizzaIcon = new turcksIcon({
        iconUrl: 'Images&Files/pizza.svg',
        iconSize: [50, 50],
    }),
    sweetIcon = new turcksIcon({
        iconUrl: 'Images&Files/sweet.png',
        iconSize: [85, 85],
    }),
    othersIcon = new turcksIcon({
        iconUrl: 'Images&Files/others.png',
        iconSize: [65, 65],
    });

//create ferry layer 
var ferry = L.layerGroup(),
    //bus layer 
    busStop = L.layerGroup(),
    //food truck layer 
    truck = L.layerGroup(),
    pizza = L.layerGroup(),
    burger = L.layerGroup(),
    others = L.layerGroup(),
    sweet = L.layerGroup();

//map  
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2F5bGVlc3B5IiwiYSI6ImNrdHFtbnU1MTB4cnMyb2w0NTE0bHNtdHQifQ.EmIQuBNFf9MLO5pXPCPKOw';

var map = L.map('mapid', {
    center: [-27.467, 153.033],
    zoom: 11.5,
    layers: [ferry, busStop, truck]
});

L.tileLayer(mbUrl, {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    attribution: mbAttr
}).addTo(map);


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

//connect food truck API
function truckRecords(data) {
    console.log(data);

    $.each(data.result.records, function(recordID, recordValue) {
        var recordLatitude = recordValue["LATITUDE"],
            recordLongitude = recordValue["LONGITUDE"],
            recordStart = recordValue["start"],
            recordFinish = recordValue["finish"],
            recordName = recordValue["name"],
            recordAddress = recordValue["Address"],
            recordType = recordValue["category"];

        //all food display on the "truck" layer
        // different icons of different types of food
        if (recordType == "Pizza") {
            var marker = L.marker([recordLatitude, recordLongitude], {
                icon: pizzaIcon
            }).addTo(truck);
        } else if (recordType == "Dessert / Sweet") {
            var marker = L.marker([recordLatitude, recordLongitude], {
                icon: sweetIcon
            }).addTo(truck);
        } else if (recordType == "American") {
            var marker = L.marker([recordLatitude, recordLongitude], {
                icon: burgerIcon
            }).addTo(truck);
        } else {
            var marker = L.marker([recordLatitude, recordLongitude], {
                icon: othersIcon
            }).addTo(truck);
        }

        popupText = "<strong>" + recordName + "</strong><br>" + "From " + recordStart + "<br>" + "To " +
            recordFinish + "<br>" + "Address: " + recordAddress;

        marker.bindPopup(popupText).openPopup();

        // food filter implement
        if (recordType == "Pizza") {
            var markerB = L.marker([recordLatitude, recordLongitude], {
                icon: pizzaIcon
            }).addTo(pizza);
        } else if (recordType == "Dessert / Sweet") {
            var markerB = L.marker([recordLatitude, recordLongitude], {
                icon: sweetIcon
            }).addTo(sweet);
        } else if (recordType == "American") {
            var markerB = L.marker([recordLatitude, recordLongitude], {
                icon: burgerIcon
            }).addTo(burger);
        } else {
            var markerB = L.marker([recordLatitude, recordLongitude], {
                icon: othersIcon
            }).addTo(others);
        }

        popupTextB = "<strong>" + recordName + "</strong><br>" + "From " + recordStart + "<br>" + "To " +
            recordFinish + "<br>" + "Address: " + recordAddress;

        markerB.bindPopup(popupTextB).openPopup();
    });

}

// control layers of map
var layer = {
    "Bus": busStop,
    "Ferry": ferry,
    "truck": truck,
}

L.control.layers(null, layer).addTo(map);

//API
$(document).ready(function() {

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

    //bus stops
    var busData = {
        resource_id: "0c4fda19-f96a-4174-a821-be6dad2e45cf",
        limit: 500
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

    //truck
    $.ajax({
        url: "json/combine.json",
        data: {},
        dataType: 'json',
        cache: true,
        success: function(data) {
            truckRecords(data);
        }
    });

});