import React from 'react';
import './UrlContainer.css';

const UrlContainer = (props) => {
  const urls = Array.isArray(props.urls) ? props.urls : []

  const urlEls = urls
  .filter(url => url && url.title && url.short_url && url.long_url)
  .map(url => {
    return (
      <div className="url" key={url.id}>
        <h3>{url.title}</h3>
        <a href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
