import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MediaReader from './components/MediaReader/MediaReader';
import Notification from './components/Notification/Notification';
import { Video } from './models/Video';

function App() {
  const [videos, setVideos] = useState<Video[]>([]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home handleChange={setVideos} />} /> {/* Pass the setter here */}
        <Route path="/account" element={<Account />} />
        <Route path="/reader/:slug" element={<MediaReader />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Notification />
    </BrowserRouter>
  );
}

export default App;
