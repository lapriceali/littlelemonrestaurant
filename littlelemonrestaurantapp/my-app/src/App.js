import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <> {/* Replaced div with React Fragment */}
      <Header />
      <Nav />
      <main>
        {/*content*/}
        </main>
      <footer>
        {/*content*/}
        </footer>
  </>
  );
}

export default App;

