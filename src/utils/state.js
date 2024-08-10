export function createNode(x, y, text = '') {
    return {
      id: `node-${Date.now()}`,
      x,
      y,
      text,
      width: 100,
      height: 50
    };
  }
  
  export function updateNode(nodes, updatedNode) {
    return nodes.map(node => 
      node.id === updatedNode.id ? { ...node, ...updatedNode } : node
    );
  }
  
  export function updateEdge(edges, updatedEdge) {
    return edges.map(edge => 
      edge.id === updatedEdge.id ? { ...edge, ...updatedEdge } : edge
    );
  }
  
  export function removeNode(nodes, nodeId) {
    return nodes.filter(node => node.id !== nodeId);
  }
  
  export function removeEdge(edges, edgeId) {
    return edges.filter(edge => edge.id !== edgeId);
  }