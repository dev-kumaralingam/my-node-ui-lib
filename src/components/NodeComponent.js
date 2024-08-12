import { LitElement, html, css } from 'lit';

export class NodeComponent extends LitElement {
  static get properties() {
    return {
      id: { type: Number },
      x: { type: Number },
      y: { type: Number },
      text: { type: String },
    };
  }

  static styles = css`
    :host {
      position: absolute;
      width: 100px;
      height: 50px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: move;
      overflow: hidden;
    }
    input {
      width: 90%;
      border: none;
      background: transparent;
      text-align: center;
    }
  `;

  render() {
    return html`
      <input
        type="text"
        .value=${this.text}
        @input=${this.handleTextInput}
        @mousedown=${this.handleMouseDown}
      >
      <button @click=${this.handleDeleteClick}>&times;</button>
    `;
  }

  handleTextInput(e) {
    this.dispatchEvent(new CustomEvent('text-changed', {
      detail: { id: this.id, text: e.target.value },
      bubbles: true,
      composed: true
    }));
  }

  handleMouseDown(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('node-drag-start', {
      detail: { id: this.id, x: e.clientX, y: e.clientY },
      bubbles: true,
      composed: true
    }));
  }

  handleDeleteClick(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('node-deleted', {
      detail: { id: this.id },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('node-component', NodeComponent);
