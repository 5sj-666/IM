<template>
  <!-- <section class="profile-container border-line_bottom">
    <div class="profile-avatar"></div>
    <div class="profile-info">
      <span class="profile-name">{{ props.profile.name }}</span>
      <div class="profile-more">
        <span class="profile-id">微信号：Greenschick</span>
        <span class="profile-icon"></span>
        <span class="profile-icon"></span>
      </div>
    </div>
  </section>-->
  <section class="profile-container border-line_bottom">
    <img class="profile-avatar" :src="avatar" alt />
    <div class="profile-info">
      <span class="profile-name">{{ name }}</span>
      <div class="profile-more">
        <span class="profile-id">微信号：{{ id }}</span>
        <span class="profile-icon so-icon-QR_code"></span>
        <span class="profile-icon so-icon-arrow_right"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "SoProfile",
  // props: ["name"],
  props: {
    name: {
      type: String,
      default: "test"
    },
    avatar: {
      type: String, //传入图片的http地址，没有的话，则显示默认图片
      default: require("../assets/img/avatar.jpg")
    },
    id: {
      type: String,
      default: "xxxx"
    }
  },
  setup() {
    onMounted(() => {
      console.log("onMounted");
    });
    return {};
  }
};
</script>

<style lang="stylus" scoped>
@import '../css/common.styl';
@import '../css/icons.styl';
@import '../css/variable.styl';

// $so-profile-bg = #fff;
// $so-profile-name-color = #1b1b1b;
// $so-profile-id-color = #676767;

// .icon-QR_code {
// background-image: url('../assets/icon/icon-QR_code.png');
// }

// .icon-arrow_right {
// background-image: url('../assets/icon/icon-arrow_right.png');
// }
.profile-container {
  box-sizing: border-box;
  padding-top: 0.74rem;
  padding-bottom: 2.31rem;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 6.8rem;
  background-color: $so-profile-bg;

  .profile-avatar {
    margin: 0 0.93rem 0 1.61rem;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 0.35rem;
    background: green;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    flex: 1;
    height: 3.75rem;

    .profile-name {
      color: $so-profile-name-color;
      font-weight: 500;
      font-size: 1.06rem;
    }

    .profile-more {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

      .profile-id {
        flex: 1;
        color: $so-profile-id-color;
        font-weight: normal;
        font-size: 0.85rem;
        text-align: left;
      }

      .profile-icon {
        margin-right: 0.76rem;
        width: 0.8rem;
        height: 0.8rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>