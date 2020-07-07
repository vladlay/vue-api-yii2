<template>
    <div id="default-layout">
        <navbar :user="user"/>
        <router-view/>
    </div>
</template>

<script>
import Navbar from "./Navbar";
import authService from '../services/auth.service';
export default {
    name: "DefaultLayout",
    components: {Navbar},
    data() {
        return {
            user: {}
        }       
    },
    async beforeMount() {
        this.user = await authService.getCurrentUser();
    }
}
</script>

<style lang="scss" scoped>
#default-layout {
    padding-top: 50px;
}
</style>