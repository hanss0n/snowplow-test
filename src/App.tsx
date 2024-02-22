import { useState, useEffect } from 'react'
import { newTracker, trackSelfDescribingEvent, trackPageView, enableActivityTracking } from '@snowplow/browser-tracker'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // Initialize the Snowplow tracker
    // Replace '{{collector_url_here}}' with your actual collector URL
    newTracker('sp', 'http://localhost:9090', {
      appId: 'my-app-id',
      platform: 'web',
    });

    // Enable activity tracking
    enableActivityTracking({
      minimumVisitLength: 30,
      heartbeatDelay: 10,
    });

    // Track a page view
    trackPageView();
  }, []);

  function generateUUID() {
    return crypto.randomUUID();
  }

  function trackLinkClick() {
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1',
        data: {
          targetUrl: 'https://snowplow.io',
        },
      },
      context: [
        {
          schema: 'iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0',
          data: {
            id: generateUUID(),
          },
        },
      ],
    });
  }


  return (
    <>
      <div className="App">
        {/* Example usage: tracking a link click */}
        <a href="https://snowplow.io" onClick={trackLinkClick} target="_blank" rel="noopener noreferrer">
          Visit Snowplow
        </a>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
