import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import store from "./store.js";
import Layout from "./routers/Layout.jsx";
import Loader from "./components/Loader.jsx";

const App = () => {
	return (
		<Provider store={store}>
			<Suspense fallback={<Loader show={true} />}>
				<Router>
					<Layout>
						<Switch>
							<Route exact path="/" component={lazy(() => import("./routers/Home.jsx"))} />
							<Route exact path="/animation" component={lazy(() => import("./routers/Animation.jsx"))} />
							<Route exact path="/popups" component={lazy(() => import("./routers/Popups.jsx"))} />
							<Route exact path="/todo" component={lazy(() => import("./routers/Todo.jsx"))} />
							<Route exact path="/:greeting" component={lazy(() => import("./routers/Home.jsx"))} />
						</Switch>
					</Layout>
				</Router>
			</Suspense>
		</Provider>
	);
};

export default App;
