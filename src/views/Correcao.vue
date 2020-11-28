<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Corrigir Redação</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout align-center justify-center>
              <v-flex xs10 sm10 md10>
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
                <v-col align-self="center"
                  ><editor-content :editor="editor"
                /></v-col>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

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

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
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
      content: "<p>Importar redação do Firebase e exibir aqui</p>",
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>