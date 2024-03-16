<template>
    <div class="h-full grid place-items-center ">
        <form 
        @submit.prevent="formSubmitted" 
            class="form-card bg-[#F5F6F7] p-2 lg:p-16 rounded-lg">

            <div class="flex flex-col lg:flex-row gap-8 justify-center py-1">
                <div class="grp flex flex-col ">
                    <label for="email" class="text-xs font-medium">Email</label>
                    <input type="email" name="email" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-8 justify-center py-1">
                <div class="grp flex flex-col ">
                    <label for="password" class="text-xs font-medium">Password</label>
                    <input type="password" name="password" class=" border border-1 border-slate-400 rounded-md lg:h-8 w-full">
                </div>
            </div>


            <div class="flex flex-col my-3">
            <div class="grid place-items-center">
                <p>Don't have an account? <nuxt-link to="/register" class="text-blue-500 my-2">Register</nuxt-link></p>
            </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">


function formSubmitted(){
    window.alert('form fake submitted')
}
</script>