import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

// Components
import App from './modules/index';
import Home from './modules/containers/Home';
import About from './modules/containers/About';
import DashboardDevice from './modules/containers/Devices/DashboardDevice';
import PerPagesDevice from './modules/containers/Devices/PerPagesDevice';
import AvailabilitySankey from './modules/containers/Devices/AvailabilitySankey';

// Analytics
import Dashboard from './modules/containers/Analytics/Dashboard';
import CreateReport from './modules/containers/Analytics/CreateReport';

import reducers from './reducers';

const middleware = [thunk];


if (process.env.NODE_ENV === 'debugger') {
    middleware.push(createLogger());
}

const store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/about" component={About} />
                <Route path="/devices/dashboard" component={DashboardDevice} />
                <Route path="/devices/per-pages" component={PerPagesDevice} />
                <Route path="/devices/spankey" component={AvailabilitySankey} />

                <Route path="/analytics/dashboard" component={Dashboard} />
                <Route path="/analytics/new/report" component={CreateReport} />

                <Route path="*" component={Home} />

            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
