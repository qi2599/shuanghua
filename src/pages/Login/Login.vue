<template>
  <div id="login-page" @touchstart.stop>
    <Head :text="'用户登录'"></Head>
    <div class='log_reg'>
      <span :class="{active: toggle_cpn}" @click="toggle_cpn=true">登 录</span>
      <span :class="{active: !toggle_cpn}" @click="toggle_cpn=false">注 册</span>
    </div>
    <component :is="toggle_cpn? 'login_cpn':'register'"></component>
  </div>
</template>

<script>
  import login_cpn from '../../components/login/login_cpn'
  import register from '../../components/login/register'
  import Head from '../../components/Head/LoaginHead'
  export default {
    data(){
      return {
        toggle_cpn: true
      }
    },
    components: {
      login_cpn,
      register,
      Head
    }
  }
</script>

<style lang="less" scoped>
  #login-page{
    .back{
      position: absolute;
      top: 40/@rem;
      left: 40/@rem;
      width: 70/@rem;
      height: 70/@rem;
      line-height: 70/@rem;
      font-size: 1.5rem;
      text-align: center;
      color: white;
    }
    .logo{
      text-align: center;
    }
    .bg_img{
      width: 100%;
      height: 470/@rem;
      position: absolute;
      top: 0;
      z-index: -1;
    }
    .img{
      height: 469/@rem;
    }
    .logo{
      background: rgba(255, 255, 255, 0.3);
      width: 280/@rem;
      border-radius: 10/@rem;
      position: absolute;
      top: 260/@rem;
      left: 225/@rem;
    }
    .logo_img{
      width: 20%;
      height: 150/@rem;
      position: absolute;
      left: 40%;
      top: 80/@rem;
    }
    .logo span:first-child{
      display: block;
      font-size: 1.2rem;
      color: white;
      line-height: 2rem;
      margin-bottom: -0.3rem;
    }
    .logo span:last-child{
      display: block;
      font-size: 0.8rem;
      line-height: 1.5rem;
      color:white;
    }
  
    .log_reg{
      width: 80%;
      background: white;
      margin: 60/@rem auto;
      border-radius: 2rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0px 0px 60/@rem #c9c9c9;
      font-size: 0;
    }
    .log_reg span{
      display: inline-block;
      width: 50%;
      text-align: center;
      line-height: 2.5rem;
      color: @c1;
      font-size: 1rem;
    }
    .log_reg .active{
      background-color: @c1;
      color: white;
    }
  }
</style>
