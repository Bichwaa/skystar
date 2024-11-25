<template>
    <div class="grid grid-cols-12 gap-2 rounded-2xl bg-white p-4 shadow-lg overflow-y-scroll">
            <div class="col-span-2 2xl:col-span-1 h-[88vh]">
                <div class="w-full flex flex-col overflow-y-scroll" @click="()=>activeSub='details'">
                    <p 
                    class="px-6 text-sm py-1 my-1 cursor-pointer"
                    :class="activeSub=='details'?'bg-gradient-to-r border-r-4 border-blue-500 from-white to-blue-100 text-blue-500':''"
                    >DETAILS</p>
                </div>
                <div class="w-full flex flex-col overflow-y-scroll" @click="()=>activeSub='cost'">
                    <p 
                    class="px-6 text-sm py-1 my-1 cursor-pointer"
                    :class="activeSub=='cost'?'bg-gradient-to-r border-r-4 border-blue-500 from-white to-blue-100 text-blue-500':''"
                    > COST</p>
                </div>
                <div class="w-full flex flex-col overflow-y-scroll" @click="()=>activeSub='revenue'">
                    <p 
                    class="px-6 text-sm py-1 my-1 cursor-pointer"
                    :class="activeSub=='revenue'?'bg-gradient-to-r border-r-4 border-blue-500 from-white to-blue-100 text-blue-500':''"
                    > REVENUE</p>
                </div>
            </div>
            <div class="col-span-10 2xl:col-span-11">
                <div class="flex justify-around gap-8">
                    <div class="flex flex-col gap-2  items-start" v-if="activeSub=='cost'">
                        <span class="text-lg font-semibold text-[#292a5e]">
                            TOTAL REVENUE(TSH): {{ numberWithCommas(revenueTSH) }} TSH
                        </span>

                        <span class="text-lg font-semibold text-[#292a5e]">
                            TOTAL REVENUE(USD): {{ numberWithCommas(revenueUSD) }} USD
                        </span>

                        <span class="text-lg font-semibold text-[#292a5e]">
                            TOTAL COST(TSH): {{ numberWithCommas(costTSH) }} TSH
                        </span>
                        <span class="text-lg font-semibold text-[#292a5e]">
                            TOTAL COST(USD): {{ numberWithCommas(costUSD) }} USD
                        </span>
                    </div>

                    <div class="flex flex-col gap-2  items-start" v-if="activeSub=='cost'">
                        <span class="text-lg font-semibold text-[#292a5e]">
                            NET PROFIT/LOSS
                        </span>
                        <div class="flex gap-12 items-center">
                            <!-- <span class="text-sm cursor-pointer font-light text-[#d4af37]">change exchange rate</span> -->
                            <span class="text-sm cursor-pointer font-light text-[#d4af37]" @click="showExchangeRateBoard">change currency</span>
                        </div>
                        <span v-if="profitLossCompute>=0" class="text-lg font-semibold text-[#292a5e]">
                            PROFIT: {{ numberWithCommas(converterOptions.profitValue.toFixed(3)) }} {{ converterOptions.selectedCurrency }}
                        </span>
                        <span v-else class="text-lg font-semibold text-red-400">
                            LOSS: {{ numberWithCommas(converterOptions.lossValue.toFixed(3)) }} {{ converterOptions.selectedCurrency }}
                        </span>
                    </div>
                </div>
                
                <div class="w-full rounded-2xl bg-white p-4 shadow-lg overflow-y-scroll">
                    <div class="flex flex-col" v-if="activeSub=='details'">
                        <!-- <h1 class="font-semibold text-lg Lg:text-xl my-5">Consignment Details</h1> -->

                            <div class="md:grid lg:grid-cols-4 md:grid-cols-3">

                                <div class="col-span-4 lg:col-span-4 flex flex-col md:flex-row justify-between items-start mb-4 w-full">
                                    <div class="flex flex-col">
                                        <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> Customer Details  </span>
                                    
                                        <div class="flex gap-3  w-full items-center my-2">
                                            <div class="flex gap-4 items-center">
                                                <IconsUserIcon class="w-5 h-5"/>
                                                <span class=" font-medium">Name:</span>
                                            </div>
                                            <p>{{ consignment?.customer?.fullName }}</p>
                                        </div>

                                        <div class="flex gap-3  w-full items-center my-2">
                                            <div class="flex gap-4 items-center">
                                                <IconsEmailIcon  class="w-5 h-5"/>
                                                <span class=" font-medium">Email:</span>
                                            </div>
                                            <p> {{consignment?.customer?.email}} </p>
                                        </div>

                                        <div class="flex gap-3  w-full items-center my-2">
                                            <div class="flex gap-4 items-center">
                                                <IconsPersonIcon  class="w-5 h-5"/>
                                                <span class=" font-medium">Filed By:</span>
                                            </div>
                                            <p> {{ consignment?.Overseer?.firstName + " " + consignment?.Overseer?.lastName }} </p>
                                        </div>
                                    </div>

                                    <div class="flex flex-col">

                                        <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> Consignment Description  </span>
                                        <div class="flex flex-col gap-3  w-full my-2 justify-start">
                                            <!-- <div class="flex gap-2 items-center">
                                                <IconsLuggageIcon class="w-5 h-5" />
                                                <span class=" font-medium">Consignment:</span>
                                            </div> -->
                                            <p>{{ consignment.luggage }}</p>
                                        </div>
                                    </div>

                                    

                                    
                                </div>

                                <div class="col-span-4 flex flex-col items-start jus">
                                    <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> General Details  </span>

                                    <div class="grid grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 w-full items">
                                        <div class="col-span-2 md:col-span-1 flex flex-col items-start  px-4">

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsBookingIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Booking No:</span>
                                                </div>
                                                <p>{{  consignment?.bookingNumber }}</p>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsBookingIcon class="w-5 h-5" />
                                                    <span class=" font-medium">BL No:</span>
                                                </div>
                                                <p>{{  consignment?.blNumber }}</p>
                                            </div>


                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsShipIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Type:</span>
                                                </div>
                                                <p>{{ consignment?.looseCargo == 0 ? "Containers" : "Loose Cargo" }}</p>
                                            </div>

                                            <!-- <div class="flex gap-3  w-full items-center my-2" v-if="consignment.looseCargo==0">
                                                <div class="flex gap-4 items-center">
                                                    <IconsContainerIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Containers:</span>
                                                </div>
                                                <p>{{  consignment?.cont20 + consignment?.cont40 }}</p>
                                            </div> -->

                                            <!-- <div class="flex gap-3  w-full items-center my-2" v-else>
                                                <div class="flex gap-4 items-center">
                                                    <IconsContainerIcon class="w-5 h-5" />
                                                    <span class=" font-medium">No. Packages:</span>
                                                </div>
                                                <p>{{  consignment.looseCargo }}</p>
                                            </div> -->

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsDestinationIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Loading Port:</span>
                                                </div>
                                                <p>{{ consignment?.portOfLoading }}</p>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsDestinationIcon class="w-5 h-5" />
                                                    <span class=" font-medium">ETD:</span>
                                                </div>
                                                <p>{{ consignment?.etd }}</p>
                                            </div>

                                            
                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsDestinationIcon class="w-5 h-5" />
                                                    <span class=" font-medium">ETA:</span>
                                                </div>
                                                <p>{{ consignment?.eta }}</p>
                                            </div>

                                        </div>

                                        <div class="col-span-2 md:col-span-1 flex flex-col items-start  px-4">

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsDestinationIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Discharge Port:</span>
                                                </div>
                                                <p>{{ consignment?.destination }}</p>
                                            </div>

                                            <div class="flex gap-1  w-full items-center my-2">
                                                <div class="flex gap-2 items-center">
                                                    <IconsLuggageIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Mode of Transport:</span>
                                                </div>
                                                <p>By {{ consignment?.modeOfTransport }}</p>
                                            </div>
                                        <!-- sea -->
                                            <div class="sea" v-if="consignment?.modeOfTransport=='Sea'">


                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsShipIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Shipper:</span>
                                                </div>
                                                <div class="flex flex-col">
                                                    <p>{{ consignment?.transporter != null ? consignment?.transporter.name: "" }}</p>
                                                    <!-- <p class=" pl-6">{{ consignment.transporter != null ? consignment.transporter.phone: "" }}</p> -->
                                                </div>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsShipIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Consignee:</span>
                                                </div>
                                                <p>{{ consignment?.consignee != null ? consignment?.consignee?.fullName.split(" ")[0]: "" }}</p>
                                            </div>

                                            <div class="flex gap-3  w-full items-center my-2">
                                                <div class="flex gap-4 items-center">
                                                    <IconsDestinationIcon class="w-5 h-5" />
                                                    <span class=" font-medium">Status:</span>
                                                </div>
                                                <p>{{ consignment?.status }}</p>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div class="col-span-4 lg:col-span-4 flex flex-col md:grid md:grid-cols-3 items-start mb-4 mt-6 w-full">
                                    <div class="flex flex-col">
                                        <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> Vessel/Truck Details  </span>
                                    
                                        <div class="flex gap-3  w-full items-center my-2">
                                            <div class="flex gap-4 items-center">
                                                <IconsUserIcon class="w-5 h-5"/>
                                                <span class=" font-medium">Vessel Name:</span>
                                            </div>
                                            <p>{{ consignment?.vesselName }}</p>
                                        </div>

                                        <div class="flex gap-3  w-full items-center my-2" v-if="consignment?.modeOfTransport=='air'">
                                            <div class="flex gap-4 items-center">
                                                <IconsContainerIcon class="w-5 h-5" />
                                                <span class=" font-medium">Flight Name:</span>
                                            </div>
                                            <p>{{  consignment?.flightName }}</p>
                                        </div>

                                        <!-- <div class="flex gap-3  w-full items-center my-2" >
                                            <div class="flex gap-4 items-center">
                                                <IconsContainerIcon class="w-5 h-5" />
                                                <span class=" font-medium">Vessel No:</span>
                                            </div>
                                            <p>{{  consignment?.vesselNumber }}</p>
                                        </div> -->

                                        <div class="flex gap-3  w-full items-center my-2" v-if="consignment?.modeOfTransport=='air'">
                                            <div class="flex gap-4 items-center">
                                                <IconsContainerIcon class="w-5 h-5" />
                                                <span class=" font-medium">Flight Number:</span>
                                            </div>
                                            <p>{{  consignment?.flightNumber }}</p>
                                        </div>

                                        <div class="flex gap-3  w-full items-center my-2" v-if="consignment?.modeOfTransport=='sea'">
                                            <div class="flex gap-4 items-center">
                                                <IconsContainerIcon class="w-5 h-5" />
                                                <span class=" font-medium">Voy No:</span>
                                            </div>
                                            <p>{{  consignment?.voyageNumber }}</p>
                                        </div>
                                    </div>

                                    <div class="flex flex-col">

                                        <span class="text-[#292a5e]  mt-3 my-2 uppercase font-semibold"> Container/Cargo Details  </span>
                                        <div class="flex gap-1  w-full items-center my-2">
                                            <div class="flex gap-2 items-center">
                                                <IconsLuggageIcon class="w-5 h-5" />
                                                <span class=" font-medium">Total Weight:</span>
                                            </div>
                                            <p>{{ consignment?.totalWeight }} T</p>
                                        </div>

                                        <div class="flex flex-col gap-3  w-full items-start my-2" >
                                            <div class="flex gap-4 items-center">
                                                <IconsContainerIcon class="w-5 h-5" />
                                                <span class=" font-medium">Containers ({{ consignment?.containers ? consignment.containers.length : 0 }}):</span>
                                            </div>
                                            <div class="flex flex-col pl-8">
                                                <p v-for="container in consignment?.containers">&#x2022; {{ container.size }} : {{ container.number }}  </p>
                                            </div>
                                        </div>
                                    </div>

                                    

                                    
                                </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between pr-12 my-5" v-if="activeSub=='cost'">
                        <h3 class="text-[#292a5e]  mt-3 my-6 uppercase text-xl font-semibold">Cost</h3>
                        <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showExpenseForm=true">
                            <IconsAddIcon class="h-7 w-7 cursor-pointer" />
                            <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                            Add Cost
                        </span>
                        </button>
                    </div>

                    <div class="m-auto block" v-if="activeSub=='cost'">
                        <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                            <tr class="">
                            <th class="px-4 py-2 text-left">Requested By</th>
                            <th class="px-4 py-2 text-left">Amount</th>
                            <th class="px-4 py-2 text-left">Purpose</th>
                            <th class="px-4 py-2 text-left">Approved By</th>
                            <th class="px-4 py-2 text-left">Date requested</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in expenses" :key="item.ID">
                                <td class="px-4 py-2"> 
                                    <!-- <input type="checkbox" class="mr-2" /> -->
                                    <span v-if="item.Requested">{{ item?.Requested.firstName + " " + item?.Requested.lastName }}</span> 
                                </td>
                                <td class="px-4 py-2">{{ item.amount}} ({{ item.currency }})</td>
                                <td class="px-4 py-2">{{ item.purpose }}</td>
                                <th class="px-4 py-2 text-left">
                                    <span v-if="item.Approved">{{ item.Approved?.firstName + " " + item.Approved?.lastName }}</span>
                                    <span v-else class="italic">not approved</span>
                                </th>
                                <td class="px-4 py-2">{{ convertDateFormat(item.CreatedAt)}}</td>
                                <td class="flex items-center gap-6 px-4 py-2">
                                <!-- <span 
                                class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                                @click="viewExpenseClicked(item)"
                                >View</span> -->

                                <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                                @click="loadEditExpenseForm(item)">
                                Edit
                                </span>

                                <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                                @click="loadDeleteExpenseDialog(item)"
                                >Delete</span>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>

                    <div v-if="activeSub=='revenue'">
                        <div class="flex justify-around gap-8">
                    <div class="flex flex-col gap-2  items-start" v-if="activeSub=='revenue'">
                        <span class="text-lg font-semibold text-[#292a5e]">
                            TOTAL REVENUE(TSH): {{ numberWithCommas(revenueTSH) }} TSH
                        </span>

                        <span class="text-lg font-semibold text-[#292a5e]">
                            TOTAL REVENUE(USD): {{ numberWithCommas(revenueUSD) }} USD
                        </span>

                        <span class="text-lg font-semibold text-[#292a5e]">
                            TOTAL COST(TSH): {{ numberWithCommas(costTSH) }} TSH
                        </span>
                        <span class="text-lg font-semibold text-[#292a5e]">
                            TOTAL COST(USD): {{ numberWithCommas(costUSD) }} USD
                        </span>
                    </div>

                    <div class="flex flex-col gap-2  items-start" v-if="activeSub=='revenue'">
                        <span class="text-lg font-semibold text-[#292a5e]">
                            NET PROFIT/LOSS
                        </span>
                        <div class="flex gap-12 items-center">
                            <!-- <span class="text-sm cursor-pointer font-light text-[#d4af37]">change exchange rate</span> -->
                            <span class="text-sm cursor-pointer font-light text-[#d4af37]" @click="showExchangeRateBoard">change currency</span>
                        </div>
                        <span v-if="profitLossCompute>=0" class="text-lg font-semibold text-[#292a5e]">
                            PROFIT: {{ numberWithCommas(converterOptions.profitValue.toFixed(3)) }} {{ converterOptions.selectedCurrency }}
                        </span>
                        <span v-else class="text-lg font-semibold text-red-400">
                            LOSS: {{ numberWithCommas(converterOptions.lossValue.toFixed(3)) }} {{ converterOptions.selectedCurrency }}
                        </span>
                    </div>
                </div>

                        <div class="flex items-center justify-between pr-12 my-5" >
                        <h3 class="text-[#292a5e]  mt-3 my-6 uppercase text-xl font-semibold">Revenue</h3>
                        <div class="group">
                            <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showRevenueForm=true">
                                <IconsAddIcon class="h-7 w-7 cursor-pointer" />
                                <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                                    Add Item
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="m-auto block">
                        <div 
                            class="flex gap-11 pl-4 mb-4 opacity-0 transition duration-300" 
                            :class="showGenBtns?'opacity-100':'opacity-0'"
                            v-if="store.hasPermission('can-create-invoices')"
                            >
                            <div class="flex gap-1 items-center cursor-pointer">
                                <IconsInvoiceIcon class="w-4 h-4" current-color="#d4af37"/>
                                <span class="text-sm text-[#d4af37] font-semibold" 
                                    @click="generateInvoiceClicked"
                                >Generate invoice
                                </span>
                            </div>
                            <div class="flex gap-1 items-center cursor-pointer">
                                <IconsWalletIcon class="w-4 h-4" current-color="#d4af37"/>
                                <span class="text-sm text-[#d4af37] font-semibold"
                                    @click="showCreateDebitNoteForm=true"
                                >
                                Generate debit Note
                                </span>
                            </div>
                        </div>
                        <table class="w-full divide-y divide-gray-200">
                        <thead class="bg-gray-100">
                            <tr class="">
                            <th class="px-4 py-2 text-left">Requested By</th>
                            <th class="px-4 py-2 text-left">Amount</th>
                            <th class="px-4 py-2 text-left">Purpose</th>
                            <!-- <th class="px-4 py-2 text-left">Approved By</th> -->
                            <th class="px-4 py-2 text-left">Date requested</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in revenues" :key="item.ID">
                                <td class="px-4 py-2">
                                    <input type="checkbox" class="mr-2"  @change.prevent="updateParticulars(item, $event)"/> 
                                    <span v-if="item.Requested">{{ item?.Requested?.firstName + " " + item?.Requested?.lastName }}</span> 
                                </td>
                                <td class="px-4 py-2">{{ item.amount}} ({{ item.currency }})</td>
                                <td class="px-4 py-2">{{ item.purpose }}</td>
                                <!-- <th class="px-4 py-2 text-left">
                                    <span v-if="item.Approved">{{ item.Approved?.firstName + " " + item.Approved?.lastName }}</span>
                                    <span v-else class="italic">not approved</span>
                                </th> -->
                                <td class="px-4 py-2">{{ convertDateFormat(item.CreatedAt)}}</td>
                                <td class="flex items-center gap-6 px-4 py-2">
                                <!-- <span 
                                class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                                @click="viewExpenseClicked(item)"
                                >View</span> -->

                                <span class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
                                @click="loadEditRevenueForm(item)">
                                Edit
                                </span>

                                <span class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer" 
                                @click="loadDeleteRevenueDialog(item)"
                                >Delete</span>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>

                    <Modal v-if="exchangeRateBoardVisible" @close-modal="hideExchangeRateBoard">
                        <form class="flex flex-col gap-8 w-[300px] lg:w-[400px] mx-auto">
                            <div class="flex flex-col gap-3">
                                <label for="currency" class="text-xs">select currency</label>
                                <select name="currency" id="" v-model="converterOptions.selectedCurrency" class="border border-gray-2oo rounded p-2">
                                    <option value="USD">USD</option>
                                    <option value="TSH">TSH</option>
                                </select>
                            </div>

                            <div class="flex flex-col gap-3">
                                <label for="currency" class="text-xs">Exchange Rate (USD/TSH)</label>
                                <input type="number" name="exchangeRate" v-model="converterOptions.exchangeRate" class="border border-gray-2oo rounded p-2">
                            </div>

                            <div class="grid place-items-center my-4">
                                <button class="bg-[#292a5e] text-white p-3 rounded-lg" @click.prevent="hideExchangeRateBoard">Done</button>
                            </div>
                        </form>
                    </Modal >

                    <FormsCreateConsignmentCostForm v-if="showExpenseForm" :consignmentId="consignment.ID" @close="handleExpenseClosed"/>
                    <FormsCreateConsignmentRevenueItemForm v-if="showRevenueForm" :consignmentId="consignment.ID" @close="handleRevenueClosed"/>
                    <FormsEditConsignmentCostForm v-if="showEditExpenseForm" :expensedata="expenseToEdit" @close="handleEditExpenseClosed"/>
                    <FormsEditConsignmentRevenueForm v-if="showEditRevenueForm" :revenuedata="revenueToEdit" @close="handleEditRevenueClosed"/>
                    <FormsCreateTaxInvoiceForm 
                        v-if="showCreateTaxInvoiceForm" 
                        :entries="particulars" 
                        :consignment="consignment"  
                        @close="handleCreateTaxInvoiceClosed"
                    />

                    <FormsCreateDebitNoteForm 
                        v-if="showCreateDebitNoteForm" 
                        :entries="particulars" 
                        :consignment="consignment"  
                        @close="showCreateDebitNoteForm=false"
                    />
                    <DeleteDialog 
                        v-if="showDeleteExpenseDialog" 
                        entity="Consignment expense" 
                        :loading="deleteInProgress" 
                        @proceed="deleteExpense" 
                        @close="showDeleteExpenseDialog=false"/>
                    <DeleteDialog 
                    v-if="showDeleteRevenueDialog" 
                    entity="Consignment revenue" 
                    :loading="deleteInProgress" 
                    @proceed="deleteRevenue" 
                    @close="showDeleteRevenueDialog=false"/>
                    <!-- <TaxInvoicePreview v-if="showTaxInvoicePreview"  :doc="taxInvoiceToPreview" @close="taxInvoicePreviewClosed"/> -->
                </div>
            </div>
            <Toast v-if="toastMessage" :message="toastMessage" :type="toastType" />
        </div>
    
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';

const { $axios } = useNuxtApp()
import {userStore} from "../../../store"


const store = userStore()
const toastMessage = ref('');
const toastType = ref('info');

const route = useRoute()

const expenses = ref([])
const revenues = ref([])
const expenseToEdit = ref({})
const revenueToEdit = ref({})
const expenseToDelete = ref({})
const revenueToDelete = ref({})
const taxInvoiceToPreview = ref({consignment:{}})

const showExpenseForm = ref(false)
const showRevenueForm = ref(false)
const showEditExpenseForm = ref(false)
const showEditRevenueForm = ref(false)
const showCreateTaxInvoiceForm = ref(false)
const showCreateDebitNoteForm = ref(false)
const showDeleteExpenseDialog = ref(false)
const showDeleteRevenueDialog = ref(false)
const showTaxInvoicePreview = ref(false)
const deleteInProgress = ref(false)
const exchangeRateBoardVisible = ref(false)

const particulars = ref([]);

const updateParticulars = (val, e)=>{
    if(particulars.value.length>0){
        console.log('length detected', val)
        if (particulars.value.length > 0 && val.currency !== particulars.value[0].currency) {
            console.log('Currency mismatch detected');
            toastType.value = 'error';
            toastMessage.value = 'Entries must be of the same currency';
            e.target.checked = false;
            return; // Exit early if currencies don't   match
        }

    }
    if(e.target.checked){
        particulars.value.push(val)
        console.log("addeed particular", particulars.value)
    }else{
        particulars.value = particulars.value.filter((p)=>p.ID!=val.ID)
        console.log("removing particular", particulars.value)
    }
}

const showGenBtns = computed(()=>{
    return particulars.value.length > 0
})
const converterOptions = ref({
    usd:"USD",
    tsh:"TSH",
    exchangeRate: 2300,
    selectedCurrency:"USD",
    profitValue:0,
    lossValue:0
})

const showExchangeRateBoard = ()=>{
    exchangeRateBoardVisible.value  = true;
}

const hideExchangeRateBoard = ()=>{
    exchangeRateBoardVisible.value  = false;
}

const activeSub = ref("details")

const consignment = ref({
    ID:0,
    luggage: "",
    customer: {},
    transporter: "",
    destination: "",
    cont10: 0,
    cont20: 0,
    cont40: 0,
    Overseer: {}
  })

const revenue = computed(()=>{
    if (revenues.value.length > 0){
        return revenues.value.reduce((a,x)=>a+x.amount, 0)
    }else{
        return 0
    }
} )  

const cost = computed(()=>{
    if(expenses.value.length > 0){
        return expenses.value.reduce((a,x)=>a+x.amount, 0) 
    }else{
        return 0
    }
})

const revenueTSH = computed(()=>{
    if (revenues.value.length > 0){
        const tshRevenue = revenues.value.filter(x=>x.currency=="TSH");
        return tshRevenue.reduce((a,x)=>a+x.amount, 0)
    }else{
        return 0
    }
} )  

const costTSH = computed(()=>{
    if(expenses.value.length > 0){
        const tshCost = expenses.value.filter(x=>x.currency=="TSH");
        return tshCost.reduce((a,x)=>a+x.amount, 0) 
    }else{
        return 0
    }
}) 

const revenueUSD = computed(()=>{
    if (revenues.value.length > 0){
        const usdRevenues = revenues.value.filter(x=>x.currency=="USD");
        return usdRevenues.reduce((a,x)=>a+x.amount, 0)
    }else{
        return 0
    }
} )  

const costUSD = computed(()=>{
    if(expenses.value.length > 0){
        const usdCost = expenses.value.filter(x=>x.currency=="USD");
        return usdCost.reduce((a,x)=>a+x.amount, 0) 
    }else{
        return 0
    }
}) 


function profitLossCB(){
    let revenue = 0
    let cost = 0
    switch(converterOptions.value.selectedCurrency){
        case "USD":
            revenue = revenueUSD.value;
            revenue += revenueTSH.value/converterOptions.value.exchangeRate;
            cost = costUSD.value;
            cost += costTSH.value/converterOptions.value.exchangeRate;
            break;
        case "TSH":
            revenue = revenueTSH.value;
            revenue += revenueUSD.value*converterOptions.value.exchangeRate; 
            cost = costTSH.value;
            cost += costUSD.value*converterOptions.value.exchangeRate;
            break;
    }

    if(revenue==cost){
        return 0
    }else if(revenue>cost){
        converterOptions.value.profitValue = revenue - cost;
        return 1
    }else{
        converterOptions.value.lossValue = cost - revenue;
        return -1
    }
}


const profitLossCompute = computed(profitLossCB)


const emit = defineEmits(["close"])

function close(){
    emit("close")
}

async function handleExpenseClosed(payload){
    showExpenseForm.value=false;
    if(payload!=undefined){
      await getconsignmentExpenses()
    }
}

async function handleRevenueClosed(payload){
    showRevenueForm.value=false;
    if(payload!=undefined){
      await getconsignmentRevenues()
    }
}

function convertDateFormat(dateString) {
  // Create a new Date object from the input string
  const inputDate = new Date(dateString);

  // Format the date as "DDD/MM/YY"
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

function loadEditExpenseForm(expense){
  expenseToEdit.value = expense;
  showEditExpenseForm.value = true
}

function numberWithCommas(x) {
    // Convert the number to a string and split it into integer and decimal parts
    let [integerPart, decimalPart] = x.toString().split('.');

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Reconstruct the number with commas and return
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

function loadEditRevenueForm(revenue){
  revenueToEdit.value = revenue;
  showEditRevenueForm.value = true
}

async function handleEditExpenseClosed(payload){
    showEditExpenseForm.value=false;
  if(payload!=undefined){
    await getconsignmentExpenses()
  }
}

async function handleEditRevenueClosed(payload){
    showEditRevenueForm.value=false;
    if(payload!=undefined){
      await getconsignmentRevenues()
    }
}


function loadDeleteExpenseDialog(expense){
  expenseToDelete.value = expense;
  showDeleteExpenseDialog.value = true
}

function loadDeleteRevenueDialog(revenue){
    revenueToDelete.value = revenue;
    showDeleteRevenueDialog.value = true
}


function generateInvoiceClicked(){
    // showTaxInvoicePreview.value = true;
    showCreateTaxInvoiceForm.value = true;
}

function taxInvoicePreviewClosed(){
    showTaxInvoicePreview.value = false;
}

function handleCreateTaxInvoiceClosed(){
    showCreateTaxInvoiceForm.value = false;
}

async function getConsignment(){
  try {
    const response = await $axios.get(`/api/consignments/${route.params.ID}`);
    if(response.status === 200|201){
      consignment.value = response.data;
      taxInvoiceToPreview.value.consignment = response.data
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getconsignmentExpenses(){
    try {
    const response = await $axios.get(`/api/filter-expenses?consignment=${route.params.ID}`);
    if(response.status === 200|201){
      expenses.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching cost data:', error);
  }
}

async function getconsignmentRevenues(){
    try {
    const response = await $axios.get(`/api/filter-revenue?consignment=${route.params.ID}`);
    if(response.status === 200|201){
      revenues.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching cost data:', error);
  }
}

async function deleteExpense(){
  deleteInProgress.value = true
  const res = await $axios.delete(`/api/expenses/delete/${expenseToDelete.value.ID}`)
  if(res.status==200 || 201){
      deleteInProgress.value = false
      //remove employee from client state
      await getconsignmentExpenses()
      showDeleteExpenseDialog.value = false;
  }else{
  }
}

async function deleteRevenue(){
  deleteInProgress.value = true
  const res = await $axios.delete(`/api/revenue/delete/${revenueToDelete.value.ID}`)
  if(res.status==200 || 201){
      deleteInProgress.value = false
      await getconsignmentRevenues()
      showDeleteRevenueDialog.value = false;
  }else{
  }
}

onMounted(async ()=>{
    await getConsignment()
    await getconsignmentExpenses()
    await getconsignmentRevenues()
})
</script>