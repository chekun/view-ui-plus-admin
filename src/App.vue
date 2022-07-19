<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  .ivu-table th, .ivu-table td {
    height: 40px;
    text-align: center;
  }
  .ivu-table-cell {
    padding:0;
    text-align: center;
  }
}

.action-bar {
  margin: 0 0 10px 0;
}
.input-name {
  padding-left: 10px;
}
.action-bar {
  margin-bottom: 0.4rem;
  .search-item {
    display: flex;
    align-items: center;
    .input-name {
      width: auto;
    }
    .ivu-input-wrapper {
      flex: 2;
    }
  }
}
</style>
