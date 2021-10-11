
const http = require("http");
const fs = require("fs")

http.createServer(function(request, response){
   
  
    if(request.method === "GET"){
        let data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.end(JSON.stringify(data));
    }else{
        
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            let data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
            let newDataTable = JSON.parse(body)

            let flag
            data.forEach(element => {
                if(element.id === newDataTable.id ){
                    flag = true
                }else{
                    flag = false
                }
            });
            if(flag){
                if(newDataTable.hasOwnProperty("summ") ){
                    let newData = data.map((element) => {
                        if(element.id === newDataTable.id){
                           return newDataTable
                        }else{
                            return element
                        }
                    });
                   
                    fs.writeFileSync("data.json",JSON.stringify(newData))
                }else{
                    let newData = data.filter((element) => {
                        return element.id !== newDataTable.id  
                    });
                    fs.writeFileSync("data.json",JSON.stringify(newData))           
                }
            }else{
                data.push(newDataTable)
               fs.writeFileSync("data.json",JSON.stringify(data))
            }
           
                
            
            response.end('ok');
        });
       
    }

}).listen(3000);