const app = Vue.createApp({
  data() {
    return {
      fileNames: ['Verben mit präpostitonen.txt']
    }
  },
  methods: {
    link(fileName) {
      const fileNameEncoded = encodeURI(fileName)
      
      return `learn/?file=${fileNameEncoded}`
    }
  }
});


app.mount('#app');
