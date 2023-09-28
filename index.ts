import { createPageDetails } from "./details.ts";

console.log('happening')
/* API call  */
async function fetchData() {
  try {
      const response = await fetch('https://restcountries.com/v3.1/all');

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
      const data = await response.json();

      const results:any = [];
    // Process the data
    data.forEach(function (obj:any) {
    //   console.log(obj.name)
      const countryFlag = obj.flags.png; 
      const countryFlagAlt = obj.flags.alt;
      const countryName = obj.name.common;
      const countryPopulation = obj.population;
      const countryRegion = obj.region;
      const countryCapital = obj.capital && (obj.capital[0] || obj.capital[1]);
      const countrySubRegion = obj.subregion;
      const countryTopLevelDomain = obj.tld && (obj.tld[0] || obj.tld[0]);
      const countryCurrency = obj.currencies ? obj.currencies[Object.keys(obj.currencies)[0]].name : 'NO CURRENCY AVAILABLE IN API';
      const countryLanguage = obj.languages ? obj.languages[Object.keys(obj.languages)[0]] :'No LANGUAGE AVAILABLE';
        const countryBorder = obj.borders;
        results.push({
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
            countryBorder
          });
       
    });
      
        return results;

  } catch (error) {
    console.error('Error:', error);
    }
    
}

/*creating the container that will hold the search bar,
 filter bar and countries */
async function pageBody() {
  const container = document.createElement('div');
  container.classList.add('flow_layout_column');
  
  const topNav = document.createElement('div');
  topNav.classList.add('flow_layout_row');
  topNav.id = 'top_nav';
  
  
  // Fetch data and create country elements
  try {
    const data = await fetchData();
    const countryFxnWrapper = document.createElement('div');
    countryFxnWrapper.classList.add('flow_layout_row');
    countryFxnWrapper.id = 'country_fxn';
    
    // Iterate through the fetched data and create country elements
    data.forEach(el => {
      const country = createCountry(
        el.countryFlag,
        el.countryFlagAlt,
        el.countryName,
        el.countryPopulation,
        el.countryRegion,
        el.countryCapital,
        el.countrySubRegion,
        el.countryTopLevelDomain,
        el.countryCurrency,
        el.countryLanguage,
        el.countryBorder
      );
      countryFxnWrapper.append(country);
    });
   
    container.append(countryFxnWrapper);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
  return container;
}


/*creating the country element i think country funcitons may have arguments that will contain 
the details and Flag if the individual countries and it will be run for each time there is a country probably with the forEach loop 
each time it is run, it will be added to the container div that contains the search and filter bar*/
function createCountry(countryFlagArg:string, countryFlagAltArg:string, countryNameArg:string, countryPopulationArg:any, countryRegionArg:string, countryCapitalArg:string, countrySubRegionArg:string, countryTLDArg:string, countryCurrArg:string, countryLangArg:string, border:any) {

const countryWrapper = document.createElement('div');   /*Individual country wrapper */
const countryFlagWrapper = document.createElement('div');     /* Flag countainer in the country wrapper */
const flag = document.createElement('img');
const countryDetails = document.createElement('div');   /* container for the country short details */
const countryName = document.createElement('h3');       /*Holds the country name */
const countryPopulationDetail = document.createElement('div') /*wrapper for country population details */
const countryPopulationText = document.createElement('h4');
const countryPopulationValue = document.createElement('p');
const countryRegionDetail = document.createElement('div'); /*wrapper for country region details */
const countryRegionText = document.createElement('h4');
const countryRegionValue = document.createElement('p');
const countryCapitalDetail = document.createElement('div') /*wrapper for country capital details */
const countryCapitalText = document.createElement('h4');
const countryCapitalValue = document.createElement('p');
const countrySubRegionDetail = document.createElement('div') /*wrapper for country Sub Region details */
const countrySubRegionText = document.createElement('h4');
const countrySubRegionValue = document.createElement('p');
const countryTLDDetail = document.createElement('div') /*wrapper for country Time line Domain details */
const countryTLDText = document.createElement('h4');
const countryTLDValue = document.createElement('p');
const countryCurrencyDetail = document.createElement('div') /*wrapper for country Currency  details */
const countryCurrencyText = document.createElement('h4');
const countryCurrencyValue = document.createElement('p');
const countryLanguageDetail = document.createElement('div') /*wrapper for country Language details */
const countryLanguageText = document.createElement('h4');
const countryLanguageValue = document.createElement('p');
   
countryWrapper.classList.add('flow_layout_column');
countryDetails.classList.add('flow_layout_column');
countryPopulationDetail.classList.add('flow_layout_row');
countryRegionDetail.classList.add('flow_layout_row');
countryCapitalDetail.classList.add('flow_layout_row');
countrySubRegionDetail.classList.add('flow_layout_row');
countryTLDDetail.classList.add('flow_layout_row');
countryCurrencyDetail.classList.add('flow_layout_row');
countryLanguageDetail.classList.add('flow_layout_row');


countryFlagWrapper.id = 'country_flag_wrapper';
flag.id = 'flag';
countryWrapper.id = 'country_wrapper';
countryDetails.id = 'country_details';    
countryPopulationDetail.id = 'country_population'; 
countryPopulationText.id='population_value'    
countryRegionDetail.id = 'country_region';    
countryCapitalDetail.id = 'country_capital';     
    
flag.src = countryFlagArg;
flag.alt = countryFlagAltArg;
    
countryPopulationText.textContent = 'Population:';
countryRegionText.textContent = 'Region:';
countryCapitalText.textContent = 'Capital:';  
countrySubRegionText.textContent = 'Sub Region:';    
countryTLDText.textContent = 'Time Line Domain:';    
countryCurrencyText.textContent = 'Currency:';    
countryLanguageText.textContent = 'Language:';        

countryName.textContent = countryNameArg;
countryPopulationValue.textContent = countryPopulationArg;
countryRegionValue.textContent = countryRegionArg;
countryCapitalValue.textContent = countryCapitalArg;
countryTLDValue.textContent = countrySubRegionArg;
countrySubRegionValue.textContent = countryTLDArg;
countryCurrencyValue.textContent = countryCurrArg;
countryLanguageValue.textContent = countryLangArg;


countryFlagWrapper.append(flag);
countryPopulationDetail.append(countryPopulationText);
countryPopulationDetail.append(countryPopulationValue);
countryRegionDetail.append(countryRegionText);
countryRegionDetail.append(countryRegionValue);
countryCapitalDetail.append(countryCapitalText);
countryCapitalDetail.append(countryCapitalValue);
countryTLDDetail.append(countryTLDText);
countryTLDDetail.append(countryTLDValue);
countrySubRegionDetail.append(countrySubRegionText);
countrySubRegionDetail.append(countrySubRegionValue);
countryCurrencyDetail.append(countryCurrencyText);
countryCurrencyDetail.append(countryCurrencyValue)
countryLanguageDetail.append(countryLanguageText);
countryLanguageDetail.append(countryLanguageValue);

countryDetails.append(countryName);
countryDetails.append(countryPopulationDetail);
countryDetails.append(countryRegionDetail);
countryDetails.append(countryCapitalDetail);
// countryDetails.append(countryTLDDetail);    
// countryDetails.append(countrySubRegionDetail);    
// countryDetails.append(countryCurrencyDetail);    
// countryDetails.append(countryLanguageDetail);    
    

countryWrapper.append(countryFlagWrapper);
    countryWrapper.append(countryDetails); 
    
    // console.log(bordersArgs)
// creating objects for the elements and value i need in the second page
     const countryDetailsTransfer = {
         countryFlag: countryFlagArg,
         countryFlagAlt:countryFlagAltArg,
         population: countryPopulationDetail,
         capital: countryCapitalDetail,
         tld: countryTLDDetail,
         subRegion: countrySubRegionDetail,
         currency: countryCurrencyDetail,
         language: countryLanguageDetail,
         countryNameEl: countryName,
         region:countryRegionDetail
    };
    
//adding event listener to each flag to return its object 
    countryWrapper.addEventListener('click', function () {
        createPageDetails(countryDetailsTransfer);       
    
    })
return countryWrapper
}

// creating the Header component...
function createHeader() {
    const header = document.createElement('header');         /*The header to contain search bar and filter */
    const themeMode = document.createElement('div');       /*a clickable to change between dark mode and light ode for the document */
    const title = document.createElement('h2');
    const themeText = document.createElement('p');
    const darkModeImg = document.createElement('img');
    const whiteModeImg = document.createElement('img');

    darkModeImg.id = 'dark_mode_img';
    whiteModeImg.id = 'white_mode_img';    
    header.id = 'header_id';
    title.id = 'title_id'
    header.classList.add('flow_layout_row');    
    
    title.textContent = 'Where in the world?';    
    themeText.textContent = 'Dark Mode';

    darkModeImg.src = './dark-mode.svg';
    whiteModeImg.src = './white-mode.svg';
    
    themeMode.addEventListener('click', function () {
        if (themeMode.contains(darkModeImg)) themeMode.removeChild(darkModeImg);
        if(themeMode.contains(whiteModeImg))  themeMode.removeChild(whiteModeImg);
        const body = document.body;
        themeText.textContent = themeText.textContent === 'Dark Mode'
        ? 'Light Mode' : 'Dark Mode'; 
        body.classList.toggle("dark-theme");
        themeMode.classList.toggle('theme_mode_light');
        if (themeText.textContent == 'Light Mode') themeMode.prepend(whiteModeImg);
        if (themeText.textContent == 'Dark Mode') themeMode.prepend(darkModeImg);  
        
    })
    
    themeMode.id = 'theme_mode';
    themeMode.append(darkModeImg)
    themeMode.append(themeText);
    header.append(title);
    header.append(themeMode);

    return header;
}

//appending the elements to the page.
// function createPage() {
//     const content = document.getElementById('content');
//     content.append(createHeader());
//     //calling the page body using immediatly invoked functions
//     (async function renderCountries() {
//         const pageContent = await pageBody();
//         content.append(pageContent);
//     }())
// }

function createPage(): void {
  const content: HTMLElement | null = document.getElementById('content');
  if (content) {
    content.append(createHeader());

    // Calling the page body using immediately invoked functions
    (async function() {
      const pageContent: HTMLElement = await pageBody();
     return content.append(pageContent);
    })();
  }
}

createPage();
export { createHeader, createPage};



