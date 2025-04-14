class CodeCompiler {
  constructor() {
    this.editor = ace.edit("editor");
    this.output = document.getElementById("output");
    this.languageSelector = document.getElementById("language");
    this.runButton = document.getElementById("run-btn");
    
    this.setupEventListeners();
    this.setEditorMode(this.languageSelector.value);
  }

  setupEventListeners() {
    this.runButton.addEventListener('click', () => this.executeCode());
    
    this.languageSelector.addEventListener('change', () => {
      this.setEditorMode(this.languageSelector.value);
    });
  }

  setEditorMode(language) {
    const modes = {
      'python': 'ace/mode/python',
      'javascript': 'ace/mode/javascript',
      'java': 'ace/mode/java',
      'cpp': 'ace/mode/c_cpp'
    };
    this.editor.session.setMode(modes[language]);
  }

  async executeCode() {
    const code = this.editor.getValue();
    const language = this.languageSelector.value;
    
    this.output.innerHTML = '<div class="loader">Executing code...</div>';
    
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code })
      });
      
      const result = await response.json();
      this.output.innerHTML = result.success ? 
        `<pre>${result.output}</pre>` : 
        `<pre class="error">${result.error}</pre>`;
    } catch (error) {
      this.output.innerHTML = `<pre class="error">Connection error: ${error.message}</pre>`;
    }
  }
}

// Initialize compiler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CodeCompiler();
});
