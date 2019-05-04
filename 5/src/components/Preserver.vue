<template>
    <form>
        <v-container>
            <v-layout>
                <v-flex
                        xs12
                        md4
                >
                    <v-text-field
                            v-bind:title="post.title"
                            v-model="docName"
                            v-validate="'required|max:50'"
                            :counter="50"
                            :error-messages="errors.collect('docName')"
                            label="неназвание недокумента"
                            data-vv-name="docName"
                            required
                    ></v-text-field>

                    <v-text-field
                            v-bind:title="post.user"
                            v-model="username"
                            v-validate="'required|max:25'"
                            :counter="25"
                            :error-messages="errors.collect('username')"
                            label="неимя неавтора"
                            data-vv-name="username"
                            required
                    ></v-text-field>
                </v-flex>
                <v-btn v-if="isPostNew" color="yellow" class="purple--text" @click="createDoc">сохранить</v-btn>
                <v-btn v-else color="yellow" class="purple--text" @click="updateDoc">сохранить</v-btn>

            </v-layout>
        </v-container>
    </form>
</template>

<script>
    import Vue from 'vue'
    import VeeValidate from 'vee-validate'
    import {APIService} from '../util/APIService'

    let apiService = new APIService();

    Vue.use(VeeValidate);

    export default {
        $_veeValidate: {
            validator: 'new'
        },

        props: {
            post: {},
            isPostNew: Boolean
        },

        data: function () {
            return {
                docName: this.post.title,
                username: this.post.user,
                dictionary: {
                    custom: {
                        docName: {
                            required: () => 'неназвание не может быть пустым',
                            max: 'неназвание не должно превышать 50 символов'
                        },
                        username: {
                            required: () => 'неавтор должен существовать',
                            max: 'неимя неавтора не должно превышать 25 символов'
                        }
                    }
                }
            }
        },

        watch: {
            post: function (val) {
                this.docName = val.title;
                this.username = val.user;
            }
        },

        computed: {
            innerPost: function () {
                return {_id: this.post._id, title: this.docName, user: this.username, body: this.post.body}
            }
        },

        mounted() {
            this.$validator.localize('en', this.dictionary)
        },

        methods: {
            validate(fun) {
                let booleanPromise = this.$validator.validateAll();
                booleanPromise.then((bool) => {
                    if (bool) {
                        fun()
                    }
                })
            },

            updateDoc() {
                this.validate(() => {
                    apiService.updateDoc(this.innerPost)
                        .then(response => {
                            console.log(response.data);
                            this.$emit('updateDocument', response.data)
                        })
                })
            },
            createDoc() {
                this.validate(() => {
                    console.log({title: this.docName, user: this.username, body: this.post.body});
                    apiService.createDoc({title: this.docName, user: this.username, body: this.post.body})
                        .then(response => {
                            console.log(response.data);
                            this.$emit('appendDocument', response.data)
                        })
                })
            }

        }
    }
</script>

<style scoped>

</style>