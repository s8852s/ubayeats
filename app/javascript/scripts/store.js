import Rails from '@rails/ujs';

document.addEventListener('turbolinks:load', function(){
  let myLat, myLng, myLatLng, loc;
  let canSubmit = false

  function delayOpenSubmit() {
    setTimeout(() => {
      Rails.enableElement(document.querySelector('input[type="submit"]'))
    }, 500);
  }
  if (document.querySelector('.store_profiles.new')){
    const submitBtn = document.querySelector('.btn-submit')

    window.initMap = () => {
      const input = document.getElementById("store_profile_store_name");
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.setFields([
        "address_components",
        "place_id",
        "name"
      ]);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = []
        place.address_components.map((item) => {
          address.push(item.long_name)
        })
        document.getElementById('store_profile_store_address').value = address.reverse().reduce((a, b) => a + b)
        document.getElementById('store_profile_store_name').value = place.name
        document.getElementById('place-id').value = place.place_id;
      })
    }

    document.querySelector('#new_store_profile').addEventListener('submit', function(e) {
      if (!canSubmit) {
        e.preventDefault()
        delayOpenSubmit()

        const name = document.getElementById("store_profile_store_name").value;
        if (name.length === 0) {
          return false
        }
        
        const address = document.getElementById('store_profile_store_address').value
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if ( status !== 'OK' ) {
            alert("請填寫正確店家地址！");
            return ;
          }

          loc = JSON.stringify(results[0].geometry.location)
          myLatLng = JSON.parse(loc)
          myLat = JSON.parse(loc).lat
          myLng = JSON.parse(loc).lng
          document.getElementById('latitude').value = myLat;
          document.getElementById('longitude').value = myLng;
          const placeId = document.getElementById('place-id')
          if (placeId.value === ''){
            placeId.value = results[0].place_id;
          }
          canSubmit = true
          Rails.enableElement(document.querySelector('input[type="submit"]'))
          document.querySelector('#new_store_profile').submit()  
        })
      } else {
        // real submit
        submitBtn.disabled = true
        submitBtn.value = '註冊中...'
        canSubmit = false
        return true
      }
    })
  }
  if (document.querySelector('.store_profiles.show')){
    document.querySelector('.cart-icon').remove()
  }
})
