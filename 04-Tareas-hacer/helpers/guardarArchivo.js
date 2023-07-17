import fs from 'node:fs'

const guardarDB = (data) => {
    const archivo = './db/data.json'
    fs.writeFileSync(archivo,JSON.stringify(data));
}


export {guardarDB}