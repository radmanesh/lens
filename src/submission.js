import React, { useEffect, useState } from 'react';

import {Grid} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

import {useTranslation} from 'react-i18next';
import ReactGA from "react-ga4";

export default function Submission({submission, studyId, submissionNote}) {

  const {t} = useTranslation();
  const submissionApi = `https://server.cut.social/api/v1/${studyId}/responses`;

  const [state, setState] = useState({
    submissionCode: undefined,
    debug: process.env.NODE_ENV !== 'production',
  });

  function isProlific(resp) {
    if(resp && resp?.view?.id==="prolific ID")
      return true;
    return false;
  }

  const findProlificId = () => {
    let pid = null;
    const resps = submission.responses.filter(isProlific);
    if(resps.length>0)
      pid=resps[0].response;
    return pid;
  }

  // submit and set submissionCode
  useEffect(() => {
    if (state.submissionCode === undefined) {
      const pid = findProlificId();
      //console.log("pid:",pid);
      ReactGA.event({
        category: "info",
        action: "submission_insert, pid : "+pid,
        label: "info submission insert"
      });
      fetch(submissionApi, {
        method: 'post',
        //mode: 'no-cors',
        body: JSON.stringify(submission),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(respJson => setState({...state, submissionCode: respJson.submissionCode}))
        .catch(error => {
          ReactGA.event({
            category: "error",
            action: "submission_insert_error, pid : "+pid +'  error:' + error + '  stringify:'+ JSON.stringify(error),
            label: "info submission insert: " + JSON.stringify(submission)
          });
          return console.error('Error:', error);
        });
    }
  },[state]);

  return (
    <Grid container direction='column' className='Text-container'>
      
      {state.submissionCode &&
      <Grid item xs className="submission-container">
       <ReactMarkdown children={t(submissionNote, {submissionCode: state.submissionCode})} rehypePlugins={[rehypeRaw]} className='markdown-text' />
      </Grid>
      }

      {state.debug && 
      <Grid item xs>
        <pre>{JSON.stringify(submission, null, 2)}</pre>
      </Grid>
      }

    </Grid>
  );
}
