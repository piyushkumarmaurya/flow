import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import React, { useState, useCallback, useMemo /* useEffect */ } from 'react';
import Node from './Node.jsx';
import { getBranch, getBranchEdges, getEdge, getNode } from './helpers.js';

export let id = 1;
export const getId = () => {
  id += 1;
  return id;
};

function Flow() {
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'myNode',
      position: { x: 0, y: 0 },
    },
  ]);
  const [edges, setEdges] = useState([]);
  const flow = useReactFlow();

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  /* useEffect(
    function () {
      console.log(edges);
    },
    [nodes, edges]
  ); */

  const addNode = useCallback(() => {
    const selectedNode = flow.getNodes().find((node) => node.selected);

    const node = getNode(selectedNode);
    const edge = getEdge(selectedNode.id);

    setNodes((state) => [...state, node]);
    setEdges((state) => [...state, edge]);
  }, [flow]);

  const addBranch = useCallback(
    function () {
      const selectedNode = flow.getNodes().find((node) => node.selected);

      const branch = getBranch(selectedNode);
      const branchEdges = getBranchEdges(selectedNode.id);

      setNodes((state) => [...state, ...branch]);
      setEdges((state) => [...state, ...branchEdges]);
    },
    [flow]
  );

  const deleteNode = useCallback(
    function () {
      const selectedNode = flow.getNodes().find((node) => node.selected);

      const pcEdge = flow.getEdges().find((edge) => {
        return edge.target + '' === selectedNode.id;
      });

      setNodes((state) => state.filter((node) => !node.selected));
      setEdges((state) =>
        state
          .map((edge) => {
            //Selecting that edge whose parent/source is getting deleted
            if (edge.source === selectedNode.id) {
              edge.source = pcEdge.source + '';
            }
            if (edge.target !== selectedNode.id) return edge;
            return null;
          })
          //Filtering not null values
          .filter((edge) => edge)
      );
    },
    [flow]
  );

  const nodeTypes = useMemo(function () {
    return { myNode: () => Node({ addNode, addBranch, deleteNode }) };
    //eslint-disable-next-line
  }, []);

  const onConnect = useCallback(
    //params = {source: '1', sourceHandle: 'left', target: '1', targetHandle: 'top'}
    (params) => setEdges((eds) => [...eds, params]),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Controls />
      <Background variant='dots' gap={12} size={1} />
    </ReactFlow>
  );
}

export default Flow;
