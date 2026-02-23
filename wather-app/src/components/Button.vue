<template>
    <button :type="buttonType" :class="className" @click="fn" > <slot /> </button>
</template>

<script setup lang="ts">

    type ButtonType = 'button' | 'submit' | 'reset'

    interface ButtonProps {
        className: string
        buttonType: ButtonType
        fn?: () => void
    }

   const { className, buttonType, fn } = defineProps<ButtonProps>();
</script>