<template>
  
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = [];
        // 分数要向下取整，如原本分数为4.3，Math.floor( 4.3 * 2)为8，8/2为4
        let score = Math.floor(this.score * 2) / 2;
        // 如果hasCecimal不为0时，说明存在半星
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        // 全星个数
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        // 半星个数， 半星只允许出现一个
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        // 如果全星与半星个数不足5，则剩下用无星循环
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  }
</script>

<style>
  .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }

</style>
