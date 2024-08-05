import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('')

  const addUrl = (newUrl) => {
    setUrls([...urls, newUrl])

  }

  const deleteUrl = (id) => {
    const filteredUrls = urls.filter(url => url.id !== id)
    setUrls(filteredUrls)
  }

  useEffect(() => {
    getUrls()
      .then(data => {
        console.log('Fetched URLS:', data)
        if (data && data.urls) {
          setUrls(data.urls);
        } else {
          setError('Failed to load URLs');
        }
      })
      .catch(error => setError(error.message));
  }, [])

  return (
    <div className="app-wrapper">
      <header>
        <h1>URL Shortener</h1>
      </header>
      <main className="App">
        <div className="form-container">
          <UrlForm addUrl={addUrl}  />
        </div>
        <div className="url-container"> <UrlContainer urls={urls} /></div>
      </main>
    </div>
  );
}

export default App;
