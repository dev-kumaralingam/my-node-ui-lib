export function calculateEdgePoints(sourceNode, targetNode) {
    const sourceX = sourceNode.x + sourceNode.width / 2;
    const sourceY = sourceNode.y + sourceNode.height / 2;
    const targetX = targetNode.x + targetNode.width / 2;
    const targetY = targetNode.y + targetNode.height / 2;
  
    return {
      start: { x: sourceX, y: sourceY },
      end: { x: targetX, y: targetY }
    };
  }
  
  export function createEdge(sourceNode, targetNode) {
    const points = calculateEdgePoints(sourceNode, targetNode);
    return {
      id: `edge-${Date.now()}`,
      sourceId: sourceNode.id,
      targetId: targetNode.id,
      ...points
    };
  }