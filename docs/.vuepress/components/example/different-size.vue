<template>
  <div class="inline-wrap">
    <SelectWrapper placeholder="Default Size">
      <div style="padding:0.4em 1em;">default size</div>
    </SelectWrapper>
    <SelectWrapper placeholder="Medium Size" size="medium">
      <div style="padding:0.4em 1em;">medium size</div>
    </SelectWrapper>
    <SelectWrapper placeholder="Small Size" size="small">
      <div style="padding:0.4em 1em;">small size</div>
    </SelectWrapper>
    <SelectWrapper placeholder="Mini Size" size="mini">
      <div style="padding:0.4em 1em;">mini size</div>
    </SelectWrapper>
  </div>
</template>

<script>
</script>

<style>
.inline-wrap > * {
  width: 160px;
  margin-right: 20px;
  display: inline-block;
}
</style>
