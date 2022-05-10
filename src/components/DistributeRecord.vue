<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%;"
                :header-cell-style="headClass"
                :cell-style="rowClass">
            <el-table-column
                    prop="id"
                    label="id" style="text-align: center">
            </el-table-column>

          <el-table-column
              prop="icon"
              label="图标" style="text-align: center">
            <template slot-scope="scope">
              <el-image :src="scope.row.icon" style="width: 50px;height: 50px"></el-image>
            </template>
          </el-table-column>
          <el-table-column
              prop="dayCount"
              label="今日下载" >
          </el-table-column>
          <el-table-column
              prop="lastDayCount"
              label="昨日下载" >
          </el-table-column>
          <el-table-column
              prop="sumCount"
              label="总下载" >
          </el-table-column>
            <el-table-column
                    prop="account"
                    label="所属用户" >
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
                    prop="version"
                    label="版本">
            </el-table-column>

          <el-table-column
              prop="language"
              label="语言">
            <template slot-scope="scope">
              <el-button type="text"  v-if="scope.row.account==account?true:false" @click="updateLanguage(scope.row.uuid,scope.row.language)" >编辑</el-button>
            </template>
          </el-table-column>


          <el-table-column
                    prop="apk"
                    label="安卓">
                <template slot-scope="scope">
                    <el-button  type="text" v-if="scope.row.account==account?true:false" @click="dialogVisibleOpen(scope.row.uuid)">{{scope.row.apk == null ? "上传" : "更新"}}</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    prop="ipa"
                    label="苹果">
                <template slot-scope="scope">
                    <el-button   type="text" v-if="scope.row.account==account?true:false" @click="dialogVisibleOpenIos(scope.row.uuid)">更新</el-button>
                </template>
            </el-table-column>



<!--            <el-table-column-->
<!--                    prop="introduce"-->
<!--                    label="简介">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button type="text"  v-if="scope.row.account==account?true:false" @click="updateIntroduce(scope.row.uuid,scope.row.introduce)" >编辑</el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->



            <el-table-column
                    prop="url"
                    label="分发地址">
                <template slot-scope="scope">
                    <el-button @click="copy(scope.row.url)" type="text" size="small">复制地址</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    label="操作" >
                <template slot-scope="scope">
                    <el-button  @click="handleClick(scope.row.uuid)" type="text" size="small">删除</el-button>
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
          title="语言编辑"
          :visible.sync="dialogVisible5"
          center
          width="30%">
        <el-input
            maxlength="100"
            type="textarea"
            :rows="3"
            placeholder="请输入语言"
            v-model="language">
        </el-input>
        <p></p>
        <el-button @click="dialogVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="updateLanguagePost()">确 定</el-button>
      </el-dialog>

        <el-dialog

                :visible.sync="dialogVisible"
                center
                width="30%">
            <span slot="footer" class="dialog-footer">
                <el-upload
                        :headers="this.$getHeader()"
                        :data="id"
                        :on-success="success"
                        class="uploadHead"
                        with-credentials
                        drag
                        :action="this.$http.defaults.baseURL + '/softwareDistribute/uploadApk'"
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
                :visible.sync="dialogVisibleIos"
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
                        :action="this.$http.defaults.baseURL + '/softwareDistribute/updateIpa'"
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
          //修改语言
          updateLanguage(uuid,language){
            this.dialogVisible5 = true
            this.language = language
            this.id2 = uuid
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
            updateIntroduce(uuid,introduce){
                this.dialogVisible2 = true
                console.log(introduce)
                this.introduce = introduce
                this.id2 = uuid
            },
            updateIntroducePost(){
                this.dialogVisible2 = false
                var that = this
                this.$http.post('/softwareDistribute/uploadIntroduce?introduce=' + that.introduce + "&uuid=" + that.id2)
                    .then(function (response) {updateLanguagePost
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

            uploadImagesChange(e){
                this.img.push(e.raw)
                console.log(this.img)
            },
            handleClick(row) {
                var that = this
                this.$http.post('/softwareDistribute/delete?uuid=' + row)
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
                this.$http.get('/softwareDistribute/queryAll?pageNum=' + pageNum + '&pageSize=' + pageSize)
                    .then(function (response) {
                        that.$load(0)
                        if(response.data.code == 0){
                            console.log(response.data.data)
                            that.tableData = []
                            for (let res in response.data.data){
                                var temp = response.data.data[res]

                                if(temp.downCode == 0){
                                    temp.downCode = false
                                }else {
                                    temp.downCode = true
                                }
                                that.tableData.push(temp)
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
          updateLanguagePost(){
            this.dialogVisible5 = false
            var that = this
            this.$http.post('/softwareDistribute/updateLanguage?uuid=' + that.id2 + "&language=" + that.language)
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
            dialogVisibleOpen(uuid){
                this.id.uuid = uuid
                this.dialogVisible = true
            },
            dialogVisibleOpenIos(uuid){
                this.id.uuid = uuid
                this.dialogVisibleIos = true
            },
            success(e){
                if (e.code === 4){
                    this.$message.error(e.message)
                    window.localStorage.removeItem("user")
                    this.$router.push("/login")
                }else if(e.code === 0){
                    this.$message.success(e.message)
                    this.dialogVisible = false
                   this.dialogVisibleIos = false
                    this.update(this.page,this.count)
                }else {
                    this.$message.error(e.message)
                }
                this.dialogVisibleIos = false
                this.dialogVisible = false
            }
        },
        data() {
            return {
                language: '',
                dialogVisible5: false,
                tableData: [],
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
                type:'',
                dialogVisibleIos:false
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
