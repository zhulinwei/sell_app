<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                        <span class="text">
                            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                            {{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="item in goods" class="food-list" ref="foodList">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon" alt="">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food="food" @add="addFood"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        </div>
        <!--v-ref='food'可以允许父组件调用子组建的方法-->
        <food @add="addFood" :food="selectedFood" ref="food"></food>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import food from 'components/food/food';
    const ERR_OK = 0;
    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data () {
        return {
          goods: [],
          listHeight: [], // 用于标记左侧菜单栏的高度
          scrollY: 0,
          selectedFood: {}
        }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$http.get('/api/goods').then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {
            this.goods = response.data;
            // $nextTick：拿到数据以后在进行下一步的操作
            this.$nextTick(() => {
              this._initScroll();// 滑动
              this._calculateHeight();// 计算高度
            })
          }
        });
      },
      computed: {
        currentIndex () { // 用于对应和比较左侧菜单栏与右侧商品栏的高度
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              return i;
            }
          }
          return 0;
        },
        selectFoods () {
          let foods = [];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
          })
          return foods;
        }
      },
      methods: {
        selectMenu (index, event) {
          // 在初始化时click: true，会派发一个click事件，这将导致pc端将会响应两次，移动端响应一次，若不设置click: true，pc端只会响应一次，而移动端则不会响应
          if (!event._constructed) { // 浏览器原生的事件中，是不存在_constructed这个属性的，这是BScroll派发出来的事件
            return
          }
          let foodList = this.$refs.foodList;
          let el = foodList[index];
          this.foodsScroll.scrollToElement(el, 300);
        },
        selectFood (food, event) {
          if (!event._constructed) { // 浏览器原生的事件中，是不存在_constructed这个属性的，这是BScroll派发出来的事件
            return
          }
          this.selectedFood = food;
          // 调用子组建food的show方法
          this.$refs.food.show();
        },
        addFood (target) {
          this._drop(target);
        },
        _drop (target) {
          // 体验优化,异步执行下落动画
          this.$nextTick(() => {
            // this.$refs.shopcart表示调用子组建的方法
            this.$refs.shopcart.drop(target);
          });
        },
        _initScroll () {
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {
            click: true // 允许点击事件
          });

          this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
            probeType: 3, // 相当于一个探针的效果，告诉实时滚动的位置
            click: true // 允许点击事件
          });

          this.foodsScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });
        },
        _calculateHeight () {
          let foodList = this.$refs.foodList;
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        }
      },
      components: {
        shopcart,
        cartcontrol,
        food
      }
    };
</script>

<style>
    .goods {
        display: flex;
        position: absolute;
        top: 176px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
    }
    .goods .menu-wrapper {
        /*flex布局*/
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
    }
    .goods .menu-wrapper .menu-item {
        /*display：table可以用来垂直居中*/
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
    }
    .goods .menu-wrapper .menu-item.current {
        position: relative;
        margin-top: -1px;
        z-index: 10;
        background: #fff;
        font-weight: 700;
    }
    .goods .menu-wrapper .menu-item.current .text {
        border-bottom: none;
    }    
    .goods .menu-wrapper .menu-item .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        /*margin-right: 2px;*/
        vertical-align: top;
        background-size: 12px 12px;
        background-repeat: no-repeat;
    }
    .goods .menu-wrapper .menu-item .icon.decrease {
        background-image: -webkit-image-set( url('decrease_3@2x.png') 1x, url('decrease_3@2x.png') 2x,url('decrease_3@3x.png') 3x );                
    }
    .goods .menu-wrapper .menu-item .icon.discount {
        background-image: -webkit-image-set( url('discount_3@2x.png') 1x, url('discount_3@2x.png') 2x,url('discount_3@3x.png') 3x );                
    }
    .goods .menu-wrapper .menu-item .icon.guarantee {
        background-image: -webkit-image-set( url('guarantee_3@2x.png') 1x, url('guarantee_3@2x.png') 2x,url('guarantee_3@3x.png') 3x );                
    }
    .goods .menu-wrapper .menu-item .icon.invoice {
        background-image: -webkit-image-set( url('invoice_3@2x.png') 1x, url('invoice_3@2x.png') 2x,url('invoice_3@3x.png') 3x );                
    }
    .goods .menu-wrapper .menu-item .icon.special {
        background-image: -webkit-image-set( url('special_3@2x.png') 1x, url('special_3@2x.png') 2x,url('special_3@3x.png') 3x );                
    }
    .goods .menu-wrapper .menu-item .text {
        display: table-cell;
        width: 56px;
        font-size: 12px;
        vertical-align: middle;
        text-align: left;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }   
    .goods .foods-wrapper {
        flex: 1;
    }
    .goods .foods-wrapper .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147,153,159);
        background-color: #f3f5f7;
    }
    .goods .foods-wrapper .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }    
    .goods .foods-wrapper .food-item:last-child {
        border-bottom: 0;
        margin-bottom: 0;
    }    
    .goods .foods-wrapper .food-item .icon {
        flex: 0 0 57px;
        margin-right: 10px;
    }
    .goods .foods-wrapper .food-item .content {
        flex: 1;
        position: relative;        
    }    
    .goods .foods-wrapper .food-item .content .name {
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
    }    
    .goods .foods-wrapper .food-item .content .desc,
    .goods .foods-wrapper .food-item .content .extra {
        margin-bottom: 8px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147,153,159);
    }    
    .goods .foods-wrapper .food-item .content .extra .count {
        margin-right: 12px;
    }    
    .goods .foods-wrapper .food-item .content .price {
        font-weight: 700;
        line-height: 24px;
    }    
    .goods .foods-wrapper .food-item .content .price .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240,20,20);
    }
    .goods .foods-wrapper .food-item .content .price .old {
        font-size: 12px;
        text-decoration: line-through;
        color: rgb(147,153,159);
    } 
    .goods .foods-wrapper .food-item .content .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: -8px;
    }
</style>
