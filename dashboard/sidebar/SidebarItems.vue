<script setup lang="ts">
import DocIcon from "./icons/DocIcon.vue";
import SidebarItem from "./SidebarItem.vue";
import TasksIcon from "./icons/TaskIcon.vue";
import ReportsIcon from "./icons/ReportIcon.vue";
import ProjectsIcon from "./icons/ProjectIcon.vue";
import SettingsIcon from "./icons/SettingsIcon.vue";
import CalendarIcon from "./icons/CalendarIcon.vue";
import DashboardIcon from "./icons/DashboardIcon.vue";
import TimeManageIcon from "./icons/TimeManageIcon.vue";
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

    <SidebarItem title="Petty Cash" to="/admin/calendar">
      <CalendarIcon />
    </SidebarItem>

    <!-- <SidebarItem title="Time Manage" to="/admin/time-manage">
      <TimeManageIcon />
    </SidebarItem>

    <SidebarItem title="Reports" to="/admin/reports">
      <ReportsIcon />
    </SidebarItem>

    <SidebarItem title="Settings" to="/admin/settings">
      <SettingsIcon />
    </SidebarItem>

    <SidebarItem title="Documentation" to="/admin/documentation">
      <DocIcon />
    </SidebarItem>-->

    <SidebarItem title="login" to="/login">
      <DocIcon />
    </SidebarItem>

    <SidebarItem title="Register" to="/register">
      <DocIcon />
    </SidebarItem> 
  </ul>
</template>
