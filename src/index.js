import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import i18n from './utils/i18n';
import AppRouter from './router';
import {I18nextProvider} from 'react-i18next';
import { HashRouter, Routes, Route } from 'react-router-dom';

//css
import './index.css';

ReactDOM.render(
  <Suspense fallback="loading">
  <I18nextProvider i18n={i18n}>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </I18nextProvider>
  </Suspense>
  , document.getElementById('root'));
