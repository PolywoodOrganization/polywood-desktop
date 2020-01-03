<template>
    <Card additional-card-class=" col-xl-3 col-lg-3 col-md-5 col-sm-12 border-secondary">
        <p class="card-text"><b> Film :</b> {{movie.title}}</p>
        <p class="card-text"><b> Date :</b> {{added}}</p>
        <p class="card-text"><b> Votre commentaire :</b> {{commentary}}</p>
        <button class="remove-btn" @click="removeFromFavorites">❌</button>
    </Card>
</template>

<script>
    import Card from "./Card";
    import Badge from "./Badge";

    export default {
        name: "Favorite",
        components: { Card },
        data() {
            return {
                isHoveringCard: false,
                movie: {}
            };
        },
        props: {
            id: {
                type: String,
            },
            idmovie: {
                type: String
            },
            commentary: {
                type: String
            },
            added: {
                type: String
            }
        },
        created() {
            this.$store.dispatch("fetchMovieById", this.idmovie).then( movie =>
                this.movie = movie
            );
        },
        methods :{
            removeFromFavorites(){
                this.$store.dispatch("removeSpecificFavorite", this.id);

            },
        }
    };
</script>

<style lang="scss">
    @import "../assets/css/more-badges";

    .remove-btn {
        position: absolute;
        top: 15px;
        right: 0;
        background-color: transparent;
        border: none;
    }
</style>
