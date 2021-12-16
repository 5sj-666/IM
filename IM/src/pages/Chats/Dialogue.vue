<template>
    <article class="dialogue-page" @click="showEmoji=false">
        <ki-header :title="Route.params.userId" style="position: sticky; left: 0; top: 0;"/>
        <section class="msg-content" ref="msgContainer">
           <div 
                v-for="(item, index) in msgList" 
                :key="index"
                class="msg-item" 
                :class="item.sender && item.sender.length > 100 ? 'self': 'other'" 
                @click="Router.push(`/dialogueDeep/profile/${Route.params.userId}`)" >
               <!-- <img class="avatar" src="@/assets/img/avatar.jpg" alt=""> Store.state.profile.avatar ? '/avatar/'+Store.state.profile.avatar : '' -->
               <img class="avatar" src="@/assets/img/avatar.jpg" alt="">
               <!-- <div class="message">{{item.content}}</div> -->
               <div class="message" v-html="formatMsg(item.content)"></div>
           </div>
        </section>
        <section class="">
            <div class="input-container border-line_top border-line_bottom">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-svg" viewBox="0 0 100 100">
                    
                    <path d="M 20 50 L 25 45 A 9 9 0 0 1 25 55 Z " stroke-width="1" fill="var(--svg-stroke)"/>

                    <path d=" M 35 35 A 21.3 21.3 0 0 1 35 65" stroke-width="8" />

                    <path d="M 50 20 A 42.5 42.5 0 0 1 50 80 " stroke-width="8" />
                    <circle cx=50 cy=50 r=47 fill="transparent" stroke-width="5"></circle>
                </svg>

                <!-- 用户输入框 -->
                <div ref="richText" class="rich-text" contentEditable=true @click="inputMsg" @input="textChange"></div>

                <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg" @click.stop="showEmoji = !showEmoji" version="1.1" viewBox="0 0 100 100" >
                    <g fill="transparent" stroke-width="5" stroke-lineCap="round" stroke-linejoin="round">
                        <circle cx=50 cy=50 r=47 ></circle>
                        <circle cx=30 cy=35 r=3 stroke-width="6"></circle>
                        <circle cx=70 cy=35 r=3 stroke-width="6"></circle>
                        <path d = " M 20 55 L 80 55 A 30.4 30.4 0 0 1 20 55" />
                    </g>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg" v-show="!sendAble" version="1.1" viewBox="0 0 100 100" style="filter: grayscale(100%);">
                    <g  stroke-width="5" stroke-linecap="round">
                        <circle cx="50" cy="50" r="47" />
                        <line x1="50" y1="20" x2="50" y2="80" />
                        <line x1="20" y1="50" x2="80" y2="50"/>
                    </g>
                </svg>
                    
                <button class="btn-send" v-show="sendAble" @click.stop="send()">{{t('App.Dialogue.send')}}</button>

            </div>
            <div class="emoji-container" v-show="showEmoji"  @click.stop.prevent>
                <img 
                    class="emoji"
                    v-for="(emoji, i) in emojiList" 
                    :key="i" 
                    :src="'/emoji/emoji_' + emoji.EN + '.png'"
                    @click.stop="pushImg(emoji)" 
                />
            </div>
        </section>
        
    </article>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watchEffect, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import useI18n from "@/local/index";

import KiHeader from '../../components/ki-header.vue';

import emojiList from '@/assets/iconNames';

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
        const store = useStore();
        const { t } = useI18n();

        var sender = localStorage.getItem("token");
        var recipient = Route.params.userId + "";

        var msgList = computed(() => {
                return store.state.wsStore.msgHistory.filter((msg:Message) => msg.sender === recipient || msg.recipient === recipient);
            }
        );

       
        var content = ref("");

        /**
         * @description 当contentEditable中内容发生变化时，将值实时赋值给content：模拟数据双向绑定(v-model)
         */
        function textChange(e:any) {
            content.value = e.srcElement.innerHTML;
        }

        const msgContainer:any = ref(),
              showEmoji = ref(false);

        /**
         * @description 用户点击输入框输入
         */
        function inputMsg() {
            showEmoji.value = false;
            msgContainer.value!.scrollTop = 99999;
        }

        const richText:any = ref();
        /**
         * @description 点击表情，将对应字符串推进输入框中 例子： 点击‘微笑表情’ -> 输入框中增加: [微笑]
         */
        function pushImg(emoji:Emoji) {
            richText.value!.innerHTML += `[${emoji.CN}]`;
            content.value += `[${emoji.CN}]`;
        }

        /**
         * @description 发送消息
         */
        function send() {
            if(content.value.trim() === "") return ;
            let letter = {
                sender,
                recipient,
                type: "message",
                content: content.value,
            }
            store.dispatch("wsStore/wsSend", letter);

            content.value = "";
            richText.value!.innerHTML = "";

        }


        /**
         * @description 根据用户输入的内容，判定是否显示‘发送’按钮
         */
        let sendAble = computed(() => {
            return  (content.value + "").trim() !== "";
        });

        /**
         * @description 将特定字符提换为图片 
         *                  例子: [微笑] -> <img 
                                    style="display: inline-block; width: 1.2rem; height: 1.2rem;transform: translateY(.3rem)" 
                                    src=${'https://www.fffuture.top/emoji_smile.png'}
                                    />
         * @param {String} text 要替换的字符串（即用户发送的消息）
         * @returns {String} 格式化之后的dom
         */
        function formatMsg(text:String) {
            text = text.replace(/\[[\u4e00-\u9fa5]+\]/g, replaceEmoji);
            // debugger;
            return text;

            function replaceEmoji(param:string) {
                let target = emojiList.find(emoji => param === `[${emoji.CN}]`);
                console.log(target);
                if(target) {
                    return `<img 
                                style="display: inline-block; width: 1.2rem; height: 1.2rem;transform: translateY(.3rem)" 
                                src=${'/emoji/emoji_' + target.EN + '.png'}
                            />`;
                }
                return param;
            }


        }


        return {
            t,
            Router,

            emojiList,
            content, 
            msgContainer,
            inputMsg,
            richText,
            send, 
            msgList, 
            Route, 
            textChange, 
            pushImg,
            showEmoji, 
            sendAble,
            formatMsg,

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
    }

    .msg-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .msg-content .msg-item {
        margin-top: 1rem;
        display: flex;
        align-items: flex-start;
        width: calc(100% - 4rem);
        min-height: 3rem;
        text-align: left;
    }

    .msg-content .self {
        align-self: flex-end;
        flex-direction: row-reverse;
        
    }
    .msg-content .other {
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
        box-sizing: border-box;
        margin: 0 .48rem .5rem 0;
        flex-shrink: 0;
        width: 3.7rem;
        height: 1.87rem;
        border: none;
        outline: none;
        color: var(--Dialogue-btn_send-color);
        background: var(--Dialogue-btn_send-bg);
        font-size: .9rem;
        border-radius: .2rem;
    }

    .icon-svg {
        margin: .5rem 0.56rem;
        flex-shrink: 0;
        width: 1.67rem;
        height: 1.67rem;

        fill: var(--svg-fill);
        stroke: var(--svg-stroke);
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

</style>