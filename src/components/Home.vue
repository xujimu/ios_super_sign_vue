<template>
        <el-container style="height: 100%;" >
            <el-header>
                <div>
                    <img src="../assets/login.jpg" alt="">
                    <span>超级签名分发系统</span>
                </div>
            </el-header>

            <el-container style="background-color: white">
                <el-aside width="200px">
                    <el-menu
                            unique-opened
                            router
                            default-active="/Personal"
                            class="el-menu-vertical-demo"
                            background-color="#373d41"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>基本操作</span>
                            </template>
                                <el-menu-item index="/Personal">个人中心</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-goods"></i>
                                <span>超级签名</span>
                            </template>
                            <el-menu-item index="/AppAll">应用列表</el-menu-item>
                            <el-menu-item index="/UploadApp">上传应用</el-menu-item>
                            <el-menu-item index="/DownCode">下载密码</el-menu-item>
                            <el-menu-item index="/DownRecord">下载记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3" v-if="admin">
                            <template slot="title">
                                <i class="el-icon-s-order"></i>
                                <span>超级证书管理</span>
                            </template>
                            <el-menu-item index="/CertAll">证书列表</el-menu-item>
                            <el-menu-item index="/UploadCert">上传证书</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4" v-if="admin">
                            <template slot="title">
                                <i class="el-icon-s-custom"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="/UserAll">用户列表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6" >
                            <template slot="title">
                                <i class="el-icon-present"></i>
                                <span>免签封装</span>
                            </template>
                            <el-menu-item index="/startPack">开始打包</el-menu-item>
                            <el-menu-item index="/PackRecord">打包记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="7" >
                            <template slot="title">
                                <i class="el-icon-office-building"></i>
                                <span>企业签名</span>
                            </template>
                            <el-menu-item index="/UploadAppSign">开始签名</el-menu-item>
                            <el-menu-item index="/SignRecord">签名记录</el-menu-item>
                            <el-menu-item v-if="admin" index="/UploadEnterpriseCert">上传证书</el-menu-item>
                        </el-submenu>
                        <el-submenu index="8" >
                            <template slot="title">
                                <i class="el-icon-shopping-cart-full"></i>
                                <span>自助分发</span>
                            </template>
                            <el-menu-item index="/SoftwareDistribute">开始分发</el-menu-item>
                            <el-menu-item index="/DistributeRecord">应用列表</el-menu-item>
                            <el-menu-item index="/DistributeDownRecord">下载记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="9" v-if="admin">
                            <template slot="title">
                                <i class="el-icon-eleme"></i>
                                <span>域名管理</span>
                            </template>
                            <el-menu-item index="/DomainList">域名列表</el-menu-item>
                            <el-menu-item index="/AddDomain">添加域名</el-menu-item>
                            <el-menu-item index="/Setting">其他设置</el-menu-item>
                        </el-submenu>
                        <el-submenu index="10" v-if="admin">
                          <template slot="title">
                            <i class="el-icon-attract"></i>
                            <span>单点分发</span>
                          </template>
                          <el-menu-item index="/ShuoMing">使用说明</el-menu-item>
                          <el-menu-item index="/IosAppAll">应用列表</el-menu-item>
                          <el-menu-item index="/UploadIosApp">应用上传</el-menu-item>
                          <el-menu-item index="/IosCertAll">证书列表</el-menu-item>
                          <el-menu-item index="/UploadIosCert">证书上传</el-menu-item>
                          <el-menu-item index="/IosDownRecord">下载记录</el-menu-item>
                        </el-submenu>


                      <el-submenu index="11"  v-if="admin">
                        <template slot="title">
                          <i class="el-icon-film"></i>
                          <span>mdm证书</span>
                        </template>
                        <el-menu-item index="/MdmCert">证书列表</el-menu-item>
                        <el-menu-item index="/UploadMdmCert">证书上传</el-menu-item>
                      </el-submenu>

                      <el-submenu index="12">
                        <template slot="title">
                          <i class="el-icon-s-promotion"></i>
                          <span>超级签名MDM</span>
                        </template>
                        <el-menu-item index="/MdmAppAll">应用列表</el-menu-item>
                        <el-menu-item index="/MdmUploadApp">上传应用</el-menu-item>
                        <el-menu-item index="/MdmDownCode">下载密码</el-menu-item>
                        <el-menu-item index="/MdmSuperDownRecord">下载记录</el-menu-item>
                      </el-submenu>
                      <el-submenu index="13" >
                        <template slot="title">
                          <i class="el-icon-eleme"></i>
                          <span>企业签名MDM</span>
                        </template>
                        <el-menu-item index="/MdmDistributeRecord">应用列表</el-menu-item>
                        <el-menu-item index="/MdmSoftwareDistribute">上传应用</el-menu-item>
                        <el-menu-item index="/MdmSoftwareDownRecord">下载记录</el-menu-item>
                      </el-submenu>
                      <el-submenu index="14" v-if="admin">
                        <template slot="title">
                          <i class="el-icon-setting"></i>
                          <span>系统设置</span>
                        </template>
                        <el-menu-item index="/SettingKouliang">常规设置</el-menu-item>
                      </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
</template>

<script>
    export default {
        name: "Home",
        created() {
            const user = JSON.parse(window.localStorage.getItem('user'))
            console.log(user)
            this.account = user.account
            if(user.type == 0){
                this.admin = false
            }else {
                this.admin = true
            }
        },
        data(){
            return{
                admin:false
            }
        }
    }
</script>

<style lang="less" scoped>
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #dddddd;
    font-size: 20px;
    > div{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
            margin-left: 15px;
        }
        img{
            height: 100%;
        }
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
        border-right: none;
    }
}
.el-man{
    background-color: #eaedf1;
}
</style>
