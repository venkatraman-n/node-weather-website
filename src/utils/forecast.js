const request = require('request')

forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/9cf141d8aa8a874ea464ff35a04d96cb/'+latitude+','+longitude;
    request({url,json:true}, (error,{body}) => {
        
        if(error) {
            callback('something went wrong')
        } else if (body.error) {
                callback(body.error);
        } else {
            const currently = body.currently  
            callback(undefined,body.daily.data[0].summary+ 'It is currently ' + currently.temperature + ' degrees out. There is ' 
            + currently.precipProbability + '% probability of rain'); 
        }
        
    })
}

module.exports=forecast
