<template>
    <section class="main-sec">
        <div class="city-deg" :style="{backgroundImage: `url(${isImgBig ? bigDegImg : smallDegImg})`}">
            <h2 class="city dm-sans-preset-4-bold">Berlin, Gremany</h2>
            <span class="date dm-sans-preset-6-medium">Tuesday,Aug 5, 2025</span>
            <div class="deg"></div>
        </div>
    </section>
</template>

<script setup lang="ts">

import { ref } from 'vue';

//@ts-ignore
import smallDegImg from '/images/bg-today-small.svg'
//@ts-ignore
import bigDegImg from '/images/bg-today-large.svg'

const isImgBig = ref<boolean>(false)

</script>

<style lang="scss" scoped>
.main-sec {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.city-deg {
    width: 100%;
    overflow: hidden;
    border-radius: 15px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-repeat: no-repeat;
    background-size: cover; 

    img {
        
        width: 100%;
    }

    .city {
        color: var(--color-netural-0);
        text-align: center;
    }

    .date {
        color: var(--color-netural-200);
        text-align: center;
    }
}
</style>