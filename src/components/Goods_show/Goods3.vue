<template>
  <div class="goods3" @click="$goods_toast(info.id)">
    <div class="img">
      <img :src="info.tab_image_url">
      <div class="mask" v-if="info.store_amount <= 0">补货中</div>
    </div>
    <div class="name">
      <div class="ellipsis">{{info.product_name}}</div>
      <div class="norm">{{info.specifications}}</div>
    </div>
    <div class="footer">
      <div class="price">￥{{info.wap_price}}/{{info.unit}}</div>
      <div class="att" v-if="info.support_virtual === '2'">积分</div>
      <div class="iconfont iconaddcart" @click.stop="add_car"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'info'
    ],
    methods:{
      add_car(){
        let info = this.info
        if(info.store_amount <= 0){
          this.$myToast.show({text:'无库存，补货中',time:2000})
          return
        }
        if(localStorage.isLogin){
          this.$myLoading.show('正在添加...')
          let callback = ()=>{
            this.$myLoading.hide()
            this.$myToast.show({text:'添加成功',icon: 'success'})
          }
          this.$store.dispatch('addCar',{queryData:{id:info.id, qty:1, price:info.wap_price,custId:localStorage.app_uid},callback})
        }else {
          this.$myToast.show({text:'您还没有登录哦',time:2000})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods3{
    width: 280/@rem;
    height: 400/@rem;
    box-sizing: border-box;
    background: white;
    border-radius: 10/@rem;
    padding: 10/@rem;
    overflow: hidden;
    .img{
      position: relative;
      width: 260/@rem;
      height: 260/@rem;
      img{
        width: 100%;
      }
      .mask{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 80/@rem;
        line-height: 80/@rem;
        text-align: center;
        background: rgba(0,0,0,0.5);
        color: white;
      }
    }
    .name{
      text-align: center;
      .ellipsis{
        font-size: 0.9rem;
        line-height: 1.5rem;
      }
      .norm{
        font-size: 0.8rem;
      }
    }
    .footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price{
        color: @c2;
      }
      .att{
        color: white;
        background: @c2;
        font-size: 0.6rem;
        height: 25/@rem;
        line-height: 25/@rem;
        border-radius: 3/@rem;
        padding: 0 3/@rem;
      }
      .iconaddcart{
        font-size: 1.8rem;
      }
    }
  }
</style>
