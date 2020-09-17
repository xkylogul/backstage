<template>
<el-card>
    <!--面包屑-->
    <my-bread leavel1="权限管理" leavel2="角色管理"></my-bread>
    <el-button class="btn-info" type="info">添加</el-button>
    <!--表格-->
 <el-table
    :data="rolesList"
    stripe
    style="width: 100%">
     <el-table-column
      type="expand"
      width="180">
      <template slot-scope="scope">
          <el-row v-for="(item,i) in scope.row.children" :key="i"><!--一级权限-->
              <el-col :span="4">
                  <!--传角色id和权限id-->
                  <el-tag @close="deleteRoles(scope.row,item.id)" closable type="success">{{item.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                  <el-row closable v-for="(item1,i) in item.children" :key="i"><!--二级权限-->
                      <el-col :span="4">
                      <el-tag @close="deleteRoles(scope.row,item1.id)" closable type="danger">{{item1.authName}}</el-tag>
                         <i class="el-icon-arrow-right"></i>
                      </el-col>
                      <el-col :span="20">
                          <el-tag @close="deleteRoles(scope.row,item2.id)" closable type="warning" v-for="(item2,i) in item1.children" :key="i">{{item2.authName}}</el-tag><!--三级权限-->
                             <i class="el-icon-arrow-right"></i>
                      </el-col>
                  </el-row>
              </el-col>
          </el-row>
          <!--无权限提示-->
          <span v-if="scope.row.children.length===0">未分配权限</span>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      label="#"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="角色描述"
      width="180">
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
</el-card>
</template>
<script>
export default {
  data () {
    return {
      rolesList: []
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async deleteRoles (role, rightId) {
      // 删除权限
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      console.log(res)
      // this.getRolesList()// 更新视图
      role.children = res.data.data
    },
    async getRolesList () {
      const res = await this.$http.get(`roles`)
      console.log(res)
      this.rolesList = res.data.data
    }
  }
}
</script>
<style>
.btn-info{
    margin-top:20px;
}
</style>
