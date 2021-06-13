<template>
  <article class="charts-container">
    <div>Chats</div>
    <!-- <div class="chat-cell">
      <div class="chat-cell-avatar">
        <img src="../../assets/img/avatar.jpg" alt />
      </div>
      <div class="chat-cell-content-container">
        <div class="chat-cell-title">title</div>
        <div class="chat-cell-content">contentcontentcontentcontentcontentcontentcontentcontent</div>
      </div>
      <div class="chat-cell-time">早上8:58</div>
    </div> -->
  </article>
</template>

<script>
export default {
  name: "Chats",
  setup() {}
};
</script>

<style lang="stylus" scoped>
$charts-container-bg = #ededed;
// chat-cell
$chat-cell-bg = #fff;
// title
$chat-cell-title-color = #0f0f0f;
$chat-cell-title-bg = transparent;
// content
$chat-cell-content-container-bg = #fff;
$chat-cell-content-color = #a4a4a4;
$chat-cell-content-bg = transparent;
// time
$chat-cell-time-bg = transparent;
$chat-cell-time-color = #a4a4a4;

.charts-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: $charts-container-bg;

  .chat-cell {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4.2rem;
    background: $chat-cell-bg;

    .chat-cell-avatar {
      box-sizing: border-box;
      padding-left: 0.26rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.43rem;
      height: 100%;

      img {
        width: 2.82rem;
        height: 2.82rem;
        border-radius: 0.26rem;
      }
    }

    .chat-cell-content-container {
      box-sizing: border-box;
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      min-width: 50%;
      height: 100%;
      background: $chat-cell-content-container-bg;

      mixin-test-overflow() {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .chat-cell-title {
        text-align: left;
        font-size: 0.95rem;
        color: $chat-cell-title-color;
        background-color: $chat-cell-title-bg;
        mixin-test-overflow();
      }

      .chat-cell-content {
        text-align: left;
        font-size: 0.76rem;
        color: $chat-cell-content-color;
        background-color: $chat-cell-content-bg;
        mixin-test-overflow();
      }
    }

    .chat-cell-time {
      padding: 0.9rem 0.95rem 0 0.1rem;
      align-self: flex-start;
      font-size: 0.67rem;
      background: $chat-cell-time-bg;
      color: $chat-cell-time-color;
    }
  }
}
</style>
