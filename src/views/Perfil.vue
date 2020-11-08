<template>
  <v-container>
    <v-row align="center">
      <v-col
        class="text-h4"
        align-self="center">
        Olá, seja bem vindo!
        {{ getUser.email }}
      </v-col>
    </v-row>
    <v-row v-if="userType == 'aluno'">
      <v-col cols="6">
        <v-layout class="d-flex">
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
            :key="'stat: ' + index">
            <v-card-text  class="font-weight-bold text-h5">
              <v-icon color="green">mdi-check</v-icon> 12
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              Redações Corrigidas
            </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
            :key="'stat: ' + index">
            <v-card-text  class="font-weight-bold text-h5">
              <v-icon color="green">mdi-check</v-icon> 12
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              Redações Corrigidas
            </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
            :key="'stat: ' + index">
            <v-card-text  class="font-weight-bold text-h5">
              <v-icon color="green">mdi-check</v-icon> 12
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              Redações Corrigidas
            </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
            :key="'stat: ' + index">
            <v-card-text  class="font-weight-bold text-h5">
              <v-icon color="green">mdi-check</v-icon> 12
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              Redações Corrigidas
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-col>
      <v-col 
        cols="6">
        <v-list three-line>
          <template v-for="(redacao, index) in redacoes">
            <v-list-item :key="'redação: ' + index">
              <v-list-item-content>
                <v-list-item-title v-text="redacao.titulo"></v-list-item-title>
                <v-list-item-subtitle v-text="redacao.tema"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>
                  {{ redacao.corrigido ? redacao.dataCorrecao : redacao.dataEnvio }}
                </v-list-item-action-text>

                <v-icon v-if="redacao.corrigido"
                  color="green">
                  mdi-check
                </v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="'divider: ' + index" ></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-else-if="userType == 'professor'"></v-row>
    <v-row v-else-if="userType == 'administrador'"></v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      redacoes: [],
      
    }
  },
  methods: {

  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  beforeMount() {
    this.redacoes = [
      { 
        titulo: 'Aliquip irure aliqua pariatur dolore voluptate in Lorem Lorem Lorem.',
        tema: 'TEMA PRÉ-SELECIONADO 1',
        texto: 'Mollit eu excepteur qui ea labore in labore proident incididunt consequat sit aute ullamco. Incididunt velit deserunt minim nisi et ex incididunt. Nisi quis tempor tempor velit quis reprehenderit id. Nisi ipsum sit dolor enim duis nulla commodo fugiat.',
        corrigido: false,
        dataCorrecao: null,
        tipoCorrecao: null,
        nota: null,
        dataEnvio: new Date().toISOString().substr(0, 16).replace('T', ' ')
       },
      { 
        titulo: 'Duis irure in mollit eiusmod labore ullamco mollit officia ullamco.',
        tema: 'TEMA PRÉ-SELECIONADO 2',
        texto: 'Est aliquip Lorem ut consequat incididunt consectetur laborum enim sunt ad cupidatat ipsum pariatur. Consectetur nisi qui cupidatat officia. Culpa amet Lorem elit commodo. Aliqua consequat voluptate non amet cupidatat nisi. Consectetur incididunt occaecat fugiat amet consectetur elit laborum.',
        corrigido: true,
        dataCorrecao: new Date().toISOString().substr(0, 16).replace('T', ' '),
        tipoCorrecao: 1,
        nota: 7.6,
        dataEnvio: new Date().toISOString().substr(0, 16).replace('T', ' ')
       },
      { 
        titulo: 'Ea cupidatat non anim nostrud nisi veniam.',
        tema: 'TEMA PRÉ-SELECIONADO 3',
        texto: 'Aliquip incididunt aliquip minim nulla ipsum ad. Eiusmod adipisicing exercitation esse incididunt sunt consequat. Occaecat officia occaecat dolore magna quis sit anim sunt dolor incididunt esse. Exercitation in velit id et dolor occaecat mollit. Mollit aute reprehenderit laborum mollit dolore eu consequat dolore eiusmod consectetur proident.',
        corrigido: false,
        dataCorrecao: null,
        tipoCorrecao: null,
        nota: null,
        dataEnvio: new Date().toISOString().substr(0, 16).replace('T', ' ')
       },
      { 
        titulo: 'Do officia consequat sint Lorem adipisicing.',
        tema: 'TEMA PRÉ-SELECIONADO 4',
        texto: 'Commodo magna et labore sit. Dolor dolor anim cillum fugiat exercitation dolor mollit sint ad Lorem esse. Mollit cupidatat irure est enim. Fugiat fugiat Lorem cillum dolor veniam duis officia ullamco voluptate nulla. Mollit laborum sint id incididunt Lorem incididunt deserunt laborum minim cupidatat.',
        corrigido: true,
        dataCorrecao: new Date().toISOString().substr(0, 16).replace('T', ' '),
        tipoCorrecao: 2,
        nota: 9.1,
        dataEnvio: new Date().toISOString().substr(0, 16).replace('T', ' ')
       },
      { 
        titulo: 'Amet consequat pariatur commodo quis ut enim aliqua ea est est excepteur ad.',
        tema: 'TEMA PRÉ-SELECIONADO 5',
        texto: 'Nostrud consectetur et Lorem quis voluptate occaecat minim. Magna ex tempor anim dolore sint magna consectetur officia eu. Cillum nostrud dolor magna non consectetur pariatur amet nulla irure labore nulla exercitation aute nostrud. Ut id ad aliquip aute excepteur irure. Adipisicing ad fugiat irure eiusmod. Ex sunt pariatur excepteur consequat exercitation mollit irure laboris. Mollit proident aliqua esse eu ipsum dolor exercitation officia nisi magna proident.',
        corrigido: true,
        dataCorrecao: new Date().toISOString().substr(0, 16).replace('T', ' '),
        tipoCorrecao: 1,
        nota: 0.3,
        dataEnvio: new Date().toISOString().substr(0, 16).replace('T', ' ')
       }
    ]
  },
  mounted() {

  }
}
</script>

<style>

</style>