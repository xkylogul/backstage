<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../assets/img/heima.png" alt="">
        <span class="font-class">电商后台管理系统</span>
      </div>
      <el-button type="info" @click="quit">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
               <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-thumb',
        '101': 'el-icon-shopping-cart-1',
        '102': 'el-icon-data-line',
        '145': 'el-icon-coin'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.token = window.sessionStorage.getItem('token')
  },
  methods: {
    quit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      // const AUTH_TOKEN = window.localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN // 设置请求头token权限
      const res = await this.$http.get('menus')
      this.menulist = res.data.data
      if (res.data.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (token) {
      window.sessionStorage.setItem('token', token)
      this.token = token
    }
  }
}
</script>
<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  }
.el-header>div{
   display: flex;
   align-items: center;

}
 .font-class{
     display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
}
.el-aside{
  background-color:#333744;
}
.el-aside .el-menu{
  border-right:none
}
.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
