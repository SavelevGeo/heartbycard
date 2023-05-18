class cardsFile {
  constructor(nodePath) {
    this.fileName = nodePath.split('/')[1]
    this.stem = this.fileName.split('.')[0];
    this.collapsed = true;
    
    this._fileNameEncoded = encodeURI(this.fileName);
    this.appLink = `learn/?file=${this._fileNameEncoded}`
    this.rawLink = `https://raw.githubusercontent.com/SavelevGeo/heartbycard/main/quiz/${this._fileNameEncoded}`
  }
}

const app = Vue.createApp({
  data() {
    return {
      cardsFiles: []
    }
  },
  created() {
    fetch('https://api.github.com/repos/SavelevGeo/heartbycard/git/trees/main?recursive=1')
      .then(resp => resp.json())
      .then(json => {
        
        this.cardsFiles = json.tree
          .filter(node =>
            node.path.match(/quiz\/.*\.txt/)
          )
          .map(node => new cardsFile(node.path)
          );
      })
  }
});


app.mount('#app');
