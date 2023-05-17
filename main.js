
const app = Vue.createApp({
  data() {
    return {
      nodes: []
    }
  },
  created() {
    fetch('https://api.github.com/repos/SavelevGeo/heartbycard/git/trees/main?recursive=1')
      .then(resp => resp.json())
      .then(json => {
        this.nodes = json.tree
          .filter(node => node.path.match(
            /quiz\/.*\.txt/)
          )
          .map(node => {
            const fileName = node.path
              .split('/')[1]
            
            return {
              stem: fileName.split('.')[0],
              appLink: this.link(fileName),
              dataLink: this.rawLink(fileName),
              collapsed: true
            }
            
          });
          
      })
  },
  methods: {
    link(fileName) {
      const fileNameEncoded = encodeURI(fileName)
      
      return `learn/?file=${fileNameEncoded}`
    },
    
    rawLink(fileName) {
      const fileNameEncoded = encodeURI(fileName)
      
      return `https://raw.githubusercontent.com/SavelevGeo/heartbycard/main/quiz/${fileNameEncoded}`
    },
    
  }
});


app.mount('#app');
