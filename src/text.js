import * as React from 'react';
import { useRef, useEffect, useState, Fragment } from 'react';
import { TextField, Grid , Box, Autocomplete} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

import countries from './utils/countries';

//css
import "./text.css";

export default function Text({content, onStore, onValidate}) {
  //props: title, text, placeholder, help, required, pattern, instruction, autoComplete
  //i18n: text.choose_a_country, text.no_options

  const { t } = useTranslation();

  const response = useRef(null);
  const [state, setState] = useState({
    value: null
  });


  useEffect(() => {
    return () => {
      onStore({
        'view': content,
        'response': response.current?.code || response.current
      })
    };
  },[]);


  const handleChange = (e, value) => {
    response.current = value
    setState({...state, value: value});

    const resp = value?.code || response.current
    console.log(resp)

    onValidate(resp !== undefined && resp.length>0);
  }

  /**
   * Componenet to select a country from a dropdown list.
   * Enable this feature by adding `autoComplete:'coutries'` to the view.
   */
  const CountryAutoComplete = () => {
    return (
      <Autocomplete
        id="country-select"
        options={countries}
        autoHighlight
        onChange={(e, v) => handleChange(e, v)}
        value={state.value}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('text.choose_a_country')}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            className='country-select'
          />
        )}
      />
    );
  }

  return (
    <Grid container direction='column' spacing={2} alignItems='stretch' justifyContent='flex-start' className='Text-container'>
      <Grid item>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} children={t(content.text)} className='markdown-text' />
      </Grid>

      {!(content.instruction || false) &&
        <Grid item>
          {content.autoComplete === 'countries' && <CountryAutoComplete />}
          {!content.autoComplete && <TextField label={t(content.placeholder)} variant="filled" fullWidth onChange={(e) => handleChange(e, e.target.value)} />}
        </Grid>
      }
    </Grid>
  );
}
