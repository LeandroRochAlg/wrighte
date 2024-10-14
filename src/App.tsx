import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './App.css'

function App() {
  const [value, setValue] = useState("**Hello World!**");

  return (
    <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || '')}
        height="100%"
        fullscreen={true}
      />
    </div>
  );
}

export default App