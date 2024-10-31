<template>
    <button class=" bg-zinc-50 py-1 px-2 rounded-lg text-blue-600 border shadow">
        <div class=" flex gap-1 items-center">
            <div class="w-4">
                <slot name="icon" />
            </div>
            <p class=" text-sm"> <slot name="name"/> </p>
        </div>
    </button>
</template>

<script setup>



</script>

