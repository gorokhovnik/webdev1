<template>
    <v-app id="inspire" style="background: #FFFF77">
        <v-toolbar
                color="purple"
                dark
                fixed
                app
                clipped-right
        >
            <v-toolbar-side-icon class="yellow--text" @click.stop="drawer = !drawer">///</v-toolbar-side-icon>
            <v-toolbar-title class="yellow--text">ещенедиллингер</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat color="yellow" @click="createEmptyDocument()">создать новый недокумент</v-btn>

        </v-toolbar>

        <v-navigation-drawer v-model="drawer" fixed app style="background: #FFFF88">
            <v-list two-line subheader>
                <v-subheader class="purple--text">недокументы</v-subheader>

                <Preview
                        v-for="post in posts"
                        v-bind:key="post.id"
                        v-bind:post="post"
                        v-on:openDocument="openDocument"
                ></Preview>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <editor ref="editor"
                    :outline="true"
                    :preview="true"
                    v-model="openedDocument.body"
            ></editor>
            <Preserver
                    :post="openedDocument"
                    :is-post-new="isDocumentNew"
                    v-on:appendDocument="appendDocument"
                    v-on:updateDocument="updateDocument"
            ></Preserver>

            <v-btn v-if="!isDocumentNew" class="yellow--text" depressed color="purple" @click="deleteDocument()">
                удалить
            </v-btn>
        </v-content>

    </v-app>
</template>

<script>
    import Preserver from './Preserver';
    import {Editor, Preview} from '../build-entry';
    import {APIService} from '../util/APIService'

    const apiService = new APIService();

    export default {
        components: {Editor, Preview, Preserver},
        data: function () {
            return {
                drawer: true,
                text: '# Header',
                posts: [],
                errorz: [],
                openedDocument: {},
                isDocumentNew: true
            }
        },

        props: {
            source: String
        },

        mounted() {
            this.$refs.editor.focus();
        },

        created() {
            apiService.getDocs()
                .then(response => {
                    this.posts = response.data
                });

            this.createEmptyDocument();
        },


        methods: {
            openDocument: function (post) {
                this.isDocumentNew = false;
                this.openedDocument = post;
            },

            createEmptyDocument: function () {
                this.isDocumentNew = true;
                this.openedDocument = {title: 'неназвание', user: 'неавтор', body: '*введите нетекст*'};
            },

            deleteDocument() {
                apiService.deleteDoc(this.openedDocument._id)
                    .then(response => {
                        this.posts.splice(this.posts.indexOf(this.posts.find(docs => docs._id === this.openedDocument._id)), 1);
                        this.createEmptyDocument();
                        this.$msg('недокумент удален')
                    })
            },
            appendDocument(addedDocument) {
                this.openedDocument = addedDocument;
                this.isDocumentNew = false;
                this.posts.push(this.openedDocument);
                this.$msg('недокумент сохранен');
            },

            updateDocument(updatedDocument) {
                this.openedDocument = updatedDocument;
                this.posts[this.posts.indexOf(this.posts.find(doc => doc._id === this.openedDocument._id))] = this.openedDocument;
                this.$msg('недокумент сохранен');
            }
        }
    }
</script>
