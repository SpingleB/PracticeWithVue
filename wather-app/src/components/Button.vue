<template>
    <button :type="buttonType" :class="className" @click="fn" :disabled="disabled"> <slot /> </button>
</template>

<script setup lang="ts">

    type ButtonType = 'button' | 'submit' | 'reset'

    interface ButtonProps {
        className: string
        buttonType: ButtonType
        fn?: () => void
        disabled?: boolean
    }

   const { className, buttonType, fn } = defineProps<ButtonProps>();
</script>