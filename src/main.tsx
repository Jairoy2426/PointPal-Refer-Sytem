import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeLocalStorage } from './utils/localStorage-init';

// Initialize localStorage for our demo app
initializeLocalStorage();

createRoot(document.getElementById("root")!).render(<App />);
