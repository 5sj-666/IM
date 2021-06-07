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
                class="msg-item other" 
                :class="item.sender && item.sender.length > 100 ? 'self': ''" 
                @click="goToProfile()" >
               <img class="avatar" src="@/assets/img/avatar.jpg" alt="">
               <div class="message">{{item.content}}</div>
           </div>
        </section>
        <footer>
            <img style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-voice.png" alt="">
            <input type="text" v-model="content">
            <!-- <img style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-grin.png" alt="">
            <img style="width: 1.4rem; height: 1.4rem" src="@/assets/icon/icon-plus.png" alt=""> -->
            <button class="btn-send" @click.stop="send()">发送</button>
        </footer>
    </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
// import { defineComponent } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

    interface message {
        sender: string,
        recipient?: string,
        type: string,
        content: Object
    }

export default defineComponent({
    name: 'DialoguePage',
    setup() {
        const Router = useRouter();
        const Route = useRoute();
        console.log( "---Route: ",  Route.params );
        const store = useStore();
        console.log("---store.state: ", store);
        // store.dispatch('wsStore/initWS');
        store.dispatch('wsStore/initWS');

        // console.log()
        // const data = reactive([]);

    //     let WS = initWS();
    //     function initWS():any {
    //         if(!Reflect.has(window, "WebSocket")) {
    //             console.log("浏览器不支持websocket!!");
    //             return;
    //         }

    //         let WS = new WebSocket("ws://127.0.1:3000");
    //         // window.userws = WS;
    //         WS.onopen = function() {
    //             console.log("---成功连接websocket---");
    //         };
            
    //         WS.onmessage = envelope => {
    //             console.log("--envelope", envelope);

                

    //             // const msgMapping = {
    //             //     offer: answerOffer,
    //             //     offerAnswer: setRemoteSDP,
    //             //     candidate: setRemoteICE,
    //             // }
    //             // msgHistory = document.querySelector("#msgHistory");
    //             // msgHistory.innerText += `${envelope.data}\n`;
    //             // let letter = JSON.parse(envelope.data);
                
    //             // Reflect.has(msgMapping, letter.type) ? msgMapping[letter.type](letter) : "";
    //         };
    //         WS.onclose = () => console.log("---已断开webSocket---");
    //         WS.onerror = error => console.error("---websoket发生错误: ", error);
    //         return WS;
    //     }

    //     /**
    //      * @description 对websocket发送事件做封装
    //      * @param {Object} data 数据结构: {type: String, content: String}
    //     */
    //    function wsSend(data:message) {
    //         // const letter:message = {
    //         //     sender: '',
    //         //     recipient: '',
    //         //     type: '',
    //         //     content:'',
    //         // }
    //         const letter = JSON.stringify(data);
    //         console.log("letter: ", letter);
    //         WS.send(letter);
    //     }
    //     // function wsSend(data) {
    //     //     let sender = document.querySelector("#sender").value,
    //     //         recipient = document.querySelector("#recipient").value,
    //     //         msgHistory = document.querySelector("#msgHistory");

    //     //     //特殊情况: 初始化(init)时候不需要接收者
    //     //     if(!sender || (!recipient && data.type !== "init")) {
    //     //         alert(`${sender ? '接收者' : '发送者'}不能为空！`);
    //     //         return;
    //     //     }

    //     //     let letter = JSON.stringify({...data, sender, recipient});
    //     //     msgHistory.innerText += `${letter}\n`
    //     //     WS.send(letter);
    //     // }

        var sender = localStorage.getItem("token");
        var recipient = Route.params.userId + "";

        var content = ref("");

    

        // var msgList = ref(new Array());
        var msgList = computed(() => {
                // console.warn("----msgList store: ", store);
                return store.state.wsStore.msgHistory.filter(msg => msg.sender === recipient || msg.recipient === recipient);
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
        }

        return {goBack, goToProfile, send, content, msgList};

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
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 2rem auto 2rem 2rem;
        align-items: center;
        background-color: rgb(237, 237, 237);
    }
    .btn-send {
        grid-column: 3 / 5;
    }
</style>