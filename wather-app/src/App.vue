<script setup lang="ts">
//@ts-ignore
import Header from './components/Header.vue'; import Search from './components/Search.vue'; import Main from './components/main/Main.vue'; import Daily from './components/main/Daily.vue';

  import type { City } from './myTypes';
  import type { CityData } from './myTypes';
  import type { weatherCurrent } from './myTypes';
  import type { dailyWeather } from './myTypes';

    const choosenCity = ref('')
    import { onMounted, ref } from 'vue';
    import { computed, } from '@vue/reactivity';
    
    const citiesArr = ref<City[]>([])
    const citySearch = ref('')
    const isListShown = ref<boolean>(false)
    const filteredCities = computed( () => 
                citiesArr.value.filter(city => 
                city.name.toLowerCase().includes(citySearch.value.toLowerCase())
                )
            )

    const citysCoordinates = ref<CityData[]>([])

    
    function selectCity(city: City) {
        choosenCity.value = `${city.name},${city.country}`
        citySearch.value = ''
        isListShown.value = false
    }

    async function getCities () {
        try {
            const response = await fetch("/city.list.json")
            if(!response.ok) throw new Error("Data error")
            const data = await response.json()
            citiesArr.value = data
        } catch (error) {
            console.log(error)
        }
    }
    
    onMounted( () => {
        getCities();
    })

    const API_KEY  = '03a7ec2397820d17f0aeae6376140e7c'

    async function getCoordinates () {
        try {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${choosenCity.value}&limit=1&appid=${API_KEY}`)

            if (!response.ok) throw new Error("Data error")

            const data: CityData[] = await response.json()

            const first = data[0]

            if (!first) return

            citysCoordinates.value[0] = first
        } catch (error) {
            console.log("Query error:", error)
        }
    }

    let weatherDataCurrent = ref<null | weatherCurrent>(null);

    async function getWeatcher (lat:number, lon:number) {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`)
            if(!response.ok) throw new Error("Data error")
            const weather = await response.json();
            weatherDataCurrent.value = weather
        }
        catch ( error ) {
            console.log("Query error:",error)
        }
    }

    async function searchWeather() {
        await getCoordinates()

        const coords = citysCoordinates.value[0]

        if (coords) {
            await getWeatcher(coords.lat, coords.lon)
            await getDailyForecast(coords.lat, coords.lon)
        }
    }

    let dailyWeatherData = ref<null | dailyWeather>(null)

    async function getDailyForecast (lat: number, lon:number) {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/Berlin`)
        if(!response.ok) throw new Error("Data error")
        const data = await response.json()
        dailyWeatherData.value = data
      } catch ( error ) {
        console.log("Error data:", error)
      }
    }
</script>

<template>
<Header/>
<h1 class="bricolage-grotesque-preset-2-blod title">How’s the sky looking today?</h1>
<Search 
  :citiesArr="citiesArr" 
  v-model:citySearch="citySearch" 
  v-model:isListShown="isListShown" 
  :filteredCities="filteredCities" 
  :citysCoordinates="citysCoordinates" 
  :selectCity="selectCity" 
  :getCities="getCities" 
  :API_KEY="API_KEY" 
  :getCoordinates="getCoordinates" 
  :weatherDataCurrent="weatherDataCurrent" 
  :getWeatcher="getWeatcher" 
  :searchWeather="searchWeather"
/>
<Main :weatherDataCurrent="weatherDataCurrent" :choosenCity="choosenCity"/>
<Daily :dailyWeatherData="dailyWeatherData" />
</template>

<style scoped>
  .title {
    color: var(--color-netural-0);
    text-align: center;
    margin: 50px 0;
  }
</style>
