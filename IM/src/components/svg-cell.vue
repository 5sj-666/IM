<template>
  <section>

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="0 0 100 100" v-if="type === 'CHATS'">
      <path d="M18 78 A 48 40, 0, 1, 1, 27 83.2 L 12 92Z" :fill="bgcolor" :stroke="color" style="stroke-width: 6;" />
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="-2 2 117 100" v-if="type === 'CONTACTS'">
      <path d="M4 98
            L 98 98
            Q 100 94, 94 90
            L 65 70
            Q 54 62, 60 55
            C 68 48, 70 45, 70 25
            C 68 -5, 32 -5, 30 25
            C 30 45, 32 48,  40 55
            Q 46 62, 35 70
            L 6 90
            Q 0 94, 2 98
            Z
        "
        :fill="bgcolor" 
        :stroke="color"
        style="stroke-width: 6;"
        stroke-linecap="round"
      />

      <line x1="80" y1="35" x2="120" y2="35" :stroke="color" stroke-width="6"/>
      <line x1="90" y1="52.5" x2="120" y2="52.5" :stroke="color" stroke-width="6"/>
      <line x1="100" y1="70" x2="120" y2="70" :stroke="color" stroke-width="6"/>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="0 0 100 100" v-if="type === 'DISCOVER'">
      <circle cx="50" cy="50" r="46.5" :fill="bgcolor" :stroke="color" stroke-width="6"  />
      <polygon points="25,75 40,40 75,25 60,60" fill="#f7f7f7" :stroke="color" style="stroke-width:4;"/>
    </svg>


    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.4rem" height="1.4rem" style="background: transparent" viewBox="-2 -2 103 103" v-if="type === 'ME'">
      <path d="M4 98
            L 98 98
            Q 100 94, 94 90
            L 65 70
            Q 54 62, 60 55
            C 68 48, 70 45, 70 25
            C 68 -5, 32 -5, 30 25
            C 30 45, 32 48,  40 55
            Q 46 62, 35 70
            L 6 90
            Q 0 94, 2 98
            Z
        "
        :fill="bgcolor" 
        :stroke="color"
        style="stroke-width: 6;"
        stroke-linecap="round"
      />
    </svg>

  </section>
</template>

<script>
export default {
  name: "SvgCell",
  props: {
    type: {
      type: String,
      default: "CHATS" //["CHATS","CONTACTS","DISCOVER","ME"]
    },
    color: {
      type: String,
      default: "#000"
    },
    bgcolor: {
      type: String,
      default: "#00f"
    },
    tabBG: {
      type: String,
      default: "#f7f7f7"
    }
  },
  setup() {
    // console.log("svg-cell: props", props);
  }
};
</script>

<style scoped></style>