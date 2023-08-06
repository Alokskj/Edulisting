// src/components/AdSense.js
import React, { useEffect } from 'react';

const AdSense = ({slot }) => {
  useEffect(() => {
    // Load the AdSense script dynamically
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window) {
      // Initialize AdSense after the script is loaded
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <ins
    class="adsbygoogle"
    style={{display: 'block'}}
    data-ad-client="ca-pub-5046319178676899"
    data-ad-slot={slot}
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
  );
};

export default AdSense;
