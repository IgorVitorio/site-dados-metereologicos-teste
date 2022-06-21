window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

/* variável que guarda valor da API key*/
let appId = 'f0e8e97d2285cd4812de870ddb91e6c2';

/*Função de chamada e tratamento de resposta da API */
function searchWeather(searchTerm){
    /*https://api.openweathermap.org/data/2.5/weather?q={NOME DA CIDADE}&lang=(CÓDIGO DO PAÍS PARA ESCOLHER LINGUAGEM)&appid={API key}&units=(UNIDADE DE TEMPERATURA; default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.)*/
    fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${searchTerm}&lang=pt_br&appid=${appId}&units=metric`).then(result => {
        return result.json();
    }).then(result =>{
        init(result);
    })
}

/*Função que especifíca o que acontece a partir da respota da API sobre o tempo atual da cidade pesquisada*/
function init(resultFromServer){
    switch (resultFromServer.weather[0].main){

        case 'Clear':
            document.getElementById('weatherContainer').style.backgroundImage = 'url("imagens/clear.jpg")';
            break;

        case 'Clouds':
            document.getElementById('weatherContainer').style.backgroundImage = 'url("imagens/cloudy.jpg")';
            break;

        case 'Rain':
            document.getElementById('weatherContainer').style.backgroundImage = 'url("imagens/rain.jpg")';
            break;
        case 'Drizzle':
            document.getElementById('weatherContainer').style.backgroundImage = 'url("imagens/rain.jpg")';
            break;
        case 'Mist':
            document.getElementById('weatherContainer').style.backgroundImage = 'url("imagens/rain.jpg")';
            break;
            
        case 'Thunderstorm':
            document.getElementById('weatherContainer').style.backgroundImage = 'url("imagens/storm.jpg")';
            break;
        
        case 'Snow':
            document.getElementById('weatherContainer').style.backgroundImage = 'url("imagens/snow.jpg")';
            break;
            
        default:
            document.getElementById('weatherContainer').style.backgroundImage = 'url("imagens/default.jpg")';
            break;
    }
    
    /*Associar variáveis de informação do tempo da cidade com o id da div no HTML*/
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg')

    /*Exibir ícone condizente com o tempo da cidade */
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

    /* Associar a variável com o tempo atual da cidade*/
    let resultDescription = resultFromServer.weather[0].description;

    /*Exibir o resultado sobre o tempo com a primeira letra maiúscula*/
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    /*Exibir a temperatura da cidade pesquisada em graus Celsius*/
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';

    /*Exibir a velocidade do vento da cidade pesquisada em km/h*/
    windSpeedElement.innerHTML = '💨 Velocidade do vento: ' + Math.floor(resultFromServer.wind.speed * 3.60) + ' km/h';

    /*Exibir o nome da cidade*/
    cityHeader.innerHTML = resultFromServer.name;

    /*Exibir o umidade do ar*/
    humidityElement.innerHTML = '🌫️ Umidade do ar: ' + resultFromServer.main.humidity + ' %';

    /*Chamada de função que centraliza a posição do container das informações*/
    setPositionForWeatherInfo();
}

/* Tratar a exibição do container que mostra as informações do tempo */
function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.style.visibility = 'visible';
    let fechar = document.getElementById('fechar');
    fechar.style.visibility = 'visible';
    
    if((document.getElementById('remover1').style.visibility === 'visible') && (document.getElementById('remover2').style.visibility === 'visible')){
        let adicionar = document.getElementById('adicionar');
        adicionar.style.visibility = 'hidden';  
    } else{
    let adicionar = document.getElementById('adicionar');
    adicionar.style.visibility = 'visible';}
    }

/* Tratar o botão de fechar o container */
document.getElementById('fechar').addEventListener('click', () =>{
    if (weatherContainer.style.visibility = 'visible')
    weatherContainer.style.visibility = 'hidden';
    document.getElementById('searchInput').value='';
    let fechar = document.getElementById('fechar');
    fechar.style.visibility = 'hidden'
    let adicionar = document.getElementById('adicionar');
    adicionar.style.visibility = 'hidden';
})

/*Adicionar cidade consultada*/
document.getElementById('adicionar').addEventListener('click', () =>{
    if(document.getElementById('botaoAdd').textContent  === (null || '')){
    document.getElementById('botaoAdd').style.visibility = 'visible';
    document.getElementById('botaoAdd').value = cityHeader.innerHTML;
    document.getElementById('botaoAdd').textContent = cityHeader.innerHTML;
    document.getElementById('searchInput').value ='';
    let remover = document.getElementById('remover1');
    remover.style.visibility = 'visible';
    } else { 
        document.getElementById('botaoAdd2').style.visibility = 'visible';
        document.getElementById('botaoAdd2').value = cityHeader.innerHTML;
        document.getElementById('botaoAdd2').textContent = cityHeader.innerHTML;
        document.getElementById('searchInput').value ='';
        adicionar.style.visibility = 'hidden';
        let remover2 = document.getElementById('remover2');
        remover2.style.visibility = 'visible';
    }
})

/*Remover cidade adicionada*/
document.getElementById('remover1').addEventListener('click', () =>{
    document.getElementById('botaoAdd').style.visibility = 'hidden';
    document.getElementById('remover1').style.visibility = 'hidden';
    document.getElementById('botaoAdd').value = null;
    document.getElementById('botaoAdd').textContent = null;
})
document.getElementById('remover2').addEventListener('click', () =>{
    document.getElementById('botaoAdd2').style.visibility = 'hidden';
    document.getElementById('remover2').style.visibility = 'hidden';
    document.getElementById('adicionar').style.visibility = 'visible';
    document.getElementById('botaoAdd2').value = null;
    document.getElementById('botaoAdd2').textContent = null;
})
/* Quando clicar no botão "pesquisar", pegar o valor do input e colocar na função searchWeather como o parâmetro {searchTerm} a fim de pesquisar a cidade*/
document.getElementById('searchBtn').addEventListener('click', () =>{
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm === "salvador" || searchTerm === "Salvador" )
        searchWeather(searchTerm + ',br')
    else if(searchTerm)
        searchWeather(searchTerm);
    else if(('searchInput').value == null)
        window.alert('Digite o nome da cidade');

})



document.getElementById('botaoCidade1').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade1').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade2').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade2').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade3').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade3').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade4').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade4').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade5').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade5').value;
    if(searchTerm === "salvador" || searchTerm === "Salvador" )
        searchWeather(searchTerm + ',br')
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade6').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade6').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade7').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade7').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade8').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade8').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade9').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade9').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade10').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade10').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade11').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade11').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade12').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade12').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade13').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade13').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade14').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade14').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade15').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade15').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade16').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade16').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade17').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade17').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade18').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade18').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade19').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade19').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade20').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade20').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade21').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade21').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade22').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade22').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade23').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade23').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade24').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade24').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade25').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade25').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade26').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade26').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade27').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade27').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})

document.getElementById('botaoCidade28').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade28').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade29').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade29').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade30').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade30').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade31').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade31').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade32').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade32').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade33').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade33').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade34').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade34').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade35').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade35').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade36').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade36').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade37').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade37').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade38').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade38').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade39').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade39').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade40').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade40').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade41').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade41').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade42').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade42').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade43').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade43').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoCidade44').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoCidade44').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoAdd').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoAdd').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})
document.getElementById('botaoAdd2').addEventListener('click', () =>{
    let searchTerm = document.getElementById('botaoAdd2').value;
    if(searchTerm)
        searchWeather(searchTerm);
    document.getElementById('searchInput').value='';
})


/* Aceitar a tecla ENTER para envio do input */
document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        var btn = document.querySelector("#searchBtn");
      
      btn.click();
    
    }
  });