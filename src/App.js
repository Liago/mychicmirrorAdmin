import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { connect } from "react-redux";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "semantic-ui-css/semantic.min.css";

import Menu from "./components/Menu";
import Home from "./pages/home";
import Notifications from "./pages/notifications";
import Users from "./pages/users";

import "./sass/main.css";

class App extends Component {
	render() {
		return (
			<IonApp className={`${this.props.darkMode ? "dark-theme" : ""}`}>
				<IonReactRouter>
					<IonSplitPane contentId="main">
						<Menu />
						<IonRouterOutlet id="main">
							<Route path="/home" component={Home} exact />
							<Route path="/notifications" component={Notifications} exact />
							<Route path="/users" component={Users} exact />
							<Route path="/" exact render={() => <Redirect to="/home" />} />
						</IonRouterOutlet>
					</IonSplitPane>
				</IonReactRouter>
			</IonApp>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		darkMode: state.app.darkMode,
	};
};

export default withRouter(connect(mapStateToProps)(App));
