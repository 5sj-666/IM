<template>
    <article class="dialogue">
        <header>
            <!-- <span @click="goBack">图标</span> -->
            <img @click="goBack" style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-back.png" alt="">
            <div>名称</div>
            <!-- <span>图标</span> -->
            <img style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-ellipsis.png" alt="">
        </header>
        <section class="msg-content">
           <div class="msg-item self">
               <img class="avatar" src="@/assets/img/avatar.jpg" alt="">
               <div class="message">消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容</div>
           </div>
           <div class="msg-item other" @click="goToProfile()">
               <img class="avatar" src="@/assets/img/avatar.jpg" alt="">
               <div class="message">消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容</div>
           </div>
        </section>
        <footer>
            <img style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-voice.png" alt="">
            <input type="text">
            <img style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-grin.png" alt="">
            <img style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-plus.png" alt="">
        </footer>
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from "vue-router";

export default defineComponent({
    name: 'DialoguePage',
    setup() {
        const Router = useRouter();
        function goBack() {
            // console.log("---context: ", context);
            Router.go(-1);
        }

        function goToProfile() {
            Router.push("/dialogue/profile");
        }

        return {goBack, goToProfile}

    }
})

</script>

<style scoped>

/**background-color: rgb(237,237, 237) 
    // :root {
    //     --header-background-color: rgb(237, 237, 237);
    // }
    */
    .dialogue {
        display: grid;
        grid-template-rows: 3rem auto 3rem;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
        background-color: cyan;
    }
    header {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 3rem auto 3rem;
        align-items: center;
        background-color: var(--header-bg);
        /*// background-color: rgb(237, 237, 237);
        // background-color: var(--header-background-color, yellow);*/
    }

    .msg-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: #FFF;
        overflow: scroll;
    }

    .msg-content .msg-item {
        margin-top: 1rem;
        display: flex;
        align-items: flex-start;
        /* width: 80%; */
        width: calc(100% - 4rem);
        min-height: 3rem;
        /* background-color: green; */
        text-align: left;
    }

    .msg-content .self {
        align-self: flex-end;
        flex-direction: row-reverse;
        /* background-color: cyan; */
        
    }
    .msg-content .other {
        /* background-color: green; */
    }

    .avatar {
        margin: 0 .5rem;
        flex-shrink: 0;
        width: 3rem;
        height: 3rem;
        background-color: orange;
        border-radius: .5rem;
    }
    .message {
        position: relative;
        box-sizing: border-box;
        padding: .5rem;
        max-width: 100%;
        min-height: 100%;
        background: greenyellow;
        border-radius: .5rem;
    }
    .message::before {
        content: "";
        position: absolute;
        /* left: -.5rem; */
        top: 1.3rem;
        width: .5rem;
        height: .5rem;
        background: greenyellow;
    }


    .self .message::before{
        right: -.5rem;
        clip-path: polygon(0 0, 70% 50%, 0 100%);
    }

    .other .message::before{
        left: -.5rem;
        clip-path: polygon(30% 50%, 100% 0%, 100% 100%);
    }

    footer {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 2rem auto 2rem 2rem;
        align-items: center;
        background-color: rgb(237, 237, 237);
    }
</style>