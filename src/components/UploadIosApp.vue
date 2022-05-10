<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>上传应用</span>
      <el-button style="float: right;  padding: 3px 0" :disabled="disabled" @click="upload"  type="text">{{buttonText}}</el-button>


    </div>

    <el-form  label-width="100px" >
      <el-form-item label="ipa:">
        <el-upload
            ref="upload"
            class="upload-demo"
            :headers="this.$getHeader()"
            accept=".ipa"
            :auto-upload="false"
            :on-change="changeIpa"
            :file-list="list"
            :limit="1">
          <el-button size="small" type="primary" @click="clear">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传ipa文件，且不超过1g</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="证书ID">
        <el-input v-model="certId"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="introduce"></el-input>
      </el-form-item>


      <el-form-item label="">
        <el-progress v-if="percentage === 0? false:true" :text-inside="true" :stroke-width="25" :percentage="percentage"></el-progress>
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
      ipa:'',
      password:'',
      p12:'',
      certId: '',
      mobileprovision:'',
      list: [],
      disabled:false,
      buttonText:"添加",
      percentage: 0
    }
  },
  methods:{
    changeP12(e){
      console.log(e.raw)
      this.p12 = e.raw
    },
    changeIpa(e){
      console.log("触发")
      console.log(e.raw)
      this.ipa = e.raw
    },
    changeMob(e){
      console.log(e.raw)
      this.mobileprovision = e.raw
    },
    clear(){
      this.$refs.upload.clearFiles();
    },
    upload(){
      const that = this;
      let formData = new FormData();
      formData.append("introduce", this.introduce);
      formData.append("ipa", this.ipa);
      formData.append("certId", this.certId);
      if(this.ipa == '' || this.introduce == '' || this.certId == ''){
        that.$message.error("请填写完整信息")
      }else {
        that.disabled = true
        that.buttonText = '添加中'
        var config = {
          onUploadProgress:function(progressEvent){
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            that.percentage = complete;

          }
        };
        that.$http.post("/IosSignSoftwareDistribute/uploadIpa",formData,config).then(function (result) {

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
        }).finally(function (){
          that.percentage =0
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
