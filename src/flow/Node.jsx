import { Handle, Position, useNodeId } from 'reactflow';
import Styles from './Node.module.css';

function Node({ addNode, addBranch, deleteNode }) {
  const id = useNodeId();

  return (
    <div className={Styles.node}>
      <Handle id='top' position={Position.Top} type='target' />
      <Handle id='right' position={Position.Right} type='source' />
      <Handle id='bottom' position={Position.Bottom} type='source' />
      <Handle id='left' position={Position.Left} type='source' />
      <p className={Styles.paragraph}>{`Node ${id}`}</p>
      <div className={Styles['btn-container']}>
        <button onClick={addNode}>+</button>
        <button onClick={addBranch}>++</button>
        <button onClick={deleteNode}>x</button>
      </div>
    </div>
  );
}

export default Node;
