<script setup lang="ts">
//@ts-ignore
import Header from './components/Header.vue'; import Search from './components/Search.vue'; import Main from './components/main/Main.vue'; import Daily from './components/main/Daily.vue'; import Hourly from './components/main/Hourly.vue';

  import type { City } from './myTypes';
  import type { CityData } from './myTypes';
  import type { weatherCurrent } from './myTypes';
  import type { dailyWeather } from './myTypes';
  import type { hourlyWeather } from './myTypes'
  import type { MapCoords } from './myTypes';
  import * as L from 'leaflet'


    import { onMounted, ref } from 'vue';
    import { computed, } from '@vue/reactivity';

    const citiesArr = ref<City[]>([])
    const citySearch = ref('')
    const isListShown = ref<boolean>(false)
    const filteredCities = computed( () =>  citiesArr.value.filter( city =>  city.name.toLowerCase().includes( citySearch.value.toLowerCase() ) ) )

    const citysCoordinates = ref<CityData[]>([])
    const mapCoords = ref<null | MapCoords>(null)
    
    
    function selectCity(city: City) {
        CITY.value = `${city.name},${city.country}`
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
        var map = L.map('map').setView([54.6870458, 25.2829111], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let marker: L.Marker | null = null

        map.on('click', (e) => {
            const { lat, lng } = e.latlng
            if(marker) {
                map.removeLayer(marker)
            }
            marker = L.marker([lat, lng]).addTo(map)
            map.setView([lat, lng], 10)
            mapCoords.value = { lat, lng }
        })

        try {
            let stored: string | null =  localStorage.getItem("units")
            if(stored) {
                const localUnits: boolean = JSON.parse(stored)
                isMetric.value = localUnits
            }
        } catch(error) {
            console.log(error)
        }
    })

    const API_KEY  = '03a7ec2397820d17f0aeae6376140e7c'

    async function getCoordinates () {
        try {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${CITY.value}&limit=1&appid=${API_KEY}`)

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
    let imperialWeatherDataCurrent = ref<null | weatherCurrent>(null)

    async function getWeatcher (lat:number, lon:number) {
        try {
            //Metric
            const MetricResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`)
            if(!MetricResponse.ok) throw new Error("Data error")
            const metricWeather = await MetricResponse.json();
            weatherDataCurrent.value = metricWeather
            
            //Imperial
            const imperialResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`)
            if(!imperialResponse.ok) throw new Error(`Data error. Status:${imperialResponse.status}`)
            const imperialWeather = await imperialResponse.json()
            imperialWeatherDataCurrent.value = imperialWeather
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
            await getHourlyForecast(coords.lat, coords.lon)
        } 
    }

    async function searchWeatherFromMap () {
        const mapcrds = mapCoords.value

        if (mapCoords.value) {
            await getCityFromMap(mapCoords.value.lat, mapCoords.value.lng)
            await getWeatcher(mapCoords.value.lat, mapCoords.value.lng)
            await getDailyForecast(mapCoords.value.lat, mapCoords.value.lng)
            await getHourlyForecast(mapCoords.value.lat, mapCoords.value.lng)
        }
    }

    let metricDailyWeatherData = ref<null | dailyWeather>(null)
    let imperialDailyWeatherData = ref< null | dailyWeather>(null)

    async function getDailyForecast (lat: number, lon:number) {
      try {
        //Metric
        const metricResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/Berlin`)
        if(!metricResponse.ok) throw new Error("Data error")
        const metricData = await metricResponse.json()
        metricDailyWeatherData.value = metricData

        //Imperial
        const imperialResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=Europe/Berlin`)
        if(!imperialResponse.ok) throw new Error(`Data error. Status: ${imperialResponse.status}`)
        const imperialData = await imperialResponse.json()
        imperialDailyWeatherData.value = imperialData
      } catch ( error ) {
        console.log("Error data:", error)
      }
    }

    let hourlyWeatherDataMetric = ref<null | hourlyWeather>(null)
    let hourlyWeatherDataImperial = ref<null | hourlyWeather>(null)

    async function getHourlyForecast (lat: number, lon:number) {
        try {
            //Metric
            const metricResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&forecast_days=7&timezone=auto`)
            if(!metricResponse.ok) throw new Error("Data error")
            const metricData = await metricResponse.json()
            hourlyWeatherDataMetric.value = metricData

            //Imperial
            const imperialResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&forecast_days=7&temperature_unit=fahrenheit&timezone=auto`)
            if(!imperialResponse.ok) throw new Error(`Data error. Status:${imperialResponse.status}`)
            const imperialData = await imperialResponse.json()
            hourlyWeatherDataImperial.value = imperialData
        } catch ( error ) {
            console.log("Data error:", error)
        }
    }

    async function getCityFromMap (lat: number, lon: number) {
        try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            if(!response.ok) throw new Error(`Data error. Status: ${response.status}`)
            const data = await response.json()
            CITY.value = `${data.city}, ${data.countryCode}`
        } catch (error) {
            console.log("Data error:", error)
        }
    }
    
    const isBtnSeachDisabled = computed(() => CITY.value === '')
    const isMapBtnSearchDisabled = computed( () => mapCoords.value === null)
    const CITY = ref<string>('')

    const isMetric = ref<boolean>(true)

    function changeUnits () {
        isMetric.value = !isMetric.value
        localStorage.setItem("units", JSON.stringify(isMetric.value))
    }
</script>

<template>
<Header :isMetric="isMetric" :changeUnits=changeUnits />
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
  :getWeatcher="getWeatcher" 
  :searchWeather="searchWeather"
  :disabled="isBtnSeachDisabled"
  :isMapBtnSearchDisabled="isMapBtnSearchDisabled"
  :searchWeatherFromMap="searchWeatherFromMap"
/>
<Main :weatherDataCurrent="weatherDataCurrent" :imperialWeatherDataCurrent="imperialWeatherDataCurrent" :CITY="CITY" :isMetric="isMetric" />
<Daily :isMetric="isMetric" :dailyWeatherData="metricDailyWeatherData" :imperialDailyWeatherData="imperialDailyWeatherData"/>
<Hourly  :isMetric="isMetric" :hourlyWeatherData="hourlyWeatherDataMetric" :hourlyWeatherDataImperial="hourlyWeatherDataImperial"/>
</template>

<style scoped>
  .title {
    color: var(--color-netural-0);
    text-align: center;
    margin: 50px 0;
    max-width: 450px;
  }
</style>
