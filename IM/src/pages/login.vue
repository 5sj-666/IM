<template>
    <article class="login-page">
        <!-- <span>图标</span> -->
        <img @click="goBack" style="width: .96rem; height: .96rem" src="@/assets/icon/icon-close.png" alt="">
        <div class="title">登录</div>
        <div class="user-input">
            <label for="">账号</label>
            <input id="userId" type="text" v-model="userId" placeholder="请填写账号">
        </div>
        <div class="user-input">
            <label for="">密码</label>
            <input id="password" type="text" v-model="password" placeholder="请填写密码">
        </div>
        <div class="hint">
            没有账号？<router-link to="/register">立即注册</router-link>
        </div>

        <button :class='["btn-login", loginActive ? "btn-login_active" :""]' @click="commit(userId, password)">登录</button>

        <!-- <ki-modal 
      :content="t('App.AddFriend.modalText')"
      v-model="showModal"
      @onConfirm="modalConfirm"
      :showCancel="false"
    /> -->
        <ki-modal 
            v-model="modalError"
            content="账号或密码错误"
            :showCancel="false"
        />

    </article>
</template>
<script>
// import { defineComponent, toRefs, ref, computed  } from 'vue'
import { defineComponent, ref,computed, watch } from 'vue'
import { useRouter } from "vue-router";

import Request from "@/utils/request.ts";

import KiModal from "@/components/ki-modal.vue";

// fetch('/api/user/hasUser?id=admin5',{
//     method: 'GET', // or 'PUT'
//     //body: JSON.stringify(data), // data can be `string` or {object}!
//     // headers: new Headers({
//     //     'Access-Control-Allow-Origin': '*',
//     //     'Content-Type': 'application/json'
//     // })
// })
// .then(res => res.json())
// .then(res => {console.log(res)})
// .catch(err => {console.error(err);})

export default defineComponent({
    name: "Login",
    components: {
        KiModal,
    },
    setup() {
        // const { user } = toRefs(props)

        let userId = ref("admin"),
            password = ref("123456");

        const Router = useRouter();

        let modalError = ref(false);

        /**
         * @description 登录
         */
        async function commit(userId, password) {
            console.log("---参数：", arguments );
            // let res = await fetch(`/api/user/hasUser?id=${userId}&pwd=${password}`);
            // let result = await res.json();
            // let result = await Request.get("/api/user/hasUser", {userId, password});
            let result = await Request.post("/api/user/hasUser", { data: {userId: userId, password}});
            // let result = JSON.parse(res);
            // console.log(result);
            console.log("---fetch respond data: ", result);

            // console.log("--router:", Router);
            // 账号密码正确 则 将token存入本地并跳转到主页
            if(result.ok) {
                console.log("---登录成功");
                localStorage.setItem('userId', userId);
                localStorage.setItem('token', result.token);
                Router.replace({
                    path: "/",
                    query: {from: "login"}
                }); 

            }
            if(result && result.error) {
                modalError.value = true;
            }
        }

        let loginActive = computed(() => {
            console.log("--userId: ", userId.value, "password: ", password.value);
            return !!userId.value.trim() && !!password.value.trim(); 
        })
        watch(userId, (A,B) => {
            console.log("新值:", A, " ----旧值: ", B);
        })

        return {
            userId,
            password,
            loginActive,
            commit,
            modalError
        }
    },
})
</script>
<style scoped>
    .login-page {
        --Login-bg: rgb(245, 245, 245);

        box-sizing: border-box;
        padding: 0 .7rem;
        display: grid;
        grid-template-rows: 2.2rem 6.39rem 3rem 3rem 4.21rem 4.53rem;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
        /* background: rgb(245, 245, 245); */
        background-color: var(--Login-bg);
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
        font-size: .91rem;
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
        outline: none;
    }
    .btn-login_active {
        color: #FFF;
        background-color: #05c25f;
    }
</style>
