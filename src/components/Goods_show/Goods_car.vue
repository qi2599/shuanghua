<template>
	<div class="goods_car">
    <div class="check" @click="togole_chack">
      <CheckIcon type="plain" :value="info.isChack"></CheckIcon>
    </div>
    <div class="img" @click="$goods_toast(info.ref_product_id,true)">
      <img :src="info.tab_image_url">
      <div v-if="info.store_amount <= 0" class="mask">补货中</div>
    </div>
    <div class="goods_info">
      <div class="name" @click="$goods_toast(info.ref_product_id,true)">
        <div v-if="info.support_virtual === '2'" class="att">积分</div>
        <span class="ellipsis">{{info.product_name}}</span>
      </div>
      <div class="norm"><div>建议零售:{{info.retail_price}} 规格: {{info.specifications}}</div></div>
      <div class="footer">
        <div class="price">￥{{info.wap_price}}/{{info.unit}}</div>
        <div class="number_warp">
          <car_number :num="info.qty" :set_num="set_num" :add_cut="add_cut" ref="c_num"></car_number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { CheckIcon } from 'vux'
  import car_number from '../Car_number/Car_number'
  import {queryUpdata,queryCarNum} from '../../api'
  export default {
    data(){
      return {
        check_icon: true,
      }
    },
    props:{
      info: Object,
      chack_item: Function,
      set_total: Function,
    },
    methods:{
      togole_chack(){
        this.info.isChack=!this.info.isChack
        this.chack_item()
      },
      set_num(ev){
        ev = ev || event
        let oldQty = this.info.qty
        let num= +ev.target.value
        if(num<this.info.buy_lower_limit){
          this.$myToast.show({text:this.info.buy_lower_limit+'件起购',time:2000})
          num= ev.target.value =this.info.buy_lower_limit
        }else if(num>this.info.buy_upper_limit){
          this.$myToast.show({text:'限购'+this.info.buy_upper_limit+'件',time:2000})
          num= ev.target.value =this.info.buy_upper_limit
        }
        this.$store.commit('setCarNum', {unm: this.$store.state.cartsum - (oldQty - num)})
        this.info.qty=num
        this.set_total()
        this.info.qtyChanged=true
      },
      add_cut(type){
        let oldQty = this.info.qty
        if (type === 'cut'){
          this.info.qty--
        } else if(type === 'add'){
          this.info.qty++
        }
        if(this.info.qty<this.info.buy_lower_limit){
          this.$myToast.show({text:this.info.buy_lower_limit+'件起购',time:2000})
          this.info.qty = this.$refs.c_num.num =this.info.buy_lower_limit
        }else if(this.info.qty>this.info.buy_upper_limit){
          this.$myToast.show({text:'限购'+this.info.buy_upper_limit+'件',time:2000})
          this.info.qty = this.$refs.c_num.num = this.info.buy_upper_limit
        }
        this.$store.commit('setCarNum', {unm: this.$store.state.cartsum - (oldQty - this.info.qty)})
        this.set_total()
        this.info.qtyChanged=true
      }
    },
    components: {
      car_number,
      CheckIcon
    },
    beforeDestroy() {
      if(!this.info.qtyChanged) return
      if(this.$store.state.isToPay) return
      let info=this.info
      queryUpdata({id:info.ref_product_id, custId:localStorage.app_uid, qty:info.qty, sendQty:2}).then(()=>{
        queryCarNum({custId: localStorage.app_uid}).then(res => {
          if (res.result.cartsum){
            this.$store.commit('setCarNum', {unm: res.result.cartsum})
          }else {
            this.$store.commit('setCarNum', {unm: ''})
          }
        })
      })
    }
  }
</script>

<style lang="less" scoped>
  .goods_car{
    background: white;
    width: 94%;
    height: 200/@rem;
    margin: 10/@rem auto;
    padding: 10/@rem;
    border-radius: 10/@rem;
    display: flex;
    .check{
      width: 64.4/@rem;
      padding: 77/@rem 0;
    }
    .img{
      position: relative;
      height: 200/@rem;
      margin-right: 10/@rem;
      text-align: center;
      flex-grow:1;
      img{
        height: 100%;
      }
      .mask{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        color: white;
        background: rgba(0,0,0,0.5);
      }
    }
    .goods_info{
      flex-grow:1;
      .name{
        padding-top: 15/@rem;
        line-height: 1.2rem;
        .att{
          float: left;
          margin-top: 0.1rem;
          font-size: 0.7rem;
          line-height: 1rem;
          padding: 0 3/@rem;
          background: @c2;
          color: white;
          border-radius: 3/@rem;
          margin-right: 10/@rem;
        }
        span{
          display: block;
        }
      }
      .norm{
        font-size: 0.8rem;
        line-height: 30/@rem;
        color: @gray5;
        position: relative;
        height: 90/@rem;
        div{
          position: absolute;
          top: 20/@rem;
          margin: auto;
        }
      }
      .footer{
        position: relative;
        height: 56/@rem;
        .price{
          float: left;
          color: @c2;
          font-size: 1.2rem;
          line-height: 56/@rem;
        }
        .number_warp{
          float: right;
          padding-right: 10/@rem;
        }
      }
    }
  }
</style>
