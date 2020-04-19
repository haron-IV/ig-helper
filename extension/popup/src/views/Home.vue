<template>
  <div>
    <Control-pannel />  
    
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    

      <v-flex xs6>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>

      <v-flex xs6>
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ControlPannel from "@/components/ControlPannel";

export default {
  name: 'Home',
  components: {
    'Control-pannel': ControlPannel
  },
  computed: {
    width(){
      return this.$store.state.appWidth - menuLeftSpace;
    }
  }
}
</script>
