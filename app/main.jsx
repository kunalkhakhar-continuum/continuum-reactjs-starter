import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from 'app/app';
// import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Utils } from 'platform-common-ui';
import { popupReducer } from 'react-redux-popup';
// import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import enData from '../build/translations/locales/en.json';
import frData from '../build/translations/locales/fr.json';
import '../styles/main.scss';
// add locale data
// addLocaleData([...en, ...fr]);

const language = localStorage.getItem('language') || 'en';
// const history = createHistory();

let messages = {};
switch (language) {
case 'fr': messages = frData;
    break;
default: messages = enData;
}

// Utils.setSpriteUrl(Request.getSpriteURLValue());

function sampleReducer(state = {}, action) {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
      default:
        return state;
    }
}

const store = createStore(combineReducers({ sampleReducer, popup: popupReducer }));

// render the main app
render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
