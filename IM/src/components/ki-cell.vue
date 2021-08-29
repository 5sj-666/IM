<template>
  <section class="ki-cell" :style="{filter: disable ? 'grayscale(100%)' : ''}">
    <div class="ki-cell-img_container" :style="{ width: iconWidth + 'rem'}">
      <slot>
        <!-- <img class="ki-cell-img_default" src="../assets/icon/me-smile.png" alt="default" /> -->
      </slot>
    </div>
    <div class="ki-cell-content" :class="{'border-line_bottom': !isLast }">
      <span class="ki-cell-name">{{ name }}</span>

      <div class="ki-cell-ad-container" v-if="!!adTitle">
        <span>{{ adTitle }}</span>
        <div class="unread-mark">
          <slot name="SoAdImg">
            <!-- <img src="../assets/icon/me-pay.png" style="width:1.6rem;height:1.6rem" alt /> -->
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" style="bwidth: 1.5rem; height: 1.5rem;">
              <g fill="transparent" stroke="orange" stroke-width="5" stroke-lineCap="round">
                <circle cx=50 cy=50 r=47 ></circle>
                <line id="minute" x1="50"  y1="15" x2="50" y2="50" />
                <line id="second" x1="85"  y1="50" x2="50" y2="50" />
              </g>
            </svg>
          </slot>
        </div>
      </div>

      <!-- <span class="ki-cell-icon so-icon-arrow_right" v-if="showNextIcon"></span> -->
      <svg class="ki-cell-icon" v-if="showNextIcon" xmlns="http://www.w3.org/2000/svg" version="1.1"  viewBox="0 0 100 100">
        <polyline points="25,2 75,50 25,98" style="stroke: var(--svg-arrow_stroke)" stroke-width="5" fill="transparent" stroke-linecap="round"/>;
      </svg>
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
    },
    disable: {
      type: Boolean,
      default: false,
      description: "置灰并不可操作"
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
  /* --ki-cell-bg: #FFF; */
  /* --ki-color_primary:  #0d0d0d;
  --ki-color_secondary: #7e7e7e; */

  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 3.3rem;
  background-color: var(--ki-cell-bg, #000);
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
  /* color: var(--ki-cell-name-color); */
  color: var(--ki-color_primary);
  font-size: 0.95rem;
}

.ki-cell-ad-container {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  align-items: center;
  font-size: 0.8rem;
  color: var(--ki-color_secondary);
}

.ki-cell-icon {
  margin: 0 0.76rem;
  width: 0.8rem;
  height: 0.8rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* stroke:  */
  stroke: var(--svg-arrow_stroke);
}


</style>