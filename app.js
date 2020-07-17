// https://medium.com/@ramandeep.singh.1983/enterprise-web-app-authentication-using-keycloak-and-node-js-c10b0e26b80d

const express = require('express')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const _keycloak = require('keycloak-connect')
const session = require('express-session')
const cors = require('cors')

const port = 3001
const app = express()


// FOR TESTING ONLY. This disables TLS cert validation on requests to the SSO server.
// Do not deploy with this enabled.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const memoryStore = new session.MemoryStore();


const keycloak = new _keycloak({
  store: new session.MemoryStore()
}, "./keycloak.json");

// let kcConfig = {
//   clientId: 'react-test-app',
//   bearerOnly: false,
//   serverUrl: 'https://ec2-3-130-236-137.us-east-2.compute.amazonaws.com:8443/auth/',
//   realm: 'test-app',
// };

app.use(cors())

app.use(session({
  store: memoryStore,
  secret: 'secret'
}));


app.use(keycloak.middleware())


const listItemsRoute = require('./routes/list_items')
const insertItemsRoute = require('./routes/insert_item')
// const insertItemRoute = require('./routes/insert_item')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// console.log("type = " + typeof keycloak.protect)
// app.use('/',
//     // keycloak.enforcer{}
//     keycloak.protect((token) => {
//       return token.hasRealmRole("list-reader")
//     }),
//     listItemsRoute
// )


app.use('/items',
    // keycloak.enforcer('item:read', {resource_server_id: 'react-test-app'}),
    keycloak.protect((token) => {
      return token.hasRealmRole("list-reader")
    }),
    listItemsRoute
)


// app.use('/items',
//     // keycloak.enforcer{}
//     keycloak.protect((token) => {
//       console.log(token)
//       return token.hasRealmRole("list-writer")
//     }),
//     insertItemsRoute
// )

app.use('/items',
    keycloak.enforcer('listitems:write'),
    insertItemsRoute
)

// keycloak.enforcer('item:read', {resource_server_id: 'react-test-app'})
app.use('/items',
    // keycloak.enforcer{}
    keycloak.enforcer('listitems:read'),
    listItemsRoute
)



// app.use('/items',
//     keycloak.enforcer(keycloak.enforcer(['list-items:read', 'list-items:create'])),
//     insertItemRoute)



app.listen(port, () => console.log(`RHSSO Backend listening at http://localhost:${port}`))

module.exports = app