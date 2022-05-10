<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加域名</span>
            <el-button style="float: right;  padding: 3px 0" :disabled="disabled" @click="upload"  type="text">{{buttonText}}</el-button>

        </div>
        <el-form  label-width="100px" >

            <el-form-item label="主域名" >
                <el-input placeholder="必须是主域名如:www.baidu.com " v-model="domain" style="width: 500px;" ></el-input>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "AddDomain",
        data(){
            return {
                buttonText:"添加",
                domain:""
            }
        },
        methods:{
            upload(){
                const that = this;
                //console.log("p12" + this.p12 + "this.mobileProvision" + this.mobileProvision + "this.remark" + this.remark + "this.count" + this.count)
                if(this.domain == "" ){
                    that.$message.error("请填写完整信息!")
                }else {
                    this.$http.post('/admin/addDomain', 'domain=' + that.domain)
                        .then(function (response) {
                            that.$load(0)
                            if(response.data.code == 0){
                                that.$message.success(response.data.message)
                            }else {
                                that.$message.error(response.data.message)
                            }
                        })
                        .catch(function (error) {
                            that.$load(0)
                            that.$message.error("添加失败")
                        });
                }

            }
        }
    }
</script>

<style scoped>

</style>
