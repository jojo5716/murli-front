'use strict';
/*
// Components
import Menu from '../Menu';
import Header from '../Header';
import BreadCrumb from '../BreadCrumb';
import Footer from '../Footer';


 module.exports = {
 Menu,
 Header,
 BreadCrumb,
 Footer
 };

*/

const { Promise } = global;

export default () => {
    return new Promise(resolve => {
        require.ensure([], () => {
            resolve({
                Menu: require('../components/Menu'),
                Header: require('../components/Header'),
                BreadCrumb: require('../components/BreadCrumb'),
                Footer: require('../components/Footer')
            });
        });
    });
};
