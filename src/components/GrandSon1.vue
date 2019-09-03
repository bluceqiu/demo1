<template>
    <div>
        <!-- ------- GrandSon1 ------
        <button @click="change">gs</button>
        GrandSon1: {{value}} -->
    </div>
</template>

<script>
export default {
    name:"GrandSon1",
    components:{

    },
     inject: [
        'parent'
    ],
    props:{
        value: {
        }
    },
    mounted(){
        // this.say();
        // console.log(this.parent);
        this.$nextTick(()=>{
            this.$bus.$emit("你好？", 'hello');   
        })
        
    },
    methods: {
        say(){
            this.$emit('say');
        },
        change(){
            // console.log(this.$parent);
            // this.$parent.$emit("input", 777);
            this.$dispatch("input", 888);
        }
    }
}
</script>