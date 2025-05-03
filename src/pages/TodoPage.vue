<template>
    <!-- Pages/TodoPage.vue -->
    <div style="margin-bottom: 350px;">
        <h1 style="color:aliceblue; margin-right:350px;">{{ TodoName }}</h1>

        <div v-if="notContent === false">
            タスクがありません
        </div>
        <div class="TodoList" style=" display: block; font-size: larger; ">
            <div v-for="item in TodoItems" :key="item.content_id"
                style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                <div>{{ item.content_name }}</div>
                <div style="align-items: end;">
                    <button class="btn btn-danger" @click="deleteTask(item.content_id)">削除</button>
                </div>
            </div>
        </div>
        <button class="btn btn-primary" @click="goBack">戻る</button>
        <div>
            <input type="text" v-model="addTaskWord" placeholder="買い物に行く">
            <button class="btn btn-primary" @click="addTask">タスク追加</button>
        </div>
    </div>
    <ErrorModal :show="showErrorModal" :message="errorMessage" @close="showErrorModal = false" />

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ErrorModal from '@/components/ErrorModal.vue'
import axios from 'axios'
import { API_URL } from '@/constants/api'

interface TodoItem {
    content_id: number
    content_name: string
}

const router = useRouter()
const route = useRoute()
const TodoName = ref('')
const TodoItems = ref<TodoItem[]>([])
const notContent = ref(false);
const addTaskWord = ref('');
const showErrorModal = ref(false)
const errorMessage = ref('')
const listId = ref('')

onMounted(() => {
    const keyword = route.query.keyword as string
    if (keyword) {
        TodoName.value = keyword
    }
    const contentData = route.query.content_data
    if (contentData) {
        const parsedData = JSON.parse(contentData as string)
        if (parsedData.data && parsedData.data.length > 0) {
            notContent.value = true
            TodoItems.value = parsedData.data
        } else {
            notContent.value = false
            TodoItems.value = []
        }
    }
    const listIdFromQuery = route.query.list_id
    if (listIdFromQuery) {
        listId.value = listIdFromQuery as string
    }
})

const addTask = async () => {
    if (addTaskWord.value) {
        try {
            await axios.post(`${API_URL}todo-contents`, {
                list_id: listId.value,
                content_name: addTaskWord.value
            })

            // タスク追加後に最新のタスクリストを取得
            const listResponse = await axios.get(`${API_URL}todo-contents`, {
                params: {
                    list_name: TodoName.value
                }
            })
            TodoItems.value = listResponse.data.data
            notContent.value = true
            addTaskWord.value = '' // 入力フィールドをクリア
        } catch {
            errorMessage.value = 'エラーが発生しました'
            showErrorModal.value = true
        }
    } else {
        errorMessage.value = 'タスクを入力してください'
        showErrorModal.value = true
    }
}

const deleteTask = async (contentId: number) => {
    try {
        await axios.delete(`${API_URL}todo-contents`, {
            params: {
                content_id: contentId
            }
        })
        // タスク削除後に最新のタスクリストを取得
        const listResponse = await axios.get(`${API_URL}todo-contents`, {
            params: {
                list_name: TodoName.value
            }
        })
        TodoItems.value = listResponse.data.data
        if (TodoItems.value.length === 0) {
            notContent.value = false
        }
    } catch {
        errorMessage.value = 'エラーが発生しました'
        showErrorModal.value = true
    }
}

const goBack = () => {
    router.push('/')
}
</script>