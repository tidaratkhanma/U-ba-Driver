<template>
  <div class="calling">
    <section class="hero is-fullheight"  style="background-color : #666666">
      <div class="hero">
      <br>
       <div class="container">
          <div class="columns is-centered">
            <div class="column is-6 box">
              <div class="columns">
                <gmap-map :center="center" :zoom="8" style="width: 500px; height: 300px">
                  <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="false" @click="center=m.position">
                  </gmap-marker>
                </gmap-map>
              </div>
             <div class="columns">
                <div class="column is-half is-offset-one-quarter" >
                  <center>
                    <router-link to="/sending">
                      <button type="button" name="button" class="button is-large is-success">เริ่มคิดเงิน</button>
                    </router-link>
                  </center>
                </div>
              </div>
           </div>
         </div>
       </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAdTt1CEiELNaqxvQl7sgeHnpy9VskiosY'
  }
})
export default {
  data () {
    return {
      msg: 'Header',
      center: {lat: 13.754, lng: 100.5014},
      markers: [{
        position: {lat: 13.754, lng: 100.5014}
      }]
    }
  },
  computed: {
    ...mapGetters([
      'lat',
      'long',
      'caller',
      'wait'
    ])
  },
  mounted () {
    this.center = {
      lat: this.caller.Latitude,
      lng: this.caller.Longitude
    }
    this.markers = [{
      position: {
        lat: this.caller.Latitude,
        lng: this.caller.Longitude
      }
    },
    {
      position: {
        lat: this.lat,
        lng: this.long
      }
    }]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
