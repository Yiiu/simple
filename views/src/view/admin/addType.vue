<template>
    <div class="add-type">
        <div class="title">
            <div class="content">
                <input type="text" placeholder="请输入标签名" v-model="name">
            </div>
        </div>
        <div class="profile">
            <div class="content">
                <textarea placeholder="请输入标签简介" v-model="profile"></textarea>
            </div>
        </div>
        <y-button @click.native="add" type="ghost">添加</y-button>
    </div>
</template>
<style lang="less">
.add-type {
    width: 800px;
    margin: 0 auto;
    input {
        width: 100%;
        font-size: 32px;
        outline: none;
        border: none;
        resize:none;
        height: 1.3em;
        margin-bottom: 6px;
        transition: .3s all;
    }
    textarea {
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        font-size: 16px;
        outline: none;
        border: none;
        resize:none;
        height: 1.3em;
        min-height: 120px;
    }
}
</style>
<script>
export default {
    data(){
        return {
            name:"",
            profile:"",
        }
    },
    methods:{
        add(){
            let that = this
            if(this.name == ""){
                this.$notify.danger("请输入标签名")
                return
            }
            this.$store.dispatch("addType",{
                name:this.name,
                profile:this.profile
            }).then(data=>{
                console.log(data)
            })
        }
    }
}
</script>