<template>
   <!--面包屑-->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item >首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{leavel1}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{leavel2}}</el-breadcrumb-item>
</el-breadcrumb>
</template>
<script>
export default {
  // eslint-disable-next-line vue/no-dupe-keys
  props: ['leavel1', 'leavel2']
  // props值是字符串数组
  // props中的值用法和data数据用法一样
  // props中的数据中的值来源于组件中传的值
  // props中的值也是组件的属性<child-a :msg="abc>
}
</script>
<style>

</style>
