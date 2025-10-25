function setCard(projectName, iconKey) {
  $(`#card${projectName}_2`).append(
    `<i class="devicon-${iconKey}-plain" style="font-size:auto;"></i>`
  );
}

$(document).ready(function () {
  const gitAccounts = ['tristanblc', 'triblanc'];
  const repoCache = [];
  const $testContainer = $('#test');

  // Map GitHub language to Devicon
  function mapLanguageToIcon(lang) {
    if (!lang) return null;
    switch (lang.toLowerCase()) {
      case 'c#': return 'csharp';
      case 'css': return 'css3';
      case 'html': return 'html5';
      case 'dockerfile': return 'docker';
      case 'shell': return 'bash';
      case 'twig': return 'symfony';
      case 'javascript': return 'javascript';
      case 'typescript': return 'typescript';
      case 'python': return 'python';
      case 'java': return 'java';
      case 'php': return 'php';
      default: return null;
    }
  }

 // Create HTML for a project accordion card (clean version)
function createProjectCard(repo) {
  const description = repo.description || 'Aucune description disponible pour ce projet.';
  const repoName = repo.name;
  const avatarUrl = repo.owner?.avatar_url || 'https://via.placeholder.com/80';
  const repoUrl = repo.html_url;

  return `
    <div class="card my-3 shadow-sm border-0">
      <div class="card-header bg-light d-flex align-items-center">
        <img src="${avatarUrl}" 
             alt="${repo.owner?.login || 'Auteur'}" 
             class="rounded-circle me-3 border" 
             style="width:45px; height:45px;">
        <h5 class="mb-0 text-dark fw-semibold">${repoName}</h5>
      </div>

      <div class="card-body p-0">
        <div class="accordion" id="accordion${repoName}">
          <div class="accordion-item border-0">
            <h2 class="accordion-header" id="heading${repoName}">
              <button class="accordion-button collapsed bg-white text-dark fw-semibold" 
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse${repoName}"
                      aria-expanded="false"
                      aria-controls="collapse${repoName}">
                Voir les détails du projet
              </button>
            </h2>

            <div id="collapse${repoName}" 
                 class="accordion-collapse collapse" 
                 aria-labelledby="heading${repoName}" 
                 data-bs-parent="#accordion${repoName}">
              <div class="accordion-body bg-light">

                <div class="container">
                  <div class="row g-3">
                    
                    <!-- 🧾 Project Information -->
                    <div class="col-md-6">
                      <div class="card border-0 h-100">
                        <div class="card-body" id="card${repoName}">
                          <h6 class="card-subtitle mb-2 text-muted">Présentation du projet</h6>
                          <p class="card-text">${description}</p>
                          <a href="${repoUrl}" 
                             target="_blank" 
                             class="btn btn-outline-primary mt-2">
                             🔗 Consulter sur GitHub
                          </a>
                        </div>
                      </div>
                    </div>

                    <!-- 💻 Programming Languages -->
                    <div class="col-md-6">
                      <div class="card border-0 h-100">
                        <div class="card-body" id="card${repoName}_2">
                          <h6 class="card-subtitle mb-2 text-muted">Technologies utilisées</h6>
                          <div class="mt-2 d-flex flex-wrap gap-3"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div> <!-- end accordion-item -->
        </div> <!-- end accordion -->
      </div> <!-- end card-body -->
    </div> <!-- end main card -->
  `;
}


  // Fetch all repos for one user
  function fetchRepos(username) {
    $.ajax({
      url: `https://api.github.com/users/${username}/repos`,
      method: 'GET',
      dataType: 'json',
      success: function (repos) {
        repoCache.push(...repos);
        processRepos(); // process when each user is loaded
      },
      error: function () {
        $testContainer.append(
          `<div class="alert alert-danger" role="alert">
            Problème de chargement des projets pour ${username}
          </div>`
        );
      },
    });
  }

  // Remove duplicates and render repos
  function processRepos() {
    // Ensure we only process when all accounts are loaded
    if (repoCache.length < gitAccounts.length * 5) return; // crude wait (can be improved)

    // Remove duplicates by ID
    const uniqueRepos = repoCache.filter(
      (repo, index, self) => index === self.findIndex(r => r.id === repo.id)
    );

    // Sort alphabetically
    uniqueRepos.sort((a, b) => a.name.localeCompare(b.name));

    // Render
    $testContainer.empty();
    uniqueRepos.forEach((repo) => {
      $testContainer.append(createProjectCard(repo));
      fetchLanguages(repo.owner.login, repo.name);
      fetchTags(repo.full_name, repo.name);
    });
  }

  // Fetch languages for a repo (no duplicate icons)
function fetchLanguages(username, repoName) {
  $.ajax({
    url: `https://api.github.com/repos/${username}/${repoName}/languages`,
    method: 'GET',
    dataType: 'json',
    success: function (languages) {
      // ✅ Remove duplicate keys (ensure unique)
      const uniqueLanguages = [...new Set(Object.keys(languages))];

      const $langCard = $(`#card${repoName}_2`);

      // ✅ Remove any existing icons to avoid duplicates on re-render
      $langCard.find('.lang-icon').remove();

      uniqueLanguages.forEach((lang) => {
        const iconKey = mapLanguageToIcon(lang);
        if (iconKey && !$langCard.find(`.devicon-${iconKey}-plain`).length) {
          // ✅ Add unique class for safety
          $langCard.append(
            `<i class="devicon-${iconKey}-plain lang-icon" style="font-size:auto;"></i>`
          );
        }
      });
    },
    error: function () {
      $testContainer.append(
        '<div class="alert alert-danger" role="alert">Erreur de chargement des langages</div>'
      );
    },
  });
}


 function fetchTags(fullName, repoName) {
  $.ajax({
    url: `https://api.github.com/repos/${fullName}/tags`,
    method: 'GET',
    dataType: 'json',
    success: function (tags) {
      if (tags.length > 0) {
        const downloadUrl = tags[0].zipball_url;
        const $card = $(`#card${repoName}`);

        // ✅ Remove any existing download buttons first
        $card.find('.download-btn').remove();

        // ✅ Append only one download link, now with class 'download-btn'
        $card.append(
          `<a href="${downloadUrl}" class="btn btn-outline-primary mt-2 download-btn">Télécharger le projet 📲</a>`
        );
      }
    },
    error: function () {
      console.error(`Erreur lors du chargement des tags pour ${fullName}`);
    },
  });
}



  // Load all accounts together
  gitAccounts.forEach(fetchRepos);
});

