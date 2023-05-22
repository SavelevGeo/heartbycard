function clamp(num, min, max) {
  return Math.min(
    Math.max(num, min), max
  );
}

class cardsFile {
  constructor(nodePath) {
    this.fileName = nodePath.split('/')[1]
    this.stem = this.fileName.split('.')[0];
    this.content = undefined;
    this._minCardNum = 1;
    this._maxCardNum = 1;

    this.collapsed = true;
    
    this._fileNameEncoded = encodeURI(this.fileName);
    this.rawLink = `https://raw.githubusercontent.com/SavelevGeo/heartbycard/main/quiz/${this._fileNameEncoded}`
    
    this.appLink = `learn/?file=${this._fileNameEncoded}`
  }
  
  toggleCollapsed() {
    this.collapsed = !this.collapsed
  }
  
  fetchContent() {
    if (this.content === undefined)
    fetch(this.rawLink)
      .then(resp => resp.text())
      .then(text => {
        this.content = text;
        this.maxCardNum = this.len;
      })
  }
  
  get minCardNum() {
    return this._minCardNum
  }
  
  set minCardNum(value) {
    this._minCardNum = clamp(value, 1, this.maxCardNum)
  }
  
  get maxCardNum() {
    return this._maxCardNum
  }
  
  set maxCardNum(value) {
    this._maxCardNum = clamp(value, this.minCardNum, this.len)
  }
  
  get len() {
    if (this.content === undefined)
      return undefined
    
    return this.content.split('\n').length
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
  },
  methods: {
    clamp(num, min, max) {
     return Math.min(
        Math.max(num, min), max
      );
    }
  }
});

app.mount('#app');
