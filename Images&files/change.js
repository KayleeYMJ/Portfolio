var index = 0;
//connect bus stop API
function busRecords(busResults) {
    console.log(busResults);

    $.each(busResults.result.records, function(recordID, recordValue) {

        var recordLatitude = recordValue["LATITUDE"];
        var recordLongitude = recordValue["LONGITUDE"];
        if (recordLatitude <= -27.442236 && recordLatitude >= -27.4789447 && recordLongitude <= 153.0517297 && recordLongitude >= 152.9547911) {
            if (index % 15 == 0) {
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
            }
        } else {
            if (index % 50 == 0) {
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
            }
        }
        index++;
    });

}