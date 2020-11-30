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
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              {{ slide }} Slide
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <v-row>
        <v-col style="text-align: center;" cols="12"><h1>Quem somos</h1></v-col>
      </v-row>
      <v-row class="blog">
        <v-col 
          class="calendario"
          align-self="cemter" cols="6">
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
          <v-sheet height="600">
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
        <v-col style="text-align: center;"  align-self="center" cols="6">
          <v-list three-line>
            <template v-for="(post, index) in posts">
              <v-list-item :key="'redação: ' + index">
                <v-list-item-content>
                  <v-list-item-title v-text="posts.titulo"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="posts.tema"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text>
                    {{
                      posts.corrigido ? posts.dataCorrecao : posts.dataEnvio
                    }}
                  </v-list-item-action-text>

                  <v-icon v-if="posts.corrigido" color="green">
                    mdi-check
                  </v-icon>
                </v-list-item-action>
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
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
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
    },
    blogPosts() {
      debugger
      return this.getBlogPosts
    }
  },
  components: {
  },
  mounted() {
    debugger
    this.posts = this.getBlogPosts
  }
}
</script>
