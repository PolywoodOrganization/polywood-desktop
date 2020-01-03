<template>
    <div class="container favorites-container" id="favorites">
        <h3> Vos favoris </h3>
        <div class="row justify-content-center">
            <Favorite class="favorite" v-for="fav in $store.getters.favorites" v-bind="fav" :key="fav.idfavorite" :id="fav.idfavorite"/>
        </div>
    </div>
</template>

<script>
    import Favorite from "./Favorite";

    export default {
        name: "FavoritesContainer",
        created() {
            if(this.$store.getters.favorites.length === 0)
                this.$store.dispatch("fetchFavorites", {token: this.$store.getters.authToken});
        },
        components: {Favorite}
    };
</script>

<style scoped lang="scss">
    @import "../assets/css/bootstrap.min.css";
    @import "../assets/css/colors";

    .favorite {
        display: inline-block;
    }

</style>