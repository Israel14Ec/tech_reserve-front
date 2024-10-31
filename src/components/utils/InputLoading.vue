<template>
    <div>
        <input 
            v-if="!loading"
            type="submit" 
            :value="text"
            class="input-loading"         
        />
        <div 
            v-else 
            class="input-loading "
        >
            <Spinner/>
        </div>
    </div>
</template>

<script setup>
import Spinner from '@/components/utils/Spinner.vue'

const props = defineProps({
    loading: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true
    }

})

</script>

<style scoped>

.input-loading {
    @apply bg-gray-900 text-white rounded-lg py-2 w-full uppercase font-bold cursor-pointer flex justify-center;

}
</style>