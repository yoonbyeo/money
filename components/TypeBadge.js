class TypeBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type' && oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') || '????';
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--accent);
          color: white;
          padding: 8px 16px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 1.2em;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          box-shadow: var(--shadow);
        }
      </style>
      <span>${type}</span>
    `;
  }
}

try {
  customElements.define('type-badge', TypeBadge);
} catch (e) {
  console.error("Error defining type-badge:", e);
}
