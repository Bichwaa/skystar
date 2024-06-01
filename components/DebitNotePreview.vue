<template>
    <Modal @close-modal="close">
        <div class="pdf-wrapper flex flex-col gap-5 min-w-[700px] overflow-y-auto max-h-[80vh]">

            <div class="pdf-header flex  justify-between">
                <div class="logo-wrapper">
                    <NuxtImg src="/images/logo.png" />
                </div>
                <div class="contact-iNfo-wrapper flex flex-col">
                    <span class="text-sm font-medium my-1">11<sup>th</sup> Floor IPS building,</span>
                    <span class="text-sm font-medium my-1">Samora Avenue/Azikiwe Street,</span>
                    <span class="text-sm font-medium my-1">P.O.Box 8680, Dar-es-salaam</span>
                    <span class="text-sm font-medium my-1">Tel: +255 22 2112049</span>
                    <span class="text-sm font-medium my-1">Cell: +255 754 276 123, +255 689 303 277</span>
                    <span class="text-sm font-medium my-1">Email: info@skystarfreight.co.tz</span>
                </div>
            </div>

            <hr/>

            <div class="invoice-id-info flex flex-col w-full">
                <div class="flex items-center justify-between w-full">
                    <div class="flex gap-2 items-center">
                        <span>REF:</span>
                        <span class="reference-number">SFL/PIC/0182/04/2024</span>
                    </div>
                    <span class="date"> 4 <sup>th</sup> January 2020</span>
                </div>
                <p class="my-2">D/N no: 000187</p>
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex itens-center gap-2">
                    <span>CUSTOMER NAME:</span>
                    <span>PRIME INTERNATIONAL CARRIERS</span>
                </div>
                <div class="flex itens-center gap-2">
                    <span>BOOKING NUMBER:</span>
                    <span>237044943 1*20FT CONTAINER</span>
                </div>
            
                <h3 class="uppercase text-lg text-center font-semibold mb-2">
                    DEBIT NOTE
                </h3>

              <div class="container mx-auto px-4">
                    <table class="min-w-full bg-white border">
                        <thead>
                            <tr class="w-full bg-gray-200 text-left border-l border-gray-200">
                            <th class="py-2 px-4 border-b">Particulars 
                                <span class="text-xs invisible">exra content to shift the table </span>
                            </th>
                            <th class="py-2 px-4 border-b">Quantity</th>
                            <th class="py-2 px-4 border-b">unit Price</th>
                            <th class="py-2 px-4 border-b">Amount(Tsh)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in 7" :key="i" class=" border-l border-gray-200">
                            <td class="py-2 px-4 border-b">Sample Item</td>
                            <td class="py-2 px-4 border-b border-l border-gray-200">{{ i }}</td>
                            <td class="py-2 px-4 border-b border-l border-gray-200">2360</td>
                            <td class="py-2 px-4 border-b border-l border-gray-200">{{2360 * i}}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="">
                    <table class="w-full divide-y divide-gray-200 mb-12">
                        <tbody>
                        <tr class="border border-gray-200">
                            <td class="px-4 py-2">Total Value </td>
                            <td class="px-4 py-2 border-l border-gray-200 text-center">Tsh 785,600</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                </div>

                

                <div class=" flex flex-col gap-1 mx-4 px-4 py-2">
                    <h3 class="uppercase font-semibold">Bank Details</h3>
                    <div class="flex itens-center gap-2">
                        <span>Bank name:</span>
                        <span>NMB Bank Plc</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span>Account name:</span>
                        <span>Skystar Freight Limited</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span>A/C:</span>
                        <span>20110058242 For USD</span>
                    </div>

                    <div class="flex itens-center gap-2">
                        <span>Swift code:</span>
                        <span>NMIBTZTZ</span>
                    </div>

                </div>

                <div class="flex items-center justify-between px-8 my-6">
                    <span>Prepared By: .........................</span>
                    <!-- <span>Approved .........................</span> -->
                </div>

                <div class="flex gap-2 items-center w-full">
                    <hr class="w-[26%]" /> <span>HELPING YOU PLAN FOR TOMORROW</span> <hr class="w-[26%]" />
                </div>
            </div>

        </div>
    </Modal>
</template>

<script setup>

const emit = defineEmits(["close"])

function close(){
    emit("close")
}
</script>