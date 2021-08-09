import React from 'react';
import BackgroundImage from './features/backgroundImage/BackgroundImage';
import NextBackgroundImageControl from './features/backgroundImage/components/NextBackgroundImageControl';
import PreviousBackgroundImageControl from './features/backgroundImage/components/PreviousBackgroundImageControl';
import Weather from './features/wheater/Weather';
import Quote from './features/quote/Quote';

function App() {
  return (
    <div className='App'>
      <BackgroundImage />
      <NextBackgroundImageControl />
      <PreviousBackgroundImageControl />
      <header>
        <Weather />
      </header>
      <main>
        MAIN
      </main>
      <footer>
        <Quote />
      </footer>
    </div>
  );
}

export default App;
