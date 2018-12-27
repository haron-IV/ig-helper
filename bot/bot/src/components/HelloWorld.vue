<template>
  <div class="hello">
    <textarea name="bot" id="botTextarea" cols="30" rows="10" v-model="textarea">
    </textarea>

    <button @click="sendData">
      prześlij
    </button>

    <button @click="showSnapchats">
      Pokaz listę snapów
    </button>

    <div>
      <ol id="snapchatsList">
          <li v-for="li in allSnapchatNicknames">
            {{ li }}
          </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      apiRoute: 'http://localhost:8080/api',
      textarea: '',
      allSnapchatNicknames: []
    }
  },
  methods: {
    getSnapchats(){
      let txt;
      txt = this.textarea.split(',');
      console.log(txt)
      return txt;
    },

    showSnapchats(){
      // this.getSnapchats();
      let scope = this;

      axios.get(`${this.apiRoute}/snapchats`)
      .then(function (response) {
        scope.textarea = '';
      
        console.log('Response:')
        console.log(response)
    
        let snapchatsArrays = [];

        response.data.data.forEach(el => {
          snapchatsArrays.push(el.snapchats)
        });

        const allSnapchatNicknames = snapchatsArrays.flatMap(e => e); // connect all inside tabs

        console.log('allSnapchatNicknames: ')
        console.log(allSnapchatNicknames)

        scope.allSnapchatNicknames = allSnapchatNicknames; //list of catched snapchat accounts (last array)
        
      })
      .catch(function (error) {
		    console.log(error)
      });
    },

    sendData() {
      axios.post(`${this.apiRoute}/snapchats`, {title: 'snaps', snapchats: this.getSnapchats()}) // txt should be array
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
      console.log(error)
      });
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {

  padding: 0;
}
li {
  text-align: left;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
