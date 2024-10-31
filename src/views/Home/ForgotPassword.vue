<template>
    <div>
        <RouterLink :to="{name: 'Login'}">
            <h1 class=" font-bold text-3xl text-gray-700">Recupera tu cuenta en <span class=" text-4xl text-blue-700">TechReserve</span></h1>
        </RouterLink>
       

        <form>
            <div class="container mt-10">
                <label for="email">Correo</label>
                <div class="container_button ">
                    <EnvelopeIcon class="w-5 mr-2" />
                    <input type="text" placeholder="Ingrese su correo" id="email" />
                </div>
            </div>
            <input type="submit" value="Enviar" class=" bg-gray-900 text-white rounded-lg w-full py-2 uppercase font-bold cursor-pointer">
        </form>       

        <div class=" mt-10 flex justify-between">
            <RouterLink :to="{ name: 'Login' }" class=" text-sm text-gray-500 hover:text-gray-300 font-bold">
                Regresar a inicio
            </RouterLink>

            <RouterLink :to="{ name: 'createAccount' }" class=" text-sm text-gray-500 hover:text-gray-300 font-bold">
                Crea una cuenta
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { EnvelopeIcon } from '@heroicons/vue/24/solid'

</script>
