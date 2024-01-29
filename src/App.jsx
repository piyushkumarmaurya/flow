import { ReactFlowProvider } from 'reactflow';
import Flow from './flow/Flow';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
