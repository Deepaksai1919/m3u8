const { exec } = require('child_process')
const express = require('express')
const http = require('http')
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

server.listen(5000, (success, error) => {
    console.log('running')
})

function download(params){
    let subject = params.subject
    let date = params.date
    let filename = params.filename
    let link = params.link
    let subject_path = `C:\\Exams\\Gate\\${subject}\\${date}`
    execute(`mkdir ${subject_path}`)
    let save_path = `${subject_path}/"${filename}.mp4"`
    command = `ffmpeg -i ${link} -c copy -bsf:a aac_adtstoasc ${save_path}`
    execute(command)
}

function execute(command){
    var process = exec(command)
    process.stdout.on('data', function(data){
        io.emit('output', data)
        console.log(data)
    })
    process.stderr.on('data', (data)=>{
        io.emit('output', data)
        console.log(data)
    })
}
