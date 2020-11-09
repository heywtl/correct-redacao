<template>
  <v-container>
      <v-row align="center">
      <v-col
        class="text-h4"
        align-self="center">
        Corretor
      </v-col>
    </v-row>
    <v-layout align-center justify-center>
        <v-row align="center">
            <v-col>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
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

          <button @click="commands.horizontal_rule"> <v-icon>mdi-minus</v-icon> </button>

          <button @click="commands.undo"> <v-icon>mdi-undo</v-icon> </button>

          <button @click="commands.redo"> <v-icon>mdi-redo</v-icon> </button>
        </div>
      </editor-menu-bar>
            </v-col>
        </v-row>
        <div></div>
        <v-row align="center">
            <v-col><editor-content :editor="editor" /></v-col>
      
        </v-row>
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