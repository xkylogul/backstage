<template>
<el-card class="box-card">
    <!--面包屑-->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<!--搜索框-->
<div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList" class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
  </el-input>
    <el-button type="success" @click="showAddUserInfo()">添加用户</el-button>
</div>
<!--表格-->
 <el-table
    :data="userList"
    stripe
    style="width: 100%">
    <el-table-column
     type="index"
      label="#"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      label="创建日期">
      <template slot-scope="userList">{{userList.row.create_time | fmtdate}}</template><!--userList.row是数组中的每个对象,slot-scope自动查找上一级数据-->
    </el-table-column>
    <el-table-column
      label="用户状态"
      width="180">
      <template slot-scope="scope"><el-switch
  v-model="scope.row.mg_state"
  @change="changeState(scope.row)"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch></template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editUser(scope.row)" circle></el-button>
        <el-button size="mini" type="success" icon="el-icon-check" @click="allotUser(scope.row)" circle></el-button>
         <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.row.id)" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!--添加用户对话框-->
  <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
 <!--添加用户编辑框-->
 <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input disabled  v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
     <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </div>
</el-dialog>
<!--分配角色框-->
<!--下拉框：如果下拉框select绑定的数据的值和option的value值一样，此时显示的该option的label值
option分为两类，请选择（-1）和v-for便利option
data提供的el-select的v-model所绑定的数据currentallot=-1
el-select和el-option：当改变label时该label显示-->
<el-dialog title="分配角色" :visible.sync="dialogFormVisibleAllot">
  <el-form :model="form">
    <el-form-item label="用户名" label-width=100px>
    {{currUsername}}
    </el-form-item>
    <el-form-item label="角色" label-width=100px>
      <el-select v-model="currentallot">
        <el-option label="请选择" value="-1"></el-option>
        <el-option v-for="(item,index) in roles" :label="item.roleName" :key="index" :value="index"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotUserInfo()">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>
<script>
export default{
  data () {
    return {
    // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userList: [],
      total: -1,
      currentallot: 0, // 分配角色
      currUserId: '',
      currRoleId: 1,
      currUsername: '',
      // currentPage4: 4 // 设置当前多少页
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleAllot: false,
      roles: [],
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
        /*  region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '' */
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    searchUser () {
      // console.log('aaa')
      this.getUserList()
    },
    async changeState (userId) {
      const res = await this.$http.put(`users/${userId.id}/state/${userId.mg_state}`)
      console.log(res)
    },
    async getUserList () {
      // const AUTH_TOKEN = window.localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN // 设置请求头token权限
      // const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const res = await this.$http.get('users', {
        params: this.queryInfo
      })
      console.log(res)
      const {meta: {status, msg}, data: {users, total}} = res.data
      if (status === 200) {
        this.userList = users
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    handleSizeChange (val) {
      // 每页显示条数时触发
      this.queryInfo.pagesize = val
      this.getUserList()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // 当每页改变时触发
      // console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    showAddUserInfo () {
      this.form = {}
      this.dialogFormVisible = true
    },
    editUser (user) {
      this.form = user // 传递数据
      // console.log(user)
      this.dialogFormVisibleEdit = true
      // 获取表单单个数据scope.row
    },
    async allotUser (user) {
      this.dialogFormVisibleAllot = true
      this.currUsername = user.username
      // 给currUserId赋值
      this.currUserId = user.id
      // 获取所有角色
      const res1 = await this.$http.get(`roles`)
      console.log(res1)
      this.roles = res1.data.data
      // 获取当前用户角色id->rid
      const res = await this.$http.get(`users/${user.id}`)
      console.log(res)
      this.currRoleId = res.data.data.rid
      // console.log(this.currRoleId)
    },
    async allotUserInfo () {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {rid: this.currRoleId})
      console.log(res)
      console.log(this.currRoleId)
      this.dialogFormVisibleAllot = false
    },
    deleteUser (userId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${userId}`)
        console.log(res)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.getUserList() // 更新视图
          this.pagenum = 1 // 回到第一页
          this.$message({
            type: 'success',
            message: msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async addUser () {
    //  const AUTH_TOKEN = window.localStorage.getItem('token')
    //  this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN // 设置请求头token权限
      this.dialogFormVisible = false
      const res = await this.$http.post('users', this.form)
      // console.log(res)
      const {meta: {status, msg}} = res.data
      if (status === 201) {
        this.$message.success(msg) // 提示成功
        this.getUserList() // 更新视图
        this.form = {} // 清空文本框
      } else {
        this.$message.warning(msg)
      }
    },
    async editUserInfo (user) {
      this.dialogFormVisibleEdit = false
      console.log(user)
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      console.log(res)
    }
  }
}
</script>
<style scoped>
.input-with-select{
    width:400px;
}
</style>
