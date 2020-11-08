<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Cadastro de Perfil</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-layout>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                            name="nome"
                                            label="Nome*"
                                            type="text"
                                            v-model.lazy="nome"
                                            :rules="requiredRules"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                            name="sobrenome"
                                            label="Sobrenome*"
                                            type="text"
                                            v-model.lazy="sobrenome"
                                            :rules="requiredRules"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select
                                            :items="generos"
                                            v-model="genero"
                                            label="Gênero"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-menu
                                            v-model="dateSelection"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="aniversario"
                                                label="Aniversário"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            color="primary"
                                            v-model="aniversario"
                                            :show-current="maxDate"
                                            :max="maxDate"
                                            @input="dateSelection = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-divider></v-divider>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select
                                            :items="permissoes"
                                            v-model.lazy="permissao"
                                            label="Tipo de perfil*"
                                            required
                                            :rules="requiredRules"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select
                                            :items="escolaridades"
                                            v-model.lazy="escolaridade"
                                            label="Escolaridade*"
                                            required
                                            :rules="requiredRules"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            name="instituicao"
                                            label="Instituição"
                                            type="text"
                                            v-model.lazy="instituicao"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col v-if="permissao == 'Corretor'" 
                                        cols="12">
                                    </v-col>
                                    <v-col cols="12">
                                        <v-checkbox
                                            v-model="exibicao"
                                            label="Permito que minhas redações sejam expostas publicamente."
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-checkbox
                                            v-model="consentimento"
                                            label="Concordo em compartilhar o conteúdo das minhas redações com uma inteligência artificial."
                                            :rules="consentRules"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            :disabled="!valid"
                            @click="submit"
                            data-cy="signinSubmitBtn"
                            >Enviar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'CadastroPerfil',
    data() {
        return {
            valid: false,
            requiredRules: [
                v => !!v || 'Esse campo é obrigatório'
            ],
            consentRules: [
                v => !!v || 'Você precisa aceitar o compartilhamento.'
            ],
            dateSelection: false,
            nome: '',
            sobrenome: '',
            genero: null,
            aniversario: null,
            permissao: '',
            escolaridade: '',
            instituicao: null,
            consentimento: false,
            exibicao: false,
            generos: [ 'Masculino', 'Feminino', 'Outros', 'Prefiro não declarar' ],
            permissoes: [ 'Estudante', 'Corretor' ],
            escolaridades: [ 'Fundamental incompleto', 'Fundamental completo', 'Médio incompleto', 'Médio completo', 'Superior incompleto', 'Superior completo', 'Pós-graduação', 'Doutorado' ]
        };
    },
    computed: {
        ...mapGetters([
            'getUser'
        ]),
        maxDate() {
            return new Date().toISOString().substr(0, 10);
        }
    },
    methods: {
        ...mapActions([
            'createProfile'
        ]),
        submit() {
            const payload = {
                email: this.getUser.email,
                nome: this.nome,
                sobrenome: this.sobrenome,
                aniversario: this.aniversario,
                permissao: this.permissao,
                escolaridade: this.escolaridade,
                consentimento: this.consentimento,
                exibicao: this.exibicao
            }
            this.createProfile(payload)
        }
    }
};
</script>

<style scoped></style>
