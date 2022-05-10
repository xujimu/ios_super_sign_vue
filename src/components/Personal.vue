<template>
    <div>
        <!--        居中盒子-->
        <div class="center_box">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>用户信息</span>
                    <el-button style="float: right; padding: 3px 10px" type="text" @click="quit">退出</el-button>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">修改密码</el-button>
                </div>
                <div class="text item">
                    账号:  {{account}}
                </div>
                <div class="text item">
                    类型:  {{type}}
                </div>
                <div class="text item">
                    公有池:  {{count}} 台
                </div>
            </el-card>

        </div>

      <el-form style="margin-left: 10px;margin-top: 20px">

        <el-tag>分发价格</el-tag>
        <el-form-item label="mdm企业签名下载1次扣除" >
          <el-tag >{{req.mdmSoftTotal}}台</el-tag>
        </el-form-item>
        <el-form-item label="mdm超级签名下载1次扣除" >
          <el-tag>{{req.mdmSuperTotal}}台</el-tag>
        </el-form-item>
        <el-form-item   label="超级签名分发下载1次扣除" >
          <el-tag>{{req.superTotal}}台</el-tag>
        </el-form-item>
        <el-form-item  label="单点分发下载1次扣除" >
          <el-tag>{{req.oneSuperTotal}}台</el-tag>
        </el-form-item>

        <el-form-item   label="免签封装1次扣除" >
          <el-tag>{{req.webPackTotal}}台</el-tag>
        </el-form-item>

        <el-form-item label="自助分发扣除" >
          <el-tag>{{req.softTotal}}台</el-tag>
        </el-form-item>

      </el-form>

        <!--      修改密码的表单-->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form >
                <el-form-item label="密码">
                    <el-input v-model="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="newPassword" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    var that;
    export default {
        created () {
            that = this
            // const  user = window.localStorage.getItem("user")
            // this.account = user.account
            console.log("展示")
            this.$http.get('/user/get_info').then(function (result) {

              if(result.data.code === 0){

                var user = result.data.data
                console.log("个人中心")
                console.log(user)

                window.localStorage.setItem("user",JSON.stringify(user))

                console.log(user.account)
                that.account = user.account
                that.count = user.count


                if(user.type === 0){
                  that.type = "普通用户"
                }else {
                  that.type = "管理员"
                }
              }else {
                that.$message.error(result.data.message)
              }

            })

            this.query();
        },
        name: 'Personal',
        data () {
            return {
                account: '获取中',
                type: '获取中',
                count: '获取中',
                dialogFormVisible: false,
                password: '',
                newPassword: '',
                formLabelWidth: '120px',
                req:{
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
                  webPackTotal: 0
                }
            }
        },
        methods: {
          query(){
            var  that = this
            that.$http.post("/user/system_settings_query").then(function (result) {
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
            ok () {
                var that = this
                if (this.password === '' || this.newPassword === '') {
                    that.$message.success('请填写完整信息')
                } else {
                    this.$http.post('/user/updatePassword', 'account=' + this.account + '&password=' + this.password + '&newPassword=' +
                        this.newPassword).then(function (result) {
                        if(result.data.code === 0){
                            that.$message.success(result.data.message)
                            that.$router.push('/login')
                        }else {
                            that.$message.error(result.data.message)
                        }

                    })
                }
            },
            quit () {
                var that = this
                this.$http.get('/user/quit').then(function (result) {
                    that.$message.success(result.data.message)
                    window.localStorage.removeItem('user')
                    that.$router.push('/login')
                })
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
        width: 480px;
    }
</style>
