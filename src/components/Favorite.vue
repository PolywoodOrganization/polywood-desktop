<template>
    <Card additional-card-class=" col-xl-3 col-lg-3 col-md-5 col-sm-12 border-secondary">
        <p class="card-text"><b> Film :</b> {{movie.title}}</p>
        <p class="card-text"><b> Date :</b> {{added}}</p>
        <button class="bg-transparent border-0 edit-btn" @click="toggleEditMode">✏️</button>
        <p v-if="!editComment" class="card-text"><b> Votre commentaire :</b> {{commentary}} </p>
        <form v-else class="row" @submit.prevent="onCommentEdited">
            <label for="comment" class="col-12"><b> Votre commentaire :</b></label>
            <input type="text" class="form-control col-12" id="comment" name="comment" placeholder="Commentaire" v-model="commentary"/>

            <input type="submit" value="Modifier" class="btn btn-primary col-12"/>
        </form>
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
                movie: {},
                editComment : false
            };
        },
        props: {
            id: {
                type: Number,
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
            toggleEditMode(){
               this.editComment = !this.editComment
            },
            onCommentEdited(){
                let toUpdate = {
                    idfavorite: this.id,
                    idmovie: this.idmovie,
                    commentary: this.commentary,
                    added: this.added,
                };
                this.$store.dispatch("updateFavorite", { token: this.$store.getters.authToken , toUpdate: toUpdate});
                this.toggleEditMode();
            }
        }
    };
</script>

<style lang="scss">
    @import "../assets/css/more-badges";

    .remove-btn, .edit-btn {
        position: absolute;
        top: 15px;
        right: 0;
        background-color: transparent;
        border: none;
    }

    .edit-btn{
        right: 25px;
    }
</style>
