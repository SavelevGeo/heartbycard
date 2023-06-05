
class Deck {
  constructor(items, startValue) {
    this.items = items;
    this._num = startValue;
  }
  
  static fromLines(text, startValue) {
    const cards = text.split('\n').map(line => {
      const [left, right] = line.split('--');
      return { 'left': left, 'right': right }
    })
    
    return new Deck(cards, startValue)
  }
  
  get num() { return this._num }
  set num(value) {
    if (value < 1 || value > this.items.length) return undefined
    
    this._num = value
  }
}

const app = Vue.createApp({
  created() {
    let urlParams = new URLSearchParams(window.location.search);
    
    this.fileName = urlParams.get('file');
    if (this.fileName === null) this.fileName = 'Verben%20mit%20pr%C3%A4postitonen.txt';
    
    this.from = urlParams.get('from');
    if (this.from === null) this.from = 1;
    
    this.to = urlParams.get('to');
    if (this.to === null) this.to = 5;
    
    this.getData()
  },
  data() {
    return {
      fileName: '',
      
      cards: new Deck([{'left':'', 'right':''}], 1),
      attempt: '',
      attemptFinal: false,
      
      mistakes: new Deck([], 1),
      learnMistakes: false,
      currentCardMistaken: false,
    }
  },
  methods: {
    getData() {
      // fetch(`https://raw.githubusercontent.com/SavelevGeo/heartbycard/main/quiz/${this.fileName}`)
      
      fetch(`../quiz/${this.fileName}`)

      .then(resp => resp.text())
      .then(text => {
        this.cards = Deck.fromLines(text, this.from)
      })
    },
    
    resetCard() {
      this.attempt = '';
      this.attemptFinal = false;
      this.currentCardMistaken = false;
    },
    
    previousCard() {
      this.currentDeck.num--;
      this.resetCard();
    },
    
    nextCard() {
      if (this.currentDeck.num < this.to){
        this.currentDeck.num++;
        
      } else if (!this.learnMistakes && this.mistakes.items.length > 0){
        this.learnMistakes = true
        
      } 
      
      this.resetCard();
    },
    
    checkAttempt() {
      if (!this.attemptCorrect && !this.currentCardMistaken) {
        
        this.mistakes.items.push(this.currentCard);
        this.currentCardMistaken = true;
      }
      
      if (this.attemptFinal && this.attemptCorrect) {
        this.nextCard()
      } else {
        // on the next submit nextcard will be called
        this.attemptFinal = true;
      }
    },
    
    resize(evt) {
      // based on https://codepen.io/samverdad/pen/oNWPgoB
      
      const element = evt.target;

      element.style.height = "15pt";
      element.style.height = element.scrollHeight + 1 + "px";
    }
  },
  
  computed: {
    currentCard() {
      return this.currentDeck.items[this.currentDeck.num - 1]
    },
    
    attemptCorrect() {
      if (this.attempt == '') return undefined
      return this.attempt == this.currentCard.left
    },
    
    currentDeck() {
      if (this.learnMistakes) {
        return this.mistakes
      } else {
        return this.cards
      }
    }
  }
});

app.mount('#app');


  