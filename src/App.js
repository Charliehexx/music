
import { useEffect, useState } from 'react';
import './App.css';
import DisplaySongs from './components/DisplaySongs';
import Sidebar from './components/Sidebar';

function App() {

  const [color, setColor] = useState("#000")
  useEffect(() => {
    document.body.style.background = `linear-gradient(to right, ${color},black)`;
  }, [color, setColor])
  return (
    <div className="flex">
      <Sidebar color={`linear-gradient(to right, ${color},black)`} />

      <DisplaySongs onColorChange={setColor} />

    </div>


  );
}

export default App;
