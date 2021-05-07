<template>
    <article>
        <!-- <span>图标</span> -->
        <img @click="goBack" style="width: .96rem; height: .96rem" src="@/assets/icon/icon-close.png" alt="">
        <div class="title">微信号/QQ号/邮箱登录</div>
        <div class="user-input">
            <label for="">账号</label>
            <input id="account" type="text" placeholder="请填写账号">
        </div>
        <div class="user-input">
            <label for="">密码</label>
            <input id="password" type="text" placeholder="请填写密码">
        </div>
        <div class="hint">用手机号登录</div>
        <button class="btn-login">登录</button>
    </article>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Login",
    setup() {
        
    },
})
</script>
<style scoped>
    article {
        box-sizing: border-box;
        padding: 0 .7rem;
        display: grid;
        grid-template-rows: 2.2rem 6.39rem 3rem 3rem 4.21rem 4.53rem;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
        background: rgb(245, 245, 245);
        align-items: center;
        justify-items: start;
    }
    .title {
        margin-left: .5rem;
        font-size: 1.43rem;
    }

    .user-input {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 5.52rem auto;
        justify-items: start;
        width: 100%;
        height: 100%;
        font-size: .91rem;
    }
    .user-input label {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        text-indent: .5rem;
    }
    .user-input input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
    }

    .hint {
        margin-left: .5rem;
        color: #566c98;
        font-size: .87rem;
        text-indent: 1.rem;
        
    }
    .btn-login {
        width: 100%;
        height: 2.83rem;
        color: #b4b4b4;
        background: #e1e1e1;
        font-size: .93rem;
        border: none;
        border-radius: .3rem;
    }
</style>
