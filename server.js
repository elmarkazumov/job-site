const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use(express.static('./views'));

require('./middleware/passport')(passport)

const routes = require('./settings/routes')
routes(app)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})