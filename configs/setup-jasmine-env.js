import 'jest-localstorage-mock';

var path = require('path');
window.React = require('react');
window.moment = require('moment');
window.Lodash = require('lodash');
window.ReactDom = require('react-dom');
window.PropTypes = require('prop-types');
window.classNames = require('classnames');
window.history = require('history');
window.redux = require('redux');
window.ReactIntl = require('react-intl');
window.ReactRedux = require('react-redux');
window.ReactReduxPopup = require('react-redux-popup');
window.ReactRouter = require('react-router');
window.ReactRouterDom = require('react-router-dom');
window.ReactRouterRedux = require('react-router-redux');
window.ReactTransitionGroup = require('react-transition-group');
window.ReactAddonsCssTransitionGroup = require('react-addons-css-transition-group');
window.thunk = require('redux-thunk');
window.reselect = require('reselect');
window.styled = require('styled-components');

// set React definition to window
window.React = require('react');

var jasmineReporters = require('jasmine-reporters');
jasmine.VERBOSE = true;
jasmine.getEnv().addReporter(
    new jasmineReporters.JUnitXmlReporter({
        consolidateAll: false,
        savePath: path.resolve(__dirname, '../test-reports'),
        filePrefix: 'test-results-'
    })
);
