<template>
    <div>
        <!-- <Son1 :value.sync="mny" :aaa.sync="amount"></Son1> -->
        <Son1 v-model="mny" color="yellow" :age="age" @say="say"></Son1>
        <Son2></Son2>
        <!-- <Son1 :value="mny" @input="mny=>this.mny = mny"></Son1> -->
        ------- parent --------
        <button>broadcast</button>
    </div>
</template>

<script>
import Son1 from './Son1'
import Son2 from './Son2'
export default {
    provide(){
        return {
            parent: this
        }
    },
    components:{
        Son1,
        Son2
    },
    data(){
        return{
            mny:100,
            amount: 999,
            age: 18
        }
    },
    methods:{
        say(){
            // alert("haha");
        }
        // broadcast(){
        //     this.$broadcast('say');
        // }
    }
}
</script>