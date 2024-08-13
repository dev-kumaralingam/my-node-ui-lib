import { LitElement, html, css } from 'lit';
import './components/CanvasComponent.js';
import { generateId } from './utils/helpers.js';

export class NodeUI extends LitElement {
  static get properties() {
    return {
      nodes: { type: Array },
      edges: { type: Array },
    };
  }

  constructor() {
    super();
    // Ensure nodes and edges are always arrays
    this.nodes = [];
    this.edges = [];
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      <canvas-component
        .nodes=${this.nodes}
        .edges=${this.edges}
        @node-added=${this.handleNodeAdded}
        @node-drag-start=${this.handleNodeDragStart}
        @text-changed=${this.handleTextChanged}
      ></canvas-component>
    `;
  }

  handleNodeAdded(e) {
    const newNode = {
      id: generateId(),
      x: e.detail.x,
      y: e.detail.y,
      text: e.detail.text
    };
    this.nodes = [...this.nodes, newNode];
  }

  handleNodeDragStart(e) {
    const { id, x: startX, y: startY } = e.detail;
    
    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      this.nodes = this.nodes.map(node => 
        node.id === id ? { ...node, x: node.x + dx, y: node.y + dy } : node
      );
    };
    
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  handleTextChanged(e) {
    const { id, text } = e.detail;
    this.nodes = this.nodes.map(node => 
      node.id === id ? { ...node, text } : node
    );
  }

  connectNodes(startId, endId) {
    const newEdge = {
      id: generateId(),
      startId,
      endId
    };
    this.edges = [...this.edges, newEdge];
  }
}

customElements.define('node-ui', NodeUI);
