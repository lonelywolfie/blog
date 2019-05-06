const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const mongoose = require('mongoose');


const adminRoutes = require('./routes/backend/admin.route');
const loginRoute = require('./routes/backend/login.route')
const authMiddleware = require('./middlewares/auth');

//config port and app
const app = express();
const port = 300;

//config upload file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

//config data base
mongoose.connect('mongodb://localhost/example',{
	useNewUrlParser: true,
	useFindAndModify: false});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});
//config view engine

app.set('views', './views');
app.set('view engine','pug');

//middleware

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(cookieParser("defefecec"));

app.use('/',loginRoute)

app.use('/admin',authMiddleware,upload.single('avatar'),adminRoutes);











app.listen(port,'localhost',()=>{
	console.log('Server is listening on ' + port);
});