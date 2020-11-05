<template>
  <Chefcomp  :id="id" />
</template>

<script>
import Chefcomp from "@/components/Chefcomp.vue";

export default {
  data() {
    return {
      id:this.$route.params.id
    };
  },
  components: {
    Chefcomp
  }

};
</script>

<style scoped></style>
