import { getId, id } from './Flow';

export function getNode(selectedNode) {
  return {
    id: `${getId()}`,
    type: 'myNode',
    position: {
      x: selectedNode.position.x,
      y: selectedNode.position.y + 200,
    },
  };
}

export function getBranch(selectedNode) {
  const node1 = {
    id: `${getId()}`,
    type: 'myNode',
    position: {
      x: selectedNode.position.x - 300,
      y: selectedNode.position.y + 200,
    },
  };
  const node2 = {
    id: `${getId()}`,
    type: 'myNode',
    position: {
      x: selectedNode.position.x,
      y: selectedNode.position.y + 200,
    },
  };
  const node3 = {
    id: `${getId()}`,
    type: 'myNode',
    position: {
      x: selectedNode.position.x + 300,
      y: selectedNode.position.y + 200,
    },
  };

  return [node1, node2, node3];
}

export function getEdge(parentId) {
  return {
    id: `${id - 1}`,
    source: `${parentId}`,
    target: `${id}`,
    sourceHandle: 'bottom',
    targetHandle: 'top',
  };
}

export function getBranchEdges(parentId) {
  const edge1 = {
    id: `${id - 3}`,
    source: `${parentId}`,
    target: `${id - 2}`,
    sourceHandle: 'left',
    targetHandle: 'top',
  };
  const edge2 = {
    id: `${id - 2}`,
    source: `${parentId}`,
    target: `${id - 1}`,
    sourceHandle: 'bottom',
    targetHandle: 'top',
  };
  const edge3 = {
    id: `${id - 1}`,
    source: `${parentId}`,
    target: `${id}`,
    sourceHandle: 'right',
    targetHandle: 'top',
  };
  return [edge1, edge2, edge3];
}
