const {exec} = require('child_process')

/////1-temp, hum, qut, temp
const execute= async()=>{
  return  new Promise((resolve, reject) => {
    exec(`python3 ./src/python/vespaPredict.py`,
    function (error, stdout, stderr) {
        if (error !== null) return reject(error)
        resolve(stdout)
        
    });
    })
}

module.exports= {
    execute
}

