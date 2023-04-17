
  let currentPage = 1;

  function renderPeopleList(data) {
    let peopleList = document.getElementById('people-list'); 
  
    peopleList.innerHTML = '';

    for (let i = 0; i < data.results.length; i++) {
      let li = document.createElement('li');
      let link = document.createElement('a');
      link.href = '#';
      link.textContent = data.results[i].name;
      li.addEventListener('click', function() {
        link.onclick();
      });
      link.onclick = function() {
        showPersonDetails(data.results[i]);
        return false; 
      };

      link.classList.add('to-link');
      li.classList.add('to-li');

      li.addEventListener('mouseover', function () {
        link.style.color = 'antiquewhite';
      });
      li.addEventListener('mouseout', function () {
        link.style.color = 'black';
      });

      li.appendChild(link);
      peopleList.appendChild(li);
    }
  }
   
  
  function getPrevPage() {
    if (currentPage > 1) {
      currentPage--;
      getPeople(currentPage);
    }
  }
  function getNextPage() {
    currentPage++;
    getPeople(currentPage);
  }
  getPeople();
 
  
  function showPersonDetails(person) {
    
      let detailsContainer = document.getElementById('person-details');
    
      detailsContainer.classList.add('person-details');

      detailsContainer.innerHTML = `
        <table>
          <tr>
            <td>Имя:</td>
            <td>${person.name}</td>
          </tr>
          <tr>
            <td>Год рождения:</td>
            <td>${person.birth_year}</td>
          </tr>
          <tr>
            <td>Пол:</td>
            <td>${person.gender}</td>
          </tr>
          <tr>
            <td>Фильмы:</td>
            <td>
              <ul>
                ${person.films.map(film => `<li>${film}</li>`).join('')}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Родная планета:</td>
            <td>${person.homeworld}</td>
          </tr>
          <tr>
            <td>Подвид:</td>
            <td>${person.species}</td>
          </tr>
        </table>
      `;
     
      let backButton = document.createElement('button');
      backButton.textContent = 'Back to the list';
      backButton.classList.add('back-butt');
      backButton.onclick = function() {
        document.getElementById('people-list').style.display = 'block';
        detailsContainer.style.display = 'none';
            return false;
      };

      detailsContainer.appendChild(backButton);
      
      detailsContainer.style.display = 'block'; 
      document.getElementById('people-list').style.display = 'none';

      localStorage.setItem('currentPage', currentPage);
    }
   
    function getPeople(page = 1) {
      let url = `https://swapi.dev/api/people/?page=${page}`;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function() {
        if (this.status == 200) {
          let data = JSON.parse(this.responseText);
          renderPeopleList(data);
          let storedPage = localStorage.getItem('currentPage');
          
          if (storedPage) {
            currentPage = parseInt(storedPage);
          } else {
            currentPage = 1;
          }

          let toBottomButton = document.createElement('button');
          toBottomButton.classList.add('to-bottom'); // добавляем класс to-bottom
          toBottomButton.textContent = 'To Down';
          toBottomButton.style.position = 'fixed';
          toBottomButton.style.right = '40px';
          toBottomButton.style.top = '40px';

          toBottomButton.addEventListener('mouseover', function () {
            toBottomButton.style.color = 'antiquewhite';
          });
          toBottomButton.addEventListener('mouseout', function () {
            toBottomButton.style.color = 'black';
          });

          document.body.appendChild(toBottomButton);
          toBottomButton.addEventListener('click', function() {
            if (page < 9) {
              getPeople(page + 1);
            }
          });
           
          let toTopButton = document.createElement('button');
          toTopButton.classList.add('to-bottom'); // добавляем класс to-bottom
          toTopButton.textContent = 'To Top';
          toTopButton.style.position = 'fixed';
          toTopButton.style.right = '40px';
          toTopButton.style.bottom = '40px';

         toTopButton.addEventListener('mouseover', function () {
          toTopButton.style.color = 'antiquewhite';
          });
          toTopButton.addEventListener('mouseout', function () {
            toTopButton.style.color = 'black';
          });

          document.body.appendChild(toTopButton);
          toTopButton.addEventListener('click', function() {
            if (page <=9) {
              getPeople(page -1);
            }
          });
          
        }
      };
      xhr.send();        
    }
    