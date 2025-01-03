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
       
    
          var string ='<div class="accordion-item">';
          string += '<h2 class="accordion-header justify-content-center" id="'+json.name+'">';
          string +='<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+json.name+'" aria-expanded="false" aria-controls="collapse'+json.name+'">'+json.name+'</button>';
          string +='</h2>';
          string +='<div id="collapse'+json.name+'" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#test">';
          string +='<div class="accordion-body">';
          string += '<div class="container">'
          string += '<div class="row">'
          string  += '      <div class="col-sm-6">';
          string  += '         <br>';
          string  += '        <div class="card">';
          string  += '          <div class="card-body" id="card'+json.name+'">';
          string  += '            <h5 class="card-title">'+json.name+'</h5>';
          string  += '            <p class="card-text">'+json.description+'<p>';
          string  += '            <a href="'+json.svn_url+'" class="card-link btn btn-primary">Lien sur github 🌐</a>';
          string  += '          </div>';
          string  += '          <br>';
          string  += '       </div>'; 
          string  += '      </div>';
          string  += '      <div class="col-sm-6">';
          string  += '      <br>'
          string  += '      <div class="card">';
   
          string  += '          <div class="card-body" id="card'+json.name+'_2">'; 
          string += ' <h5 class="card-title"> Langages de programmation : </h5>';
          string +='<br></br>';
          $.ajax({
            url: "https://api.github.com/repos/tristanblc/"+json.name+"/languages",
            method: "GET",
            dataType: "json",
            success: function(res) {
              
              const jsonProject = JSON.parse(JSON.stringify(res))	
              for (var key in jsonProject){
                $('#card'+json.name+'_2').append('<p class="card-title">'+key+'</p>');
                string  += '';   
              }
              
            },
            error: function (request, status, error) {
              $('#test').append('<div class="alert alert-danger" role="alert">Probleme de chargement des projets</div>')
        
            }
          })

 
          string  += '          </div>';
          string  += '          <br>';
          string  += '       </div>';
          string  += '      </div>';
          string  += '      </div>';
         
          string += '</div>';
            string  += '</div>';
            string  += '</div>';
            string  += '</div>';
            string  += '</div>';
            string  += '</div>';
            $('#test').append(string);



            
            $.ajax({
            url : "https://api.github.com/repos/"+json.full_name+"/tags",
            method: "GET",
            dataType: "json",
             success: function(resultat) {
                      
                          const jsonProject = JSON.parse(JSON.stringify(resultat))	
                              	   
                          $('div[id="card'+json.name+'"]').append('<br><a href="'+jsonProject[0].zipball_url+'" class="btn btn-primary" style="margin-right">Télécharger le projet 📲</a> <br>');
           
              
              
           },
           error: function (request, status, error) {
              $('#test').append('<div class="alert alert-danger" role="alert">Probleme de chargement des projets</div>')
        
           }
          });
      

        i = i+1;
        
       
      }
      
  
      
      },
      error: function (request, status, error) {
        $('#test').append('<div class="alert alert-danger" role="alert">Probleme de chargement des projets</div>')
  
      }
      
      },
      
    );
    
  
  })
  ;
