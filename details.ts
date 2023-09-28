import { createHeader, createPage } from "./index.ts";



function createPageElements (countryFlagArg:string, countryFlagAltArg:string,
countryNameArgs:string,
countryPopulationArgs:any,
countryRegionArgs:string,
countryCapitalArgs:string,
countrySubRegionArgs:string,
countryTldArgs:string,
countryCurrencyArgs:string,
    countryLanguageArgs: string

) {

    const pageContainer = document.createElement('div');
    const backButtonWrapper = document.createElement('div');
    const contentWrapper = document.createElement('div');
    const details = document.createElement('div');
    const backButton = document.createElement('button');
    const flagWrpper = document.createElement('div');
    const flag = document.createElement('img');
    const backArrowBlack = document.createElement('img');
    const backArrowWhite = document.createElement('img');     
    
    pageContainer.classList.add('flow_layout_column');
    contentWrapper.classList.add('flow_layout_row');
    
    details.id = 'details';
    contentWrapper.id='content_wrapper'
    backButtonWrapper.id = 'back_button_wrapper';
    backButton.id = 'back_button';
    
    
    backButton.textContent = 'Back';
    flag.src = countryFlagArg;
    flag.alt = countryFlagAltArg;
    flag.id = 'details_flag';
    backArrowBlack.src = './back-black.svg';
    backArrowWhite.src = './back-white.svg';

    flagWrpper.append(flag);
    details.append(countryNameArgs,
        countryPopulationArgs,
        countryRegionArgs,
        countrySubRegionArgs,
        countryCapitalArgs,
        countryTldArgs,
        countryCurrencyArgs,
        countryLanguageArgs,);
    
    
    backButton.prepend(backArrowBlack);
     backButtonWrapper.append(backButton);
    contentWrapper.append(flagWrpper);
    contentWrapper.append(details);

    // JAvaScript version
    // backButton.addEventListener('click', function () {
    //     const content = document.getElementById('content');
    //     content.textContent = '';
    //     createHeader()
    //     createPage()
             
    // })

const backButtonEl: HTMLElement | null = document.getElementById('backButton');
if (backButtonEl) {
  backButton.addEventListener('click', () => {
    const content: HTMLElement | null = document.getElementById('content');
    
    if (content) {
      content.textContent = '';
      createHeader();
      createPage();
    }
  });
}
    pageContainer.append(backButtonWrapper);
    pageContainer.append(contentWrapper);
    return pageContainer
}


function createPageDetails(countryDetailsTransfer:any){    
    const countryFlag = countryDetailsTransfer.countryFlag
    const countryFlagArg = countryDetailsTransfer.countryFlagAlt    
    const countryName=   countryDetailsTransfer.countryNameEl
    const countryPopulation =   countryDetailsTransfer.population
    const countryRegion =   countryDetailsTransfer.region
    const countryCapital =  countryDetailsTransfer.capital
    const countrySubRegion = countryDetailsTransfer.subRegion;
    const countryLanguage =  countryDetailsTransfer.language
    const countryTld = countryDetailsTransfer.tld;
    const countryCurrency = countryDetailsTransfer.currency
   
    const content = document.getElementById('content');
    // content.textContent = '';
    // content.append(createHeader());
    // content.append(countryDetailsTransfer.countryNameEl);


    if (content !== null) {
  content.textContent = '';
  content.append(createHeader());
  content.append(countryDetailsTransfer.countryNameEl);
//   content.append(createPageElements(countryFlag));

    
    content.append(createPageElements(countryFlag,
    countryFlagArg,
    countryName,
    countryPopulation,
    countryRegion,
    countryCapital,
    countrySubRegion,
    countryTld,
    countryCurrency,
    countryLanguage))
    }
}

export { createPageDetails };