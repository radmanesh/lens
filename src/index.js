import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import i18n, { languages } from './utils/i18n';
import AppRouter from './router';
import {I18nextProvider} from 'react-i18next';
import { HashRouter, useParams } from 'react-router-dom';
import {ltrTheme, rtlTheme} from './utils/theme';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

//css
import './index.css';


ReactDOM.render(
  <Suspense fallback="loading">
  <I18nextProvider i18n={i18n}>
    <HashRouter>
    <StyledEngineProvider injectFirst>
      <AppRouter />
    </StyledEngineProvider>
    </HashRouter>
  </I18nextProvider>
  </Suspense>
  , document.getElementById('root'));
