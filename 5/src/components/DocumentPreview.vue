<template>
    <v-card style="background: #777788">
        <v-container
                fluid
                grid-list-lg
        >
            <v-layout row wrap>
                <v-flex>
                    <v-card color="#AAAABB" style="color: #111122">
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{ post.title }}</div>
                                <span>создал {{ post.user }}</span>
                            </div>
                        </v-card-title>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-btn flat dark style="color: #222233" v-on:click="$emit('openDocument', post)">открыть</v-btn>
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
