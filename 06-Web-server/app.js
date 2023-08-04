import http from 'http'; 



http.createServer((req,res) =>{
    res.writeHead(200);
    res.write('HOLA MUNDO')
    res.end('');
})
.listen(9010)

console.log('escuchando en el puerto', 9010);