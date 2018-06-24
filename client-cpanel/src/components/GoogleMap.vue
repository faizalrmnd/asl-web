<template>
    <div class="google-map" :id="mapName"></div>
</template>

<script>
export default {
  props: ['name','latitude','longitude'],
  data () {
    return {
      mapName: this.name + "-map"
    }
  },
  methods: {
      setGoogleMap () {
        let self = this
        let latitude;
        let longitude;

        if (!this.latitude || !this.longitude || this.latitude === '' || this.longitude === '') {
            latitude = -6.17511
            longitude = 106.86503949999997
        } else {
            latitude = this.latitude
            longitude = this.longitude
        }

        const element = document.getElementById(this.mapName)
        const options = {
        zoom: 16,
        // centered ke jakarta
        center: new google.maps.LatLng(latitude, longitude)
        }
        const map = new google.maps.Map(element, options)
        const position = new google.maps.LatLng(latitude, longitude)
        const marker = new google.maps.Marker({ 
            position,
            map
        })

        map.addListener('click', function(e) {
            self.placeMarkerAndPanTo(e.latLng);
        })

        // Ini contoh kalau mau multiple marker
        // this.bounds = new google.maps.LatLngBounds();
        // const element = document.getElementById(this.mapName)
        // const mapCentre = this.markerCoordinates[0]
        // const options = {
        //   center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
        // }
        // this.map = new google.maps.Map(element, options);
        // this.markerCoordinates.forEach((coord) => {
        //   const position = new google.maps.LatLng(coord.latitude, coord.longitude);
        //   const marker = new google.maps.Marker({ 
        //     position,
        //     map: this.map
        //   });
        // this.markers.push(marker)
        //   this.map.fitBounds(this.bounds.extend(position))
        // })
      },

      placeMarkerAndPanTo (latLng) {
        let self = this
        const element = document.getElementById(this.mapName)
        const options = {
        zoom: 16
        }
        const map = new google.maps.Map(element, options)
        const marker = new google.maps.Marker({
            position: latLng,
            map
        })

        map.addListener('click', function(e) {
            self.placeMarkerAndPanTo(e.latLng);
        })

        let geocoder = new google.maps.Geocoder()
        geocoder.geocode( { 'location': latLng}, function(results, status) {
            if (status == 'OK') {
                self.$emit('emit-place', results[0])
            } else {
                console.log('Geocode was not successful for the following reason: ' + status)
            }
        })

        map.panTo(latLng)
      }
  },
  watch : {
      latitude () {
        this.setGoogleMap()
        
      }
  },
  mounted () {
   this.setGoogleMap()

  }
}
</script>

<style>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
