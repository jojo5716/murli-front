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
        </Route>
    </Router>
), document.getElementById('app'));

//render((
//    <Router history={browserHistory}>
//        <Route path="/" component={App}>
//            <IndexRoute component={Home}/>
//
//            <Route path="/repos" component={Repos}>
//                <Route path="/repos/:userName/:repoName" component={Repo}/>
//            </Route>
//            <Route path="/about" component={About}/>
//        </Route>
//    </Router>
//), document.getElementById('app');
