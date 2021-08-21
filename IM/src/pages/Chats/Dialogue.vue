<template>
    <article class="dialogue-page">
        <ki-header :title="Route.params.userId"/>
        <section class="msg-content">
            111
           <!-- <div class="msg-item self">
               <img class="avatar" src="@/assets/img/avatar.jpg" alt="">
               <div class="message">消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容</div>
           </div>
           <div class="msg-item other" @click="goToProfile()">
               <img class="avatar" src="@/assets/img/avatar.jpg" alt="">
               <div class="message">消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容</div>
           </div> -->
           <div 
                v-for="(item, index) in msgList" 
                :key="index"
                class="msg-item" 
                :class="item.sender && item.sender.length > 100 ? 'self': 'other'" 
                @click="goToProfile()" >
               <img class="avatar" src="@/assets/img/avatar.jpg" alt="">
               <!-- <div class="message">{{item.content}}</div> -->
               <div class="message" v-html="item.content"></div>
           </div>
        </section>
        <footer class="border-line_top">
            <svg class="icon-voice" xmlns="http://www.w3.org/2000/svg" version="1.1" width=100 height=100 viewBox="0 0 100 100">
                <g fill="transparent" stroke="orange" stroke-width="5" stroke-lineCap="round">
                <circle cx=50 cy=50 r=47 ></circle>
                <line id="minute" x1="50"  y1="15" x2="50" y2="50" />
                <line id="second" x1="85"  y1="50" x2="50" y2="50" />
                </g>
            </svg>

            <!-- textarea的挂载节点 -->
            <div id="richText" class="input-mount" contentEditable=true @input="textChange"></div>

            <svg class="icon-voice" xmlns="http://www.w3.org/2000/svg" version="1.1" width=100 height=100 viewBox="0 0 100 100">
                <g fill="transparent" stroke="orange" stroke-width="5" stroke-lineCap="round">
                <circle cx=50 cy=50 r=47 ></circle>
                <line id="minute" x1="50"  y1="15" x2="50" y2="50" />
                <line id="second" x1="85"  y1="50" x2="50" y2="50" />
                </g>
            </svg>

            <svg v-show="!sendAble" class="icon-voice" style="margin-left: 0;" xmlns="http://www.w3.org/2000/svg" version="1.1" width=100 height=100 viewBox="0 0 100 100">
                <g fill="transparent" stroke="orange" stroke-width="5" stroke-lineCap="round">
                <circle cx=50 cy=50 r=47 ></circle>
                <line id="minute" x1="50"  y1="15" x2="50" y2="50" />
                <line id="second" x1="85"  y1="50" x2="50" y2="50" />
                </g>
            </svg>
                
            <button class="btn-send" v-show="sendAble" @click.stop="send()">发送</button>

            <div class="emoji-container" v-show="showEmoji">
                <img src="https://www.fffuture.top/emoji_0.png" @click="pushImg" style="width:1.4rem; height: 1.4rem;" alt="">
            </div>
        </footer>
    </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watchEffect, onMounted } from 'vue';
// import { defineComponent } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import KiHeader from '../../components/ki-header.vue';

    interface Message {
        sender: string,
        recipient?: string,
        type: string,
        content: Object
    }

export default defineComponent({
    name: 'DialoguePage',
    components: {
        KiHeader
    },
    setup() {
        const Router = useRouter();
        const Route = useRoute();
        console.log( "---Route: ",  Route.params );
        const store = useStore();
        console.log("---store.state: ", store);


        var sender = localStorage.getItem("token");
        var recipient = Route.params.userId + "";

        var content = ref("");

        watchEffect(()=>{
            console.log("+---content发生变化: ", content);
            
        })

    

        // var msgList = ref(new Array());
        var msgList = computed(() => {
                // console.warn("----msgList store: ", store);
                return store.state.wsStore.msgHistory.filter((msg:Message) => msg.sender === recipient || msg.recipient === recipient);
            }
        );


        function goBack() {
            // console.log("---context: ", context);
            Router.go(-1);
        }

        function goToProfile() {
            Router.push("/dialogue/profile");
        }

        function send() {
            if(content.value.trim() === "") return ;
            
            // console.log("---send event---", content.value);
            //  wsSend({sender: sender+"",recipient: recipient,type: "message", content: {value: content.value} })
            let letter = {
                sender,
                recipient,
                type: "message",
                content: content.value,
            }
            // store.dispatch("wsStore/wsSend", {sender: sender+"",recipient: recipient,type: "message", content: {value: content.value} });
            store.dispatch("wsStore/wsSend", letter);

            content.value = "";
            document.querySelector('#richText')!.innerHTML = "";
        }

        function textChange(e:any) {
            // console.log("---onchange textChange: ", e, "--:", e.srcElement.innerHTML);
            content.value = e.srcElement.innerHTML;
        }

        function pushImg() {
            console.log("--添加表情---");
            let ele:any = document.querySelector('#richText');
            ele.innerHTML += `<img src="https://www.fffuture.top/emoji_0.png" @click="pushImg" style="width:1.4rem; height: 1.4rem;margin: 0 2px;" alt="">`+'<span></span>';
            content.value += `<img src="https://www.fffuture.top/emoji_0.png" @click="pushImg" style="width:1.4rem; height: 1.4rem;margin: 0 2px;" alt="">`;
        }

        const showEmoji = ref(false);


        let sendAble = computed(() => {
            return  (content.value + "").trim() !== "";
        })


        return {goBack, goToProfile, send, content, msgList, Route, textChange, pushImg, showEmoji, sendAble};

    }
})

</script>

<style scoped>

/**background-color: rgb(237,237, 237) 
    // :root {
    //     --header-background-color: rgb(237, 237, 237);
    // }
    */
    .dialogue-page {
        /* 
          --Dialogue-bg: var(--Main-bg);
            --Dialogue-footer-bg: var(--Main-bg);
            --Dialogue-color: var(--Main-color_primary);
            --Dialogue-input-bg: var(--Main-header_fake-bg);
            --Dialogue-btn_send-color: #FFF;
            --Dialogue-btn_send-bg: #04c660;
           */



        /* display: grid;
        grid-template-rows: 3rem auto 3rem;
        grid-template-columns: 1fr;
        width: 100%;
        height: 100%;
        background-color: var(--Dialogue-bg, #ededed); */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: var(--Dialogue-bg, #ededed);


        /* background-color: cyan; */
    }
    /* header {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 3rem auto 3rem;
        align-items: center;
        background-color: var(--header-bg);
    } */

    .msg-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        /* background-color: var(--Dialogue-bg, #ededed); */
        overflow-x: hidden;
        overflow-y: auto;
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
        line-height: 2rem;
        word-break: break-all;
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
        position: relative;
        /* display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 2rem 1fr 2rem 3rem;
        align-items: center; */
        box-sizing: border-box;
        padding: 0.53rem 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        /* flex-wrap: wrap; */
        width: 100%;
        min-height: 2.3rem;
        max-height: 7.1rem;
        /* background-color: rgb(237, 237, 237); */
        background-color: var(--Dialogue-footer-bg);
    }
    .input-mount {
        position: relative;
        box-sizing: border-box;
        padding: .5rem .5rem;
        flex-grow: 1;
        flex-shrink: 1;
        min-height: 1.3rem;
        max-height: 6.04rem;
        color: var(--Dialogue-color);
        background-color: var(--Dialogue-input-bg);
        border-radius: .2rem;
        text-align: left;
        line-height: 1.5;
        word-break: break-all;
        outline: none;
        overflow: auto;
    }
    .input-mount::-webkit-scrollbar {
        display: none;
    }

    .emoji-container {
        /* position: absolute;
        left: 0;
        bottom: 3rem; */
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        height: 6rem;
        background: cyan;
    }

    .btn-send {
        margin: 0 .48rem .5rem 0;
        flex-shrink: 0;
        width: 3.52rem;
        height: 1.87rem;
        border: none;
        outline: none;
        color: var(--Dialogue-btn_send-color);
        /* background: #04c660; */
        background: var(--Dialogue-btn_send-bg);
        font-size: .9rem;
        border-radius: .2rem;
    }

    .icon-voice {
        margin: .5rem 0.56rem;
        flex-shrink: 0;
        width: 1.67rem;
        height: 1.67rem;
    }
</style>