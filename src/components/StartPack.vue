<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"   label-width="100px" class="demo-ruleForm">
            <el-form-item label="应用名称" prop="appName">
                <el-input  v-model="ruleForm.appName"></el-input>
            </el-form-item>

            <el-form-item label="打包网址" prop="url">
                <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>

            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="机构" prop="organization">
                <el-input v-model="ruleForm.organization"></el-input>
            </el-form-item>

            <el-form-item label="描述信息" prop="describe">
                <el-input v-model="ruleForm.describe"></el-input>
            </el-form-item>

            <el-form-item label="同意信息" prop="consentMessage">
                <el-input v-model="ruleForm.consentMessage"></el-input>
            </el-form-item>

            <el-form-item label="应用图标" prop="icon">
                <input class="file"  name="fileIocn" type="file" accept="image/png,image/jpeg" @change="getFileIcon($event)"/>
            </el-form-item>

            <el-form-item label="启动图" prop="startIcon">
                <input class="file"  name="fileStartIcon" type="file" accept="image/png,image/jpeg" @change="getFileStartIcon($event)"/>
            </el-form-item>

            <el-form-item label="可移除" prop="isRemove">
                <el-radio-group v-model="ruleForm.isRemove">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="动态网址" prop="isRemove">
                <el-radio-group v-model="ruleForm.isVariable">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="包名" prop="pageName">
                <el-input placeholder="必须为xxx.xxx.xx,一般为域名倒叙"  v-model="ruleForm.pageName"></el-input>
            </el-form-item>

            <el-form-item label="版本" prop="version">
                <el-input v-model="ruleForm.version" placeholder="必须是数字如:1.1"></el-input>
            </el-form-item>

            <el-form-item label="根证书"  prop="rootCert">
                <el-input :rows="5" placeholder="不懂请留空" type="textarea" v-model="ruleForm.rootCert"></el-input>
            </el-form-item>

            <el-form-item label="服务器证书" prop="serverCert">
                <el-input :rows="5"  placeholder="不懂请留空" type="textarea"  v-model="ruleForm.serverCert"></el-input>
            </el-form-item>

            <el-form-item label="秘钥"  prop="keyCert">
                <el-input :rows="5" placeholder="不懂请留空"  type="textarea"  v-model="ruleForm.keyCert"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'

    var iconIs = null
    export default {
        created () {

        },
        data () {
            var validatePass = (rule, value, callback) => {
                if (iconIs == null) {
                    callback(new Error())
                } else {
                    callback()
                }
            }
            return {
                ruleForm: {
                    account: '',
                    appName: '超级签名分发系统',
                    url: axios.defaults.baseURL,
                    name: '',
                    organization: '',
                    describe: '',
                    consentMessage: '',
                    icon: '',
                    startIcon: '',
                    isRemove: '1',
                    isVariable:"0",
                    pageName: '',
                    version: '',
                    isXfive: '1',
                    rootCert: '',
                    serverCert: '',
                    keyCert: ''
                },
                fullscreenLoading: false,
                rules: {
                    appName: [
                        { required: true, message: '请输入应用名称', trigger: 'blur' }
                    ],
                    url:[
                        { required: true, message: '请输入打包网址', trigger: 'blur' }
                    ],
                    icon: [
                        { validator: validatePass, message: '请选择应用图标', trigger: 'blur' }
                    ],
                    pageName: [
                        { required: true, message: '请填写包名', trigger: 'blur' }
                    ],
                    version: [
                        { required: true, message: '请填写版本', trigger: 'blur' }
                    ],
                    pageName: [
                        { required: true, message: '包名不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm (formName) {
                const that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        const formData = new FormData()
                        console.log('niha1')
                        console.log(that.ruleForm.icon)

                        formData.append('icon', that.ruleForm.icon)
                        formData.append('startIcon', that.ruleForm.startIcon)
                        const icon = that.ruleForm.icon
                        const startIcon = that.ruleForm.startIcon
                        that.ruleForm.icon = ''
                        that.ruleForm.startIcon = ''

                        formData.append('statusJson', JSON.stringify(that.ruleForm))
                        that.ruleForm.icon = icon
                        that.ruleForm.startIcon = startIcon

                        const config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                        this.$load(1, '提交中')
                        this.$http.post('/pack/submit', formData, config).then(function (response) {
                            if (response.status === 200) {
                                that.$message.success(response.data.message)
                            }
                            that.$load(0)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            getFileIcon (event) {
                this.ruleForm.icon = event.target.files[0]
                iconIs = '123'
            },
            getFileStartIcon (event) {
                this.ruleForm.startIcon = event.target.files[0]
            }
        }
    }
</script>

<style scoped>

</style>
