<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>证书信息</span>
      <el-button style="float: right;  padding: 3px 0" :disabled="disabled" @click="upload"  type="text">{{buttonText}}</el-button>

    </div>
    <el-form  label-width="100px" >
      <el-form-item label="p12:" prop="icon">
        <input class="file"  name="fileIocn" type="file"  accept=".p12"  @change="p12F($event)"/>
      </el-form-item>

      <el-form-item label="pem(可选):" prop="startIcon">
        <input class="file"  name="fileStartIcon" type="file" accept=".pem" @change="pemF($event)"/>
      </el-form-item>

      <el-form-item label="key(可选):" prop="startIcon">
        <input class="file"  name="fileStartIcon" type="file" accept=".key" @change="keyF($event)"/>
      </el-form-item>

      <el-form-item label="证书密码" >
        <el-input v-model="password" style="width: 200px;" ></el-input>
      </el-form-item>

      <el-form-item label="备注" >
        <el-input v-model="remark" style="width: 200px;" ></el-input>
      </el-form-item>

    </el-form>
    <div >
      <el-tag>说明: pem和key一般是nginx格式的ssl证书两个后缀文件 用于签名描述文件 如果不填则是默认的 默认为 APSP: **** 如果填写pem和key 则展示的为你的域名</el-tag>
      <br><br>
      <div><img src="../assets/qwea.jpg" style="width: 500px;height: 500px" alt=""></div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UploadCert",
  data(){
    return {
      password:'',
      p12:'',
      pem:'',
      key:'',
      list: [],
      disabled:false,
      buttonText:"添加",
      count:0,
      remark:"独立证书"
    }
  },
  methods:{
    p12F(event){
      this.p12 = event.target.files[0]
    },
    pemF(event){
      this.pem = event.target.files[0]
    },
    keyF(event){
      this.key = event.target.files[0]
    },
    upload(){
      const that = this;
      console.log("p12" + this.p12 + "this.mobileProvision" + this.pem + "this.remark" + this.remark )
      if(this.p12 === ""  || this.password === "" ){
        that.$message.error("请填写完整信息!")
      }else {
        let formData = new FormData();
        formData.append("p12", this.p12);
        formData.append("remark", this.remark);
        formData.append("password", this.password);
        if(this.pem !== '' && this.key !== ''){
          formData.append("pem", this.pem);
          formData.append("key", this.key);
        }
        that.disabled = true
        that.buttonText = '添加中'
        that.$http.post("/admin/uploadMdmCert",formData).then(function (result) {
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
