const axios = require('axios')
const { get } = require('express/lib/response')
sourceUrl = 'https://vod.livestreamapis.com/61b5f6c7_da0b0ad7557d0ee4cc982908f952a2d178c7cb34/events/000000000095530d/0653b6ea-b4b1-443a-b4ee-4489bfa4d8b4_1756.m3u8'
async function get_total(){
    response = await axios({
        method: 'get',
        url: sourceUrl
    })
    data = response.data
    // console.log(data)
    source = data.match(/(\d+.ts)/gm)
        // console.log(source)
    console.log( source[source.length-1].replace('.ts',''))
}
total_count = get_total()
console.log(total_count)

