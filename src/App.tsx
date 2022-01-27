import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './routes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<p>Hello world</p>} />
      </Route>
    </Routes>
  );
}

export default App;
