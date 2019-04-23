const request = require('request')


geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) 
    + '.json?access_token=pk.eyJ1IjoidmVua2F0dGVzdCIsImEiOiJjanVxbHE2cWMwaXlnNDBvMHUzaHQ1OTM2In0.Z_Rze0jHCdUxWuG_woYdMw&limit=1'

    request({url,json:true}, (error,{body}={}) => {
        
    if(error) {
        callback('Something went wrong')
    } else if (body.features.length == 0) {
        callback('Address not found')
    } else {
        callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
        })
    }
    })
}

module.exports = geoCode;