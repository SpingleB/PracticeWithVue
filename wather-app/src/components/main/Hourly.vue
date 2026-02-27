<template>
    <section class="hourly" aria-labelledby="hourly-title">
        <div class="hourly-top">
            <h2 id="hourly-title" class="dm-sans-preset-5-semiBold">Hourly forecast</h2>
            <Button buttonType="button" :fn="toggleShowDayList" className="day-switch-btn dm-sans-preset-7-medium"> {{ isMetric ? (dayOfTheWeekMetric?.weekDay ? dayOfTheWeekMetric?.weekDay : '-') : (dayOfTheWeekImperial?.weekDay ? dayOfTheWeekImperial?.weekDay : '-') }}  
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" fill="none" viewBox="0 0 13 8">
                <path fill="#fff" d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/>
                </svg>
            </Button>
        </div>
        <ul v-if="isDayListShown" class="days-list">
            <li @click="pickDay(hour)" v-for="hour in hourlyArrMetric" :key="hour.day" class="dm-sans-preset-7-medium  days-list__hourly-forecast">
                {{ hour.weekDay }}
            </li>
        </ul>
        <ul class="hour-list">
            <li v-for="(hour, idx) in isMetric ? dayOfTheWeekMetric?.hours : dayOfTheWeekImperial?.hours" :key="idx" class="hour-list__hour">
                <div class="weather">
                    <img v-if="hour.code === 0 || hour.code === 1" :src="sunny" alt="Image">
                    <img v-if="hour.code === 2" :src="partyCloudy" alt="Image">
                    <img v-if="hour.code === 3" :src="overcast" alt="Image">
                    <img v-if="hour.code === 45 || hour.code === 48" :src="fog" alt="Image">
                    <img v-if="hour.code === 51 || hour.code === 53 || hour.code === 55 || hour.code === 56 || hour.code === 57" :src="drizzle" alt="Image">
                    <img v-if="hour.code === 61 || hour.code === 63 || hour.code === 65 || hour.code === 66 || hour.code === 67" :src="rain" alt="Image">
                    <img v-if="hour.code === 71 || hour.code === 73 || hour.code === 75 || hour.code === 77" :src="snow" alt="Image">
                    <img v-if="hour.code === 80 || hour.code === 82" :src="rain" alt="Image">
                    <img v-if="hour.code === 85 || hour.code === 86" :src="snow" alt="Image">
                    <span class="dm-sans-preset-5-medium">{{ hour.time }}</span>
                </div>
                <span class="temp dm-sans-preset-7-medium">{{ Math.round(hour.temp) }} {{ isMetric ? '°C' : '°F' }}</span>
            </li>
        </ul>
        <ul v-if="isLoading" class="loading">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
//@ts-ignore
import Button from '../Button.vue';
import type { hourlyWeather } from '../../myTypes';

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

    const isDayListShown = ref<boolean>(false)
    function toggleShowDayList () {
        isDayListShown.value = !isDayListShown.value
    }


    interface hourkyProps {
        hourlyWeatherData: null | hourlyWeather
        hourlyWeatherDataImperial: null | hourlyWeather
        isMetric: boolean
    }

    interface Hourly {
        day: string
        weekDay: string
        hours: {
            time: string
            temp: number
            code: number
        }[]
    }

    const props = defineProps<hourkyProps>()

    const hourlyArrMetric = ref<Hourly[]>([])
    const hourlyArrImperial = ref<Hourly[]>([])

    const dayOfTheWeekMetric = ref<null | Hourly>(null)
    const dayOfTheWeekImperial = ref<null | Hourly>(null)
    const isLoading = ref<boolean>(false)
    watch(() => props.hourlyWeatherData, (newVal) => {
    hourlyArrMetric.value = []

    if (!newVal) {
        isLoading.value = true
        return
    }

    let dayObj: Hourly | null = null

    newVal.hourly.time.forEach((val, index) => {
        if (index % 24 === 0) {
        if (dayObj) {
            hourlyArrMetric.value.push(dayObj)
            
        }

        const dateOnly = val.split('T')[0] 
        if(dateOnly) {
             const weekDayName = new Date(dateOnly).toLocaleDateString('en-US', { weekday: 'long' }) 
        
            dayObj = {
                day: dateOnly,
                weekDay: weekDayName,
                hours: []
            }
        }
        }

        const hourString = new Date(val).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        })

        dayObj?.hours.push({
        time: hourString,
        temp: newVal.hourly.temperature_2m[index] ?? 0,
        code: newVal.hourly.weather_code[index] ?? 0
        })
    })

    if (dayObj) hourlyArrMetric.value.push(dayObj)
    
    dayOfTheWeekMetric.value = hourlyArrMetric.value[0] ?? null
    isLoading.value = false
    })
    
    watch(() => props.hourlyWeatherDataImperial, (newVal) => {
    hourlyArrImperial.value = []

    if (!newVal) {
        isLoading.value = true
        return
    }

    let dayObj: Hourly | null = null

    newVal.hourly.time.forEach((val, index) => {
        if (index % 24 === 0) {
        if (dayObj) {
            hourlyArrImperial.value.push(dayObj)
            
        }

        const dateOnly = val.split('T')[0] 
        if(dateOnly) {
             const weekDayName = new Date(dateOnly).toLocaleDateString('en-US', { weekday: 'long' }) 
        
            dayObj = {
                day: dateOnly,
                weekDay: weekDayName,
                hours: []
            }
        }
        }

        const hourString = new Date(val).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        })

        dayObj?.hours.push({
        time: hourString,
        temp: newVal.hourly.temperature_2m[index] ?? 0,
        code: newVal.hourly.weather_code[index] ?? 0
        })
    })

    if (dayObj) hourlyArrImperial.value.push(dayObj)
    
    dayOfTheWeekImperial.value = hourlyArrImperial.value[0] ?? null
    isLoading.value = false
    })

    function pickDay (hour:Hourly) {
        dayOfTheWeekMetric.value = hour; 
        dayOfTheWeekImperial.value = hour;
        isDayListShown.value = !isDayListShown.value
    }
</script>

<style lang="scss" scoped>
.hourly {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 16px;
    gap: 16px;
    background-color: var(--color-netural-800);
    border-radius: 20px;
    width: 100%;
    margin-top: 30px;
    position: relative;
    max-width: 1200px;
}

.hourly-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
}

.day-switch-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    gap: 12px;
    border-radius: 8px;
    background-color: var(--color-netural-600);
    color: var(--color-netural-0);
    cursor: pointer;
}

.days-list {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
    position: absolute;
    top: 0;
    background-color: var(--color-netural-800);
    border: 1px solid var(--color-netural-600);
    border-radius: 12px;
    padding: 8px;
    gap: 4px;
    color: var(--color-netural-0);
    cursor: pointer;
    right: 16px;
    top: 60px;
    max-width: 300px;
    

    &__hourly-forecast {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-radius: 8px;
        padding: 10px 16px 10px 12px;
        transition: var(--fast);
    }
}

#hourly-title {
    color: var(--color-netural-0);
}

@media (hover: hover) and (pointer: fine) {
    .days-list__hourly-forecast:hover {
        background-color: var(--color-netural-700);
        border: 1px solid var(--color-netural-600);
    }
}

@media (hover: none) and (pointer: coarse) {
    .days-list__hourly-forecast:active {
        background-color: var(--color-netural-700);
        border: 1px solid var(--color-netural-600);
    }
}

.hour-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 100%;
    max-height: 600px;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }

    &__hour {
        padding: 10px 16px 10px 12px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        background-color: var(--color-netural-700);
        border: 1px solid var(--color-netural-600);
        border-radius: 8px;
        color: var(--color-netural-0);
    }
}

.weather {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    img {
        width: 40px;
    }
}

.loading {
    padding: 10px 16px 10px 12px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    background-color: var(--color-netural-700);
    border: 1px solid var(--color-netural-600);
    border-radius: 8px;
    color: var(--color-netural-0);
}

</style>