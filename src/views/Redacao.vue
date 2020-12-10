<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-card class="elevation-12" width="1200">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Redação: {{ title }} - {{ theme }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout align-center justify-center>
            <v-flex xs10 sm10 md10>
              <v-col class="editorConteudo"
                align-self="center">
                <div v-html="redacao">
                </div>
              </v-col>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<style lang="scss">
  .editorConteudo {
    border: 1px #bdbdbd solid;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 15px 0;
    min-height: 500px;

    & div {
      & .ProseMirror {
        min-height: 500px;

        &-focused {
          outline: none !important;
        }
      } 
    }
  }
</style>

<script>
import { mapActions } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      editor: null,
      theme: ' ',
      title: '',
      redacao: 'Não encontramos essa redação',
    };
  },
  methods: {
  },
  beforeMount() {
    let essay = this.$route.params.essay ? this.$route.params.essay : null

    if (essay) {
      this.redacao = essay.doc.essay
      this.theme = essay.doc.theme
      this.title = essay.doc.title
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>