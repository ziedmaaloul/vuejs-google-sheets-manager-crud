<template>
  <div id="app">

    <template>
      <b-navbar>
          <template #brand>
              <b-navbar-item tag="router-link" :to="{ path: '/' }">
                  <strong>Vue Js Google Sheet App</strong>
              </b-navbar-item>
          </template>
          <template #start>
                <router-link class="navbar-item" to="/">Elements List</router-link>
                <router-link class="navbar-item" to="/add">+ Add New Row</router-link>
                <a class="navbar-item" href="https://docs.google.com/spreadsheets/d/1QIftjUQX3dvd8_gSqiwQYRTifPqDP_venNGA6ULfMf0/edit" target="_blank">Show Sheet File Page</a>


          </template>

      </b-navbar>
  </template>
    <router-view/>
  </div>
</template>
