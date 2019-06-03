<template>
  <div>
    <!-- <el-button type="text" @click="open">点击打开提交信息</el-button> -->
    <div class="popBtn" 
    @click="pop=!pop"
    :style="{background:'url('+itemData.style.background+') no-repeat'}"
    >tujiao </div>
    <div class="pop" 
      v-if="pop"
      :style="{background:'url('+itemData.styleBg.background+') no-repeat'}" 
      >
        <div class="join">
            <span class="userNamebox">
              <input type="text" class="userName" placeholder="请输入您的中文名" v-model="userName" />
              <em v-html="txtUHtml" v-if="txtUShow"></em>
          </span>
            <span class="phonebox">
              <input type="text" class="phone" placeholder="请输入您的11位手机号码" v-model="phone" />
              <em v-html="txtPHtml" v-if="txtPShow"></em>
          </span>
            <a href="javascript:;" class="btn btn-large btn-join" @click="joinSubmit">立即预约</a>
        </div>
        <a href="javascript:;" class="close" @click="close"></a>
    </div>
    <div class="popSucess" 
      :style="{background:'url('+itemData.styleSuc.background+') no-repeat'}"
      v-if="popSucessType">
        <a href="javascript:;" @click="close"></a>
        <a href="javascript:;" @click="close"></a>
    </div>
  </div>
 
</template>

<script>
import $ from 'jquery'
import Misc from './../../utils/misc'
  export default {
    data(){
      return {
        pop:false,
        userName:'',
        phone:'',
        txtUShow:'',
        txtUHtml:'',
        txtPHtml:'',
        txtPShow:'',
        popSucessType:false
      }
    },
    props:['itemData'],
    methods: {
      close(){
        this.pop = false
        this.popSucessType = false
      },
      joinSubmit() {
          var regname = /^[\u4e00-\u9fa5]+$/gi
          var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
          if (!this.userName || this.userName.length === 0) {
              this.txtUShow = true
              this.txtUHtml = '姓名不能为空！'
              return
          } else if (!regname.test(this.userName)) {
              this.txtUShow = true
              this.txtUHtml = '请输入中文名'
              return
          } else if (!this.phone || this.phone.length === 0) {
              this.txtPShow = true
              this.txtPHtml = '手机号不能为空！'
              return
          } else if (!reg.test(this.phone)) {
              this.txtPShow = true
              this.txtPHtml = '手机号输入不正确！'
              return
          }
          let self = this
          $.ajax({
            url: 'http://activity.jrj.com.cn/activity/record/web',
            dataType: 'jsonp',
            data: {
              aid: '982309337556430848',
              activityUserName: this.userName,
              mobile: this.phone,
              bizsource: 'TEXT',
              tgqdcode: Misc.getQueryString('tgqdcode') || 'BHYG6HKP',
              source: '1'
            },
            success: function (data) {
              if (data.retcode === 0) {
                self.pop = !self.pop
                self.popSucessType = true
              } else {
                alert('请求失败')
              }
            },
            error: function (v) {
              // alert('网络异常！')
            }
        })
      }
    },
    mounted(){
      console.log(Misc)
    }
  }
</script>
<style scoped>
.pop {
    width: 583px;
    height: 366px;
    /* background: url("http://i0.jrjimg.cn/assets/web/images/web-pop1.4d71523648361d04592863c087392114.jpg") 0 0 no-repeat; */
    position: fixed;
    top: 50%;
    margin-top: -183px;
    left: 50%;
    margin-left: -291.5px;
    z-index: 12;
}
.pop img {
    width: 182px;
    height: 182px;
    position: absolute;
    top: 170px;
    left: 336px;
}
.pop .close {
    width: 23px;
    height: 23px;
    position: absolute;
    top: 17px;
    right: 21px;
}
.jzxgLink {
    width: 154px;
    height: 31px;
    position: absolute;
    top: 0;
    left: 199px;
}
.popClick {
    width: 332px;
    height: 63px;
    position: absolute;
    top: 677px;
    left: 414px;
}

.join {
    width: 100%;
    height: 100%;
    position: relative;
}
.join span {
    position: absolute;
}
.join span input {
    width: 362px;
    height: 22px;
    line-height: 40px;
    background: none;
    border: none;
    font-size: 20px;
    color: #452609;
    padding: 10px 20px;
}
.join span input::-webkit-input-placeholder {
    color: #A78B67;
}
.join .userNamebox {
    top: 169px;
    left: 143px;
}
.join .phonebox {
    top: 223px;
    left: 143px;
}
.join .phonebox input {
    width: 362px;
}
.join .btn-join {
    position: absolute;
    bottom: 27px;
    left: 232px;
    opacity: 0;
    width: 157px;
    height: 42px;
}
.join em {
    position: absolute;
    top: 5px;
    right: 0;
    background: #fff;
    border: 1px red solid;
    border-radius: 5px;
    padding: 5px;
}
.popSucess {
    width: 583px;
    height: 280px;
    /* background: url("http://i0.jrjimg.cn/assets/web/images/web-pop2.91674ff7a0e241692503b029f56710f7.jpg") 0 0 no-repeat; */
    position: fixed;
    top: 50%;
    margin-top: -140px;
    left: 50%;
    margin-left: -291.5px;
    z-index: 12;
}
.popSucess a:first-child {
    width: 23px;
    height: 23px;
    position: absolute;
    top: 17px;
    right: 21px;
    opacity: 0;
}
.popSucess a:last-child {
    width: 157px;
    height: 42px;
    position: absolute;
    top: 201px;
    right: 213px;
    opacity: 0;
}
</style>
