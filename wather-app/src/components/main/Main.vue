<template>
    <main class="main-sec">
        <div v-if="weatherDataCurrent" class="city-deg" :style="{backgroundImage: `url(${isImgBig ? bigDegImg : smallDegImg})`}">
            <div class="date-div">
                <h2 class="city dm-sans-preset-4-bold">{{ CITY }}</h2>
                <span class="date dm-sans-preset-6-medium">{{formattedTimeImperial}}</span>
            </div>
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
                <span class="dm-sans-preset-1-semiBold" v-if="weatherDataCurrent">{{ isMetric ? (metricTemp === null || metricTemp === undefined ? '-' : Math.round(metricTemp)) : (imperialTemp === null || imperialTemp === undefined ? '-' : Math.round(imperialTemp)) }}{{ isMetric ? (weatherDataCurrent?.current_units.temperature_2m) : (imperialWeatherDataCurrent?.current_units.temperature_2m) }}</span>
            </div>
        </div>
        <div v-if="!weatherDataCurrent" class="pls-choose bricolage-grotesque-preset-2-blod" >
        </div>
        <div class="current-indicators">
            <div class="indicator"><span class="indicator-name dm-sans-preset-6-medium">Feels Like</span><span class="indicator-value dm-sans-preset-3-light">{{ isMetric ?  (metricFeelslike === null || metricFeelslike === undefined ? '-' : Math.round(metricFeelslike)) :  (imperialFeelslike === null || imperialFeelslike === undefined ? '-' : Math.round(imperialFeelslike)) }} {{ isMetric ? weatherDataCurrent?.current_units.temperature_2m : imperialWeatherDataCurrent?.current_units.apparent_temperature }}</span></div>
            <div class="indicator"><span class="indicator-name dm-sans-preset-6-medium">Humidity</span><span class="indicator-value dm-sans-preset-3-light">{{ isMetric ? (metricHumidity === null || metricHumidity === undefined ? '-' : Math.round(metricHumidity)) : (imperialHumidity === null || imperialHumidity === undefined ? '-' : Math.round(imperialHumidity)) }} {{ isMetric ? weatherDataCurrent?.current_units.relative_humidity_2m : imperialWeatherDataCurrent?.current_units.relative_humidity_2m}}</span></div>
            <div class="indicator"><span class="indicator-name dm-sans-preset-6-medium">Wind</span><span class="indicator-value dm-sans-preset-3-light">{{ isMetric ? (metricWind === null || metricWind === undefined ? '-' : Math.round(metricWind)) : (imperialWind === null || imperialWind === undefined ? '-' : Math.round(imperialWind)) }} {{ isMetric ? weatherDataCurrent?.current_units.wind_speed_10m : imperialWeatherDataCurrent?.current_units.wind_speed_10m }}</span></div>
            <div class="indicator"><span class="indicator-name dm-sans-preset-6-medium">Precipitation</span><span class="indicator-value dm-sans-preset-3-light">{{ isMetric ? (metricPrecipitation === null || metricPrecipitation === undefined ? '-' : Math.round(metricPrecipitation)) : (imperialPrecipitation === null || imperialPrecipitation === undefined ? '-' : Math.round(imperialPrecipitation)) }} {{ isMetric ? weatherDataCurrent?.current_units.precipitation : imperialWeatherDataCurrent?.current_units.precipitation }}</span></div>
        </div>
    </main>
</template>

<script setup lang="ts">

import { ref, watch, onMounted, onUnmounted } from 'vue';

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

    const viewportWidth = ref(window.innerWidth)
    const isImgBig = ref<boolean>(viewportWidth.value > 600)

    function handleResize() {
    viewportWidth.value = window.innerWidth
    }

    onMounted(() => {
    window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    })

    interface MainProps {
        weatherDataCurrent: null | weatherCurrent
        CITY: string
        imperialWeatherDataCurrent: null | weatherCurrent
        isMetric: boolean
    }

    const { weatherDataCurrent, CITY, imperialWeatherDataCurrent } = defineProps<MainProps>()
    const formattedTimeMetric = ref<null | string>(null)
    const formattedTimeImperial = ref<null | string>(null)
    const metricTemp = ref<null | number>(null)
    const metricWind = ref<null | number>(null)
    const metricHumidity = ref<null | number>(null)
    const metricFeelslike = ref<null | number>(null)
    const metricPrecipitation = ref<null | number>(null)

    const imperialTemp = ref<null | number>(null)
    const imperialWind = ref<null | number>(null)
    const imperialHumidity = ref<null | number>(null)
    const imperialFeelslike = ref<null | number>(null)
    const imperialPrecipitation = ref<null | number>(null)

    watch( () => weatherDataCurrent?.current.time, (newVal) => {
            formattedTimeMetric.value = ''
            if(!newVal) return
                const date = new Date(newVal)
                const formatted = date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'})
                formattedTimeMetric.value = formatted
        },{immediate: true}
    )

    watch( () => imperialWeatherDataCurrent?.current.time, (newVal) => {
            formattedTimeImperial.value = ''
            if(!newVal) return
                const date = new Date(newVal)
                const formatted = date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'})
                formattedTimeImperial.value = formatted
        },{immediate: true}
    )

    watch( () => weatherDataCurrent?.current, (newVal) => {
        metricWind.value = 0
        metricHumidity.value = 0
        metricFeelslike.value = 0
        metricPrecipitation.value = 0
        metricTemp.value = 0
        if(!newVal) return
        metricWind.value = newVal.wind_speed_10m
        metricHumidity.value = newVal.relative_humidity_2m
        metricFeelslike.value = newVal.apparent_temperature
        metricPrecipitation.value = newVal.precipitation
        metricTemp.value = newVal.temperature_2m
    })

    watch( () => imperialWeatherDataCurrent?.current, (newVal) => {
        imperialWind.value = 0
        imperialHumidity.value = 0
        imperialFeelslike.value = 0
        imperialPrecipitation.value = 0
        imperialTemp.value = 0
        if(!newVal) return
        imperialWind.value = newVal.wind_speed_10m
        imperialHumidity.value = newVal.relative_humidity_2m
        imperialFeelslike.value = newVal.apparent_temperature
        imperialPrecipitation.value = newVal.precipitation
        imperialTemp.value = newVal.temperature_2m
    })
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
    max-width: 1200px;
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
    justify-content: end;
    align-items: center;
    gap: 60px;

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

.pls-choose {
    width: 100%;
    background-color: var(--color-netural-800);
    border-radius: 16px;
    padding: 40px 20px;
    color: var(--color-netural-0);
}

.date-div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    span {
        width: 100%;
    }

    h2 {
        width: 100%;
    }
}

@media(min-width: 600px) {
    .city-deg {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 80px 20px;

        .date-div {
            width: 50%;

            span {
                text-align: start;
                width: 100%;
            }

            h2 {
                text-align: start;
            }
    }

    }
    
    .deg {
        width: 50%;
    }

    .current-indicators {
        flex-wrap: nowrap;
        
        .indicator {
            padding: 30px 20px;
            gap: 20px;
        }
    }
}

@media(min-width: 900px) {
    
}
</style>