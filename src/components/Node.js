import { LitElement, html, css } from 'lit';

export class Node extends LitElement {
  static properties = {
    x: { type: Number },
    y: { type: Number },
    text: { type: String },
    id: { type: String }
  };

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.text = '';
    this.id = '';
  }

  static styles = css`
    :host {
      position: absolute;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px;
      cursor: move;
      user-select: none;
    }
  `;

  render() {
    return html`
      <div @mousedown=${this.handleDragStart}>
        <slot></slot>
        <input type="text" .value=${this.text} @input=${this.handleTextInput}>
      </div>
    `;
  }

  handleDragStart(e) {
    this.dispatchEvent(new CustomEvent('drag-start', {
      detail: { id: this.id, x: e.clientX, y: e.clientY },
      bubbles: true,
      composed: true
    }));
  }

  handleTextInput(e) {
    this.text = e.target.value;
    this.dispatchEvent(new CustomEvent('text-changed', {
      detail: { id: this.id, text: this.text },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('node-component', Node);