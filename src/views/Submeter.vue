<template>
  <v-container>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Submeter Redação</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-layout align-center justify-center>
                      <v-flex xs10 sm10 md10>
                        <v-text-field
                          name="theme"
                          label="Tema"
                          type="text"
                          v-model.lazy="theme"
                          :rules="formRules"
                          required
                        >
                        </v-text-field>
                        <v-text-field
                          name="title"
                          label="Titulo"
                          type="text"
                          :rules="formRules"
                          required
                          v-model.lazy="title"
                        >
                        </v-text-field>
                        <v-textarea
                          class="mt-5"
                          outlined
                          no-resize
                          rows="7"
                          name="essay"
                          label="Texto"
                          :disabled="disableWriting"
                          v-model.lazy="essay"
                          :rules="textRules"
                          required
                        >
                        </v-textarea>
                      </v-flex>
                    </v-layout>    
                  </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="ml-3"
                        color="primary"
                        :disabled="!valid"
                        @click="submit"
                        >Submeter</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {  
    return {
      valid: false,
      theme: '',
      title: '',
      essay: '',
      file: null,
      isSelecting: false,
      formRules: [
          v => !!v || 'Esse campo é obrigatório'
      ],
      textRules: [
          v => (!!v || this.file != null) ||
          'Por favor insira um texto ou carregue um arquivo .pdf, .txt ou .doc'
      ],
    }
  },
  computed: {
    disableUpload() {
      return this.essay != ''
    },
    disableWriting() {
      return this.file != null
    },
    canSubmit() {
      return this.valid
    }
  },
  methods: {
    ...mapActions([
      'postEssay'
    ]),
    submit() {
      let payload = {
        title: this.title,
        theme: this.theme,
        essay: this.essay != '' ? this.essay : this.file,
        submitDate: new Date().toISOString()
      }
      this.postEssay(payload)
    },
  }
}
</script>