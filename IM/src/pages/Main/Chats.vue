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

<style scoped>


.charts-container {
  --charts-container-bg: #ededed;
  --chat-cell-bg: #fff;
  --chat-cell-title-color: #0f0f0f;
  --chat-cell-title-bg: transparent;
  --chat-cell-content-container-bg: #fff;
  --chat-cell-content-color: #a4a4a4;
  --chat-cell-content-bg: transparent;
  --chat-cell-time-bg: transparent;
  --chat-cell-time-color: #a4a4a4;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: var(--charts-container-bg);
}

.chat-cell {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.2rem;
  background: var(--chat-cell-bg);
}

.chat-cell-avatar {
  box-sizing: border-box;
  padding-left: 0.26rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.43rem;
  height: 100%;
}

img {
  width: 2.82rem;
  height: 2.82rem;
  border-radius: 0.26rem;
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
  background: var(--chat-cell-content-container-bg);
}

.chat-cell-title {
  text-align: left;
  font-size: 0.95rem;
  color: var(--chat-cell-title-color);
  background-color: var(--chat-cell-title-bg);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.chat-cell-content {
  text-align: left;
  font-size: 0.76rem;
  color: var(--chat-cell-content-color);
  background-color: var(--chat-cell-content-bg);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.chat-cell-time {
  padding: 0.9rem 0.95rem 0 0.1rem;
  align-self: flex-start;
  font-size: 0.67rem;
  background: var(--chat-cell-time-bg);
  color: var(--chat-cell-time-color);
}

</style>
