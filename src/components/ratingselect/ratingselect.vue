<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" :class="{'on': onlyContent}" @click="toggleContent">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
  // 正面评价
  const POSITIVE = 0;
  // 负面评价
  const NEGATIVE = 1;
  // 全部评价
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        // 过滤，取出rating.ratetype为0，即正面的评价
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }

    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        // 通知父级组件修改selectType的类型
        this.$emit('select', type);
      },
      toggleContent (event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      }
    }
  }
</script>

<style lang="">
    .ratingselect .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        font-size: 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .ratingselect .rating-type .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77,85,93);
        font-size: 12px;
        line-height: 16px;
    }
    .ratingselect .rating-type .block.active {
        color: #fff;
    }    
    .ratingselect .rating-type .block.positive {
        background-color: rgba(0,160,220,0.2);
    }
    .ratingselect .rating-type .block.positive.active {
        background: rgb(0,160,220);
    }    
    .ratingselect .rating-type .block.negative {
        background-color: rgba(77,85,93,0.2);
    }
    .ratingselect .rating-type .block.negative.active {
        background: rgb(77, 85, 93);
    }    
    .ratingselect .rating-type .block .count {
        margin-left: 2px;
    }  
    .ratingselect .switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        color: rgb(147,153,159);
        font-size: 0;
    }    
    .ratingselect .switch .icon-check_circle {
        font-size: 24px;
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
    }    
    .ratingselect .switch .text {
        font-size: 12px;
        display: inline-block;
        vertical-align: top;
    }
    .ratingselect .switch.on .icon-check_circle {
        color: #00c850;
    }    
</style>
