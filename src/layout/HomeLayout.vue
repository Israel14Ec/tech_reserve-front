<template>
    <div class="flex flex-col md:flex-row h-screen bg-white">
        <aside class=" md:w-1/3 w-full">
            <img src="/bg_image.webp" class=" w-full h-44 md:h-full object-cover">
        </aside>

        <div class="md:w-2/3 w-full flex justify-center items-center overflow-y-scroll">   
            <main class="w-3/4 xl:w-2/4">
                <RouterView/>
            </main>
        </div>
    </div>
</template>

<script setup>

import { RouterView } from 'vue-router'

</script>
