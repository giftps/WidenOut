require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');
const corsOptions = {
  Credential: 'true',
  
};

const path = require('path')


const app = express();

app.use(express.json())
app.options("*" , cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser())


//#region // !Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);



io.on('connection', socket => {
    SocketServer(socket);
})

//#endregion

//#region // !Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/adminRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));
app.use('/api', require('./routes/groupRouter'));
app.use('/api', require('./routes/gPostRouter'));
//#endregion

const URI = process.env.MONGODB_URL;
// const URI = process.env.MONGODB_URL_LOCAL;
mongoose.connect(URI, {
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err => {
    if(err) throw err;
    console.log("Database Connected!!")
})

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log("Listening on ", port);
});