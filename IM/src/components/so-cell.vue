<!-- <section class="so-cell">
    <div class="so-cell-img">img</div>
    <div class="so-cell-content">
      <span class="so-cell-name">支付</span>
      <span class="so-cell-icon">A</span>
    </div>
</section>-->
<template>
  <section class="so-cell">
    <div class="so-cell-img_container" :style="{ width: iconWidth + 'rem'}">
      <slot>
        <img class="so-cell-img_default" src="../assets/icon/me-smile.png" alt="default" />
      </slot>
    </div>
    <div class="so-cell-content" :class="{'border-line_bottom': !isLast }">
      <span class="so-cell-name">{{ name }}</span>

      <div class="so-cell-ad-container" v-if="!!adTitle">
        <span>{{ adTitle }}</span>
        <div class="unread-mark">
          <slot name="SoAdImg">
            <img src="../assets/icon/me-pay.png" style="width:1.6rem;height:1.6rem" alt />
          </slot>
        </div>
      </div>

      <span class="so-cell-icon so-icon-arrow_right" v-if="showNextIcon"></span>
    </div>
  </section>
</template>

<script>
export default {
  name: "SoCell",
  props: {
    name: {
      type: String,
      default: "default"
    },
    adTitle: {
      type: String,
      default: ""
    },
    showNextIcon: {
      type: Boolean,
      default: true
    },
    iconWidth: {
      type: String,
      default: "3.3"
    },
    isLast: {
      type: Boolean,
      default: false,
      description: "为最后一个元素时，是否需要下边框"
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../css/icons.styl';
@import '../css/common.styl';
@import '../css/variable.styl';

// $so-cell-bg = #fff;
// $so-cell-name-color = #0d0d0d;
$so-cell-ad-color = #7e7e7e;

.unread-mark {
  position: relative;
}

.unread-mark:after {
  content: '';
  position: absolute;
  right: -0.25rem;
  top: -0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #f65450;
  border-radius: 50% 50%;
}

.so-cell {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 3.3rem;
  background-color: $so-cell-bg;
  overflow: hidden;

  .so-cell-img_container {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 3.3rem;
    height: 100%;

    .so-cell-img_default {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  .so-cell-content {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    min-width: 5rem;
    height: 99%;
    max-height: 99%;

    .so-cell-name {
      color: $so-cell-name-color;
      font-size: 0.95rem;
    }

    .so-cell-ad-container {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      align-items: center;
      font-size: 0.8rem;
      // background-color: yellow;
      color: $so-cell-ad-color;
    }

    .so-cell-icon {
      margin: 0 0.76rem;
      width: 0.8rem;
      height: 0.8rem;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>