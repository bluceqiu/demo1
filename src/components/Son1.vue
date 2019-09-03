<template>
    <div>
        <button @click="update">update</button> value:{{value}}
        {{$attrs}}
        {{$listeners.say()}}
        <!-- <button @click="updateaaa">update aaa</button> aaa:{{aaa}} -->
        <GrandSon1 :value="{name:1, age:2}" @say="say"></GrandSon1>
    </div>
</template>

<script>
import GrandSon1 from './GrandSon1'
export default {
    name:"son1",
    inheritAttrs:false,
    components:{
        GrandSon1
    },
    props:{
        value:{
            type: Number
        },
        aaa:{
            type: Number
        }
    },
    data(){
        return {
            xl: 99999999
        }
    },
    methods:{
        say(){
            console.warn("你帅得过分了哦~");
        },
        update(){
            // this.$emit("update:value", 200);
            this.$emit("input", 200);
        },
        updateaaa(){
            this.$emit("update:aaa", 200);
        }
    }
}
</script>

