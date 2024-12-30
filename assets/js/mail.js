
    window.onload = function() {
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const apiKey = process.env.EMAIL_JS_API_KEY
            const templateId = process.env.TEMPLATE_KEY
            const serviceId = process.env.SERVICE_KEY
            emailjs.sendForm(serviceId, templateId, this,apiKey)
                         .then(() => {
                           $('#alert-sucess').show();
                         }, (error) => {
                           $('#alert-danger').show();
                      });

        });
    }
