import React from 'react';
import BackgroundImage from './features/backgroundImage/BackgroundImage';
import NextBackgroundImageControl from './features/backgroundImage/components/NextBackgroundImageControl';
import PreviousBackgroundImageControl from './features/backgroundImage/components/PreviousBackgroundImageControl';
import Weather from './features/wheater/Weather';

function App() {
  return (
    <div className="App">
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
        FOOTER
      </footer>
    </div>
  );
}

export default App;
