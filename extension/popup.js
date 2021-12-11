document.addEventListener('DOMContentLoaded',()=>{
    chrome.tabs.executeScript({
        code: `var capture_resource = performance.getEntriesByType("resource");
        var playlist_url = [];
        var livestream_url = [];
        for (var i = 0; i < capture_resource.length; i++) {
            if (capture_resource[i].initiatorType == "xmlhttprequest") {
                if (capture_resource[i].name.indexOf('playlist.m3u8') > -1) {
                    playlist_url.push(capture_resource[i].name);
                    //alert(capture_resource[i].initiatorType);
                }
                else if (capture_resource[i].name.indexOf('https://livestreamapis.com') > -1) {
                    livestream_url.push(capture_resource[i].name);
                    //alert(capture_resource[i].initiatorType);
                }
            }
        }
        var final_url = playlist_url.length > 0 ? playlist_url[playlist_url.length-1] : livestream_url[0]
        alert(final_url)
        `
    });    
}, false)
