<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <div style="position: fixed; top: 0; left: 0; width: 100%;  border-bottom: 1px solid #ccc;">
    <h2>TODO Sharing</h2>
  </div>

  <div style="display: flex">
    <div style="display: block;">
      <div>TODOリストを新しく作成</div>
      <div>
        <input type="text" placeholder="合言葉を入力">
        <button class="btn btn-primary">作成</button>
      </div>
    </div>
    <div style="display: block;">
    <div>TODOリストを検索</div>
    <div>
        <input type="text" placeholder="合言葉を入力">
        <button class="btn btn-primary">検索</button>
      </div>
      </div>
  </div>


  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
