import React from 'react';

import { Routes, Route, useParams } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

//main components
import Study from './study';
import About from './about';
import LanguageSelector from './language_selector';
import { languages } from './utils/i18n';
import { ltrTheme, rtlTheme } from './utils/theme';

export default function AppRouter() {
  let {lang } = useParams();
  const theme = (lang && lang !== '') ? (languages[lang].direction === 'rtl')?rtlTheme:ltrTheme  : ltrTheme ;
  
  return (
    <ThemeProvider theme={theme}>
      <Routes basename="/">
          <Route exact path="/" element={<About />} />
          <Route path="/:studyId/:lang" element={<Study />} />
          <Route path="/:studyId" element={<LanguageSelector />} />
          <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}
