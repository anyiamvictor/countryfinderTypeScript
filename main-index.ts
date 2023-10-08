interface Country {
  countryFlag: string;
  countryName: string;
  countryFlagAlt: string;
  countryPopulation: number;
  countryRegion: string;
  countryCapital: string;
  countrySubRegion: string;
  countryTopLevelDomain: string;
  countryCurrency: string;
  countryLanguage: string;
  countryBorder: string;
}

//Dark or light theme
const darkMode = document.getElementById('theme_mode');
const imgElement = darkMode?.querySelector("img");
darkMode?.addEventListener('click', () => { // Use an arrow function here
  const body = document.body;
  const searchBar = document.getElementById('search_input');
  const region = document.getElementById('region-select'); 
  searchBar?.classList.toggle('theme');
  region?.classList.toggle('theme');

  darkMode.textContent = darkMode.textContent === `Dark Mode`
    ? `Light Mode` : `Dark Mode`;
  body.classList.toggle("dark-theme");
  if (darkMode.textContent == 'Light Mode') {
    imgElement.src = './white-mode.svg';
    darkMode.prepend(imgElement);
    darkMode.classList.add('theme_mode_light');
  }
  if (darkMode.textContent == 'Dark Mode') {
    imgElement.src = './dark-mode.svg';
    darkMode.prepend(imgElement);
    darkMode.classList.remove('theme_mode_light');
  }
});


// Function to fetch data from the API
async function fetchAllCountryData(): Promise<Country[]> {
  
  try {
     // Show the loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'block';
    }

      //get api data.
    const response = await fetch('https://restcountries.com/v3.1/all');

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data: any[] = await response.json();
     // Hide the loading screen
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }


    return processData(data);
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
}

// Function to process the raw data into an array of Country objects
function processData(data: any[]): Country[] {
  return data.map((obj) => {
    const countryFlag = obj.flags.png;
    const countryFlagAlt = obj.flags.alt;
    const countryName = obj.name.common;
    const countryPopulation = obj.population;
    const countryRegion = obj.region;
    const countryCapital = obj.capital && (obj.capital[0] || obj.capital[1]);
    const countrySubRegion = obj.subregion;
    const countryTopLevelDomain = obj.tld && (obj.tld[0] || obj.tld[0]);
    const countryCurrency = obj.currencies ? obj.currencies[Object.keys(obj.currencies)[0]].name : 'NO CURRENCY AVAILABLE IN API';
    const countryLanguage = obj.languages
      ? obj.languages[Object.keys(obj.languages)[0]]
      : 'No LANGUAGE AVAILABLE';
    const countryBorder = obj.borders;

    return {
      countryFlag,
      countryFlagAlt,
      countryName,
      countryPopulation,
      countryRegion,
      countryCapital,
      countrySubRegion,
      countryTopLevelDomain,
      countryCurrency,
      countryLanguage,
      countryBorder,
    };
  });
}


// Function to fetch data by Region from the API
async function fetchCountriesByRegion(region: string): Promise<Country[]> {
  try {
         // Show the loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'block';
    }

      //get api data.
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data: any[] = await response.json();
         // Hide the loading screen
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }

    return processData(data);
  } catch (error) {
    console.error('Error fetching country data by region:', error);
    throw error;
  }
}


// Function to create a country element
function createCountryElement(country: Country): HTMLDivElement {
  const countryElement = document.createElement('div');
  countryElement.innerHTML = `
  <div id='country'>
    <div id="country_image">
      <img src="${country.countryFlag}" alt="${country.countryFlagAlt}">
    </div>
    <div id="country_details">
      <h1 class="country_name">${country.countryName}</h1>
      <p class="population"><b>Population:</b> ${country.countryPopulation}</p>
      <p class="region"><b>Region:</b> ${country.countryRegion}</p>
      <p class="capital"><b>Capital:</b> ${country.countryCapital}</p>
    </div>
  </div>
    `;
  
  // Add a click event listener to the country element
  countryElement.addEventListener('click', () => {
    const countryName = country.countryName;
    fetchCountryDataByName(countryName)


  });

  return countryElement;
}


// Function to create filter element
function createFilterElement(): HTMLDivElement {
  const filtersWrapper = document.createElement('div');
  filtersWrapper.id = 'search-elements';;
  const filters = `
          <div class="search-elements">
                <div class="search-container">
                    <div id="search_bar">
                            <img src="./search-thin.svg" alt="search.svg" id="search_img"> <input type="text" class="search-input" id="search_input" placeholder="Search...">
                    </div>
                </div>
            
                <div id="filter">
                        <select id='region-select'>
                            <option value="africa">Africa</option>
                            <option value="americas">Americas</option>
                            <option value="oceania">Oceania</option>
                            <option value="europe">Europe</option>
                            <option value="asia">Asia</option>
                        </select>
                </div>
            </div>`
  filtersWrapper.innerHTML = filters;
  const searchInput = filtersWrapper.querySelector('#search_input') as HTMLInputElement;
  const regionSelect = filtersWrapper.querySelector('#region-select') as HTMLSelectElement;
  
  searchInput.addEventListener('keydown', (event) => {
        const searchInput = event.target as HTMLInputElement;
    const searchQuery = searchInput.value.trim().toLowerCase();
    if (event.key === 'Enter') {
    
      handleSearchInput(searchQuery);
    }
  }); 

// // Add the event listener once the DOM is loaded
    regionSelect.addEventListener('change', () => {
      const selectedRegion = regionSelect.value;
      handleRegionSelection(selectedRegion);
    })
  return filtersWrapper;
}

// Display All Countries
async function displayCountries() {
  const docContent = document.getElementById('content');
  const countriesWrapper = document.createElement('div');
  countriesWrapper.id= 'all-countries';

  try {
    const filterElements = createFilterElement();
    docContent?.append(filterElements);
  } catch {
    console.error('obinnkererenke filter');
  }

  try {
    const countryData: Country[] = await fetchAllCountryData();
    countryData.forEach(country => {
      const countryElement = createCountryElement(country);
      countriesWrapper.appendChild(countryElement);
    });
  } catch (error) {
    console.error('An error occurred while fetching country data:', error);
  }
  docContent?.append(countriesWrapper);

}

displayCountries();



function handleSearchInput(countryName:string) {
 fetchCountryDataByName(countryName)

}


async function handleRegionSelection(regionName: string) {
  const countriesWrapper = document.getElementById('all-countries');
  
  if (countriesWrapper) {
    try {
      const countryDataByRegion: Country[] = await fetchCountriesByRegion(regionName);
      
      // Clear the current content
      countriesWrapper.innerHTML = '';
      
      countryDataByRegion.forEach(country => {
        const countryElement = createCountryElement(country);
        
        // Append the country element to the wrapper
        countriesWrapper.appendChild(countryElement);
      });
    } catch {
      console.log('An error occurred in handleRegionSelection function');
    }
  }
}


// Function to fetch data by name from the API
async function fetchCountryDataByName(countryName: string): Promise<Country[]> {
  try {
     // Show the loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'block';
    }

      //get api data.
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data: any[] = await response.json();
         // Hide the loading screen
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }

      return processDataByName(data);
  }
  
  catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
}


// Function to process the raw data by Name
function processDataByName(data: any[]): any {
  const countryName = data[0].name.common;
  const countryFlag = data[0].flags.png;
  const countryFlagAlt = data[0].flags.alt;
    const countryPopulation = data[0].population;  
    const countryRegion = data[0].region;
    const countrySubRegion = data[0].subregion;
    const countryCapital = data[0].capital[0];
    const countryTld = data[0].tld[0];
    const countryLanguages = data[0].languages;
    const firstLanguage = countryLanguages ? Object.values(countryLanguages)[0] : 'No LANGUAGE AVAILABLE';
    const countryCurrency = data[0].currencies[Object.keys(data[0].currencies)[0]].name;
    const countryBorders = data[0].borders;
    

    displayCountriesByName(
      countryName,
      countryFlag,
      countryFlagAlt,
      countryPopulation,
        countryRegion,
        countrySubRegion,
        countryCapital,
        countryTld,
      countryCurrency,
        firstLanguage,
        countryBorders
    )

}


// Display Countriy by name
function displayCountriesByName(countryName: string,
  countryFlag: string,
  countryFlagAlt: string,
  countryPopulation: number,
  countryRegion: string,
  countrySubRegion: string,
  countryCapital: string,
  countryTld: string,
  countryCurrency: string,
  firstLanguage:string,
  countryBorders: string[]|undefined) {
  
  const docContent = document.getElementById('content');
  docContent.innerHTML = '';

  const countryDetails = `
     <div id="full_country_display">
     <button id='backbtn'><b>Back</b> </button>
     
        <div id="flag-and-details">
            <div id="image">
                <img src="${countryFlag}" alt="${countryFlagAlt}">
            </div>
            <div class="details">
                <h1>${countryName}</h1>
                <p><b>Population:</b> ${countryPopulation}</p>
                <p><b>Region:</b> ${countryRegion}</p>
                <p><b>Sub Region:</b> ${countrySubRegion}</p>
                <p><b>Capital:</b> ${countryCapital}</p>
                <p><b>Top Level Domain:</b> ${countryTld}</p>
                <p><b>Currency:</b> ${countryCurrency}</p>
                <p><b>Language:</b> ${firstLanguage}</p>
            </div>
        </div>
        
        <div id="borders">
            <h1>Border Countries</h1>
            <div id="border-elements">
                ${countryBorders && countryBorders.length > 0
      ? `<ul>${countryBorders.map(border => `<li>${border}</li>`).join('')}</ul>`
      : 'No bordering countries'}
            </div>
        </div>
    </div>
  `;
  docContent.innerHTML = countryDetails;

  const backbtn = document.getElementById('backbtn');
  backbtn?.addEventListener('click', function () {
    const docContent = document.getElementById('content');
    
   
    docContent.innerHTML = '';
    displayCountries();
  })