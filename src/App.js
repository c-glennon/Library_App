import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import SearchPage from './Components/SearchPage';
import LibraryPage from './Components/LibraryPage';
import TitleProvider from './Contexts/titleContext';

function App() {

  return (
    <TitleProvider>
      <BrowserRouter>
       <div className="App">
         <br></br>
         <NavBar />
          <Switch>
            <Route path="/" component={SearchPage} exact/>
            <Route path="/library" component={LibraryPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </TitleProvider>
  );
}

export default App;
