<template>
<!-- Pages/HomePage.vue -->
<div style="display: flex; font-size: x-large;">
    <div style="display: block;">
      <div>TODOリストを新しく作成</div>
      <div>
        <input type="text" v-model="createKeyword" placeholder="合言葉を入力">
        <button class="btn btn-primary" @click="createTodo">作成</button>
      </div>
    </div>
    <div style="display: block; margin-left: 200px;">
    <div>TODOリストを検索</div>
    <div>
        <input type="text" placeholder="合言葉を入力">
        <button class="btn btn-primary">検索</button>
      </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const createKeyword = ref('')

const createTodo = () => {
    if (createKeyword.value.trim()) {
        router.push({
            path: '/todo',
            query: { keyword: createKeyword.value }
        })
    }else{
      console.log('aaa')
    }
}
</script>