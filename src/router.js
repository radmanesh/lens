import React from 'react';

import { Routes, Route } from "react-router-dom";

//main components
import Study from './study';
import About from './about';
import LanguageSelector from './language_selector';

export default function AppRouter() {
  return (
    <Routes basename="/">
        <Route exact path="/" element={<About />} />
        <Route path="/:studyId/:lang" element={<Study />} />
        <Route path="/:studyId" element={<LanguageSelector />} />
        <Route path="/about" element={<About />} />
    </Routes>
  );
}
