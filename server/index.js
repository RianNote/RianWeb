import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import cors from "cors";
import flash from "connect-flash";
import {
  isLoggedIn,
  isUser,
  isMember,
  checkSessionCheckProject,
  handleRender
} from "./utils/serverUtils.js";

// Webpack Requirements
import webpack from "webpack";
import config from "../config/webpack.config.dev2";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

// Initialize the Express App
const app = new express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === "development") {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
// import { configureStore } from '../client/store';

import passport from "passport";
// import Helmet from 'react-helmet';

// Import required modules
//import routes from '../src/routes';
//import posts from './routes/post.routes';
import users from "./routes/User.routes";
import plans from "./routes/Plan.routes";
import passportConfig from "./passport";
import passportRoutes from "./routes/Auth.routes";
import projects from "./routes/Project.routes";
import serverConfig from "./config";
import notes from "./routes/Notes.routes";
// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, error => {
  if (error) {
    console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
    throw error;
  }
});

passportConfig(passport);

// Apply body Parser and server public assets and routes
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(flash());

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 8 // see below
    },
    secret: "mySecret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", users);
app.use("/api/plan", plans);
app.use("/api/project", projects);
app.use("/api/notes", notes);

//GraphQL Server 
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionManager, PubSub } from 'graphql-subscriptions';
import { schema } from './qlSchema/schema.js';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { pubsub } from './pubsub/pubsub.js';

app.use('/api/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/api/graphiql', graphiqlExpress({
  endpointURL: '/api/graphql'
}));

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub: pubsub,
  setupFunctions: {
    //어떤 서브스크립션에 대한 검증인가
    chatSubscription: (options, args) => ({ //이렇게 리턴으로 서브스크립션 key를 가지고 있는 옵젝을 리턴해야함.
      chatSubscription: {
        filter: newMessage => {
          //comment로 들어오는게 지금 pubsub으로 보내야되는 값
          //args는 최초에 서브스크립션을 찍었을때 들어온 variables들.
          console.log("Filter", newMessage.chatSubscription.projectid === args.projectid, newMessage, args)
          if (newMessage.chatSubscription.projectid === args.projectid) { 
            return true 
          } else {
            return false
          } 

        }
      }
    })
  }
});
// chatlogs endpoint
passportRoutes(app, passport);

app.get("/login", (req, res) => {
  return res.sendFile(path.resolve(__dirname + "/../login/login.html"));
});
app.get("/favicon.ico", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.redirect("/me");
});
// app.get('/invite/*', checkSessionCheckProject, (req,res,next)=>{
//   return shootStatic(res);
// })
app.get("/project/*", isLoggedIn, isMember, handleRender);
app.get("*", isLoggedIn, isUser, handleRender);

//ShareDB
import ShareDB from 'sharedb';
import richText from 'rich-text';
import WebSocket from 'ws';
import WebSocketJSONStream from 'websocket-json-stream';

ShareDB.types.register(richText.type);
var backend = new ShareDB();
var connection = backend.connect();
var doc = connection.get('examples', 'richtext');
doc.fetch(function(err) {
  if (err) throw err;
  if (doc.type === null) {
    doc.create([{insert: 'Hi!'}], 'rich-text', callback);
    return;
  }
  callback()

});

function callback(){
  const server = createServer(app);
  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({
    perMessageDeflate: false,
    port: 8080
  });
  wss.on('connection', function(ws, req) {
    console.log("ShareDB WebSocket Success")
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(serverConfig.port, error => {
    if (!error) {
      console.log(
        `Rian is running on port: ${serverConfig.port}! Fuck you`
      ); // eslint-disable-line
    }
    new SubscriptionServer(
      {
        subscriptionManager: subscriptionManager,
        onConnect: () => {
          console.log("Subscription Connect Success");
        }
      },
      {
        server: server,
        path: "/api/subscriptions"
      }
    );
  });
}

export default app;
