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
       
        
          $('#test').append(' <div class="accordion-item"><h2 class="accordion-header" id="'+json.name+'"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+json.name+'" aria-expanded="false" aria-controls="collapse'+json.name+'">'+json.name+'</button></h2><div id="collapse'+json.name+'" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#test"><div class="accordion-body"><strong>'+json.description+'</strong><h5 class="card-title">'+json.name+'</h5><em>'+json.description+'</em></p><a href="'+json.svn_url+'" class="btn btn-primary">Lien sur github 🌐</a><br></div></div></div></div></div></div>')
            
            $.ajax({
            url : "https://api.github.com/repos/"+json.full_name+"",
            method: "GET",
            dataType: "json",
             success: function(resultat) {
                      
                          const jsonProject = JSON.parse(JSON.stringify(resultat))	
                          print(jsonProject[0]["languages"])    	   
                          $('div[id="collapse'+json.name+'"]').append('<br><a href="'+jsonProject[0].zipball_url+'" class="btn btn-primary" style="margin-right">Télécharger le projet 📲</a> <br>');
           
              
              
           }
          });
      

        i = i+1;
        
       
      }
     
       
  
      
      }
      
      });

  
  });
