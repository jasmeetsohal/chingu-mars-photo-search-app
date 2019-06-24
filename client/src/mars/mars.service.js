let getAllByPage = (sol,camera,page) =>{
    return new Promise((resolve,reject) =>{
          
        fetch(`http://localhost:4040/api/mars/photos/?sol=${sol}&camera=${camera}&page=${page}`,
       {
         method: 'GET',
         headers: {
           Accept: 'application/json',
         }
       }
       ).then((response,err) => {
            if(err) return reject(err);
            response.json().then(resJson=>{
                return resolve(resJson);
            }).catch(e=>{
                console.log("error JSON resolve ::  ",e);
                return reject(e);
            })
       }).catch(e=>{
        console.log("error in request to API :: ",e);
        return reject(e);
       })
       
    })
        
}

module.exports = {getAllByPage};