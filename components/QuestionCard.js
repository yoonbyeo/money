class QuestionCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const question = this.getAttribute('question');
    const questionId = this.getAttribute('question-id');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          padding: 24px;
          box-sizing: border-box;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          user-select: none;
          cursor: grab;
          touch-action: none;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .question-text {
          font-size: 1.5em;
          font-family: 'Playfair Display', serif;
        }
      </style>
      <div class="question-text">${question}</div>
    `;
  }
}

customElements.define('question-card', QuestionCard);
