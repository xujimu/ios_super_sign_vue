<template>
    <div>
        <!--        居中盒子-->
        <div class="center_box">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>设置</span>
                    <el-button style="float: right; padding: 3px 10px" type="text" @click="save()">保存</el-button>
                </div>
                <el-form  label-width="100px" >
                    <el-form-item label="IPA下载链接" >
                        <el-input placeholder="如https:///www.baidu.com/" v-model="data.IpaDownUrl" style="width: 400px;" ></el-input>
                    </el-form-item>
                </el-form>
            </el-card>

        </div>


    </div>
</template>

<script>
    export default {
        created () {
            var that = this
            console.log(1)
            console.log(that.data)
            that.$load(1,"加载中")
            this.$http.get('/admin/querySetting')
                .then(function (response) {
                    that.$load(0)
                    if(response.data.code == 0){

                        that.data = response.data.data
                        console.log(2)
                        console.log(that.data)
                    }else {
                        that.$message.error(response.data.message)
                    }
                })
                .catch(function (error) {
                    that.$load(0)
                    that.$message,error("查询失败")
                });
        },
        name: 'Setting',
        data () {
            return {
                data:{
                    IpaDownUrl:""
                }
            }
        },
        methods: {
            save(){
                var that = this
                this.$http.post('admin/updateSetting',"settingJson=" + JSON.stringify(that.data))
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
                        that.$message,error("保存失败")
                    });
            }
        }
    }
</script>

<style scoped>
    .center_box{

    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 600px;
    }
</style>
