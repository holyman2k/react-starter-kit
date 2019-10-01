import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import history from "./history";
import store from "./store.js";
import Layout from "./routers/Layout.jsx";
import Loader from "react-loader-advanced";
import Spinner from "./components/Spinner.jsx";
import loadable from "react-loadable";

const Lazy = loader => {
    return loadable({
        loader,
        loading: () => <Loader show={true} message={<Spinner />} />
    });
};

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Lazy(() => import("./routers/Home.jsx"))} />
                        <Route exact path="/animation" component={Lazy(() => import("./routers/Animation.jsx"))} />
                        <Route exact path="/popups" component={Lazy(() => import("./routers/Popups.jsx"))} />
                        <Route exact path="/todo" component={Lazy(() => import("./routers/Todo.jsx"))} />
                        <Route exact path="/:greeting" component={Lazy(() => import("./routers/Home.jsx"))} />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
