<template>
  <div>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover>
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="imgs[i].src"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
          >
           <div class="display-3">
            {{ slide }}
           </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <v-row>
        <v-col style="text-align: center;" cols="12"><h1>Quem somos</h1></v-col>
        <v-divider></v-divider>
        <v-col cols="10" offset="1">Bem vindo ao Correct! Esta ferramenta tem o objetivo de incentivar a prática de redações, inicialmente do modelo ENEM, oferecendo um site aos vestibulandos que facilite o acesso a correções de qualidade por professores capacitados bem como correções rápidas e confiáveis da nossa inteligência artifical que irá evoluir juntamente com os alunos!</v-col>
      </v-row>
      <v-row class="blog">
        <v-col 
          class="calendario"
          cols="6">
          <v-sheet height="64">
            <v-toolbar
              flat
            >
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Hoje
              </v-btn>
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="prev"
              >
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="next"
              >
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="450">
            <v-calendar
              locale="pt-br"
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.color"
                  dark
                >
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
        <v-col style="text-align: center;" cols="6">
          <v-list three-line>
            <template v-for="(post, index) in getBlogPosts">
              <v-list-item :key="'post: ' + index">
                <v-list-item-content>
                  <v-list-item-title v-text="post.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="post.text"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider :key="'divider: ' + index"></v-divider>
            </template>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      slides: [
        'Bem-vindos ao Correct!',
        'Aprimore sua escrita conosco',
        'Faça parte do nosso time de corretores',
      ],
      imgs: [
          {
            src: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=756&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
          },
      ],
      focus: '',
      type: 'month',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [
        {
          name: 'Enem 2020',
          start: '2021-01-17',
          color: 'blue',
          details: 'Primeiro dia'
        },
        {
          name: 'Enem 2020',
          start: '2021-01-24',
          color: 'blue',
          details: 'Segundo dia'
        },
        {
          name: 'Enem 2020 - Digital',
          start: '2021-01-31',
          color: 'indigo',
          details: 'Primeiro dia'
        },
        {
          name: 'Enem 2020 - Digital',
          start: '2021-02-07',
          color: 'indigo',
          details: 'Segundo dia'
        },
        {
          name: 'Unesp',
          start: '2021-01-30',
          color: 'deep-purple',
          details: 'Primeira fase - Primeiro dia'
        },
        {
          name: 'Unesp',
          start: '2021-01-31',
          color: 'deep-purple',
          details: 'Primeira fase - Segundo dia'
        },
        {
          name: 'Unesp',
          start: '2021-02-28',
          color: 'deep-purple',
          details: 'Segunda fase'
        },
        {
          name: 'Unicamp',
          start: '2021-01-06',
          color: 'cyan',
          details: 'Primeira fase - Primeiro dia'
        },
        {
          name: 'Unicamp',
          start: '2021-01-07',
          color: 'cyan',
          details: 'Primeira fase - Segundo dia'
        },
        {
          name: 'Unicamp',
          start: '2021-02-07',
          color: 'cyan',
          details: 'Segunda fase - Primeiro dia'
        },
        {
          name: 'Unicamp',
          start: '2021-02-08',
          color: 'cyan',
          details: 'Segunda fase - Segundo dia'
        },
        {
          name: 'Fuvest',
          start: '2021-01-10',
          color: 'green',
          details: 'Primeira fase'
        },
        {
          name: 'Fuvest',
          start: '2021-02-21',
          color: 'green',
          details: 'Segunda fase - Primeiro dia'
        },
        {
          name: 'Fuvest',
          start: '2021-02-22',
          color: 'green',
          details: 'Segunda fase - Segundo dia'
        },
      ],
    }
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  computed: {
    ...mapGetters([
      'getBlogPosts'
    ]),
  },
  methods: {
    ...mapActions([
      'fetchBlogPosts'
    ]),
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    }
  },
  components: {
  },
  beforeMount() {
    this.fetchBlogPosts()
  }
}
</script>
