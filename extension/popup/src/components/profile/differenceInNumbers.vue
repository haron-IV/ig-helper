<template>
<span :class="{
    'difference-green': ( differenceInNumbers(actualNumber, comparingNumber) > 0 ) && plusColor === 'green',
    'difference-red': ( differenceInNumbers(actualNumber, comparingNumber) > 0 ) && plusColor === 'red'}">
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
        comparingNumber: Number,
        plusColor: { type: String, default: 'green' }
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
.difference-red {
    color: red;
}
.difference-green {
    color: green;
}

</style>