var capture_resource = performance.getEntriesByType("resource");
capture_network_request = [];
for (var i = 0; i < capture_resource.length; i++) {
    // capture_network_request.push(capture_resource[i].initiatorType)
    if (capture_resource[i].initiatorType == "xmlhttprequest" || capture_resource[i].initiatorType == "fetch" || capture_resource[i].initiatorType == "other") {
        if (capture_resource[i].name.indexOf('playlist.m3u8') > -1) {
            capture_network_request.push(capture_resource[i].name)
            // alert(capture_resource[i].name)
        }
    }
}
alert(capture_network_request[capture_network_request.length-1])