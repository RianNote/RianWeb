import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import './index.css';
import firebase from "firebase";
import firebaseConfig from "../config/firebaseConfig";
// configs in './configureStore.js'
//Apollo Socket
import {
    SubscriptionClient,
    addGraphQLSubscriptions
} from "subscriptions-transport-ws";

import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
// Create a normal network interface:
//Main GraphQL Server
const networkInterface = createNetworkInterface({
    uri: `http://${process.env.AWS_IP}:8000/api/graphql`
});
//Make subsciption server && Change
const wsClient = new SubscriptionClient(`ws://${process.env.AWS_IP}:8000/api/subscriptions`, {
    reconnect: true
});
// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);
// Finally, create your ApolloClient instance with the modified network interface
export const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions
});


firebase.initializeApp(firebaseConfig);
const store = configureStore() 
console.log("FIRST STORE", store.getState())

render(
     <ApolloProvider client={client}>
       <Provider store={store}>
        <AppContainer>
        	 <Root store={store}/>
         </AppContainer>
       </Provider>
     </ApolloProvider>
  ,document.getElementById('root')
);



if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.

    const NextApp = require('./components/Root').default; // eslint-disable-line global-require
    render(
      <ApolloProvider client={client}>
          <AppContainer>
            <NextApp store={store}/>
          </AppContainer>
      </ApolloProvider>
     , document.getElementById('root')
    );
  });
}