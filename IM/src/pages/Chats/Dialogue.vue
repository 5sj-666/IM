<template>
    <article class="dialogue-page">
        <ki-header :title="Route.params.userId"/>
        <section class="msg-content">
           <div 
                v-for="(item, index) in msgList" 
                :key="index"
                class="msg-item" 
                :class="item.sender && item.sender.length > 100 ? 'self': 'other'" 
                @click="goToProfile()" >
               <img class="avatar" src="@/assets/img/avatar.jpg" alt="">
               <!-- <div class="message">{{item.content}}</div> -->
               <div class="message" v-html="formatMsg(item.content)"></div>
           </div>
        </section>
        <section class="">
            <div class="input-container border-line_top border-line_bottom">
                <svg class="icon-voice" xmlns="http://www.w3.org/2000/svg" version="1.1" width=100 height=100 viewBox="0 0 100 100">
                    <g fill="transparent" stroke="orange" stroke-width="5" stroke-lineCap="round">
                    <circle cx=50 cy=50 r=47 ></circle>
                    <line id="minute" x1="50"  y1="15" x2="50" y2="50" />
                    <line id="second" x1="85"  y1="50" x2="50" y2="50" />
                    </g>
                </svg>

                <!-- textarea的挂载节点 -->
                <div id="richText" class="rich-text" contentEditable=true @click="showEmoji = false" @input="textChange"></div>

                <svg class="icon-voice" @click="showEmoji = !showEmoji" xmlns="http://www.w3.org/2000/svg" version="1.1" width=100 height=100 viewBox="0 0 100 100">
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

            </div>
            <div class="emoji-container" v-show="showEmoji">
                <!-- <img 
                    class="emoji"
                    v-for="(emoji, i) in emojiList" 
                    :key="i" 
                    :src="require(`@/assets/emoji/emoji_${emoji.EN}.png`)" 
                    @click="pushImg(emoji)" /> -->
                <img 
                    class="emoji"
                    v-for="(emoji, i) in emojiList" 
                    :key="i" 
                    :src="'https://www.fffuture.top/emoji_' + emoji.EN + '.png'"
                    @click="pushImg(emoji)" 
                />
            </div>
        </section>
        
    </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watchEffect, onMounted } from 'vue';
// import { defineComponent } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import KiHeader from '../../components/ki-header.vue';


import emojiList from '@/assets/icomNames';

console.warn("---emojiList: ", emojiList);


    interface Message {
        sender: string,
        recipient?: string,
        type: string,
        content: Object
    }

    interface Emoji {
        url: string,
        CN: string,
        EN: string,
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

        function pushImg(emoji:any) {
            console.log("--添加表情---");
            let ele:any = document.querySelector('#richText');
            // ele.innerHTML += `<img src="https://www.fffuture.top/emoji_0.png" @click="pushImg" style="width:1.4rem; height: 1.4rem;margin: 0 2px;" alt="">`+'<span></span>';
            // content.value += `<img src="https://www.fffuture.top/emoji_0.png" @click="pushImg" alt="">`;
            ele.innerHTML += `[${emoji.CN}]`;
            content.value += `[${emoji.CN}]`;
        }

        const showEmoji = ref(false);


        let sendAble = computed(() => {
            return  (content.value + "").trim() !== "";
        });


        function formatMsg(text:String) {
            // console.log("---text: ", text);
            text = text.replace(/\[[\u4e00-\u9fa5]+\]/g, replaceEmoji);
            // debugger;
            return text;

            function replaceEmoji(param:string) {

                let target = emojiList.find(emoji => param.includes(emoji.CN + ""));
                console.log(target);
                if(target) {
                    // return `<img 
                    //             style="display: inline-block; width: 1.8rem; height: 1.8rem;transform: translateY(.5rem)" 
                    //             src=${require('@/assets/emoji/emoji_' + target.EN + '.png')}
                    //         />`
                    return `<img 
                                style="display: inline-block; width: 1.2rem; height: 1.2rem;transform: translateY(.3rem)" 
                                src=${'https://www.fffuture.top/emoji_' + target.EN + '.png'}
                            />`;
                }

                // debugger;
                // console.log()''
                return param;
            }


        }




        return {
            goBack, 
            goToProfile, 
            send, 
            content, 
            msgList, 
            Route, 
            textChange, 
            pushImg, 
            showEmoji, 
            sendAble,
            emojiList,
            formatMsg
        };

    }
})

</script>

<style scoped>
    .dialogue-page {
        /* 
          --Dialogue-bg: var(--Main-bg);
            --Dialogue-footer-bg: var(--Main-bg);
            --Dialogue-color: var(--Main-color_primary);
            --Dialogue-input-bg: var(--Main-header_fake-bg);
            --Dialogue-btn_send-color: #FFF;
            --Dialogue-btn_send-bg: #04c660;
           */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: var(--Dialogue-bg, #ededed);


        /* background-color: cyan; */
    }

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
        
        /* display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: nowrap; */
        /* writing-mode: horizontal-tb;
        vertical-align: baseline; */
    }
    .message::before {
        content: "";
        position: absolute;
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

    .input-container {
        position: relative;
        box-sizing: border-box;
        padding: 0.53rem 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        min-height: 2.3rem;
        max-height: 7.1rem;
        background-color: var(--Dialogue-footer-bg);
    }
    .rich-text {
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
    .rich-text::-webkit-scrollbar {
        display: none;
    }

    .btn-send {
        margin: 0 .48rem .5rem 0;
        flex-shrink: 0;
        width: 3.52rem;
        height: 1.87rem;
        border: none;
        outline: none;
        color: var(--Dialogue-btn_send-color);
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

    .emoji-container {
        box-sizing: border-box;
        padding: 1rem 0 0 1rem;
        display: flex;
        justify-content: flex-start;
        align-content:flex-start;
        flex-wrap: wrap;
        width: 100%;
        height: 16.5rem;
        overflow: auto;
    }
    .emoji-container::-webkit-scrollbar {
        display: none;
    }

    .emoji-container .emoji {
        margin-right: .85rem;
        margin-bottom: .85rem;
        flex-grow: 0;
        flex-shrink: 0;
        display: inline-block;
        width: 1.8rem;
        height: 1.8rem;
    }

    /* .emoji {
        display: inline-block;
        width: 1.8rem;
        height: 1.8rem;
    } */

</style>