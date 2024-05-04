<script setup>
// import { computed } from 'vue';
import DocIcon from "./icons/DocIcon.vue";
import SidebarItem from "./SidebarItem.vue";
import TasksIcon from "./icons/TaskIcon.vue";
import ProjectsIcon from "./icons/ProjectIcon.vue";
import CalendarIcon from "./icons/CalendarIcon.vue";
import DashboardIcon from "./icons/DashboardIcon.vue";
import {userStore} from "../../store"


const store = userStore()

function logout(){
  store.resetState() 
}

</script>

<template>
  <ul>
    <SidebarItem title="Dashboard" to="/">
      <DashboardIcon />
    </SidebarItem>

    <SidebarItem title="Employees" to="/admin/employees">
      <ProjectsIcon />
    </SidebarItem>

    <SidebarItem title="Customers" to="/admin/customers">
      <TasksIcon />
    </SidebarItem>

    <!-- <SidebarItem title="Time Manage" to="/admin/time-manage">
      <TimeManageIcon />
    </SidebarItem>

    <SidebarItem title="Reports" to="/admin/reports">
      <ReportsIcon />
    </SidebarItem>

    <SidebarItem title="Settings" to="/admin/settings">
      <SettingsIcon />
    </SidebarItem>-->

    <SidebarItem title="Consignments" to="/admin/consignments">
      <DocIcon />
    </SidebarItem>

    <SidebarItem title="Petty Cash" to="/admin/petty-cash">
      <CalendarIcon />
    </SidebarItem>

    <SidebarItem title="Invoices" to="/admin/invoices">
      <CalendarIcon />
    </SidebarItem>

    <SidebarItem v-if="!store.is_authenticated" title="login" to="/login">
      <DocIcon />
    </SidebarItem>

    <!-- <SidebarItem v-if="!store.is_authenticated" title="Register" to="/register">
      <DocIcon />
    </SidebarItem>  -->

    <SidebarItem v-if="store.is_authenticated" @click.prevent="logout" title="Logout" to="/login">
      <IconsBoltIcon />
    </SidebarItem>
  </ul>
</template>
