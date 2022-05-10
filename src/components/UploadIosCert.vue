<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>证书信息</span>
            <el-button style="float: right;  padding: 3px 0" :disabled="disabled" @click="upload"  type="text">{{buttonText}}</el-button>

            <a :href="addCertHelp" target="_blank">
                <el-button style="float: right; margin-right: 10px; padding: 3px 0" :disabled="disabled"  type="text">使用说明</el-button>
            </a>

        </div>

        <el-form  label-width="150px" >

            <el-form-item label="p12:">
                <el-upload
                        ref="upload"
                        class="upload-demo"
                        accept=".p12"
                        :auto-upload="false"
                        :on-change="changeP12"
                        :file-list="list"
                        :headers="this.$getHeader()"
                        :limit="1">
                    <el-button size="small" type="primary" @click="clear">选择文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传p12文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>

          <el-form-item label="mobileprovision:">
            <el-upload
                ref="upload"
                class="upload-demo"
                accept=".mobileprovision"
                :auto-upload="false"
                :on-change="changeMob"
                :file-list="list"
                :headers="this.$getHeader()"
                :limit="1">
              <el-button size="small" type="primary" @click="clear">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传mobileprovision文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>


          <el-form-item label="证书密码">
            <el-input v-model="password"></el-input>
          </el-form-item>

          <el-form-item label="设备udid">
            <el-input v-model="udid"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="introduce"></el-input>
          </el-form-item>



        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "UploadCert",
        data(){
          return {
              introduce: '',
              udid: '',
              password:'',
              p12:'',
              mobileprovision:'',
              list: [],
              disabled:false,
              buttonText:"添加"
          }
        },
        methods:{
          changeP12(e){
               console.log(e.raw)
                this.p12 = e.raw
            },
          changeMob(e){
            console.log(e.raw)
            this.mobileprovision = e.raw
          },
            clear(){
                // this.$refs.upload.clearFiles();
            },
            upload(){
                const that = this;
                let formData = new FormData();
                formData.append("mobileprovision", this.mobileprovision);
                formData.append("p12", this.p12);
                formData.append("password", this.password);
                formData.append("introduce", this.introduce);
                formData.append("udid", this.udid);
                if(this.p12 == '' ||  this.mobileprovision == '' || this.password == '' || this.introduce == '' || this.udid == ''){
                    that.$message.error("请填写完整信息")
                }else {
                    that.disabled = true
                    that.buttonText = '添加中'
                    that.$http.post("/IosSignSoftwareDistribute/uploadCert",formData).then(function (result) {
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
