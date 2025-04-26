<template>
    <!-- Pages/TodoPage.vue -->
     <div style="margin-bottom: 350px;">
    <h2 style="color: aquamarine; margin-right:350px;">{{ TodoName }}</h2>

    <div class="TodoList" style="background-color: bisque; display: block; font-size: larger;">
        <div v-for="(item, index) in TodoItems" :key="index"
            style="display: flex; justify-content: space-between; align-items: center;">
            <div>{{ item }}</div>
            <div style="align-items: end;">
                <button class="btn btn-danger">削除</button>
            </div>
        </div>
    </div>
    <button class="btn btn-primary" @click="goBack">戻る</button>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const TodoName = ref('テストTODOname')
const TodoItems = ref([
    "タスク1",
    "タスク2",
    "タスク3",
])

onMounted(() => {
    const keyword = route.query.keyword as string
    if (keyword) {
        TodoName.value = keyword
    }
})

const goBack = () => {
    router.push('/')
}
</script>