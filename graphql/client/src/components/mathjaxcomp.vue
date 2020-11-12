<template>
  <div>
    <textarea v-on:keyup.enter.ctrl="typeset3" title="type paragraph with mathematics, then press ctrl+enter"></textarea><br />
    <div class="mathjax-output"></div>
  </div>
</template>
<script id="MathJax-script" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  TeX: { extensions: ["mhchem.js"], mhchem: { legacy: false } },
});
</script>
<script>
export default {
  name: "mathjax-output",
  methods: {
    typeset2(ev) {
      var v = ev.target.value;
      var element = this.$el.getElementsByClassName("mathjax-output")[0];
      element.innerHTML = v;
      //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"mathjax-output"]);// work for MathJax 2.X, not work in MathJax 3.X
    },
    // http://docs.mathjax.org/en/latest/web/typeset.html#web-typeset MathJax Ver.3 
    typeset3(ev) {
      var v = ev.target.value;
      this.typeset(()=>{
          const math = this.$el.getElementsByClassName("mathjax-output")[0]
          math.innerHTML = v;
          return math;
      })
    },
    typeset(code) {
      MathJax.startup.promise = MathJax.startup.promise
        .then(() => {
          code();
          return MathJax.typesetPromise();
        })
        .catch((err) => console.log("Typeset failed: " + err.message));
      return MathJax.startup.promise;
    },
  },
};
</script>
