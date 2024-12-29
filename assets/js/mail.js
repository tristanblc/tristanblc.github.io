
    window.onload = function() {
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();

            fetch('./assets/json/app.json')
                .then(data =>
                {
                    var token = data["emailjsApiKey"]
                    var template = data["templateKey"]
                    var service = data["serviceKey"]

                    emailjs.sendForm('service_kvlzfvd', 'template_ei2powl', this,'VNhCa88OWBdYf9CHM')
                         .then(() => {
                           $('#alert-sucess').show();
                         }, (error) => {
                           $('#alert-danger').show();
                      });
                })

        });
    }
