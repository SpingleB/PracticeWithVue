<template>
    <section class="daily-forecast" aria-labelledby="daily-title">
        <h2 id="daily-title" class="dm-sans-preset-5-semiBold">Daily forecast</h2>
        <div class="forecast">
            <div v-for="daily in dailyArr" :key="daily.day" class="daily">
                <span class="day dm-sans-preset-6-medium">{{ daily.day }}</span>
                <img v-if="daily.code === 0 || daily.code === 1" :src="sunny" alt="Image">
                <img v-if="daily.code === 2" :src="partyCloudy" alt="Image">
                <img v-if="daily.code === 3" :src="overcast" alt="Image">
                <img v-if="daily.code === 45 || daily.code === 48" :src="fog" alt="Image">
                <img v-if="daily.code === 51 || daily.code === 53 || daily.code === 55 || daily.code === 56 || daily.code === 57" :src="drizzle" alt="Image">
                <img v-if="daily.code === 61 || daily.code === 63 || daily.code === 65 || daily.code === 66 || daily.code === 67" :src="rain" alt="Image">
                <img v-if="daily.code === 71 || daily.code === 73 || daily.code === 75 || daily.code === 77" :src="snow" alt="Image">
                <img v-if="daily.code === 80 || daily.code === 82" :src="rain" alt="Image">
                <img v-if="daily.code === 85 || daily.code === 86" :src="snow" alt="Image">
                <img v-if="daily.code === 95 || daily.code === 96 || daily.code === 99" :src="storm" alt="Image">
                <div class="temperature">
                    <span class="temperature-max dm-sans-preset-7-medium">{{ daily.max }}°</span>
                    <span class="temperature-min dm-sans-preset-7-medium">{{ daily.min }}°</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
//@ts-ignore
import type { dailyWeather } from './myTypes';
import { ref, watch } from 'vue';

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

    interface DailyProps {
        dailyWeatherData: null | dailyWeather
    }

    interface Daily {
        day: string
        code: number
        max: number
        min: number
    }

    const props = defineProps<DailyProps>()

    const dailyArr = ref<Daily[]>([])
    watch( () => props.dailyWeatherData, (newVal) => {
        dailyArr.value = []
        if (!newVal || !newVal.daily || !newVal.daily.time) return

        newVal.daily.time.forEach( (_, index) => {
            const date = new Date(_)
            const formatted = date.toLocaleDateString('en-US', {weekday: 'short'})
            dailyArr.value.push( {
                day: formatted,
                code: newVal.daily.weathercode[index],
                max: newVal.daily.temperature_2m_max[index],
                min: newVal.daily.temperature_2m_min[index]
            } )
        } )
        },
        {immediate: true}
    )

</script>

<style lang="scss" scoped>
.daily-forecast {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 30px;

    .forecast {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        gap: 20px;
    }
}

#daily-title {
    color: var(--color-netural-0);
    width: 100%;
    text-align: start;
}

.daily {
    border-radius: 12px;
    border: 1px solid var(--color-netural-600);
    display: flex;
    flex: 0 0 calc(30% - 10px);
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 16px 10px;
    gap: 20px;
    background-color: var(--color-netural-800);

    .day {
        color: var(--color-netural-0);
    }

    img {
        width: 60px;
    }

    .temperature-max {
        color: var(--color-netural-0);
    }

    .temperature-min {
        color: var(--color-netural-200);
    }

}

.temperature {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>