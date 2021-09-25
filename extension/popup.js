document.addEventListener('DOMContentLoaded',()=>{
    chrome.tabs.executeScript({
        code: `var capture_resource = performance.getEntriesByType("resource");
        for (var i = 0; i < capture_resource.length; i++) {
            // capture_network_request.push(capture_resource[i].initiatorType)
            if (capture_resource[i].initiatorType == "xmlhttprequest" || capture_resource[i].initiatorType == "fetch" || capture_resource[i].initiatorType == "other") {
                if (capture_resource[i].name.indexOf('https://livestreamapis.com') > -1) {
                    // capture_network_request.push(capture_resource[i].name)
                    alert(capture_resource[i].name)
                }
            }
        }`
    });    
}, false)