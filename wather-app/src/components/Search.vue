<template>
    <fieldset class="search-fieldset">
        <div class="search-div">
        <label for="search"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
            <path fill="#D4D3D9" d="M19.844 18.82c.195.196.195.508 0 .664l-.899.899c-.156.195-.468.195-.664 0l-4.726-4.727a.63.63 0 0 1-.117-.351v-.508c-1.446 1.21-3.282 1.953-5.313 1.953A8.119 8.119 0 0 1 0 8.625C0 4.172 3.633.5 8.125.5c4.453 0 8.125 3.672 8.125 8.125 0 2.031-.781 3.906-1.992 5.313h.508c.117 0 .234.078.351.156l4.727 4.726ZM8.125 14.875a6.243 6.243 0 0 0 6.25-6.25c0-3.438-2.813-6.25-6.25-6.25a6.243 6.243 0 0 0-6.25 6.25 6.219 6.219 0 0 0 6.25 6.25Z"/>
            </svg>
        </label>
        <input @blur="isListShown = false" v-model="citySearch" placeholder="Search for a place..." type="search" id="search" name="search" class="search-input dm-sans-preset-5-medium">

        <ul v-if="citySearch" class="autocomplete">
            <li @click="selectCity(city)" v-for="city in filteredCities" class="dm-sans-preset-7-medium" :key="city.id"> {{ city.name }},{{ city.country }} </li>
        </ul>
        </div>
        <Button className="search-btn dm-sans-preset-5-medium" buttonType="submit" :fn="() => {getCoordinates(); getWeatcher(citysCoordinates.lat, citysCoordinates.lon)}"> Search </Button>
    </fieldset>
</template>

<script setup lang="ts">
    const choosenCity = ref('')

    import { onMounted, ref } from 'vue';
    //@ts-ignore
    import Button from './Button.vue';
    import { computed } from '@vue/reactivity';

    interface City {
        id: number
        name: string
        state: string
        country: string
        coord: {
            lon: number,
            lat: number
        }
    }
    
    const citiesArr = ref<City[]>([])
    const citySearch = ref('')
    const isListShown = ref<boolean>(false)
    const filteredCities = computed( () => 
                citiesArr.value.filter(city => 
                city.name.toLowerCase().includes(citySearch.value.toLowerCase())
                )
            )

    function selectCity(city: City) {
        choosenCity.value = `${city.name},${city.country}`
        citySearch.value = ''
        isListShown.value = false
        console.log(choosenCity.value)
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

    const dt = ref<number>(0)
    
    onMounted( () => {
        getCities();
        const now = new Date()
        dt.value = Math.floor(now.getTime() / 1000)
    })

    const API_KEY  = '03a7ec2397820d17f0aeae6376140e7c'
    const citysCoordinates = ref<CityData>({
        country: '',
        lat: 0,
        local_names: {
            ar: '',
            be: '',
            ca: '',
            cs: '',
            de: '',
            el: '',
            en: '',
            eo: '',
            es: '',
            et: '',
            fa: '',
            fi: '',
            fr: '',
            he: '',
            hi: '',
            hr: '',
            hu: '',
            hy: '',
            io: '',
            it: '',
            ja: '',
            ka: '',
            kn: '',
            ko: '',
            ku: '',
            lt: '',
            ml: '',
            nl: '',
            nn: '',
            no: '',
            oc: '',
            pl: '',
            pt: '',
            ro: '',
            ru: '',
            sk: '',
            sl: '',
            sr: '',
            sv: '',
            uk: '',
            ur: '',
            yi: '',
            zh: '',
        },
        lon: 0,
        name: '',
        state: '',
    })

    interface CityData {
        country: string
        lat: number
        local_names: {
            ar: string
            be: string
            ca: string
            cs: string
            de: string
            el: string
            en: string
            eo: string
            es: string
            et: string
            fa: string
            fi: string
            fr: string
            he: string
            hi: string
            hr: string
            hu: string
            hy: string
            io: string
            it: string
            ja: string
            ka: string
            kn: string
            ko: string
            ku: string
            lt: string
            ml: string
            nl: string
            nn: string
            no: string
            oc: string
            pl: string
            pt: string
            ro: string
            ru: string
            sk: string
            sl: string
            sr: string
            sv: string
            uk: string
            ur: string
            yi: string
            zh: string
        }
        lon: number
        name: string
        state: string
    }

    async function getCoordinates () {
        try {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${choosenCity.value}&limit=1&appid=${API_KEY}`)
            if(!response.ok) throw new Error("Data error")
                const data = await response.json()
                citysCoordinates.value = data
                console.log(citysCoordinates.value)
        }
        catch (error) {
            console.log("Query error:", error)
        }
    }

    async function getWeatcher (lat:number, lon:number) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt.value}&appid=${API_KEY}`)
            if(!response.ok) throw new Error("Data error")
            const weather = await response.json();
            console.log(weather)
        }
        catch ( error ) {
            console.log("Query error:",error)
        }
    }


</script>

<style lang="scss" scoped>
.search-fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 16px;
}
.search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 10px;
    padding: 15px;
    background-color: var(--color-blue-500);
    color: var(--color-netural-0);
    transition: var(--fast);

    &:active {
        transform: scale(0.98);
    }
}

.search-div {
    display: flex;
    position: relative;
    justify-content: start;
    align-items: center;
    padding: 15px 24px;
    background-color: var(--color-netural-800);
    width: 100%;
    border-radius: 10px;
    gap: 24px;

    label {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-input {
        background-color: transparent;
        width: 100%;
        color: var(--color-netural-200);

        &:focus::placeholder{
            color: transparent;
        }
    }
}

.autocomplete {
    width: 100%;
    top: 115%;
    left: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-netural-800);
    border-radius: 10px;
    padding: 10px;

    li {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 10px;
        width: 100%;
        border-radius: 5px;
        color: var(--color-netural-0);

        &:hover {
            background-color: var(--color-netural-700);
        }
        &:active {
            background-color: var(--color-netural-700);
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .autocomplete li:hover {
        background-color: var(--color-netural-700);
        cursor: pointer;
    }
}

@media (hover: none) and (pointer: coarse) {
    .autocomplete li:active {
        background-color: var(--color-netural-700);
    }
}

</style>