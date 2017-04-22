<template>
    <div class="cartcontrol">
        <!--外层transtion负责平移-->
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <!--内层负责滚动-->
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-increase icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    cerated () {
      console.log(this.food);
    },
    methods: {
      decreaseCart () {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          // this.food.count = 1;这样的操作在vue中是行不通的
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count--;
        }
      },
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          // this.food.count = 1;这样的操作在vue中是行不通的
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        // 触发一个事件
        this.$emit('add', event.target);
      }
    }
  }
</script>

<style lang="">
    .cartcontrl {
        display: inline-block;
        font-size: 0;
    }
    .cartcontrol .cart-decrease {
        display: inline-block;
        padding: 6px;
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    .cartcontrol .cart-decrease .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0,160,220);
        transition: all 0.4s linear;      
        transform: rotate(0);
    }
    .cartcontrol .cart-decrease.move-enter-active,
    .cartcontrol .cart-decrease.move-leave-active {
        transition: all 0.4s linear;
    }
    .cartcontrol .cart-decrease.move-enter,
    .cartcontrol .cart-decrease.move-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
    }
    .cartcontrol .cart-decrease.move-enter .inner,
    .cartcontrol .cart-decrease.move-leave-active .inner {
        transform: rotate(180deg);
    }    
    .cartcontrol .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 10px;
        padding-top: 8px;
        line-height: 24px;
        text-align: center;
        color: rgb(147,153,159);
        font-size: 12px;
    }
    .cartcontrol .cart-increase {
        display: inline-block;
        padding: 8px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
    }
</style>
