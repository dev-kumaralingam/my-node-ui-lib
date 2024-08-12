import { LitElement, html, css } from 'lit';

export class EdgeComponent extends LitElement {
  static get properties() {
    return {
      startX: { type: Number },
      startY: { type: Number },
      endX: { type: Number },
      endY: { type: Number },
    };
  }

  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }
    .edge {
      stroke: black;
      stroke-width: 2px;
    }
  `;

  render() {
    return html`
      <svg width="100%" height="100%">
        <line
          class="edge"
          x1=${this.startX}
          y1=${this.startY}
          x2=${this.endX}
          y2=${this.endY}
        />
      </svg>
    `;
  }
}

customElements.define('edge-component', EdgeComponent);
