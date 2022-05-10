<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;"
                :header-cell-style="headClass"
                :cell-style="rowClass">
            <el-table-column
                prop="uuid"
                label="uuid" style="text-align: center">
            </el-table-column>
          <el-table-column
              prop="account"
              label="账号" style="text-align: center">
          </el-table-column>
            <el-table-column
                    prop="iosId"
                    label="iosId" style="text-align: center">
            </el-table-column>
            <el-table-column
                prop="certId"
                label="证书ID" style="text-align: center">
            </el-table-column>
            <el-table-column
                    prop="appName"
                    label="应用名称" >
            </el-table-column>
            <el-table-column
                    prop="pageName"
                    label="包名">
            </el-table-column>
            <el-table-column
                    prop="appVersion"
                    label="版本">
            </el-table-column>

          <el-table-column
              prop="status"
              label="状态">
          </el-table-column>

            <el-table-column
                    prop="downUrl"
                    label="plist地址">
                <template slot-scope="scope">
                    <el-button @click="copy(scope.row.downUrl)" type="text" size="small">复制地址</el-button>
                </template>
            </el-table-column>




        </el-table>

        <el-pagination
                style="text-align: center;margin-top: 20px"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[5, 40, 80, 100]"
                :page-size="count"
                layout="total, sizes, prev, pager, next, jumper"
                :page-count="pages"
                :total="total">
        </el-pagination>

        <el-dialog
                :visible.sync="dialogVisible"
                center
                width="30%">
            <span slot="footer" class="dialog-footer">
                <el-upload
                        :data="id"
                        :on-success="success"
                        class="uploadHead"
                        with-credentials
                        :headers="this.$getHeader()"
                        drag
                        :action="this.$http.defaults.baseURL + '/distribute/uploadApk'"
                        name="apk"
                        accept=".apk"
                        :multiple="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传apk文件，且不超过2048MB</div>
            </el-upload>
           </span>
        </el-dialog>

      <el-dialog
          :visible.sync="dialogVisibleIpa"
          center
          width="30%">
            <span slot="footer" class="dialog-footer">
                <el-upload
                    :data="id"
                    :on-success="success"
                    class="uploadHead"
                    with-credentials
                    :headers="this.$getHeader()"
                    drag
                    :action="this.$http.defaults.baseURL + '/distribute/uploadIpa'"
                    name="ipa"
                    accept=".ipa"
                    :multiple="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传ipa文件，且不超过2048MB</div>
            </el-upload>
           </span>
      </el-dialog>


        <el-dialog
                title="简介编辑"
                :visible.sync="dialogVisible2"
                center
                width="30%">
            <el-input
                    maxlength="100"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入简介,100字以内"
                    v-model="introduce">
            </el-input>
            <p></p>
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="updateIntroducePost()">确 定</el-button>
        </el-dialog>

        <el-dialog
                title="购买地址"
                :visible.sync="dialogVisible4"
                center
                width="30%">
            <el-input
                    maxlength="1000"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入购买地址"
                    v-model="buyDownCodeUrl">
            </el-input>
            <p></p>
            <el-button @click="dialogVisible4 = false">取 消</el-button>
            <el-button type="primary" @click="updateDownCodeUrlPost()">确 定</el-button>
        </el-dialog>


        <el-dialog
                title="轮播图"
                :visible.sync="dialogVisible3"
                center
                width="30%">
            <el-upload
                    :before-remove="function() {
                      this.$message.error('选择了,就不可以移除哦!')
                      return false
                    }"
                    accept=".jpg,.png"
                    :headers="this.$getHeader()"
                    :on-change="uploadImagesChange"
                    class="upload-demo"
                    :action="this.$http.defaults.baseURL + '/distribute/uploadImg'"
                    :file-list="fileList"
                    limit="4"
                    list-type="picture"
                    :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" v-on:click.stop = "uploadImagesPost()">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

        </el-dialog>

    </div>
</template>

<script>

    export default {
        created() {
            const user = JSON.parse(window.localStorage.getItem('user'))
            console.log(user)
            this.account = user.account
            this.type = user.type
            this.update(this.page,this.count);
            console.log(this.type)
        },
        methods: {
            updateDomain(id){

                var that = this
                this.$http.post('/IosSignSoftwareDistribute/pack/queryAll')
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                            that.$message.success(response.data.message)
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message.error("修改失败")
                    });

            },
            updateDownCodeUrlPost(){
                this.dialogVisible4 = false
                var that = this
                this.$http.post('/distribute/updateBuyDownCodeUrl?id=' + that.id3 + "&url=" + that.buyDownCodeUrl)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                            that.$message.success(response.data.message)
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message.error("修改失败")
                    });
            },
            //修改购买地址
            updateDownCodeUrl(id,downCodeUrl){
                this.dialogVisible4 = true
                console.log(downCodeUrl)
                this.buyDownCodeUrl = downCodeUrl
                this.id3 = id
            },
            //开启下载码
            use(scope){
                this.dialogVisible2 = false
                console.log(scope.row.autoPageName)
                var that = this
                if(scope.row.autoPageName === true){
                    scope.row.autoPageName = 1
                }else {
                    scope.row.autoPageName = 0
                }
                this.$http.post('/IosSignSoftwareDistribute/updateIpaAutoPageName?iosId=' + scope.row.iosId + "&status=" + scope.row.autoPageName)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);

                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message.error("操作失败")
                    });
            },
            //管理员不能修改其他人的应用
            admin(account,zhi,mess){
                if(account === this.account){
                    if( zhi=== mess){
                        return  true
                    }else {
                        return false
                    }
                }else {
                    return false
                }
            },
            handleSizeChange(val) {
                console.log("每页数量" + val)
                this.count = val
                this.update(this.page,this.count);
            },
            handleCurrentChange(val) {
                this.page = val
                this.update(this.page,this.count);
                console.log(`当前页: ${val}`);
            },
            //修改简介
            updateIntroduce(id,introduce){
                this.dialogVisible2 = true
                console.log(introduce)
                this.introduce = introduce
                this.id2 = id
            },
            updateIntroducePost(){
                this.dialogVisible2 = false
                var that = this
                this.$http.post('/distribute/updateIntroduce?id=' + that.id2 + "&introduce=" + that.introduce)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                            that.$message.success(response.data.message)
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message.error("修改失败")
                    });
            },
            //上传轮播图
            uploadImages(id){
                this.fileList = [];
                this.dialogVisible3 = true
                this.id2 = id
                this.img = []
            },
            uploadImagesPost(){
                if(this.img.length !=4){
                    this.$message.error("需要四张图哦!")
                }else {
                    this.dialogVisible3 = false
                    let fordata = new FormData;
                    fordata.append("img1",this.img[0])
                    fordata.append("img2",this.img[1])
                    fordata.append("img3",this.img[2])
                    fordata.append("img4",this.img[3])
                    fordata.append("id",this.id2)
                    var that = this
                    this.$http.post('/distribute/uploadImg',fordata)
                        .then(function (response) {
                            that.$load(0)
                            if(response.data.code == 0){
                                that.update(that.page,that.count);
                                that.$message.success(response.data.message)
                            }else {
                                that.$message.error(response.data.message)
                            }
                        })
                        .catch(function (error) {
                            that.$load(0)
                            that.$message.error("上传失败")
                        });
                }
            },
            uploadImagesChange(e){
                this.img.push(e.raw)
                console.log(this.img)
            },
            handleClick(row) {
                var that = this
                this.$http.post('/distribute/deleIpa?id=' + row)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            that.update(that.page,that.count);
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message,error("删除失败")
                    });
            },
            update(pageNum,pageSize){
                var that = this
                that.$load(1,"查询中")
                this.$http.get('/IosSignSoftwareDistribute/pack/queryAll?pageNum=' + pageNum + '&pageSize=' + pageSize)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            console.log(response.data.data)
                            that.tableData = []
                            for (let res in response.data.data){


                                that.tableData = response.data.data
                            }
                            that.pages = response.data.pages
                            that.total = response.data.total
                        }else {
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(function (error) {
                        that.$load(0)
                        that.$message,error("查询失败")
                    });
            },
            copy(url){
                var oInput = document.createElement('input'); //创建一个隐藏input（重要！）
                oInput.value = url;    //赋值
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display = 'none';
                this.$message.success('复制成功');
            },
            headClass() { //表头居中显示
                return "text-align:center"
            },
            rowClass() { //表格数据居中显示
                return "text-align:center"
            },
            dialogVisibleOpen(id){
                this.id.id = id
                this.dialogVisible = true
            },
          dialogVisibleOpenIpa(id){
            this.id.id = id
            this.dialogVisibleIpa = true
          },
            success(e){
                if (e.code === 4){
                    this.$message.error(e.message)
                    window.localStorage.removeItem("user")
                    this.$router.push("/login")
                }else if(e.code === 0){
                    this.$message.success(e.message)
                    this.dialogVisible = false
                    this.dialogVisibleIpa = false
                    this.update(this.page,this.count)
                }else {
                    this.$message.error(e.message)
                }
            }
        },
        data() {
            return {
                tableData: [],
                dialogVisibleIpa:false,
                dialogVisible:false,
                id:{id:''},
                dialogVisible2:false,
                dialogVisible3:false,
                dialogVisible4:false,
                introduce:'',
                id2:'',
                id3:'',
                buyDownCodeUrl:'',
                fileList: [],
                img:[],
                count: 5,
                page: 1,
                pages: 0,
                total: 0,
                account:'',
                type:''
            }
        }
    }
</script>
<style lang="less" >
    .el-pagination{
        .el-input__inner{
            height: 30px;
        }
    }
</style>
