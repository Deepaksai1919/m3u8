const { exec } = require('child_process')

function execute(command){
    /*exec(command, (err, stdout, stderr) => {
        if(err){
            console.error(`error: ${err.message}`)
            return;
        }
        console.log(stdout)
    })*/
    var process = exec(command)
    process.stdout.on('data', function(data){
        console.log(data)
    })
    process.stderr.on('data',(e)=>{
        console.error(e)
    })
}

execute(`ffmpeg -i https://vod.livestreamapis.com/60ce3716_566e8bf8527b8e366c8fa2721ee9636be69933b0/events/0000000000943903/b16987a8-53ed-434e-b66d-83c102dc6366_628.m3u8 -c copy -bsf:a aac_adtstoasc "test.mp4"`)