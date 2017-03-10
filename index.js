import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './modules/App';
import Home from './modules/Home';
import About from './modules/About';

import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/about" component={About}/>

                <Route path="*" component={Home} />

            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
