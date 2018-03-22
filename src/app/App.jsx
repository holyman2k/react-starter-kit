import React from "react"
import { Provider } from "react-redux"
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerReducer } from 'react-router-redux'
import history from "./history"
import store from "./store.js"
import Layout from "./routers/Layout.jsx"
import Home from "./routers/Home.jsx"
import Animation from "./routers/Animation.jsx"
import Popups from "./routers/Popups.jsx"
import Form from "./routers/Form.jsx"

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/animation" component={Animation} />
                        <Route exact path="/popups" component={Popups} />
                        <Route exact path="/form" component={Form} />
                        <Route exact path="/:greeting" component={Home} />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </Provider>
    )
};

export default App;