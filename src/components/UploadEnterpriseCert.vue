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

            <el-form-item label="moblic:" prop="startIcon">
                <input class="file"  name="fileStartIcon" type="file" accept=".mobileprovision" @change="mobileProvisionF($event)"/>
            </el-form-item>

            <el-form-item label="证书密码" >
                <el-input v-model="password" style="width: 200px;" ></el-input>
            </el-form-item>

            <el-form-item label="备注" >
                <el-input v-model="remark" style="width: 200px;" ></el-input>
            </el-form-item>

            <el-form-item label="扣除共有池" >
                <el-input v-model="count" style="width: 200px;" type="number" ></el-input>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "UploadCert",
        data(){
          return {
              password:'',
              p12:'',
              mobileProvision:{},
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
            mobileProvisionF(event){
                this.mobileProvision = event.target.files[0]
            },
            upload(){
                const that = this;
                console.log("p12" + this.p12 + "this.mobileProvision" + this.mobileProvision + "this.remark" + this.remark + "this.count" + this.count)
                if(this.p12 == "" || this.mobileProvision == "" || this.remark == "" || this.count === "" ){
                    that.$message.error("请填写完整信息!")
                }else {
                    let formData = new FormData();
                    formData.append("mobileProvision", this.mobileProvision);
                    formData.append("p12", this.p12);
                    formData.append("remark", this.remark);
                    formData.append("count", this.count);
                    formData.append("password", this.password);
                    that.disabled = true
                    that.buttonText = '添加中'
                    that.$http.post("/EnterpriseSign/uploadCert",formData).then(function (result) {
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
