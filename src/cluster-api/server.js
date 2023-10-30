import http from 'http'
const processId = process.pid

const server = http.createServer((_request, response) => {
    for (let index = 0; index < 1e7; index++);
    response.end(`Handled by pid: ${processId}`)
})

server.listen(3001)
    .once('listening', () => {
        console.log('Server started in process', processId)
    })

process.on('SIGTERM', () => {
    console.log('server ending', new Date().toISOString())
    server.close(() => process.exit())
})

// // emulating application crash
// setTimeout(() => {
//     process.exit(1)
// }, Math.random() * 1e4)
