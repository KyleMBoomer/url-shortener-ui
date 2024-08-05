import React, { useState } from 'react';
import { postURL } from '../../apiCalls';

function UrlForm({addUrl}) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUrl = {title, long_url:urlToShorten}
    try {
      const addedUrl = await postURL(newUrl)
      addUrl(addedUrl)
      clearInputs();
    } catch(error) {
      console.error('Error with your URL POST:', error)
    }
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value) }
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
