import { LitElement, html, css } from 'lit';
import './NodeComponent.js';
import './EdgeComponent.js';

export class CanvasComponent extends LitElement {
  static get properties() {
    return {
      nodes: { type: Array },
      edges: { type: Array },
    };
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
      <div @dblclick=${this.handleCanvasDoubleClick}>
        ${this.nodes.map(node => html`
          <node-component
            .id=${node.id}
            .x=${node.x}
            .y=${node.y}
            .text=${node.text}
            style="transform: translate(${node.x}px, ${node.y}px)"
            @node-drag-start=${this.handleNodeDragStart}
            @node-deleted=${this.handleNodeDeleted}
            @text-changed=${this.handleTextChanged}
          ></node-component>
        `)}
        ${this.edges.map(edge => {
          const startNode = this.nodes.find(n => n.id === edge.startId);
          const endNode = this.nodes.find(n => n.id === edge.endId);
          return html`
            <edge-component
              .startX=${startNode.x + 50}
              .startY=${startNode.y + 25}
              .endX=${endNode.x + 50}
              .endY=${endNode.y + 25}
            ></edge-component>
          `;
        })}
      </div>
    `;
  }

  handleCanvasDoubleClick(e) {
    const rect = this.getBoundingClientRect();
    this.dispatchEvent(new CustomEvent('node-added', {
      detail: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        text: ''
      },
      bubbles: true,
      composed: true
    }));
  }

  handleNodeDragStart(e) {
    this.dispatchEvent(new CustomEvent('node-drag-start', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleNodeDeleted(e) {
    this.dispatchEvent(new CustomEvent('node-deleted', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleTextChanged(e) {
    this.dispatchEvent(new CustomEvent('text-changed', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('canvas-component', CanvasComponent);
