import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StateProvider } from './context/StateProvider.jsx';
import { initialState } from './context/initialState.js';
import reducer from './context/reducer.js';
import './index.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </StrictMode>
);
