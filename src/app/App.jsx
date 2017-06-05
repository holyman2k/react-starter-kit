import React from "react"
import { Provider } from "react-redux"
import { createHashHistory } from "history";
import { Router, Route, HashRouter } from "react-router-dom"
import { syncHistoryWithStore } from "react-router-redux"
import store from "./store.js"
import Layout from "./routers/Layout.jsx"
import Home from "./routers/Home.jsx"

const history = syncHistoryWithStore(createHashHistory(), store);

const App = () => {
    return (
        <Provider store={store}>
            <HashRouter history={history}>
                <Layout>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/:greeting" component={Home} />
                </Layout>
            </HashRouter>
        </Provider>
    )
};

export default App;