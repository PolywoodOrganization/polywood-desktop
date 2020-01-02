<template>
    <Card additional-card-class=" col-xl-3 col-lg-3 col-md-5 col-sm-12 border-secondary">
        <p class="card-text"><b> Movie :</b> {{movie.title}}</p>
        <p class="card-text"><b> Date :</b> {{added}}</p>
        <p class="card-text"><b> Commentary :</b> {{commentary}}</p>
    </Card>
</template>

<script>
    import Card from "./Card";
    import Badge from "./Badge";

    export default {
        name: "Movie",
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
            this.$store.dispatch("fetchMovieById", { token: this.$store.getters.authToken , id: this.idmovie}).then( movie =>
                this.movie = movie
            );
        },
    };
</script>

<style lang="scss">
    @import "../assets/css/more-badges";
</style>
