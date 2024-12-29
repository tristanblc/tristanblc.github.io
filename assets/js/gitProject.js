$(document).ready(function () {

    var resultat = [];
    $.ajax({
      url: "https://api.github.com/users/tristanblc/repos",
      method: "GET",
      dataType: "json",
      success: function(res) {
        for(var i = 0;i < res.length;i++){
          const json = JSON.parse(JSON.stringify(res[i]))
          if(json.description == null){
            json.description = "Aucune description";
          }   
       
        
          $('#test').append('  <div class="swiper-slide m-5 pb-5"><div class="card " data-aos="fade-up" data-aos-delay="300" style="width: 25rem;"> <img src="/assets/img/projets.jpg"  class="card-img-top" alt="..." style="width: 15rem;margin-left: auto;margin-right: auto;"><div class="card-body" id="'+json.name+'" style="margin-right: auto;margin-left: auto;"><h5 class="card-title">'+json.name+'</h5><em>'+json.description+'</em></p><a href="'+json.svn_url+'" class="btn btn-primary">Lien sur github 🌐</a><br></div></div></div>'); 
        
            $.ajax({
            url : "https://api.github.com/repos/"+json.full_name+"/tags",
            method: "GET",
            dataType: "json",
             success: function(resultat) {
                      
                          const jsonProject = JSON.parse(JSON.stringify(resultat))	       	   
                          $('div[id="'+json.name+'"]').append('<br><a href="'+jsonProject[0].zipball_url+'" class="btn btn-primary" style="margin-right">Télécharger le projet 📲</a>');
             }
          });;
      


        i = i+1;
        
       
      }
      $('#test').addClass("slick");
       
      $('.slick').slick({
        slidesToShow: i ,
        slidesToScroll: i - 5,
        arrows: true,
        autoplay: true,
    
        responsive: [
        {
          breakpoint: 900,
          settings: {
          slidesToShow: 2,
          slidesToScroll: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
          slidesToShow: 1,
          slidesToScroll: 1
          }
        }
        ]
      });
       
  
      
      }
      
      });

  
  });
