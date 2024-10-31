<template>
    <button class=" bg-gray-700 hover:bg-gray-500 text-xs font-semibold rounded-lg text-white px-3 py-2 ">
        <div class=" flex gap-1 justify-center items-center">
            <div class=" w-4">
                <slot></slot>
            </div>
            <slot name="title"></slot>
        </div>
    </button>
</template>

