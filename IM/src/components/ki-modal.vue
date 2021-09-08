<template v-show="modelValue">
    <ki-mask v-if="modelValue"/>
    <section class="ki-modal" v-if="modelValue">
        <div class="ki-body">
            <!-- <span>新的设置需要重启微信才能生效</span> -->
            <span>{{content}}</span>
        </div>
        <footer>
            <button v-if="showCancel" class="button-cancel"  @click="clickBtn('onCancel')">{{cancelText ? cancelText : t('App.KiModal.cancel')}}</button>
            <button class="button-confirm" @click="clickBtn('onConfirm')">{{confirmText ? confirmText : t('App.KiModal.confirm')}}</button>
        </footer>
    </section>
</template>
<script>
import KiMask from "@/components/ki-mask.vue"

import useI18n from "@/local/index";

export default {
    name: "KiModal",
    components: {
        KiMask
    },
    props: {
        modelValue: Boolean,
        content: {
            type: String,
            default: "请传入内容"
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        cancelText: {
            type: String,
            // default: '取消'
            // default: t('App.KiModal.cancel')
        },
        confirmText: {
            type: String,
            // default: "确定"
            // default: t('App.KiModal.confirm')
        }
    },
    emits: [ "update:modelValue", "onCancel", "onConfirm"],
    setup(props, ctx) {
        const { t } = useI18n();

        // debugger;
        /**
         * @description 点击按钮
         * @param {string} type: (onCancel|Confirm)
         */
        function clickBtn(type) {
            ctx.emit('update:modelValue', false);
            ctx.emit(type);
        }

        return { clickBtn, t }
    },
}
</script>
<style scoped>

    .ki-modal {
        /* 
            --ki-modal-color: #000;
            --ki-modal-corlor_secondary: #58708d;
            --ki-modal-bg: #FFF;
            --ki-modal-border_color: #e0e0e0;
        */

        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 18.71rem;
        height: 8.4rem;
        color: var(--ki-modal-color);
        background: var(--ki-modal-bg, #FFF);
        /* border: 1px solid #e0e0e0; */
        border-radius: .4rem;
        z-index: 999;
    }

    .ki-body {
        flex-grow: 1;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 3.3rem;
        border-top: 1px solid var(--ki-modal-border_color);
    }

    footer button {
        flex-grow: 1;
        height: 100%;
        color:  var(--ki-modal-color, #000);
        background: transparent;
        font-size: 1rem;
        font-weight: 700;
        border: none;
        outline: none;
    }
    footer .button-cancel {
        border-right: 1px solid var(--ki-modal-border_color);
    }
    footer .button-confirm {
        color: var(--ki-modal-corlor_secondary, #58708d);
    }

</style>