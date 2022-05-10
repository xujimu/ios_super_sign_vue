<template>
    <el-upload
            :on-success="success"
            class="uploadHead"
            with-credentials
            :headers="this.$getHeader()"
            drag
            :action="this.$http.defaults.baseURL + '/softwareDistribute/uploadIpa'"
            name="ipa"
            accept=".ipa"
            :multiple="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传ipa文件，且不超过2048MB</div>
    </el-upload>
</template>

<script>
    export default {
        name: "UploadApp",
        data(){
            return{
            }
        },
        methods:{
            success(e) {
                if (e.code === 4){
                    this.$message.error(e.message)
                    window.localStorage.removeItem("user")
                    this.$router.push("/login")
                }else if(e.code === 0){
                    this.$message.success(e.message + ":请前往分发记录查看")
                }else {
                    this.$message.error(e.message)
                }
            },
        }
    }
</script>

<style lang="less" scoped>

</style>
