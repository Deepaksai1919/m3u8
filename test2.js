const axios = require('axios');
Sourceurl = 'https://vod.testbook.com/60b90732360ed69406537d6e/playlist.m3u8?t=051bc4e782d8d4c0771863caf681ae0ee9aa6295&ts=1634968248'
// Sourceurl = "https://livestreamapis.com/v3/accounts/27388059/events/9789138/videos/224513453.m3u8?clientId=7645&timestamp=1633755615000&token=fb0b680810602472c4806c5521067079"
axios({
    method: 'get',
    url: Sourceurl,
}).then( response => {
    data = response.data
    source = data.match(/(https.*)\w+/g)
    console.log(source[source.length - 1])
    // console.log(data)
})

