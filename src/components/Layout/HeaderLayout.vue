<template>
    <div class=" flex justify-between items-center gap-2 md:gap-10">
        <!--Sección uno-->
        <div class=" w-2/6 md:w-1/5">
            <div class=" flex md:justify-between items-center gap-2">
                <div class=" flex flex-row items-center gap-3 justify-center">
                    <div class=" relative">
                        <button v-if="!isLargeWindowVisible" @click.stop="isVisibleAside = !isVisibleAside">
                            <Bars4Icon class="w-5  text-gray-700" />
                        </button>
                        <aside v-if="!isLargeWindowVisible && isVisibleAside" 
                            ref="asideOpen"
                            class=" p-3 flex flex-col h-screen absolute top-10 -left-3 bg-gray-100 shadow-xl"
                        >
                            <div class="rounded-md">
                                <div class="rounded-lg py-5">
                                    <div class="w-full xl:w-4/5 mx-auto">
                                        <IconLink 
                                            v-for="option in routeOptions" 
                                            :key="option.id" 
                                            :route-option="option"
                                            @click="isVisibleAside = false"
                                        />
                                    </div>
                                </div>
                            </div>
                            <FooterLayout />
                        </aside>
                    </div>
                    <!--Imagen de perfil-->
                    <div>
                        <div
                            class=" w-10 h-10 rounded-full ring-1 ring-gray-400 bg-gray-100 flex justify-center items-center cursor-pointer">
                            {{ `${getFirstLetter(authStore.userData.name)}${getFirstLetter(authStore.userData.last_name)}` }} 
                        </div>
                    </div>
                    <div v-if="isLargeWindowVisible">
                        <p  class=" font-semibold tracking-wide text-gray-600 text-lg"> 
                            {{ `${authStore.userData.name} ${authStore.userData.last_name}` }} 
                        </p>
                        <p class=" text-xs text-gray-500"> {{ authStore.userData.email }} </p>
                    </div>
                </div>

                <div class="relative" ref="navbarHeader" >
                    <button @click.stop="showMenu =!showMenu">
                        <div class="w-5 text-gray-600" >
                            <ChevronDownIcon v-if="!showMenu"/>
                            <ChevronUpIcon v-else />
                        </div>
                    </button>
                    <div 
                        v-if="showMenu" 
                        class=" absolute bg-zinc-200 rounded-lg p-2 w-60 shadow-md"
                    >
                        <button 
                            class="option_text"
                            @click="authStore.logout()"
                            >Cerrar sesión
                        </button>
                    </div>  
                </div>
            </div>
        </div>

        <!--Buscador-->
        <div class="w-4/6 md:w-3/5">
            <div class=" flex flex-row gap-2">
                <MagnifyingGlassIcon class="w-6 text-blue-700" />
                <input type="text" class="w-full px-5 py-1 bg-gray-100 rounded-lg text-gray-500 outline-none"
                    placeholder="Busqueda rápida" />
            </div>
        </div>

        <!--Sección tres-->
        <div class="w-1/6 md:w-1/5 flex justify-end">
            <BellIcon class="w-7 text-blue-700" />
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted, watch } from 'vue'
import { AuthStore } from '@/stores/Auth'
import { getFirstLetter } from '@/helpers/utils';
import { ChevronDownIcon, MagnifyingGlassIcon, BellIcon, ChevronUpIcon, Bars4Icon} from '@heroicons/vue/24/solid'
import IconLink from '../utils/IconLink.vue';
import FooterLayout from './FooterLayout.vue';

const navbarHeader = ref(null)
const asideOpen = ref(null)
const showMenu = ref(false)
const authStore = AuthStore()
const isVisibleAside = ref(false)

const props = defineProps({
    isLargeWindowVisible: {
        type: Boolean,
        required: true
    },
    routeOptions: {
        type: Array,
        required: true
    }
})

//Emit para aplicar blur en el main
const emit = defineEmits(['isBlurActive'])
 
//Función a emitir
const blurActive = () => {
    emit('isBlurActive', isVisibleAside.value ? true : false);
}

const closeNavBar = (event) => {    
    if (navbarHeader.value && !navbarHeader.value.contains(event.target)) {
        showMenu.value = false
    }
}

const closeAside = (event) => {
    if(asideOpen.value && !asideOpen.value.contains(event.target)) {
        isVisibleAside.value = false
    }
}

onMounted( () => {
    document.addEventListener('click', closeNavBar)
    document.addEventListener('click', closeAside)
})

onUnmounted( () => {
    document.removeEventListener('click', closeNavBar)
    document.removeEventListener('click', closeAside)
})

watch(isVisibleAside ,() => {
    blurActive()
})


</script>


<style scoped>

.option_text {
    @apply text-gray-700 text-sm hover:text-blue-700 w-full py-1;
}

</style>