<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-center">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol @add="addFood" :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div @click="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @select="selectRating" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.legnth"></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  // 这里的formatDate带上了花括号，原因是date.js文件中跑出来的是export function formatDate
  import {formatDate} from 'common/js/date';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';

  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide () {
        this.showFlag = false;
      },
      addFirst (event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1)
      },
      addFood (target) {
        this.$emit('add', target);
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        // 如果selectType是ALL的话，显示全部
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating (type) {
        this.selectType = type;
        // 重新渲染高度
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent () {
        // onlyContent取反
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background-color: #fff;
        transform: translate3d(0, 0, 0)
    }
    .food.move-enter-active,
    .food.move-leave-active {
        transition: all 0.2s linear;
    }

    .food.move-enter, 
    .food.move-leave-active {
        transform: translate3d(100%, 0, 0)
    }
    .food .food-center .image-header {
        position: relative;
        width: 100%;
        height: 0;
        /*padding-top值设置为100%，可以保证即使图片未加载出来也不会出现抖动的现象*/
        padding-top: 100%;
    }
    .food .food-center .image-header img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }    
    .food .food-center .image-header .back {
        position: absolute;
        top: 10px;
        left: 0;
    }    
    .food .food-center .image-header .back .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
    }
    .food .food-center .content {
        padding: 18px;
        position: relative;
    }    
    .food .food-center .content .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
    }
    .food .food-center .content .detail {
        margin-bottom: 18px;
        height: 10px;
        line-height: 10px;
        font-size: 0;
    }
    .food .food-center .content .detail .sell-count,
    .food .food-center .content .detail .rating {
        font-size: 12px;
        color: rgb(147, 153, 159);
    }  
    .food .food-center .content .detail .sell-count {
        margin-right: 12px;
    }
    .food .food-center .content .price {
        font-weight: 700;
        line-height: 24px;
    }
    .food .food-center .content .price .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }        
    .food .food-center .content .price .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .food .food-center .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
    .food .food-center .buy {
        position: absolute;
        right: 18px;
        bottom: 20px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 10px;
        border-radius: 12px;
        color: #fff;
        background-color: rgb(0, 160, 220);
    }
    .food .food-center .buy .fade-enter-active,
    .food .food-center .buy .fade-leave-active {
        transition: all 0.2s
    }
    .food .food-center .buy .fade-enter,
    .food .food-center .buy .fade-leave-active {
        opacity: 0;
        z-index: -1;
    }        
    .food .food-center .info {
        padding: 18px;
    }    
    .food .food-center .info .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7,17,27);
    }
    .food .food-center .info .text {
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77,85,93);
    }    
    .food .food-center .rating {
        padding-top: 18px;
    }
    .food .food-center .rating .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7,17,27);
    }    
    .food .food-center .rating .rating-wrapper {
        padding: 0 18px;
    }
    .food .food-center .rating .rating-wrapper .rating-item {
        position: relative;
        padding: 18px 0;
        border-bottom: 1px solid #ccc;
    }        
    .food .food-center .rating .rating-wrapper .rating-item .user {
        position: absolute;
        right: 0;
        top: 16px;
        line-height: 12px;
        font-size: 0;
    }    
    .food .food-center .rating .rating-wrapper .rating-item .user .name {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        margin-right: 6px;
        color: rgb(147,153,159);
    }    
    .food .food-center .rating .rating-wrapper .rating-item .user .avtar {
        border-radius: 50%;
    }    
    .food .food-center .rating .rating-wrapper .rating-item .time {
        margin-bottom: 6px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(147,153,159);
    }    
    .food .food-center .rating .rating-wrapper .rating-item .text {
        line-height: 16px;
        font-size: 12px;
        color: rgb(7,17,27);
    }    
    .food .food-center .rating .rating-wrapper .rating-item .text .icon-thumb_up,
    .food .food-center .rating .rating-wrapper .rating-item .text .icon-thumb_down {
        margin-right: 4px;
        line-height: 24px;
        font-size: 12px;
    }    
    .food .food-center .rating .rating-wrapper .rating-item .text .icon-thumb_up {
        color: rgb(0,160,220);
    }
    .food .food-center .rating .rating-wrapper .rating-item .text .icon-thumb_down {
        color: rgb(147,153,159);
    }    
    .food .food-center .rating .rating-wrapper .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147,153,159);
    }    
</style>
