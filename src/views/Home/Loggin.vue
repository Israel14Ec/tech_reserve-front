<template>
    <div>
        <h1 class=" font-bold text-3xl text-gray-700">Inicia sesión en <span
                class=" text-4xl text-blue-700">TechReserve</span></h1>
        <p class=" text-gray-700">Ingresa tu correo y contraseña</p>

        <Form class=" mt-10" :validation-schema="schema" @submit="onSubmit">


            <div class="container">
                <label for="email">Correo</label>
                <div class="container_button ">
                    <LockClosedIcon class="w-5 mr-2" />
                    <Field type="email" placeholder="Ingrese su correo" name="email" id="email" />
                </div>
                <ErrorMessage name="email" class="error" />
            </div>


            <div class="container">
                <label for="password">Contraseña</label>
                <div class="container_button ">
                    <button class="w-5 mr-2" @click.prevent="passwordVisibility">
                        <EyeSlashIcon v-if="eyeSlash" />
                        <EyeIcon v-else />
                    </button>

                    <Field :type="[eyeSlash ? 'password' : 'text']" placeholder="Ingrese tu cotraseña" name="password"
                        id="password" autocomplete="on"/>
                </div>
                <ErrorMessage name="password" class="error" />
            </div>

            <input type="submit" value="Ingresar"
                class=" bg-gray-900 text-white rounded-lg w-full py-2 uppercase font-bold cursor-pointer" />


        </Form>

        <div class=" mt-10 flex justify-between">
            <RouterLink :to="{ name: 'createAccount' }" class=" text-sm text-gray-500 hover:text-gray-300 font-bold">
                ¿No tienes cuenta?
            </RouterLink>

            <RouterLink :to="{ name: 'forgotPassword' }" class="text-sm text-gray-500 hover:text-gray-300 font-bold">
                ¿Olvidaste tu contraseña?
            </RouterLink>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/vue/24/solid'
import { RouterLink } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { AuthStore } from '@/stores/Auth'

const eyeSlash = ref(true)
const auth = AuthStore()

const passwordVisibility = () => {
    eyeSlash.value = !eyeSlash.value
}

// Schema de validacion de yup
const schema = yup.object().shape({
    email: yup.string().required("El correo es obligatorio").email("Debe ser un correo válido"),
    password: yup.string().required("La contraseña es obligatoria")
});

const onSubmit = async (values, {resetForm}) => {
    try {
        await auth.login(values)
        resetForm()
    } catch (error) {
        console.log(error);
    }
};

</script>
