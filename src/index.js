import { LitElement, html, css } from 'lit';

export class NodeUI extends LitElement {
  static get properties() {
    return {
      nodes: { type: Array },
      edges: { type: Array }
    };
  }

  constructor() {
    super();
    this.nodes = /** @type {any[]} */ ([]);
    this.edges = /** @type {any[]} */ ([]);
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
        .nodes=${/** @type {any[]} */ (this.nodes)}
        .edges=${/** @type {any[]} */ (this.edges)}
        @node-added=${this.handleNodeAdded}
        @edge-added=${this.handleEdgeAdded}
        @node-moved=${this.handleNodeMoved}
        @node-text-changed=${this.handleNodeTextChanged}
      ></canvas-component>
    `;
  }

  handleNodeAdded(e) {
    this.nodes = [...this.nodes, e.detail];
    this.requestUpdate();
  }

  handleEdgeAdded(e) {
    this.edges = [...this.edges, e.detail];
    this.requestUpdate();
  }

  handleNodeMoved(e) {
    const { id, x, y } = e.detail;
    this.nodes = this.nodes.map(node => 
      node.id === id ? { ...node, x, y } : node
    );
    this.requestUpdate();
  }

  handleNodeTextChanged(e) {
    const { id, text } = e.detail;
    this.nodes = this.nodes.map(node => 
      node.id === id ? { ...node, text } : node
    );
    this.requestUpdate();
  }
}

customElements.define('node-ui', NodeUI);