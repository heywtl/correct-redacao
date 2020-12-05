<template>
  <v-container>
    <v-row align="center">
      <v-col class="text-h4" align-self="center">
        Olá, seja bem vindo
        {{ getUser.email }}
      </v-col>
    </v-row>
    <v-row v-if= isStudent>
      <v-col cols="6">
        <v-layout class="d-flex">
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-file-send-outline</v-icon> 12
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Redações enviadas </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-robot</v-icon> 710
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Média IA </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-human-greeting</v-icon> 700
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Média corretor </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-check</v-icon> 630
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Última nota </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-file-check-outline</v-icon> 11
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Redações Corrigidas </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-file-clock-outline</v-icon> 1
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Correções em aberto </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-trophy-variant-outline</v-icon> 900
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Maior nota </v-card-actions>
          </v-card>
        </v-layout>
      </v-col>
      <v-col cols="6">
        <v-list three-line>
          <template v-for="(redacao, index) in redacoes">
            <v-list-item :key="'redação: ' + index">
              <v-list-item-content>
                <v-list-item-title v-text="redacao.titulo"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="redacao.tema"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>
                  {{
                    redacao.corrigido ? redacao.dataCorrecao : redacao.dataEnvio
                  }}
                </v-list-item-action-text>

                <v-icon v-if="redacao.corrigido" color="green">
                  mdi-check
                </v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="'divider: ' + index"></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>

    <v-row v-else-if = !isStudent>
      <v-col cols="6">
        <v-layout class="d-flex">
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-file-check-outline</v-icon> 4
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Redações Corrigidas </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-scale-balance</v-icon> 0
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Recursos recebidos </v-card-actions>
          </v-card>
          <v-card
            max-width="100px"
            class="mx-auto font-weight-bold text-center"
          >
            <v-card-text class="font-weight-bold text-h5">
              <v-icon color="green">mdi-file-clock-outline</v-icon> 2
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions> Correções em aberto </v-card-actions>
          </v-card>
        </v-layout>
      </v-col>
      <v-col cols="6">
        <v-list three-line>
          <template v-for="(redacao, index) in redacoes">
            <v-list-item 
              :key="'redação: ' + index"
              :to="{ name: 'Correcao', params: { essay: redacao} }">
              <v-list-item-content>
                <v-list-item-title v-text="redacao.doc.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="redacao.doc.theme"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>
                  {{
                    redacao.doc.corrected ? redacao.doc.correctedDate : redacao.doc.submitDate
                  }}
                </v-list-item-action-text>

                <v-icon v-if="redacao.doc.corrected" color="green">
                  mdi-check
                </v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="'divider: ' + index"></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>


    <v-row v-else-if="userType == 'administrador'"></v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      redacoes: [],
    };
  },
  methods: {
    ...mapActions([
        'fetchEssayList'
      ]),
  },
  computed: {
    ...mapGetters([
        'getUser',
        'isStudent',
        'getEssays'
      ]),
  },
  beforeMount() {
    this.fetchEssayList()
      .then(() => {
        if (!this.isStudent)
          this.redacoes = this.getEssays != null ? this.getEssays.filter(x => !x.doc.corrected) : []
        else
          this.redacoes = this.getEssays.filter(x => x.doc.email == this.getUser.email)
      })
  },
  mounted() {
   

  },
};
</script>

<style>
</style>