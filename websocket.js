// const ws = require("nodejs-websocket")
// var _server = ws.createServer(conn =>{
//     //接收客户端返回的数据
//     conn.on("message", function(data){

//         conn.clients.forEach(function each(client) {
//             client.send(data);
//          });
//     })

//     //客户端关闭连接
//     conn.on("close", function(){
//         console.log('close over')
//     })

//     conn.on('error', err=>{
//         console.log(err, '连接报错')
//     })
    
// })

// //定义端口为8080
// const port = 8080
// _server.listen(port, ()=>{
//     console.log('connect success')
//     console.log('listening on websocketServer')
// })


var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({ port: 8080,maxPayload: 60000 });

let lib = []

wss.on('connection', function (ws) {
    console.log('client connected');

    ws.on('message', function (data) {
        console.log('receive:',data.toString());

        let data01 = JSON.parse(data.toString())
        console.log('中间部分:', data01)
        console.log(lib)


        if(data01.ChatLibNum == 0){
            console.log(111)
            if(data01.chance == '0'){
                return
            }
            wss.clients.forEach(function each(client) {
                console.log(111)
                console.log('下侧部分:',lib.length)
                for(var i = 0; i < lib.length; i++){
                    data01.sender == 'A'? lib[i].Tosender = 'A': lib[i].Tosender = 'B'
                    lib[i].sender01 = 'lib'
                    client.send(JSON.stringify(lib[i]));
                }
             });
             return
        }

        console.log('最下侧部分:',lib.length)
          lib.push(data01)
          console.log(lib.length)
          wss.clients.forEach(function each(client) {
             client.send(data.toString());
          });

    });
    ws.on('close',function(){
        console.log('服务关闭');
    })
});

