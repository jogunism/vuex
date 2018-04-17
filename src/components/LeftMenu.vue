<template>
  <aside class="main-sidebar">

    <section class="sidebar">
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <li class="active treeview">
          <a href="/"><i class="fa fa-dashboard"></i> <span>DashBoard</span></a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-shopping-cart"></i> <span>ZARA <small>- seluv</small></span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/#/seluv/zara/category"><i class="fa fa-bars"></i> 카테고리</a></li>
            <li><a href="/#/seluv/zara/products"><i class="fa fa-circle-o"></i> 상품현황</a></li>
          </ul>
        </li>
        <!-- <li class="treeview">
          <a href="#">
            <i class="fa fa-th"></i> <span>판매관리 <small>- SMS</small></span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i> SMS#1</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> SMS#2</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-edit"></i> <span>주문관리 <small>- OMS</small></span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i> OMS#1</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> OMS#2</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> OMS#3</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-laptop"></i> <span>물류관리 <small>- WMS</small></span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i> WMS#1</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> WMS#2</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> WMS#3</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-share"></i> <span>배송관리 <small>- DMS</small></span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i> DMS#1</a></li>
            <li><a href="#"><i class="fa fa-circle-o"></i> DMS#2</a></li>
          </ul>
        </li> -->
        <li class="header">OPTION</li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-desktop"></i> <span>모니터링 <small>- Monitoring</small></span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/#/monitoring/dokhan"><i class="fa fa-circle-o text-red"></i> 독일직구(독한)</a></li>
            <li><a href="/#/monitoring/doichi"><i class="fa fa-circle-o"></i> 도이치몰</a></li>
            <li><a href="/#/monitoring/hieuro"><i class="fa fa-circle-o"></i> 하이유로</a></li>
            <li><a href="/#/monitoring/euromoms"><i class="fa fa-circle-o"></i> 유로맘스</a></li>
            <li><a href="/#/monitoring/euroexpress"><i class="fa fa-circle-o"></i> 유로익스프레스</a></li>
          </ul>
        </li>
        <li>
          <a href="/#/comparing">
            <i class="fa fa-exchange"></i> <span>가격비교 <small>- Comparing</small></span>
          </a>
        </li>
        <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
        <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
        <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
      </ul>
    </section>

  </aside>
</template>

<script>
export default {
  name: 'left'
}
</script>

<style lang="scss" scoped>
  // @import '../assets/scss/DashBoard.scss'
</style>
