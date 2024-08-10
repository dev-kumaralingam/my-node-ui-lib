import { LitElement, html, css } from 'lit';
import './Node.js';
import './Edge.js';

export class Canvas extends LitElement {
  static properties = {
    nodes: { type: Array },
    edges: { type: Array }
  };

  constructor() {
    super();
    this.nodes = [];
    this.edges = [];
    this.draggedNode = null;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }
  `;

  render() {
    return html`
      <div @dblclick=${this.handleCanvasDoubleClick}
           @mousemove=${this.handleMouseMove}
           @mouseup=${this.handleMouseUp}>
        ${this.nodes.map(node => html`
          <node-component
            .x=${node.x}
            .y=${node.y}
            .text=${node.text}
            .id=${node.id}
            style="transform: translate(${node.x}px, ${node.y}px)"
          ></node-component>
        `)}
        ${this.edges.map(edge => html`
          <edge-component
            .start=${edge.start}
            .end=${edge.end}
            .id=${edge.id}
          ></edge-component>
        `)}
      </div>
    `;
  }

  handleCanvasDoubleClick(e) {
    const newNode = {
      id: `node-${Date.now()}`,
      x: e.clientX,
      y: e.clientY,
      text: ''
    };
    this.dispatchEvent(new CustomEvent('node-added', { 
      detail: newNode,
      bubbles: true,
      composed: true
    }));
  }

  handleMouseMove(e) {
    if (this.draggedNode) {
      const updatedNode = {
        ...this.draggedNode,
        x: e.clientX - this.dragOffset.x,
        y: e.clientY - this.dragOffset.y
      };
      this.dispatchEvent(new CustomEvent('node-moved', {
        detail: updatedNode,
        bubbles: true,
        composed: true
      }));
    }
  }

  handleMouseUp() {
    this.draggedNode = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('drag-start', this.handleNodeDragStart);
    this.addEventListener('text-changed', this.handleNodeTextChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('drag-start', this.handleNodeDragStart);
    this.removeEventListener('text-changed', this.handleNodeTextChanged);
  }

  handleNodeDragStart(e) {
    const node = this.nodes.find(n => n.id === e.detail.id);
    this.draggedNode = node;
    this.dragOffset = {
      x: e.detail.x - node.x,
      y: e.detail.y - node.y
    };
  }

  handleNodeTextChanged(e) {
    this.dispatchEvent(new CustomEvent('node-text-changed', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('canvas-component', Canvas);