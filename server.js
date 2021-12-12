const { exec } = require('child_process')
const express = require('express')
const http = require('http')
const axios = require('axios');
const { Server } = require('socket.io')


const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(bodyParser.json())
app.use(express.static(__dirname))
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
})
app.post('/download', (req,res) => {
    let params = req.body
    console.log(params)
    download(params)
    res.end()
})

io.on('connection',(socket) => {
    console.log('user connected')
})

server.listen(8000, (success, error) => {
    console.log('running')
})

function download(params){
    let subject = params.subjectName
    let subTopic = params.subTopic
    let date = params.date
    let filename = params.fileName
    let Sourceurl =  params.link
    axios({
        method: 'get',
        url: Sourceurl,
    }).then( response => {
        data = response.data
        source = data.match(/(https.*)\w+/g)
        link = source[source.length - 1]
        console.log('Downloading from:', link)
        let subject_path = `~/Exams/Gate/${subject}/"${subTopic}"/`
        exec(`mkdir -p ${subject_path}`)
        let save_path = `${subject_path}/"${filename}.${date}.mp4"`
        command = `ffmpeg -i "${link}" -c copy -bsf:a aac_adtstoasc ${save_path}`
        execute(command, filename, link)
    }).catch(error => {
        sendError(filename, error);
        console.error(error);
    })
}

function execute(command, file, link){
    axios({
        method: 'get',
        url: link,
    }).then( response => {
        data = response.data
        source = data.match(/(\d+.ts)/gm)
        total_count = Number(source[source.length-1].replace('.ts',''))
        count = 0
        var process = exec(command)
        // process.stdout.on('data', function(data){
        //     count = Number(data.match(/(_\d*)/g)[0].replace('_',''))
        //     io.emit('output', {data: `${count}/${total_count}`, file: file})
        // })
        process.stderr.on('data', (data)=>{
            try{
                count = Number(data.match(/(\d+.ts)/gm)[0].replace('.ts',''))
            }
            catch(e){

            }
            
            io.emit('output', {count: count, total_count: total_count, fileName: file})
        })
    })
}

function sendError(file, error){
    io.emit('error',{data:JSON.stringify(error),fileName:file})
}
