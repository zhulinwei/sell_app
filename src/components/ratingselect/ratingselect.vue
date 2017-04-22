<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span>{{desc.all}}</span>
            <span>{{desc.positive}}</span>
            <span>{{desc.negative}}</span>
        </div>
        <div class="switch">
            <span class="icon-check_circle"></span>
            <span>只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
  // 正面评价
//   const POSITIVE = 0;
  // 负面评价
//   const NEGATIVE = 0;
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
    }
  }
</script>

<style lang="">
    
</style>
