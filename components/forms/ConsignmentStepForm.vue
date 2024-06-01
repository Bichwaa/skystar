<template>
    <Modal @close-modal="close">
        <div class="flex flex-col transition-all duration-300" :class="currentStepNo==0?'h-[480px]': currentStepNo==1?'h-[380px]':'h-[400px]'">
            <div class="legend grid grid-cols-3 p-4 gap-8 w-full">
                <div class="prev flex items-center">
                    <button v-if="currentStepNo>0" @click="previousClicked" class="group p-2 rounded-lg w-32 flex gap-3 items-center justify-start">
                        <IconsArrowLeft class="h-5 w-5 group-hover:text-[#d4af37] font-semibold duration-300"/>
                        <span class="text-sm group-hover:text-[#d4af37] font-semibold duration-300">previous</span>
                    </button>
                </div>
                <div class="info flex items-center">
                    <span>{{ currentStep.title }}</span>
                </div>
                <div class="next flex items-center" >
                    <button v-if="currentStepNo<2" @click="nextClicked" class="group  p-2 rounded-lg w-32 flex gap-3 items-center justify-end">
                        <span class="text-sm group-hover:text-[#d4af37] font-semibold duration-300">next</span>
                        <IconsArrowRight class="h-5 w-5 group-hover:text-[#d4af37] font-semibold duration-300"/>
                    </button>
                </div>
            </div>

            <div class="form flex items-center">
                <form class="lg:mx-12 my-6 w-full">
                    <div class="step1 w-full"  v-show="currentStepNo==0">

                        <p class="font-semibold flex items-center mb-3">Add consignment</p>
                        <div class="flex flex-col my-4 w-full">
                            <label for="email" class="text-sm font-medium my-1">Customer</label>
                            <select v-model="payload.customerId" @change="getCustomerConsignees" class="w-full">
                                <option v-for="cus in customers" :value="cus.ID">{{ cus.fullName }}</option>
                            </select>
                        </div>

                        <div class="flex flex-col my-4">
                            <label for="email" class="text-sm font-medium my-1">Consignee</label>
                            <select v-model="payload.consigneeId" >
                                <option v-for="con in consignees" :value="con.ID">{{ con.fullName }}</option>
                            </select>
                        </div>

                        <div class="flex flex-col my-4">
                            <label for="email" class="text-sm font-medium my-1">Shipper</label>
                            <select v-model="payload.transporterId" >
                                <option v-for="tran in transporters" :value="tran.ID">{{ tran.name }}</option>
                            </select>
                        </div>
                    
                        <div class="flex flex-col  items-center w-full">
                            <div class="flex flex-col my-2 w-full">
                                <label for="consigneeName" class="text-sm font-medium my-1">Booking Number</label>
                                <input v-model="payload.bookingNumber" type="text" name="portofLoading" placeholder="k165WAOBQ74" class="border border-gray-300 p-2 rounded-lg text-sm">
                            </div>
                        </div>

                        <div class="flex flex-col  items-center w-full">
                            <div class="flex flex-col my-2 w-full">
                                <label for="consigneeName" class="text-sm font-medium my-1">BL Number</label>
                                <input v-model="payload.blNumber" type="text" name="portofLoading" placeholder="k165WAOBQ74" class="border border-gray-300 p-2 rounded-lg text-sm">
                            </div>
                        </div>
                    </div>
                    

                    <div class="step2" v-show="currentStepNo==1">
                        <div class="flex flex-col my-2 w-full">
                                <label for="consigneeName" class="text-sm font-medium my-1">Cargo Weight(Ton)</label>
                                <input v-model="payload.totalWeight" type="number" name="portofLoading" placeholder="10" class="border border-gray-300 p-2 rounded-lg text-sm">
                            </div>
                        <div class="flex flex-col my-2 w-full">
                            <label for="luggage" class="text-sm font-medium my-1">Cargo Description</label>
                            <textarea v-model="payload.luggage" type="text" name="luggage" placeholder="Cargo pants" class="border border-gray-300 p-2 rounded-lg text-sm w-full"></textarea>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="flex flex-col my-2">
                                <label for="consigneeName" class="text-sm font-medium my-1">Port of Loading</label>
                                <input v-model="payload.portOfLoading" type="text" name="portofLoading" placeholder="kwao" class="border border-gray-300 p-2 rounded-lg text-sm">
                            </div>
                            <div class="flex flex-col my-2">
                                <label for="consigneeName" class="text-sm font-medium my-1">Port of Discharge</label>
                                <input v-model="payload.destination" type="text" name="destination" placeholder="Mombasa" class="border border-gray-300 p-2 rounded-lg text-sm">
                            </div>
                        </div>

                       
                    </div>
                    
                    
                    <div class="step3" v-show="currentStepNo==2">
                        <div class="flex items-center gap-4">
                            <div class="flex flex-col my-4 w-full">
                                <label for="email" class="text-sm font-medium my-1">Mode of Transport</label>
                                <select v-model="payload.modeOfTransport"  class="w-full">
                                    <option value="sea"> By Sea</option>
                                    <option value="sea"> By Air</option>
                                    <option value="sea"> By Road</option>
                                </select>
                            </div>

                            <div class="flex flex-col my-4 w-full">
                                <label for="email" class="text-sm font-medium my-1">Type of Cargo</label>
                                <select v-model="cargoType"  class="w-full">
                                    <option value="loose">Loose Cargo</option>
                                    <option value="containers" selected> Containers</option>
                                </select>
                            </div>

                            

                        </div>
                        <div class="flex items-center gap-4">
<!--                             
                            <div class="flex flex-col my-2" v-if="cargoType=='loose'">
                                <label for="consigneeName" class="text-sm font-medium my-1">Loose Cargo Weight (Ton)</label>
                                <input v-model="payload.looseCargo" type="number" name="cont10" placeholder="0" class="border border-gray-300 p-2 rounded-lg text-sm">
                            </div> -->

                            <div class="flex flex-col my-2" v-if="!isLoose">
                                <label for="consigneeName" class="text-sm font-medium my-1">20FT Containers</label>
                                <input v-model="payload.cont20" type="number" name="cont20" placeholder="0" class="border border-gray-300 p-2 rounded-lg text-sm">
                            </div>
                            <div class="flex-col my-2 cursor-pointer justify-center items-center" v-if="!isLoose && !showFortyFooters" @click="()=>showFortyFooters =true">
                                <span class="text-blue-400 text-sm cursor-ponter"> + Add 40ft Containers</span>
                            </div>
                            
                            <div class="flex flex-col my-2" v-if="!isLoose && showFortyFooters">
                                <label for="consigneeName" class="text-sm font-medium my-1">40FT Containers</label>
                                <input v-model="payload.cont40" type="number" name="cont40" placeholder="0" class="border border-gray-300 p-2 rounded-lg text-sm">
                            </div>
                        </div>
                    </div>
                    

                   <div class="flex items-center justify-center">
                        <button  type="submit" @click.prevent="submitForm" v-if="currentStepNo==2"
                            class="flex items-center justify-center py-2 px-3  mt-6 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-whiem font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                            <span v-if="!formLoading" class="text-white font-medium">Create Consignment</span>
                            <Loader v-else size="small" class="h-4 w-4"/>
                        </button>
                   </div>
                </form>
            </div>
        </div>
    </Modal>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import { userStore } from '../../store';
import type { Input, Step } from './types';

const { $axios } = useNuxtApp()
const store = userStore()

const formLoading = ref(false)

const customers : Ref<any> = ref([])
const consignees : Ref<any> = ref([])
const transporters : Ref<any> = ref([])

const cargoType = ref("loose")
const showFortyFooters = ref(false)


const emit = defineEmits(['close'])

const props = defineProps({
    steps:{
        type: Array,
        default:[
            {
                title:"Step 1",
                inputs:[
                    {
                        inputType:"text",
                        label:"Kitu Hapa",
                        name:"sijui",
                        row:"half"
                    },
                    {
                        inputType:"text",
                        label:"Kitu Hapa2",
                        name:"najua",
                        row:"half"
                    },
                    {
                        inputType:"text",
                        label:"Kitu Hapa",
                        name:"kwani",
                        row:"half"
                    },
                    {
                        inputType:"textarea",
                        label:"Mambo Mengi",
                        name:"descripton",
                        row:"full"
                    },
                    {
                        inputType:"select",
                        label:"Mambo Mengi",
                        name:"descripton",
                        row:"full"
                    }
                    
                ]
            },
            {
                title:"Step 2",
                inputs:[
                    {
                        inputType:"textarea",
                        label:"Mambo Mengi",
                        name:"descripton",
                        row:"full"
                    }
                ]
            },
            {
                title:"Step 3",
                inputs:[
                    {
                        inputType:"textarea",
                        label:"Mambo Mengi",
                        name:"descripton",
                        row:"full"
                    }
                ]
            },
        ]
    }
})

const currentStepNo = ref(0)
// const currentStep: Ref<Step> = ref({title:"step !",inputs:[]})

    const currentStep : ComputedRef<Step> = computed(()=>{
        if(currentStepNo.value >= 0 && currentStepNo.value < props.steps.length){
            return props.steps[currentStepNo.value] as Step
        }else{
            return {
                title:"Step 1",
                inputs:[
                    {
                        inputType:"text",
                        label:"Kitu Hapa",
                        name:"sijui",
                        row:"half"
                    } 
                ]
            } as Step
        }
    })

const totalSteps = computed(()=> props.steps.length)

//compute input styles
function inputsByRowStyle(inputs:Input[]){
    return {
        half:inputs.filter(x=>x.row=="half"),
        full:inputs.filter(x=>x.row=="full")
    }
}

function nextClicked(){
    if(currentStepNo.value<=2){
        currentStepNo.value += 1
    }
}

function previousClicked(){
    if(currentStepNo.value>=1){
        currentStepNo.value -= 1
    }
}

// function resetDynamicInputState(){
//     if(cargoType.value!='loose'){
//         fortyFooters.value = false
//     }
// }

const isLoose = computed(()=>{
    if(cargoType.value =='loose'){
        showFortyFooters.value =false
        return true
    }else{
        return false
    }
})

const sorted:ComputedRef<{half:Input[], full:Input[]}> = computed(()=>{
    return inputsByRowStyle(currentStep.value.inputs)
    })



const payload  = ref({
   customerId:0,
   luggage:"",
   modeOfTransport:"Ship",
   destination:"",
   portOfLoading:"",
   looseCargo:0,
   cont20:0,
   cont40:0,
   overseerId:store.user.ID,
   transporterId:0,
   consigneeId:0,
   bookingNumber:"",
   blNumber:"",
   totalWeight:0
//    cost:0,
//    revenue:0
})

async function submitForm(){
    console.log("calling submit")
    formLoading.value = true
    const res = await $axios.post("/api/consignments",{...payload.value})
    formLoading.value = false
    console.log(res)
    if(res.status==200 || 201){
        emit("close", res.data)
    }else{
        console.log(res.statusText)
    }
}

async function getCustomers(){
    try{
        const res = await $axios.get("api/customers")
        if(res.status==200 || 201){
            customers.value = res.data
        }else{
            console.log(res.statusText)
        }
    }catch(e){
        throw e
    }
}

async function getCustomerConsignees(){
    try{
        const res = await $axios.get(`/api/customer-consignees?customerId=${payload.value.customerId}`)
        if(res.status==200 || 201){
            consignees.value = res.data
        }else{
            console.log(res.statusText)
        }
    }catch(e){
        throw e
    }
}

async function getTransporters(){
    try{
        const res = await $axios.get(`/api/transporters`)
        if(res.status==200 || 201){
            transporters.value = res.data
        }else{
            console.log(res.statusText)
        }
    }catch(e){
        throw e
    }
}

function close(){
    emit("close")
}

onMounted(async ()=>{
    await getCustomers()
    await getTransporters()
})
</script>