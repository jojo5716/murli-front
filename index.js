import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './modules/App';
import Home from './modules/Home';
import About from './modules/About';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/about" component={About}/>

            <Route path="*" component={Home} />

        </Route>
    </Router>
), document.getElementById('app'));
