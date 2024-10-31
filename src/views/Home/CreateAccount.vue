<template>
    <div >
        <RouterLink :to="{name: 'Login'}">
            <h1 class=" font-bold text-3xl text-gray-700">Crea una cuenta en <span class=" text-4xl text-blue-700">TechReserve</span></h1>
        </RouterLink>
    
        <Form class=" mt-10" :validation-schema="schema" @submit="onSubmit">

            <div class=" flex flex-col xl:flex-row xl:gap-5">
                
                <div class="container">
                    <label for="name">Nombre: </label>
                    <div class="container_button ">
                        <UserIcon class="w-5 mr-2" />
                        <Field type="text" placeholder="Ingrese su nombre" name="name" id="name" />
                    </div>
                    <ErrorMessage name="name" class="error" />
                </div>

                <div class="container">
                    <label for="last_name">Apellido: </label>
                    <div class="container_button ">
                        <UserIcon class="w-5 mr-2" />
                        <Field type="text" placeholder="Ingrese su apellido" name="last_name" id="last_name" />
                    </div>
                    <ErrorMessage name="last_name" class="error" />
                </div>
            </div>

            <div class="container">
                <label for="email">Correo</label>
                <div class="container_button ">
                    <EnvelopeIcon class="w-5 mr-2" />
                    <Field type="tel" placeholder="Ingrese su nombre" name="email" id="email"/>
                </div>
                <ErrorMessage name="email" class="error" />
            </div>


            <div class="container">
                <label for="cell_number">Celular</label>
                <div class="container_button ">
                    <DevicePhoneMobileIcon class="w-5 mr-2" />
                    <Field type="tel" placeholder="Ingrese su celular" name="cell_number" id="cell_number"/>
                </div>
                <ErrorMessage name="cell_number" class="error" />
            </div>

            <div class="container">
                <label for="password">Contraseña</label>
                <div class="container_button ">
                    <button  class="w-5 mr-2" @click.prevent="passwordVisibility">
                        <EyeSlashIcon v-if="eyeSlash"/>
                        <EyeIcon v-else/>
                    </button>
       
                    <Field :type="[eyeSlash ? 'password' : 'text']" placeholder="Ingrese tu cotraseña" name="password" id="password" autocomplete="on"/>
                </div>
                <ErrorMessage name="password" class="error" />
            </div>
            
            <InputLoading :loading="userStore.loadingAction" :text="Crear"/>


        </Form>

        <div class=" mt-5 flex justify-between">
            <RouterLink :to="{name:'Login'}" class="link_account">
                Regresa a inicio
            </RouterLink>

            <RouterLink :to="{ name: 'forgotPassword' }" class="link_account">
                ¿Olvidaste tu contraseña?
            </RouterLink>
        </div>

    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useUserStore } from '@/stores/User'
import { UserIcon, EyeSlashIcon, EyeIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/vue/24/solid'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import InputLoading from '@/components/utils/InputLoading.vue'

const userStore = useUserStore()

//Contraseña
const eyeSlash = ref(true)
const passwordVisibility = () => eyeSlash.value = !eyeSlash.value



// validacion de yup
const schema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    last_name: yup.string().required("El apellido es obligatorio"),
    cell_number: yup.string()
        .required("El número de celular es obligatorio")
        .matches(/^\d{10}$/, "El número de celular debe tener exactamente 10 dígitos"),
    email: yup.string()
        .required("El email es obligatorio")
        .email("Debe ingresar un correo electrónico válido"),
    password: yup.string().required('Debe ingresar una contraseña')
});

//Enviar al formulario
const onSubmit = async (formValues, {resetForm }) => {
    try {
        formValues.role='teacher'    
        await userStore.createAccount(formValues)
        resetForm(); //Reinicia el formulario
    } catch (error) {
        console.log(error);
    }
};


</script>

