<template>
    <div class=" bg-white px-4 py-2 flex justify-between border-b-2 border-gray-300">
        <h2 class=" font-medium text-xl text-gray-700">Administrar laboratorios</h2>
        <ButtonIcon @click="dialog = true">
            <template #icon> <PlusIcon/> </template>
            <template #name>Agregar laboratorio</template>
        </ButtonIcon>
    </div>

    <div class=" flex flex-col md:flex-row gap-2">
        <div class="md:w-1/3 overflow-y-auto bg-gray-100 p-2">
            <h2 class=" text-center my-5 text-xl text-gray-700 font-bold">Lista de laboratorios</h2>
            <div v-if="!computerLab.loadingComputerLabs"> 
                <ListComputerLab 
                    v-for="computer in computerLab.computerLabs" 
                    :key="computer.id" 
                    :computer-lab="computer" 
                />
            </div>
            <div v-else>
                <SpinnerBlack />
            </div>
            
        </div>

        <div class=" md:w-2/3 bg-gray-100 h-screen">
            <h2 class=" text-blue-700 my-5 text-xl text-center font-bold">Horararios</h2>
            <div v-if="!isOnManageSchedules" class="px-5">
                <p class=" text-gray-400 font-medium text-center text-sm">Seleccione un laboratorio para gestionar los horarios</p>
            </div>
            <div class="px-5">
                <RouterView />
            </div>
        </div>
    </div>

    <!--MODAL PARA AGREGAR-->
    <v-dialog max-width="500" v-model="dialog">
        <v-card
        max-width="500"
        title="Agregar laboratorio"
      >
        <v-card-text>
            <Form class=" mt-5" :validation-schema="computerLabsSchema" @submit="handleSubmit">
                <div class="container">
                    <label for="name">Nombre: </label>
                    <div class="container_button ">
                        <BuildingOfficeIcon class="w-5 mr-2" />
                        <Field type="text" placeholder="Ingrese el nombre de la librería" name="name" id="name" />
                    </div>
                    <ErrorMessage name="name" class="error"/>
                </div>

                <div class="container">
                    <label for="ability">Capacidad de estudiantes: </label>
                    <div class="container_button ">
                        <UserGroupIcon class="w-5 mr-2" />
                        <Field type="number" placeholder="Ingrese la capacidad de estudiantes" name="ability" id="ability" />
                    </div>
                    <ErrorMessage name="ability" class="error"/>
                </div>

                <div class="container">
                    <label for="equipment">Equipos disponibles: </label>
                    <div class="container_button ">
                        <ComputerDesktopIcon class="w-5 mr-2" />
                        <Field type="number" placeholder="Ingrese la cantidad de equipos" name="equipment" id="equipment" />
                    </div>
                    <ErrorMessage name="equipment" class="error"/>
                </div>

                <div class="container">
                    <label for="location">Ubicación: </label>
                    <div class="container_button ">
                        <MapPinIcon class="w-5 mr-2" />
                        <Field as="textarea" class="w-full outline-none" placeholder="Ingrese la cantidad de equipos" name="location" id="location" />
                    </div>
                    <ErrorMessage name="location" class="error"/>
                </div>
         
                <InputLoading :loading="false" text="Agregar"/>
            </Form>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script setup>

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ButtonIcon from '@/components/utils/ButtonIcon.vue'
import { BuildingOfficeIcon, ComputerDesktopIcon, MapPinIcon, PlusIcon, UserGroupIcon } from '@heroicons/vue/24/solid';
import { Form, Field, ErrorMessage } from 'vee-validate'
import { computerLabsSchema } from '@/schemas/computerLabs';
import InputLoading from '@/components/utils/InputLoading.vue';
import { useComputerLabStore } from '@/stores/ComputerLab'
import ListComputerLab from '@/components/ManageLabs/ListComputerLab.vue';
import { RouterView } from 'vue-router';
import SpinnerBlack from '@/components/utils/SpinnerBlack.vue';

const computerLab = useComputerLabStore()
const dialog = ref(false)
const route = useRoute()

const handleSubmit = (dataForm, {resetForm }) => {
    computerLab.create(dataForm)
    dialog.value = false
    resetForm()
}

const isOnManageSchedules = computed(() => {
  const pathMatches = route.path.includes('/laboratorios/horarios/')
  const hasId = !!route.params.idComputerLab;
  return pathMatches && hasId;
});


</script>