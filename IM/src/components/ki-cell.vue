<template>
  <section class="ki-cell">
    <div class="ki-cell-img_container" :style="{ width: iconWidth + 'rem'}">
      <slot>
        <img class="ki-cell-img_default" src="../assets/icon/me-smile.png" alt="default" />
      </slot>
    </div>
    <div class="ki-cell-content" :class="{'border-line_bottom': !isLast }">
      <span class="ki-cell-name">{{ name }}</span>

      <div class="ki-cell-ad-container" v-if="!!adTitle">
        <span>{{ adTitle }}</span>
        <div class="unread-mark">
          <slot name="SoAdImg">
            <img src="../assets/icon/me-pay.png" style="width:1.6rem;height:1.6rem" alt />
          </slot>
        </div>
      </div>

      <span class="ki-cell-icon so-icon-arrow_right" v-if="showNextIcon"></span>
    </div>
  </section>
</template>

<script>
export default {
  name: "KiCell",
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

<style scoped>

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

.ki-cell {
  --ki-cell-bg: #fff;
  --ki-cell-name-color: #0d0d0d;
  --ki-cell-ad-color: #7e7e7e;

  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 3.3rem;
  background-color: var(--ki-cell-bg);
  overflow: hidden;

}


.ki-cell-img_container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 3.3rem;
  height: 100%;
}

.ki-cell-img_default {
  width: 1.6rem;
  height: 1.6rem;
}

.ki-cell-content {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    min-width: 5rem;
    height: 99%;
    max-height: 99%;
}

.ki-cell-name {
  color: var(--ki-cell-name-color);
  font-size: 0.95rem;
}

.ki-cell-ad-container {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  align-items: center;
  font-size: 0.8rem;
  color: var(ki-cell-ad-color);
}

.ki-cell-icon {
  margin: 0 0.76rem;
  width: 0.8rem;
  height: 0.8rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}


</style>