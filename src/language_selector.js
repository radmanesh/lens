import React from 'react';

import {useParams, Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {ltrTheme} from './utils/theme';

import {
  Grid,
  Paper,
  Button,
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
  Container,
} from '@mui/material';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

import {languages} from './utils/i18n';

import './index.css'

export default function LanguageSelector(props) {

  const { t } = useTranslation();
  let {studyId} = useParams();


  return (
    <>
    <CssBaseline />

    <Container maxWidth="sm" className='study-container'>
      <Grid item container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        >
        <Paper className='languages-container'>

        <ReactMarkdown children={t('language_selector.text')} rehypePlugins={[rehypeRaw]} className='markdown-text' />
        <Grid container direction='row' spacing={3} justifyContent='space-around'>
        {Object.entries(languages).map(([key, val]) =>
          <Grid item key={key} xs={4}>
            <Button component={Link} to={`/${studyId}/${key}`} fullWidth variant='outlined'>{val.title}</Button>
          </Grid>
        )}
        </Grid>
        </Paper>
      </Grid>
    </Container>
    </>
  );
}
