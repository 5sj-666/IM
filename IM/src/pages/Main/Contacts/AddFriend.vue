<template>
  <article class="add-friend-page">
    <ki-header title=""/>
    <!-- 申请添加好友页面 -->
    <ki-profile 
      :name="profile.name" 
      :id="profile.userId"
      :avatar="profile.avatar ? '/avatar/'+ profile.avatar : ''"
    />

    <div class="profile-btn" 
        style="margin-top: .48rem" 
        @click="addFriendReq(profile.userId)"
    >
        {{t('App.AddFriend.add')}}
    </div>

    <ki-modal 
      :content="t('App.AddFriend.modalText')"
      v-model="showModal"
      @onConfirm="modalConfirm"
      :showCancel="false"
    />

  </article>
</template>

<script>
import Request from "@/utils/request";
import { useRouter, useRoute } from "vue-router";
import useI18n from "@/local/index";

import KiHeader from '@/components/ki-header.vue';
import kiProfile from '@/components/ki-profile.vue';
import KiModal from "@/components/ki-modal.vue";

import { onMounted, ref, computed } from '@vue/runtime-core';


export default {
  name: "FriendRequest",
  components: {
    kiProfile,
    KiHeader,
    KiModal
  },
  setup() {
    const Router = useRouter();
    const Route = useRoute();
    const { t } = useI18n();

    let profile = computed(()=> JSON.parse(Route.query.profile));

    let showModal = ref(false);

    /**
     * @description 添加好友请求
     */
    async function addFriendReq(friendId) {
      //http://localhost:3000/api/friend/manage

      let res = await Request.post(`/api/friend/manage`, { data: {type: 'friendRequest', friendId}});
      if(res && res.ok) {
        showModal.value = true;
      }
      // debugger;
    }

    function modalConfirm() {
      // showModal.value = false;
      Router.go(-1);
    }

    return {
      profile,
      showModal,

      t,
      addFriendReq,
      modalConfirm
    }

  },
}
</script>

<style scoped>
  .add-friend-page {
    /*
      --AddFriend_bg: #ededed;
      --AddFriend-btn_bg: #FFF;
      --AddFriend-btn_color: #576b86;
    */

    width: 100%;
    height: 100%;
    background-color: var(--AddFriend_bg, #ededed);
  }

  .profile-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3.26rem;
    background: var(--AddFriend-btn_bg, #FFF);
    color: var(--AddFriend-btn_color, #576b86);
    font-size: 1.09rem;
    /* border-bottom: 1px solid #e2e2e2; */
  }

</style>