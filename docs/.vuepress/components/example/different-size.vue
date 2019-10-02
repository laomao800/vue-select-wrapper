<template>
  <div class="inline-wrap">
    <select-wrapper placeholder="Default Size">
      <div style="padding:0.4em 1em;">default size</div>
    </select-wrapper>
    <select-wrapper placeholder="Medium Size" size="medium">
      <div style="padding:0.4em 1em;">medium size</div>
    </select-wrapper>
    <select-wrapper placeholder="Small Size" size="small">
      <div style="padding:0.4em 1em;">small size</div>
    </select-wrapper>
    <select-wrapper placeholder="Mini Size" size="mini">
      <div style="padding:0.4em 1em;">mini size</div>
    </select-wrapper>
  </div>
</template>

<style scoped>
.inline-wrap > * {
  width: 160px;
  margin-right: 10px;
  display: inline-block;
}
</style>
