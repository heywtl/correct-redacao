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
              <!-- <editor-menu-bar
                :editor="editor"
                v-slot="{ commands, isActive }"
              >
                <div>
                  <button
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                  >
                    <v-icon>mdi-format-bold</v-icon>
                  </button>
                  <button
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                  >
                    <v-icon>mdi-format-italic</v-icon>
                  </button>

                  <button
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                  >
                    <v-icon>mdi-format-strike</v-icon>
                  </button>

                  <button
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                  >
                    <v-icon>mdi-format-underline</v-icon>
                  </button>

                  <button
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                  >
                    <v-icon>mdi-comment-quote-outline</v-icon>
                  </button>

                  <button @click="commands.horizontal_rule">
                    <v-icon>mdi-minus</v-icon>
                  </button>

                  <button @click="commands.undo">
                    <v-icon>mdi-undo</v-icon>
                  </button>

                  <button @click="commands.redo">
                    <v-icon>mdi-redo</v-icon>
                  </button>
                </div>
              </editor-menu-bar> -->
              <v-col class="editorConteudo"
                align-self="center">
                <div v-html="redacted">
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
      redacted: 'Não existe correção para essa redação',
    };
  },
  methods: {
  },
  beforeMount() {
    let essay = this.$route.params.essay ? this.$route.params.essay : null

    if (essay) {
      this.redacted = essay.doc.formated
      this.theme = essay.doc.theme
      this.title = essay.doc.title
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>