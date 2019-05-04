<template>
    <v-card style="background: #FFFF77">
        <v-container
                fluid
                grid-list-lg
        >
            <v-layout row wrap>
                <v-flex>
                    <v-card color="purple" class="yellow--text">
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{ post.title }}</div>
                                <span>создан {{ post.user }}</span>
                            </div>
                        </v-card-title>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-btn color="yellow" flat dark v-on:click="$emit('openDocument', post)">открыть недокумент</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: 'Preview',
        props: {
            post: {}
        }
    }
</script>

<style>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
