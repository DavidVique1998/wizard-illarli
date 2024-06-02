<template>
    <v-row class="bg-containerBg position-relative" no-gutters>
        <!---Part-->
        <v-col cols="12" lg="12" class="d-flex align-center">
            <v-container>
                <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
                    <v-row justify="center">
                        <v-col cols="12" md="12">
                            <v-card elevation="0" style="max-width: 575px; margin: 0 auto;">
                                <v-card elevation="24">
                                    <v-card-text class="pa-sm-10 pa-6">
                                        <v-img src="/img/illarli_logo.png" class="mb-10 mx-auto"
                                            style="max-width: 200px" aspect-ratio="16/9"></v-img>
                                        <!-- Slot for subtitle -->
                                        <div class="text-center" style="line-height: 1.2;">
                                            <slot name="subtitle"></slot>
                                        </div>
                                        <!-- Slot for the form -->
                                        <div class="form-content">
                                            <slot></slot>
                                        </div>
                                        <!---Form-->
                                    </v-card-text>
                                </v-card>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-col>
    </v-row>
</template>