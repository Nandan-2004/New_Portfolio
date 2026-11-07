import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEOHead({ title, description }) {
  const location = useLocation();

  useEffect(() => {
    // Set page title
    const fullTitle = title 
      ? `${title} | Nandan Javagal — Junior Software Engineer & AI Specialist`
      : 'Nandan Javagal | Junior Software Engineer & AI Specialist';
    document.title = fullTitle;

    // Set meta description
    const metaDesc = description || 
      'Portfolio of Nandan Javagal, Junior Software Engineer at Centre for Smart Governance. Specializing in Python, FastAPI, React, SQL Server, and AI/ML systems.';
    
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.name = 'description';
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', metaDesc);

    // Set Open Graph tags
    const setOgTag = (property, content) => {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', property);
        document.head.appendChild(og);
      }
      og.setAttribute('content', content);
    };

    setOgTag('og:title', fullTitle);
    setOgTag('og:description', metaDesc);
    setOgTag('og:type', 'website');
    setOgTag('og:url', window.location.origin + location.pathname);
  }, [title, description, location.pathname]);

  return null;
}
