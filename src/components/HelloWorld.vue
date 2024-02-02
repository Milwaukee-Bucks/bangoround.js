<script setup lang="ts">
import { ref } from 'vue'
import {BangoRound} from '../../dist/bango-round.js';
import '../../dist/style.css';

defineProps<{ msg: string }>()

const slides = [
  { id: 1, title: 'Slide 1' },
  { id: 2, title: 'Slide 2' },
  { id: 3, title: 'Slide 3' },
]

const count = ref(0)
</script>

<template>
  <bango-round :slides="slides" min-width="350px" max-width="400px" :start-slide="nextGameIndex - 1" >
    <template #default="{ slide, index }">
      <div>{{slide}}</div>
    </template>
  </bango-round>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
