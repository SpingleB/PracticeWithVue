<template>
    <section v-if="isWarningShown" :class="isWarningClassActive ? 'warning-sec warning-active' : 'warning-sec'" aria-labelledby="warning">
        <h2 id="warning" class="montserrat-preset-2-regular">
            <p>
                <b>Warning:</b> Store discounts are not included, all prices listed in the product listing are full prices. You can find out about the discount on an item by clicking on the link to the item in the store.
            </p>
            <p>
                <b>Warning:</b> The application calculates whole liters, meaning it cannot calculate non-whole numbers, such as 1.5 liters!
            </p>
        </h2>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

    let isWarningShown = ref<boolean>(false)
    let isWarningClassActive = ref<boolean>(false)

    setTimeout( () => {
        isWarningShown.value = true

        setTimeout(() => {
            isWarningClassActive.value = true
        }, 500);

        setTimeout ( () => {
            isWarningClassActive.value = false
            setTimeout( () => {
                isWarningShown.value = false
            }, 500 )
        }, 4000)
        
    }, 1000 )
</script>

<style lang="scss" scoped>
    .warning-sec {
        position: absolute;
        top: 0;
        max-width: 650px;
        z-index: 999;
        display: flex;
        justify-content: start;
        align-items: center;
        color: #D97706;
        background: rgba(217, 119, 6, 0.12);
        border: 1px solid rgba(217, 119, 6, 0.35);
        backdrop-filter: blur(6px);
        border-radius: 12px;
        padding: 12px 16px;
        transition: var(--very-fast);
        opacity: 0;
    }

    h2 {
        display: flex;
        flex-direction: column;
    }

    .warning-active {
        opacity: 1;
        top: 20px;
    }
</style>