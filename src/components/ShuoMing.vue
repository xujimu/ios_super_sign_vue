<template>
    <div>
        <!--        居中盒子-->
        <div class="center_box">
            <el-card class="box-card">
                <div class="text item">
                    下载过超级签的每个设备都会有一本对应证书  <br>  <br>  可以在下载记录中选择证书下载  <br>  <br>  这本证书可以对这台设备签无数个应用<br><br>
                  当然 你也可以使用使用单点分发进行应用多开  <br> <br>  只需要开启应用中的自动更换包名即可 <br>  <br> 这样每次下载的应用都是一个新应用不会覆盖原应用
                </div>
            </el-card>

        </div>

    </div>
</template>

<script>
    var that;
    export default {
        created () {

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
