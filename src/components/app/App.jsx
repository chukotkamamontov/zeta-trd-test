import { useState, useEffect } from 'react';
import Tree from '../tree/Tree';
import Modal from '../modal/Modal';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])
  
  const onClose = () => {
    setIsOpen(false)
  }
  return (
    <div className="App">
      <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>
      <Modal open={isOpen} onClose={onClose}>Test modal</Modal>
      <Tree />
    </div>
  );
}

export default App;
