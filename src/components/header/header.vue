<template>
    <div class="header">
        <!--主题内容-->        
        <div class="content-wrapper">
            <!--商家头像-->
            <div class="avater">
                <img :src="seller.avatar" alt="" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <!--通过classMap计算出相应的活动的样式-->
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <!--公告-->
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon icon-keyboard_arrow_right"></i>
        </div>
        <!--背景图片-->
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <!--transition name="fade"是用来实现渐变展示-->
        <transition name="fade">
            <!--活动详情，采用css stick footers布局-->
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size='48' :score='seller.score'></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller" class="supports">
                            <li class="support-item" v-for="(item,index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
        
    </div>
</template>

<script>
    import star from 'components/star/star'
    export default {
      // props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。
      props: {
        seller: {
          type: Object
        }
      },
      data () {
        return {
          detailShow: false
        }
      },
      methods: {
        showDetail () {
          this.detailShow = true
        },
        hideDetail () {
          this.detailShow = false
        }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      },
      components: {
        star
      }
    };
</script>

<style>
    .header {
        color: #fff;
        position: relative;  
        background: rgba(7,17,27,0.5);              
    }
    .header .content-wrapper {
        font-size: 0;
        position: relative;
        padding: 24px 12px 18px 24px;
    }
    .header .content-wrapper .avater {
        display: inline-block;
        vertical-align: top;
    }
    .header .content-wrapper .avater img {
        border-radius: 2px;
    }
    .header .content-wrapper .content {
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;        
    }
    .header .content-wrapper .content .title {
        margin: 2px 0 8px 0;
    }
    .header .content-wrapper .content .title .brand {
        width: 30px;
        height: 18px;
        vertical-align: top;
        display: inline-block;
        background-image: -webkit-image-set( url('brand@2x.png') 1x, url('brand@2x.png') 2x,url('brand@3x.png') 3x );
        background-repeat:no-repeat;
        background-size: 30px 18px;
    }
    .header .content-wrapper .content .title .name {
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
    }
    .header .content-wrapper .content .description {
        margin-bottom: 10px;
        line-height: 12px;
    }
    .header .content-wrapper .content .support .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        vertical-align: top;
        background-size: 12px;
        background-repeat: no-repeat; 
    }
    .header .content-wrapper .content .support .icon.decrease {
        background-image: -webkit-image-set( url('decrease_1@2x.png') 1x, url('decrease_1@2x.png') 2x,url('decrease_1@3x.png') 3x );                
    }
    .header .content-wrapper .content .support .icon.discount {
        background-image: -webkit-image-set( url('discount_1@2x.png') 1x, url('discount_1@2x.png') 2x,url('discount_1@3x.png') 3x );                
    }
    .header .content-wrapper .content .support .icon.guarantee {
        background-image: -webkit-image-set( url('guarantee_1@2x.png') 1x, url('guarantee_1@2x.png') 2x,url('guarantee_1@3x.png') 3x );                
    }
    .header .content-wrapper .content .support .icon.invoice {
        background-image: -webkit-image-set( url('invoice_1@2x.png') 1x, url('invoice_1@2x.png') 2x,url('invoice_1@3x.png') 3x );                
    }
    .header .content-wrapper .content .support .icon.special {
        background-image: -webkit-image-set( url('special_1@2x.png') 1x, url('special_1@2x.png') 2x,url('special_1@3x.png') 3x );                
    }
    .header .content-wrapper .content .support .text {
        vertical-align: top;
        line-height: 12px;
        font-size: 12px;
    }
    .header .content-wrapper .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 4px 0 10px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        font-size: 12px;
    }
    .header .content-wrapper .support-count .icon {
        position: relative;
        top: 2px;
        left: -3px;
    }
    .header .bulletin-wrapper {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        position: relative;        
        padding: 0 32px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: rgba(7,17,27,0.2);
    }
    .header .bulletin-wrapper .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        vertical-align: top;
        margin-top: 8px;
        background-size: 22px 12px;             
        background-image: -webkit-image-set( url('bulletin@2x.png') 1x, url('bulletin@2x.png') 2x,url('bulletin@3x.png') 3x );
        background-repeat: no-repeat;
    }
    .header .bulletin-wrapper .bulletin-text {
        vertical-align: top;        
    }
    .header .bulletin-wrapper .icon {
        position: absolute;
        right: 20px;
        top: 8px;
    }    
    .header .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        /*滤镜：模糊效果，配合.header中的background设置，即可显现模糊家灰色背景的实现*/
        filter: blur(10px);
    }
    .header .detail {
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: auto;
        font-size: 12px;
        /*背景模糊*/
        backdrop-filter: blur(10px);
        background: rgba(7,17,27,0.8);
    }
    .header .detail.fade-enter-active, 
    .header .detail.fade-leave-active {
        /*设置渐变属性*/
        transition: all 0.5s
    }
    /*当展示活动详情时*/
    .header .detail.fade-enter, 
    .header .detail.fade-leave-active {
        opacity: 0;
        background: rgba(7,17,27,0)
    }
    .header .detail .detail-wrapper {
        width: 100%;
        min-height: 100%;
    }
    .header .detail .detail-wrapper .detail-main {
        margin-top: 64px;
        /*padding-bottom: 64px是给底下关闭按钮留出的高度，如果不留的话，父级高度是100%，关闭按钮将被挤出视窗底部*/
        padding-bottom: 64px;
    }
    .header .detail .detail-wrapper .detail-main .name {
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
    }
    .header .detail .detail-wrapper .detail-main .title {
        display: flex;
        width: 80%;
        margin: 20px auto;
    }
    .header .detail .detail-wrapper .detail-main .title .line {
        flex: 1;
        position: relative;
        top: -7px;
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .header .detail .detail-wrapper .detail-main .title .text {
        padding: 0 12px;
        font-size: 14px
    }
    .header .detail .detail-wrapper .detail-main .supports {
        width: 80%;
        margin: 0 auto;
    }
    .header .detail .detail-wrapper .detail-main .support-item {
        padding: 0 12px;
        margin-bottom: 12px;
        font-size: 0;
    }
    .header .detail .detail-wrapper .detail-main .support-item:last-child {
        margin-bottom: 0;
    }
    .header .detail .detail-wrapper .detail-main .support-item .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
    }
    .header .detail .detail-wrapper .detail-main .support-item .icon.decrease {
        background-image: -webkit-image-set( url('decrease_2@2x.png') 1x, url('decrease_2@2x.png') 2x,url('decrease_2@3x.png') 3x );                
    }
    .header .detail .detail-wrapper .detail-main .support-item .icon.discount {
        background-image: -webkit-image-set( url('discount_2@2x.png') 1x, url('discount_2@2x.png') 2x,url('discount_2@3x.png') 3x );                
    }
    .header .detail .detail-wrapper .detail-main .support-item .icon.guarantee {
        background-image: -webkit-image-set( url('guarantee_2@2x.png') 1x, url('guarantee_2@2x.png') 2x,url('guarantee_2@3x.png') 3x );                
    }
    .header .detail .detail-wrapper .detail-main .support-item .icon.invoice {
        background-image: -webkit-image-set( url('invoice_2@2x.png') 1x, url('invoice_2@2x.png') 2x,url('invoice_2@3x.png') 3x );                
    }
    .header .detail .detail-wrapper .detail-main .support-item .icon.special {
        background-image: -webkit-image-set( url('special_2@2x.png') 1x, url('special_2@2x.png') 2x,url('special_2@3x.png') 3x );                
    }
    .header .detail .detail-wrapper .detail-main .support-item .text {
        line-height: 16px;
        font-size: 12px;
    }
    .header .detail .detail-wrapper .detail-main .bulletin {
        width: 80%;
        margin: 0 auto;
    }
    .header .detail .detail-wrapper .detail-main .bulletin .content {
        padding: 0 12px;
        line-height: 24px;
        font-size: 12px;
    }    
    .header .detail .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
    }
</style>
