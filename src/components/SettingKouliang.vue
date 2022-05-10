<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>扣量设置</span>
      <el-button style="float: right;  padding: 3px 0" :disabled="disabled" @click="upload"  type="text">{{buttonText}}</el-button>

    </div>
    <el-form  label-width="300px" >

      <el-tag>分发设置</el-tag>
      <el-form-item label="mdm企业签名下载1次扣除(/台)" >
        <el-input v-model="req.mdmSoftTotal" style="width: 200px;" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="mdm超级签名下载1次扣除(/台)" >
        <el-input v-model="req.mdmSuperTotal" style="width: 200px;" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="超级签名分发下载1次扣除(/台)" >
        <el-input v-model="req.superTotal" style="width: 200px;" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="单点分发下载1次扣除(/台)" >
        <el-input v-model="req.oneSuperTotal" style="width: 200px;" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="自助分发扣除(/台)" >
        <el-input v-model="req.softTotal" style="width: 200px;" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="免签封装1次扣除(/台)" >
        <el-input v-model="req.webPackTotal" style="width: 200px;" type="number" ></el-input>
      </el-form-item>


      <el-tag>虚拟扣量设置</el-tag>
      <el-form-item label="mdm企业签名第几次触发扣量" >
        <el-input v-model="req.mdmSoftNum" style="width: 200px;margin-right: 30px" type="number" ></el-input>
        额外扣除数量
        <el-input v-model="req.mdmSoftReCount" style="width: 200px;margin-left: 10px" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="mdm超级签名第几次触发扣量" >
        <el-input v-model="req.mdmSuperNum" style="width: 200px;margin-right: 30px" type="number" ></el-input>
        额外扣除数量
        <el-input v-model="req.mdmSuperReCount" style="width: 200px;margin-left: 10px" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="超级签名第几次触发扣量" >
        <el-input v-model="req.superNum" style="width: 200px;margin-right: 30px" type="number" ></el-input>
        额外扣除数量
        <el-input v-model="req.superReCount" style="width: 200px;margin-left: 10px" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="自助分发第几次触发扣量" >
        <el-input v-model="req.softNum" style="width: 200px;margin-right: 30px" type="number" ></el-input>
         额外扣除数量
        <el-input v-model="req.softReCount" style="width: 200px;margin-left: 10px" type="number" ></el-input>
      </el-form-item>


      <el-tag>其他设置</el-tag>
      <el-form-item label="主域名" >
        <el-input v-model="req.mqDomain" style="width: 200px;margin-right: 30px"  type="text" ></el-input>
      </el-form-item>
      <el-form-item label="mdm域名" >
      <el-input v-model="req.mdmDomain" style="width: 200px;margin-right: 30px" type="text" ></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "UploadCert",
  created() {
    this.query();
  },
  data(){
    return {
      req:{
        mdmDomain: "www.xxx.com",
        mqDomain: "www.xxx.com",
        mdmSoftNum: 0,
        mdmSoftReCount: 0,
        mdmSuperNum: 0,
        mdmSuperReCount: 0,
        superNum: 0,
        superReCount: 0,
        softNum: 0,
        softReCount: 0,
        superTotal: 0,
        mdmSuperTotal: 0,
        softTotal: 0,
        mdmSoftTotal: 0,
        webPackTotal: 0,
        oneSuperTotal: 0
      },
      disabled:false,
      buttonText:"保存",
    }
  },
  methods:{
    query(){
      var  that = this
      that.$http.post("/admin/system_settings_query").then(function (result) {
        that.$load(0)
        if(result.data.code ===  0){
          that.req = result.data.data
        }else {
          that.$message.error(result.data.message)
        }
      }).catch(function (err) {
        that.$load(0)
        console.log(err)
      })
    },
    upload(){
      const that = this;
      that.disabled = true
      that.buttonText = '保存中'
      that.$http.post("/admin/system_settings",that.req).then(function (result) {
        console.log(result.data)
        that.disabled = false
        that.buttonText = '保存'
        if(result.data.code ===  0){

          that.$message.success(result.data.message)
        }else {
          that.$message.error(result.data.message)
        }
      }).catch(function (err) {
        that.disabled = false
        that.buttonText = '保存'
        console.log(err)
      })

    }
  }
}
</script>

<style scoped>

</style>
