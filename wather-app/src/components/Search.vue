<template>
    <fieldset class="search-fieldset">
        <div class="input-search">
            <div class="search-div">
            <label for="search"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                <path fill="#D4D3D9" d="M19.844 18.82c.195.196.195.508 0 .664l-.899.899c-.156.195-.468.195-.664 0l-4.726-4.727a.63.63 0 0 1-.117-.351v-.508c-1.446 1.21-3.282 1.953-5.313 1.953A8.119 8.119 0 0 1 0 8.625C0 4.172 3.633.5 8.125.5c4.453 0 8.125 3.672 8.125 8.125 0 2.031-.781 3.906-1.992 5.313h.508c.117 0 .234.078.351.156l4.727 4.726ZM8.125 14.875a6.243 6.243 0 0 0 6.25-6.25c0-3.438-2.813-6.25-6.25-6.25a6.243 6.243 0 0 0-6.25 6.25 6.219 6.219 0 0 0 6.25 6.25Z"/>
                </svg>
            </label>
            <input @blur="hideList" @input="onInput" :value="props.citySearch" placeholder="Search for a place..." type="search" id="search" name="search" class="search-input dm-sans-preset-5-medium">

            <ul v-if="citySearch" class="autocomplete">
                <li @click="selectCity(city)" v-for="city in filteredCities" class="dm-sans-preset-7-medium" :key="city.id"> {{ city.name }},{{ city.country }} </li>
            </ul>
            </div>
            <Button :disabled="disabled" className="search-btn dm-sans-preset-5-medium" buttonType="submit" :fn="searchWeather"> Search </Button>
        </div>
        
        <div id="map"></div>
        <Button :disabled="isMapBtnSearchDisabled" className="search-btn dm-sans-preset-5-medium" buttonType="submit" :fn="searchWeatherFromMap"> Search </Button>
    </fieldset>
</template>

<script setup lang="ts">
    //@ts-ignore
    import Button from './Button.vue';
    import type { City } from '../myTypes';
    import type { CityData } from '../myTypes';
    import { onMounted } from 'vue';


    interface SearchProps {
        citiesArr: City[]
        citySearch: string
        isListShown: boolean
        filteredCities: City[]
        citysCoordinates: CityData[]
        selectCity: (city:City) => void
        getCities: () => void
        API_KEY: string
        getCoordinates: () => void
        getWeatcher: (lat: number, lon: number) => void
        searchWeather: () => void
        disabled: boolean
        isMapBtnSearchDisabled: boolean
        searchWeatherFromMap: () => void
    }
    
    let props = defineProps<SearchProps>()

    const emit = defineEmits<{ 
        (e: 'update:citySearch', value: string): void 
        (e: 'update:isListShown', value: boolean): void
    }>()

    function onInput (event: Event) {
        emit('update:citySearch', (event.target as HTMLInputElement).value)
    }

    function hideList() {
        emit('update:isListShown', false)
    }

    onMounted( () => {
    })
    
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

    &:focus {
        outline: 2px solid var(--color-blue-500);
        outline-offset: 2px;  
    }
    
    
    &:disabled {
        background-color: var(--color-netural-200);
    }

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

.input-search {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.autocomplete {
    width: 100%;
    top: 115%;
    left: 0;
    z-index: 2;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: var(--color-netural-800);
    border-radius: 10px;
    padding: 10px;
    max-height: 500px;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }

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

#map {
    width: 100%;
    height: 300px;
    cursor: pointer;
    border-radius: 15px;
    border: 2px solid var(--color-netural-600);
    z-index: 1;
}

@media (min-width: 600px) {
    .input-search {
        flex-direction: row;

        .search-div {
            flex: 5;
        }

        .search-btn {
            flex: 1;
        }
    }
}

</style>