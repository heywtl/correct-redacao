<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-card class="elevation-12" width="1200">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Corrigir Redação</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout align-center justify-center>
            <v-flex xs10 sm10 md10>
              <div>
                <b>{{ title }} - {{ theme }}</b>
              </div>
              <editor-menu-bar
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
              </editor-menu-bar>
              <v-col align-self="center" class="editorConteudo"
                ><editor-content :editor="editor"
              /></v-col>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col offset="1"  cols="2">
              <v-text-field
                v-model="grade.domEscFor"
                :rules="requiredRules"
                type="number"
                label="Dom. Escrita Formal"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="grade.atencaoTema"
                :rules="requiredRules"
                type="number"
                label="Atenção ao tema"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="grade.argumentacao"
                :rules="requiredRules"
                type="number"
                label="Argumentação"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="grade.conMecLing"
                :rules="requiredRules"
                type="number"
                label="Conhecimento Mec. Ling."
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="grade.propIntervencao"
                :rules="requiredRules"
                type="number"
                label="Proposta de intervenção"
              ></v-text-field>
            </v-col>
            <v-col offset="1" cols="3">
              <a href="http://portal.mec.gov.br/ultimas-noticias/418-enem-946573306/81381-conheca-as-cinco-competencias-cobradas-na-redacao-do-enem">Detalhamento de Competências</a>
            </v-col>
            <v-col offset="6" cols="2">
              <v-btn depressed
                color="blue darken-3"
                @click="submit">Enviar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
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
// Import the editor
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Bold,
  Italic,
  Strike,
  CodeBlock,
  Underline,
  HorizontalRule,
  History,
} from "tiptap-extensions";
import { mapActions } from 'vuex';

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: null,
      theme: '',
      title: '',
      redacted: '',
      requiredRules: [
        v => v <= 200 || 'A nota não pode ser maior que 200',
        v => v >= 0 || 'A nota não pode ser menor que 0'
      ],
      grade: {
        domEscFor: 0,
        propIntervencao: 0,
        conMecLing: 0,
        argumentacao: 0,
        atencaoTema: 0
      }
    };
  },
  methods: {
    ...mapActions([
      'postEssayCorrection'
    ]),
    submit() {
      let essay = this.$route.params.essay

      essay.doc.redacted = this.editor.view.docView.dom.innerText
      essay.doc.formated = this.editor.view.docView.dom.innerHTML
      essay.doc.corrected = true
      essay.doc.correctedDate = new Date().toISOString()

      debugger

      essay.grades = {
        T1: Number(this.grade.domEscFor),
        T2: Number(this.grade.propIntervencao),
        T3: Number(this.grade.conMecLing),
        T4: Number(this.grade.argumentacao),
        T5: Number(this.grade.atencaoTema),
        T:  Number(this.grade.domEscFor) + Number(this.grade.propIntervencao) + Number(this.grade.conMecLing) + Number(this.grade.argumentacao) + Number(this.grade.atencaoTema)
      }

      this.postEssayCorrection(essay)
    }
  },
  beforeMount() {
    let essay = this.$route.params.essay ? this.$route.params.essay : null

    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new Strike(),
        new CodeBlock(),
        new Underline(),
        new HorizontalRule(),
        new History(),
      ],
      content: essay ? essay.doc.essay : 'Redação não encontrada',
      onUpdate: ({ getJSON }) => {
          this.redacted = getJSON().text
        },
    });

    this.theme = essay.doc.theme
    this.title = essay.doc.title
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>