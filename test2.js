const axios = require('axios');
//Sourceurl = 'https://vod.testbook.com/60b90732360ed69406537d6e/playlist.m3u8?t=051bc4e782d8d4c0771863caf681ae0ee9aa6295&ts=1634968248'
Sourceurl = "https://livestreamapis.com/v3/accounts/27388059/events/9786125/videos/224435579.m3u8?clientId=7645&timestamp=1639298758000&token=e6e1f03a49f8f4f3417464ca40f19df5"
axios({
    method: 'get',
    url: Sourceurl,
}).then( response => {
    data = response.data
    source = data.match(/(https.*)\w+/g)
    console.log(source[source.length - 1])
    // console.log(data)
})

