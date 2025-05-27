import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Try to fetch a manifest of images (if available)
    // Otherwise, attempt to load images by guessing filenames (not robust, but works for static public folders)
    // For now, we will try to fetch a static manifest.json if it exists
    fetch('/images/manifest.json')
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        if (Array.isArray(data)) setImages(data);
      })
      .catch(() => setImages([]));
  }, []);

  return (
    <div className="aistock-container">
      <header className="aistock-header">
        <h1>AIStock</h1>
        <p className="aistock-tagline">AI-generated stock images for your creative projects</p>
      </header>
      <section className="aistock-notice">
        <strong>Notice:</strong> Images on AIStock are <u>NOT</u> licensed for full commercial use. Please review the terms before using any images from this site.
      </section>
      <main className="aistock-gallery-section">
        <h2>Gallery</h2>
        {images.length === 0 ? (
          <div className="aistock-gallery-placeholder">
            <p>No images yet. (Add images to <code>public/images</code> and update <code>manifest.json</code> to display them here.)</p>
          </div>
        ) : (
          <div className="aistock-gallery-grid">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={`/images/${img}`}
                alt={`AIStock art ${idx + 1}`}
                className="aistock-gallery-img"
              />
            ))}
          </div>
        )}
      </main>
      <footer className="aistock-footer">
        &copy; {new Date().getFullYear()} AIStock. All rights reserved.
      </footer>
    </div>
  )
}

export default App
