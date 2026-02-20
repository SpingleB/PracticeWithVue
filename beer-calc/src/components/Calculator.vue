<template>
    <main :class="theme ? 'calculate theme-dark' : 'calculate'">
        <div class="calculate-top">

            <button @click="() => {isCurrencyListShown = !isCurrencyListShown; toggleShowList = false}" :class="theme ? 'currency-btn montserrat-preset-1-regular theme-dark' : 'currency-btn montserrat-preset-1-regular'">
                {{ choosenCurrency }}
            </button>
            <ul v-if="isCurrencyListShown" class="currency">
                <fieldset class="search-fieldset">
                    <label class="montserrat-preset-1-regular" for="search">Search 🔍</label>
                    <input v-model="currencySearch" placeholder="USD" type="search" name="search" id="search" class="search montserrat-preset-1-regular">
                </fieldset>
                <li @click="() => {choosenCurrency = curr.cc; isCurrencyListShown = false}" v-for="curr in filteredCurrencySearch" :key="curr.cc" class="currency-li montserrat-preset-1-regular">{{ curr.cc }}</li>
            </ul>

            <button @click="reset" class="reset-btn">
                <svg :class="theme ? 'dark-reset-btn' : ''" fill="#000000" width="800px" height="800px" viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z"/>
                </svg>
            </button>

            <button class="show-list-btn" @click="() => {toggleShowListFunc(); isCurrencyListShown = false}"> 
            <svg v-if="!choosenBeer.img" width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M857.6 345.6h-102.4v64h64v51.2c0 204.8-62.72 247.04-115.2 318.72C842.24 734.72 896 678.4 896 396.8c0-16.64 0-51.2-38.4-51.2z" fill="#FAC546" />
            <path d="M704 792.32c-3.84 0-7.68-1.28-10.24-5.12-3.84-5.12-3.84-10.24 0-15.36 7.68-11.52 16.64-21.76 24.32-32C764.16 683.52 806.4 629.76 806.4 460.8v-38.4h-51.2c-7.68 0-12.8-5.12-12.8-12.8v-64c0-7.68 5.12-12.8 12.8-12.8h102.4c51.2 0 51.2 48.64 51.2 64 0 279.04-52.48 345.6-200.96 394.24-1.28 1.28-2.56 1.28-3.84 1.28zM768 396.8h51.2c7.68 0 12.8 5.12 12.8 12.8v51.2c0 174.08-44.8 235.52-90.88 291.84C839.68 711.68 883.2 645.12 883.2 396.8c0-25.6-3.84-38.4-25.6-38.4h-89.6v38.4z" fill="#231C1C" />
            <path d="M755.2 819.2c0 28.16 0 76.8-76.8 76.8H320c-76.8 0-76.8-48.64-76.8-76.8V256h512v563.2z" fill="#FAC546" />
            <path d="M678.4 908.8H320c-89.6 0-89.6-62.72-89.6-89.6V256c0-7.68 5.12-12.8 12.8-12.8h512c7.68 0 12.8 5.12 12.8 12.8v563.2c0 26.88 0 89.6-89.6 89.6zM256 268.8v550.4c0 28.16 0 64 64 64h358.4c64 0 64-35.84 64-64V268.8H256z" fill="#231C1C" />
            <path d="M358.4 832c-7.68 0-12.8-5.12-12.8-12.8V448c0-7.68 5.12-12.8 12.8-12.8s12.8 5.12 12.8 12.8v371.2c0 7.68-5.12 12.8-12.8 12.8zM499.2 832c-7.68 0-12.8-5.12-12.8-12.8V448c0-7.68 5.12-12.8 12.8-12.8s12.8 5.12 12.8 12.8v371.2c0 7.68-5.12 12.8-12.8 12.8z" fill="#231C1C" /><path d="M640 832c-7.68 0-12.8-5.12-12.8-12.8V448c0-7.68 5.12-12.8 12.8-12.8s12.8 5.12 12.8 12.8v371.2c0 7.68-5.12 12.8-12.8 12.8z" fill="#231C1C" /><path d="M720.64 166.4c-3.84 0-7.68 0-11.52 1.28-14.08-24.32-38.4-39.68-66.56-39.68-34.56 0-81.92-19.2-92.16 12.8-10.24-10.24-6.4 25.6-21.76 25.6h-1.28c-6.4-57.6-51.2-64-107.52-64-48.64 0-89.6-3.84-103.68 42.24-12.8-10.24-5.12 8.96-23.04 8.96-43.52 0-76.8 11.52-76.8 57.6S225.28 256 268.8 256h11.52v83.2c0 17.92 14.08 32 32 32s32-14.08 32-32V256h51.2v179.2c0 14.08 16.64 25.6 38.4 25.6s38.4-11.52 38.4-25.6V256h89.6v64c0 21.76 16.64 38.4 38.4 38.4s38.4-16.64 38.4-38.4v-64h80.64c33.28 0 47.36 10.24 47.36-25.6s-12.8-64-46.08-64z" fill="#FFFFFF" />
            <path d="M435.2 473.6c-28.16 0-51.2-16.64-51.2-38.4V268.8h-25.6v70.4c0 24.32-20.48 44.8-44.8 44.8S268.8 363.52 268.8 339.2V268.8h-1.28c-21.76 0-37.12 0-47.36-7.68-11.52-8.96-14.08-25.6-14.08-49.92 0-46.08 30.72-70.4 89.6-70.4h1.28v-1.28c1.28-2.56 5.12-8.96 11.52-10.24h1.28C327.68 88.32 368.64 89.6 408.32 89.6h11.52c35.84 0 90.88 0 112.64 46.08 2.56-3.84 5.12-7.68 10.24-8.96C558.08 104.96 588.8 108.8 614.4 112.64c10.24 1.28 19.2 2.56 28.16 2.56 29.44 0 55.04 14.08 72.96 38.4 39.68-3.84 65.28 26.88 65.28 76.8 0 11.52-1.28 24.32-10.24 32-8.96 7.68-20.48 7.68-33.28 6.4-5.12 0-10.24-1.28-16.64-1.28H652.8v51.2c0 28.16-23.04 51.2-51.2 51.2s-51.2-23.04-51.2-51.2v-51.2h-64v166.4c0 23.04-23.04 39.68-51.2 39.68z m-89.6-230.4h51.2c7.68 0 12.8 5.12 12.8 12.8v179.2c0 5.12 10.24 12.8 25.6 12.8s25.6-7.68 25.6-12.8V256c0-7.68 5.12-12.8 12.8-12.8h89.6c7.68 0 12.8 5.12 12.8 12.8v64c0 14.08 11.52 25.6 25.6 25.6s25.6-11.52 25.6-25.6v-64c0-7.68 5.12-12.8 12.8-12.8h80.64c6.4 0 12.8 0 17.92 1.28 5.12 0 12.8 1.28 14.08 0 0 0 1.28-2.56 1.28-14.08 0-19.2-3.84-51.2-34.56-51.2-2.56 0-6.4 0-8.96 1.28-5.12 1.28-11.52-1.28-14.08-6.4C686.08 153.6 665.6 140.8 642.56 140.8c-10.24 0-21.76-1.28-32-2.56-30.72-3.84-44.8-3.84-48.64 7.68-1.28 3.84-5.12 7.68-8.96 8.96-2.56 8.96-7.68 25.6-24.32 25.6h-1.28c-6.4 0-11.52-5.12-12.8-11.52-3.84-46.08-34.56-53.76-94.72-53.76h-11.52c-47.36 0-70.4 1.28-79.36 33.28-1.28 3.84-3.84 7.68-8.96 8.96-2.56 0-3.84 1.28-6.4 0-2.56 5.12-8.96 8.96-19.2 8.96-56.32 0-64 21.76-64 44.8 0 6.4 0 25.6 5.12 29.44 3.84 2.56 16.64 2.56 32 2.56H281.6c7.68 0 12.8 5.12 12.8 12.8v83.2c0 10.24 8.96 19.2 19.2 19.2s19.2-8.96 19.2-19.2V256c0-7.68 5.12-12.8 12.8-12.8z" fill="#231C1C" />
            </svg>
            <img v-if="choosenBeer.img" :src="choosenBeer.img" alt="Beer image">
            </button>
            <ul v-if="toggleShowList" name="beer" id="beer" class="beer-select">
                <fieldset class="search-fieldset">
                    <label class="montserrat-preset-1-regular" for="search">Search 🔍</label>
                    <input v-model="beerSearch" placeholder="Повна діжка" type="search" name="search" id="search" class="search montserrat-preset-1-regular">
                </fieldset>
                <li 
                @click="() => 
                { 
                    choosenBeer = beer;
                    toggleShowList = false;
                }"  
                v-for="beer in filteredBeer" :key="beer.name" class="beer-option"> 
                    <div class="beer-option__img-div">
                        <img :src="beer.img" :alt="beer.name">
                    </div>
                     <div class="beer-option__info montserrat-preset-5-regular">
                        <span class="beer-name">{{ beer.name }}</span>
                        <span class="beer-liter" > {{ beer.liter }}л </span>
                     </div> 
                     <span class="beer-price montserrat-preset-5-regular">{{ beer.price }}UAH</span>
                </li>
            </ul>
        </div>
        <form class="calculate-form">
            <fieldset class="beer-form-fieldset">
                <label for="calculate-input" :class="theme ? 'montserrat-preset-2-regular input-label theme-dark' : 'montserrat-preset-2-regular input-label'">Count</label>
                <input id="calculate-input" v-model="choosenCount" name="calculate-input" :class="theme ? 'calculate-input montserrat-preset-2-regular dark-input' : 'calculate-input montserrat-preset-2-regular'" placeholder="1000" type="number">
            </fieldset>
        </form>
        <button 
            @click="() => { 
                choosenCurrencyRate = currencyOptionValue(choosenCurrency); 
                liters = calculateSumm(choosenCurrencyRate, choosenCount, choosenBeer.price, choosenBeer.liter);
                }" 
            :class="theme ? 'calculate-button montserrat-preset-3-regular theme-dark' : 'calculate-button montserrat-preset-3-regular'">
             Calculate
        </button>
        <div v-if="liters" :class="theme ? 'result-container theme-dark' : 'result-container'">
            <h1 class="montserrat-preset-4-semiBold">Result</h1>
            <span class="montserrat-preset-3-regular result-span"><b>{{ liters }}</b>liters</span>
        </div>
        <div v-if="!isCalculated" :class="theme ? 'if-liter-nan theme-dark' : 'if-liter-nan'">
            <h1 class="montserrat-preset-3-regular">
                Please calculate the volume
            </h1>
        </div>
        <div v-if="choosenBeer.name" :class="theme ? 'your-beer theme-dark' : 'your-beer'">
            <h1 class="montserrat-preset-1-regular" >You have chosen beer: {{ choosenBeer.name }} </h1>
            <a class="beer-link" target="_blank" :href="choosenBeer.link">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 8L7 8C5.11438 8 4.17157 8 3.58578 8.58579C3 9.17158 3 10.1144 3 12V12C3 13.8856 3 14.8284 3.58579 15.4142C4.17157 16 5.11438 16 7 16L9 16" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 16L17 16C18.8856 16 19.8284 16 20.4142 15.4142C21 14.8284 21 13.8856 21 12V12C21 10.1144 21 9.17157 20.4142 8.58578C19.8284 8 18.8856 8 17 8L15 8" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 12H16" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </a>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref, onMounted, reactive, computed } from 'vue'

    let toggleShowList = ref<boolean>(false)
    
    function toggleShowListFunc () {
        toggleShowList.value = !toggleShowList.value
    }

        interface Beer {
            name: string
            price: number
            img: string
            liter: number
            link: string
        }

    const beerArr = ref<Beer[]>([])
    
    onMounted( async () => {
        try {
            const response = await fetch("/data.json")
            if (!response.ok) throw new Error('Data error')
            const beerData = await response.json()
            beerArr.value = beerData
        } catch (error) {
            console.log(error)
        }
    })

        interface ButtonProps {
            theme: boolean
        }
    const { theme } = defineProps<ButtonProps>()

        interface Currency {
            r030:number, 
            txt:string, 
            rate:number, 
            cc:string, 
            exchangedate:string
        }

        const currencyObj = reactive<Currency[]>([])

    onMounted( async () => {
        try {
            const response = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
            if(!response.ok) throw new Error("Data error")
            const currencyData = await response.json()
            currencyObj.splice(0, currencyObj.length, ...currencyData)
        } catch (error) {
            console.log(error)
        }
    })

    let choosenBeer = ref<Beer>({
        name: '',
        price: 0,
        img: '',
        liter: 0,
        link: ''
    })
    let choosenCurrency = ref('UAH')
    let choosenCurrencyRate = ref(0)
    function currencyOptionValue (chooosenCurrency: string) {
        if (!chooosenCurrency) return 0
        let currencyName = '';
        currencyName = chooosenCurrency;
        if (chooosenCurrency === 'UAH') return 1
        const currency = currencyObj.find(c => c.cc === currencyName);
        return currency ? (currency.rate) : 0
    }
    let choosenCount = ref(0)

    function calculateSumm(currency: number, count: number, price:number, liter:number) {
        let lastSumm = Math.floor(
            Math.floor((count * currency) / price) * liter
        )
        if (lastSumm) isCalculated.value = true
        return lastSumm;
    }
    let isCalculated = ref<boolean>(false)
    let liters = ref(0);

    const beerSearch = ref('')
    const filteredBeer = computed( () => 
        beerArr.value.filter(beer => 
            beer.name.toLowerCase().includes(beerSearch.value.toLowerCase())
            )
        )

    const currencySearch = ref('')
    const filteredCurrencySearch = computed( () => 
        currencyObj.filter(curr => 
            curr.cc.toLowerCase().includes(currencySearch.value.toLowerCase())
        )
    )

    let isCurrencyListShown = ref<boolean>(false)

    function reset () {
        choosenBeer.value = {name: '', price: 0, img: '', liter: 0, link: ''}; 
        choosenCount.value = 0; 
        liters.value = 0; 
        isCalculated.value = false;
        choosenCurrency.value = 'UAH';
    }
</script>

<style lang="scss" scoped>
.beer-select {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    position: absolute;
    width: 100%;
    max-width: 700px;
    max-height: 500px;
    overflow-y: auto;
    background-color: var(--color-orange-dark);
    border-radius: 15px;
    right: 0;
    top: 55px;

    .beer-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-radius: 15px;
        color: var(--color-grey-1);
        padding: 5px 8px;

        .beer-option__img-div {
            height: 50px;
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border-radius: 10px;
            border: 2px solid var(--color-orange-light);

            img {
                width: 100%;
            }
        }

        .beer-option__info {
            width: 50%;
            .beer-name {
                display: block;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }

    }
}

.currency-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 50px;
    width: 75px;
    color: var(--color-white);
    font-weight: 600;
    background-color: var(--color-orange-light);
    border-radius: 10px;
    cursor: pointer;
    transition: var(--fast);
    &:active {
        transform: scale(0.95);
    }
}

@media(min-width: 600px) {
    .beer-select {
        top: 80px;
        max-height: 650px;
        .beer-option {
            .beer-option__img-div {
                width: 70px;
                height: 70px;
            }
        }
        gap: 55px;
    }

    .currency-btn {
        height: 70px;
        width: 120px;
    }
}

@media(min-width: 900px) {
    .beer-select {
        top: 110px;
        border-radius: 25px;
        padding: 24px;
        max-height: 800px;
        .beer-option {
            .beer-option__img-div {
                width: 90px;
                height: 90px;
            }
        }

    }

    .currency-btn {
        border-radius: 20px;
        height: 90px;
        width: 150px;
    }
}

.show-list-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 50px;
    width: 75px;
    background-color: var(--color-orange-light);
    border-radius: 10px;
    cursor: pointer;
    transition: var(--fast);
    overflow: hidden;

    img {
        width: 45px;
        border-radius: 10px;
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        width: 50px;
        height: 50px;
    }
}

@media (min-width: 600px) {
    .show-list-btn{
        height: 70px;
        width: 120px;

        img {
            width: 65px;
        }

        svg {
            width: 75px;
            height: 75px;
        }
    }
    
}

@media (min-width: 900px) {
    .show-list-btn {
        border-radius: 20px;
        height: 90px;
        width: 150px;

        svg {
            width: 85px;
            height: 85px;
        }
    }
}

.currency {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: absolute;
    max-height: 500px;
    overflow-y: auto;
    background-color: var(--color-orange-dark);
    border-radius: 15px;
    max-width: 200px;
    left: 0;
    top: 55px;
    padding: 15px 20px;
    transition: var(--fast);
    cursor: pointer;
    
    
    .currency-li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-radius: 15px;
        color: var(--color-grey-1);
        padding: 5px 8px;
        font-weight: 600;
        text-align: center;
    }
}


@media(min-width: 600px) {
    .currency {
        top: 80px;
    }
}

@media(min-width: 900px) {
    .currency {
        top: 110px;
        border-radius: 25px;
        padding: 24px;
        max-height: 800px;
        max-width: 300px;
    }
}

.calculate-top {
    width: 100%;
    position: relative;
    margin-top: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}

.calculate {
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    max-width: 1100px;
    gap: 40px;
    padding: 24px;
    border-radius: 20px;
    box-shadow:
    0 12px 20px -8px rgba(0, 0, 0, 0.3),
    0 6px 12px -10px rgba(0, 0, 0, 0.3);
}

@media(min-width: 600px) {
    .calculate {
        gap: 55px;
    }
}

@media(min-width: 900px) {
    .calculate {
        margin-top: 150px;
    }
}


.calculate-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
}

.beer-form-fieldset {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 20px;

    .input-label {
        color: var(--color-grey-1);
    }
    
    .calculate-input {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 20px;
        border-radius: 15px;
        width: 100%;
        color: var(--color-grey-1);
        font-weight: 500;
        box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.5);

        &:focus::placeholder {
            color: transparent;
        }
    }
}

@media(min-width: 600px) {
    .beer-form-fieldset {
        gap: 30px;
        
        .calculate-input {
            padding: 20px 30px;
        }
    }
}

@media(min-width: 900px) {
    .beer-form-fieldset {
        .calculate-input {
            padding: 25px 30px;
        }
    }    
}

.calculate-button {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--fast);
    padding: 20px 35px;
    background-color: var(--color-orange-light);
    border-radius: 15px;
    color: var(--color-grey-1);
    cursor: pointer;

    &:active {
        transform: scale(0.95);
    }
}

@media(min-width: 900px) {
    .calculate-button {
        padding: 35px 50px;
        border-radius: 25px;
        font-size: 3rem;
    }
}

.result-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    color: var(--color-grey-1);

    .result-span {
        display: flex;
        gap: 15px;
    }
}

.theme-dark {
    color: var(--color-white-dark) !important;
    box-shadow: none !important;
}

.dark-reset-btn {
    transition: var(--fast);
    fill: var(--color-white-dark);    
}

.dark-input {
    box-shadow: none !important;
}

.if-liter-nan {
    color: var(--color-grey-1);
}

.beer-link {
    cursor: pointer;
    width: 40px;
    height: 40px;

    svg {
        width: 40px;
        height: 40px;
        background-color: rgba(128, 128, 128, 0.5);
        border-radius: 12px;
    }
}

.your-beer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.search-fieldset {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 15px;
    
    .search {
        width: 100%;
        padding: 10px 15px;
        border-radius: 10px;
        color: var(--color-grey-1);
    }

    .search:focus::placeholder {
        color: transparent;
    }

    .search::placeholder {
        color: var(--color-grey-2);
        font-size: 1rem;
    }
}

.reset-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 50px;
    width: 75px;
    background-color: var(--color-orange-light);
    border-radius: 10px;
    cursor: pointer;
    transition: var(--fast);
    &:active {
        transform: scale(0.95);
    }

    svg {
        width: 40px;
        height: 40px;
    }
}

@media(min-width: 600px) {
    .reset-btn {
        width: 120px;
        height: 70px;

        svg {
            width: 55px;
            height: 55px;
        }
    }

    .search-fieldset {
        .search {
            padding: 15px;
            font-size: 1.2rem;

            &::placeholder {
                font-size: 1.2rem;
            }
        }
    }
}

@media(min-width: 900px) {
    .reset-btn {
        height: 90px;
        width: 150px;
        border-radius: 20px;

        svg {
            width: 75px;
            height: 75px;
        }
    }

    .search-fieldset {
        .search {
            padding: 30px;
            border-radius: 25px;
            font-size: 1.7rem;

            &::placeholder {
                font-size: 1.7rem;
            }
        }
    }
}
</style>