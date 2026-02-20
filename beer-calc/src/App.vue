<script setup lang="ts">
    
    import Header from './components/Header.vue';
    import Calculator from './components/Calculator.vue';
    import Warning from './components/Warning.vue';

    import { ref, watch, onMounted } from 'vue';
    
    type Theme = boolean;

    let theme = ref<Theme>(false)

    function toggleTheme () {
        theme.value = !theme.value
        localStorage.setItem("theme", JSON.stringify(theme.value))
    } 

    watch(theme, (newVal) => {
        if(newVal) {
            document.body.style.backgroundColor = '#3A3A3A'
        } else {
            document.body.style.backgroundColor = '#FFFFFF'
        }
    })

    onMounted( () => {
        try {
            let stored: string | null =  localStorage.getItem("theme")
            if(stored) {
                const localTheme: boolean = JSON.parse(stored)
                theme.value = localTheme
            }
        } catch(error) {
            console.log(error)
        }
    } )

</script>


<template>
    <Warning/>
    <Header :theme="theme" :themeFunc="toggleTheme"/>
    <Calculator :theme="theme"/>
</template>

<style>

</style>
