<template lang="pug">

    .pagination

        ul.numbers
            li
                a.prev(@click="nextPrev(Number(source.page) - 1)", :class="{ disable: source.page == 1 }") «

            li(v-for="page in pages")

                a(@click="navigate(page)", :class="{ current: source.page == page }") {{ page }}

            li
                a.next(@click="nextPrev(Number(source.page) + 1)", :class="{ disable: source.page == source.lastPage }") »

</template>

<script>
export default {

  props: ['source'],

  data() {
    return {
      pages: [],
    };
  },

  watch: {
    source() {
      this.pages = Array(...{ length: this.source.lastPage }).map((value, index) => index + 1);
    },
  },

  methods: {
    nextPrev(page) {
      if (page == 0 || page == this.source.lastPage + 1) return;
      this.navigate(page);
    },
    navigate(page) {
      this.$emit('navigate', page);
    },
  },

};
</script>
