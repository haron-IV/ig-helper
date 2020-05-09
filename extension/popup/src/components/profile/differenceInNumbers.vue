<template>
<span class="difference" :class="{ 'difference--plus': differenceInNumbers(actualNumber, comparingNumber) > 0 }"> 
    {{ differenceInNumbers(actualNumber, comparingNumber) }} 
</span>
</template>
 
<script>
    export default {
    name: 'Difference-in-numbers',
    data() {
        return {}
    },
    props: {
        actualNumber: Number,
        comparingNumber: Number
    },
    computed: {},
    methods: {
        differenceInNumbers(number1, number2) {
            number1 = JSON.parse( number1.replace(" ", "") );
            number2 = JSON.parse( number2.replace(" ", "") );
            
            if ( number1 > number2 ) return `+${number1 - number2}`;
            return `${number1 - number2}`;
        },
    }
}
</script>

<style lang='scss'>
.difference {
    color: red;
    &--plus {
        color: green;
    }
}
</style>