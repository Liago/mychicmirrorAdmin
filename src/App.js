import React, { Component } from "react";
import { Route, Redirect} from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { Provider, useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

// /* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

/* Theme variables */
// import "./theme/variables.css";
// import "semantic-ui-css/semantic.min.css";

import Menu from "./components/Menu";
import Home from "./pages/home";
import Notifications from "./pages/notifications";
import Users from "./pages/users";
import Toast from "./components/UI/toast";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
// import "./sass/main.css";
import "./sass/index.css";

import { history, store } from "./store/store";


const App = () => {
	const {darkMode} = useSelector(state => state.app);
	
	return (
		<IonApp className={`${darkMode ? "dark" : ""}`}>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<IonSplitPane contentId="main">
						<Menu />
						<Toast />
						<IonRouterOutlet id="main">
							<Route path="/home" component={Home} exact />
							<Route path="/notifications" component={Notifications} exact />
							<Route path="/users" component={Users} exact />
							<Route path="/" exact render={() => <Redirect to="/home" />} />
						</IonRouterOutlet>
					</IonSplitPane>
				</ConnectedRouter>
			</Provider>
		</IonApp>
	);
}

export default App;
