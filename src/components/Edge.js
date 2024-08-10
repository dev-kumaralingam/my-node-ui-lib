import { LitElement, svg, css } from 'lit';

export class Edge extends LitElement {
  static properties = {
    start: { type: Object },
    end: { type: Object },
    id: { type: String }
  };

  constructor() {
    super();
    this.start = { x: 0, y: 0 };
    this.end = { x: 0, y: 0 };
    this.id = '';
  }

  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }
  `;

  render() {
    return svg`
      <svg width="100%" height="100%">
        <line
          x1=${this.start.x}
          y1=${this.start.y}
          x2=${this.end.x}
          y2=${this.end.y}
          stroke="black"
          stroke-width="2"
        />
      </svg>
    `;
  }
}

customElements.define('edge-component', Edge);