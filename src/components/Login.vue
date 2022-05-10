<template>
   <div CLASS="box">
       <div class="login_box">
           <!--    头像-->
           <div class="avatar_box">
               <img src="../assets/login.jpg">
           </div>
           <!--    表单-->
           <el-form ref="loginFromRef"  label-width="0px" class="login_from">
               <!--      用户名-->
               <el-form-item prop="account">
                   <el-input @click="login"  prefix-icon="el-icon-s-custom" v-model="account"></el-input>
               </el-form-item>
               <!--      密码-->
               <el-form-item prop="password">
                   <el-input type="password" v-model="password" prefix-icon="el-icon-s-cooperation"></el-input>
               </el-form-item>
               <!--    登录注册 -->
               <el-form-item class="btns">
                   <el-button type="primary" @click="login"  class="btns_log">登录</el-button>
                   <el-button type="primary" @click="register"  class="btns_reg">注册</el-button>
               </el-form-item>
           </el-form>
       </div>
   </div>
</template>

<script>
    export default {
        name: 'Navigation',
        data() {
            return {
                account:'',
                password:''
            }
        },
        methods:{
            login(){
                var that = this;
                if(that.account == '',that.password == ''){
                    this.$message('账号和密码不能为空');
                }else {
                    if(that.account == '',that.password == ''){
                        this.$message('账号和密码不能为空');
                    }else {
                        that.$load(1,"登录中")
                        this.$http.post('/user/login', 'account=' + that.account + '&password=' + that.password)
                            .then(function (response) {
                                that.$load(0)
                                if(response.data.code == 0){

                                    window.localStorage.setItem("user",JSON.stringify(response.data.data))
                                    that.$router.push("/home")
                                    that.$message.success(response.data.message)
                                }else {
                                    that.$message.error(response.data.message)
                                }
                            })
                            .catch(function (error) {
                                that.$load(0)
                                that.$message,error("登录失败")
                        });
                    }
                }
            },
            register(){
                var that = this;
                if(that.account == '',that.password == ''){
                    this.$message('账号和密码不能为空');
                }else {
                    if(that.account == '',that.password == ''){
                        this.$message('账号和密码不能为空');
                    }else {
                        that.$load(1,"注册中")
                        this.$http.post('/user/register', 'account=' + that.account + '&password=' + that.password)
                            .then(function (response) {
                                that.$load(0)
                                if(response.data.code == 0){
                                    that.login()
                                    that.$message.success(response.data.message)
                                }else {
                                    that.$message.error(response.data.message)
                                }
                            })
                            .catch(function (error) {
                                that.$load(0)
                                that.$message,error("登录失败")
                            });
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>

    .box{
        background-color: #2b4b6b;
        height: 100%;
        width: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #ffffff;
        border-radius: 3px;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .avatar_box {
            height: 100px;
            width: 100px;
            border: 1px solid #dddddd;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #dddddd;
            position: relative;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #ffffff;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eeeeee;
            }
        }
    }

    .login_from {
        position: absolute;
        bottom: 20px;
        width: 100%;
        padding: 0 50px;
        box-sizing: border-box;
    }

    .btns {
        margin-top: 30px;
        margin-left: 15%;

        .btns_reg {
            width: 100px;
            margin-left: 60px;
        }

        .btns_log {
            width: 100px;
        }
    }

</style>
