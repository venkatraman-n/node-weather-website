const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

var port = process.env.PORT || 3000
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
const publicDirectoryPath = path.join(__dirname,'../public/');
const viewsPath = path.join(__dirname,'../templates/views');
const partialssPath = path.join(__dirname,'../templates/partials');

const app = express()

//Set up handle bars engine and views
app.set('view engine','hbs')
app.set('views',viewsPath)

//Set up handle bars for partials
hbs.registerPartials(partialssPath)

//Set up static directory to serve, so that all htmls under public folder can be accessed relatively
app.use(express.static(publicDirectoryPath))

//Since we have registered views above, we can use res.render to render the hbs page, here index.hbs is rendered
//title and name are being passed to the views, hbs uses placeholders to resolve these in the views
app.get('',(req,res) => {
    res.render('index', {
        title:'Weather App',
        name:'Ram'
    })//Render index.hbs
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Anirudh'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText:'This is my help Page',
        title:'Help Page',
        name:'Aadhya'
    })
})
app.get('/weather',(req,res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error:'Address is mandatory'
        })
    }

    geoCode(address , (error,{latitude,longitude,location}={}) => {
        if(error) {
            res.send({error})
        } else {        
            foreCast(latitude,longitude,(error,output) => {
                if(error) {
                    res.send({error})
                } else {
                    res.send({
                        forecast:output,
                        location:location,
                        address:address
                    })
                    console.log('Prediction :' + output)
                }
            })
            //console.dir(data , {depth:3})
        }
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        errorMessage:'Help Article Not found',
        title:'Error Page',
        name:'Sindhu'
    })
})

app.get('/*',(req,res) => {
    res.render('error',{
        errorMessage:'Page not found',
        title:'Error Page',
        name:'Sindhu'
    })
})

//Finally start and listen the server on 3000 port
app.listen(port,() => {
    console.log('Server up and running on '+ port)
})