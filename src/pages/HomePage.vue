<template>
    <!-- Pages/HomePage.vue -->
    <div style="display: flex; font-size: x-large;">
        <div style="display: block;">
            <div>TODOリストを新しく作成</div>
            <div>
                <input type="text" v-model="createKeyword" placeholder="TODOリスト名">
                <button class="btn btn-primary" @click="createTodo">作成</button>
            </div>
        </div>
        <div style="display: block; margin-left: 200px;">
            <div>TODOリストを検索</div>
            <div>
                <input type="text" v-model="searchKeyword" placeholder="TODOリスト名">
                <button class="btn btn-primary" @click="searchTodo">検索</button>
            </div>
        </div>
    </div>
    <ErrorModal :show="showErrorModal" :message="errorMessage" @close="showErrorModal = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ErrorModal from '@/components/ErrorModal.vue'
import axios from 'axios'
import { API_URL } from '@/constants/api'

const router = useRouter()
const createKeyword = ref('')
const searchKeyword = ref('')
const showErrorModal = ref(false)
const errorMessage = ref('')

const createTodo = async () => {
    if (createKeyword.value.trim()) {
        try {
            //API実行
            const createResponse = await axios.post(`${API_URL}todo-lists`, {
                list_name: createKeyword.value
            })

            if (createResponse.data.result === 1) {
                //成功の場合
                router.push({
                    path: '/todo',
                    query: { keyword: createKeyword.value,
                        list_id: createResponse.data.list_id,
                     }
                })
            } else if (createResponse.data.result === 0) {
                //既に存在した場合
                errorMessage.value = '既にその名前は使用されています'
                showErrorModal.value = true
            } else {
                errorMessage.value = 'エラーが発生しました'
                showErrorModal.value = true
            }

        } catch {
            errorMessage.value = 'エラーが発生しました'
            showErrorModal.value = true
        }
    } else {
        //何も入力されていない
        errorMessage.value = '名前を入力してください'
        showErrorModal.value = true
    }
}

const searchTodo = async () => {
    if (searchKeyword.value.trim()) {
        try {
            const searchResponse = await axios.get(`${API_URL}todo-contents`, {
                params: {
                    list_name: searchKeyword.value
                }
            })
            if (searchResponse.data.result === 0) {
                errorMessage.value = 'TODOリストが見つかりません'
                showErrorModal.value = true
            } else if (searchResponse.data.result === 1) {
                router.push({
                    path: '/todo',
                    query: {
                        keyword: searchKeyword.value,
                        list_id: searchResponse.data.list_id,
                        content_data: JSON.stringify(searchResponse.data)
                    }
                })
            }
        } catch {
            errorMessage.value = 'エラーが発生しました'
            showErrorModal.value = true
        }
    } else {
        //何も入力されていない
        errorMessage.value = '名前を入力してください'
        showErrorModal.value = true
    }
}
</script>
<style>
body {
    background: linear-gradient(90deg, #8ab7f6 0%, #3484f4 100%);
    color: azure;
}
</style>