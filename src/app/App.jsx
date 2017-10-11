import React from "react"
import { Provider } from "react-redux"
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer } from 'react-router-redux'
import history from "./history"
import store from "./store.js"
import Layout from "./routers/Layout.jsx"
import Home from "./routers/Home.jsx"

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Layout>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/:greeting" component={Home} />
                </Layout>
            </ConnectedRouter>
        </Provider>
    )
};

export default App;