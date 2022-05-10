<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>证书信息</span>
            <el-button style="float: right;  padding: 3px 0" :disabled="disabled" @click="upload"  type="text">{{buttonText}}</el-button>

            <a href="https://blog.csdn.net/m0_48720770/article/details/122898401" target="_blank">
                <el-button style="float: right; margin-right: 10px; padding: 3px 0" :disabled="disabled"  type="text">使用说明</el-button>
            </a>

        </div>
        <el-form  label-width="80px" >
            <el-form-item label="iis:">
                <el-input  v-model="iis" ></el-input>
            </el-form-item>
            <el-form-item label="kid">
                <el-input v-model="kid"></el-input>
            </el-form-item>
            <el-form-item label="P8:">
                <el-upload
                        ref="upload"
                        class="upload-demo"
                        accept=".p8"
                        :headers="this.$getHeader()"
                        action="/iis/addIis"
                        :auto-upload="false"
                        :on-change="change"
                        :file-list="list"
                        :limit="1">
                    <el-button size="small" type="primary" @click="clear">选择文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传p8文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "UploadCert",
        data(){
          return {
              iis:'',
              kid:'',
              p8:'',
              list: [],
              disabled:false,
              buttonText:"添加"
          }
        },
        methods:{
            change(e){
               console.log(e.raw)
                this.p8 = e.raw
            },
            clear(){
                this.$refs.upload.clearFiles();
            },
            upload(){
                const that = this;
                let formData = new FormData();
                formData.append("iis", this.iis);
                formData.append("kid", this.kid);
                formData.append("p8", this.p8);
                if(this.iis == '' ||  this.kid == '' || this.p8 == ''){
                    that.$message.error("请填写完整信息")
                }else {
                    that.disabled = true
                    that.buttonText = '添加中'
                    that.$http.post("/iis/addIis",formData).then(function (result) {
                        console.log(result.data)
                        that.disabled = false
                        that.buttonText = '添加'
                        if(result.data.code ===  0){
                            that.$message.success(result.data.message)
                        }else {
                            that.$message.error(result.data.message)
                        }
                    }).catch(function (err) {
                        console.log(err)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
