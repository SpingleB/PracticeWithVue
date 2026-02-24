<template>
    <main class="main-sec">
        <div class="city-deg" :style="{backgroundImage: `url(${isImgBig ? bigDegImg : smallDegImg})`}">
            <h2 class="city dm-sans-preset-4-bold">{{ choosenCity }}</h2>
            <span class="date dm-sans-preset-6-medium">{{formattedTime}}</span>
            <div class="deg">
                <img v-if="weatherDataCurrent?.current.weather_code === 0 || weatherDataCurrent?.current.weather_code === 1" :src="sunny" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 2" :src="partyCloudy" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 3" :src="overcast" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 45 || weatherDataCurrent?.current.weather_code === 48" :src="fog" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 51 || weatherDataCurrent?.current.weather_code === 53 || weatherDataCurrent?.current.weather_code === 55 || weatherDataCurrent?.current.weather_code === 56 || weatherDataCurrent?.current.weather_code === 57" :src="drizzle" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 61 || weatherDataCurrent?.current.weather_code === 63 || weatherDataCurrent?.current.weather_code === 65 || weatherDataCurrent?.current.weather_code === 66 || weatherDataCurrent?.current.weather_code === 67" :src="rain" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 71 || weatherDataCurrent?.current.weather_code === 73 || weatherDataCurrent?.current.weather_code === 75 || weatherDataCurrent?.current.weather_code === 77" :src="snow" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 80 || weatherDataCurrent?.current.weather_code === 82" :src="rain" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 85 || weatherDataCurrent?.current.weather_code === 86" :src="snow" alt="Image">
                <img v-if="weatherDataCurrent?.current.weather_code === 95 || weatherDataCurrent?.current.weather_code === 96 || weatherDataCurrent?.current.weather_code === 99" :src="storm" alt="Image">
                <span class="dm-sans-preset-1-semiBold" v-if="weatherDataCurrent">{{ Math.floor(weatherDataCurrent?.current.temperature_2m) }}{{ weatherDataCurrent?.current_units.temperature_2m }}</span>
            </div>
        </div>
        <div class="current-indicators">
            <div class="indicator"><span class="indicator-name dm-sans-preset-6-medium">Feels Like</span><span class="indicator-value dm-sans-preset-3-light">{{ weatherDataCurrent?.current.apparent_temperature ? Math.floor(weatherDataCurrent?.current.apparent_temperature) : 0}}{{ weatherDataCurrent?.current_units.apparent_temperature }}</span></div>
            <div class="indicator"><span class="indicator-name dm-sans-preset-6-medium">Humidity</span><span class="indicator-value dm-sans-preset-3-light">{{ weatherDataCurrent?.current.relative_humidity_2m ? Math.floor(weatherDataCurrent?.current.relative_humidity_2m) : 0}}{{ weatherDataCurrent?.current_units.relative_humidity_2m }}</span></div>
            <div class="indicator"><span class="indicator-name dm-sans-preset-6-medium">Wind</span><span class="indicator-value dm-sans-preset-3-light">{{ weatherDataCurrent?.current.wind_speed_10m ? Math.floor(weatherDataCurrent?.current.wind_speed_10m) : 0 }}{{ weatherDataCurrent?.current_units.wind_speed_10m }}</span></div>
            <div class="indicator"><span class="indicator-name dm-sans-preset-6-medium">Precipitation</span><span class="indicator-value dm-sans-preset-3-light">{{ weatherDataCurrent?.current.precipitation ? Math.floor(weatherDataCurrent?.current.precipitation) : 0 }}{{ weatherDataCurrent?.current_units.precipitation }}</span></div>
        </div>
    </main>
</template>

<script setup lang="ts">

import { ref } from 'vue';

//@ts-ignore
import smallDegImg from '/images/bg-today-small.svg'
//@ts-ignore
import bigDegImg from '/images/bg-today-large.svg'
import type { weatherCurrent } from '../../myTypes';

//Images imports 
//@ts-ignore
import drizzle from '/images/icon-drizzle.webp'
//@ts-ignore
import fog from '/images/icon-fog.webp'
//@ts-ignore
import overcast from '/images/icon-overcast.webp'
//@ts-ignore
import partyCloudy from '/images/icon-partly-cloudy.webp'
//@ts-ignore
import rain from '/images/icon-rain.webp'
//@ts-ignore
import snow from '/images/icon-snow.webp'
//@ts-ignore
import storm from '/images/icon-storm.webp'
//@ts-ignore
import sunny from '/images/icon-sunny.webp'
//Images imports

const isImgBig = ref<boolean>(false)

    interface MainProps {
        weatherDataCurrent: null | weatherCurrent
        choosenCity: string
    }

    const { weatherDataCurrent, choosenCity } = defineProps<MainProps>()
    const time = weatherDataCurrent?.current.time
    const formattedTime = ref<null | string>(null)
    if (time) {
        const date = new Date(time)
        const formatted = date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'})
        formattedTime.value = formatted
    }
</script>

<style lang="scss" scoped>
.main-sec {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
    gap: 20px;
}

.city-deg {
    width: 100%;
    overflow: hidden;
    border-radius: 15px;
    padding: 80px 24px;
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

.deg {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    img {
        max-width: 120px;
    }

    span {
        color: var(--color-netural-0);
    }
}

.current-indicators {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .indicator {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: start;
        gap: 16px;
        flex: 1 1 calc(50% - 10px);
        padding: 20px;
        background-color: var(--color-netural-800);
        border: 1px solid var(--color-netural-600);
        border-radius: 16px;
        object-fit: contain;

        .indicator-name {
            color: var(--color-netural-200);
        }

        .indicator-value {
            color: var(--color-netural-0);
        }
    }
}


</style>