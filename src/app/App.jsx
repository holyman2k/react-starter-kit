import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import history from "./history";
import store from "./store.js";
import Layout from "./routers/Layout.jsx";
import Home from "./routers/Home.jsx";
import Loader from "react-loader-advanced";
import Spinner from "./components/Spinner.jsx";
import loadable from "react-loadable";

const loading = () => (
    <Loader show={true} message={<Spinner />}>
        <div />
    </Loader>
);

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/animation" component={loadable({ loader: () => import("./routers/Animation.jsx"), loading })} />
                        <Route exact path="/popups" component={loadable({ loader: () => import("./routers/Popups.jsx"), loading })} />
                        <Route exact path="/form" component={loadable({ loader: () => import("./routers/Form.jsx"), loading })} />
                        <Route exact path="/:greeting" component={Home} />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
