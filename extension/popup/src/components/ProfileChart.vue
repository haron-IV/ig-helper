<template>
    <v-card dark class="card-followers-chart">
        <h2 style="margin: .5rem 0 .5rem .7rem; position: sticky; top: 2rem;">{{name}}</h2>
        <v-card-text>
            <v-sheet>
                <v-sparkline
                :value="archiveValuesMapped"
                color="rgba(255, 255, 255, 1)"
                height="200"
                line-width=".5px"
                >
                    <template v-slot:label="item" style="font-size: 12px">
                        {{item.value}}
                    </template>
                </v-sparkline>
            </v-sheet>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'ProfileChart',
  components: {},
  props: {
    archiveValues: Array,
    name: String
  },
  data(){
    return {}
  },
  watch: {},
  computed: {
    archiveValuesMapped(){return this.archiveValues.map( el => JSON.parse( el.replace(" ", "") ) );}
  },
  created(){},
  methods: {}
}
</script>

<style lang="scss">
.card-followers-chart {
    width: 100%;
    margin: .5rem 0;

    .v-card {
        &__text {
            width: 80%;
            margin: 0 auto;
            padding: 0;
        }
    }
}
</style>