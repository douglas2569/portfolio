import ModelThings from "../../../models/things/index.js";
import ModelCategories from '../../../models/categories/index.js';
import Controller from "../../../core/controller/index.js";
import config from "../../../../config.js";

import HelperSearch from '../../helpers/search/index.js';
import HelperSandwichMenu from '../../helpers/sandwichmenu/index.js';
import HelperCategories from '../../helpers/categories/index.js';

import LayoutThing from '../../components/thing/index.js';
import LayoutHeaderContent from '../../components/headercontent/index.js';
import LayoutCateogoriesList from '../../components/categories/index.js';

class Panel extends Controller{
    constructor(){
        super();
        this.modelThings = new ModelThings();  
        this.modelCategories = new  ModelCategories();      
        this.currentPage = this.retrieveURLCurrentPage();
        this.layoutThing = new LayoutThing(); 
    } 
    
    async ListThingsReserved(){

        const allThings = await this.modelThings.getThingsReserved();                    
        let  thingsListReserved = document.querySelector(".things-list");                
        await this.layoutThing.create(thingsListReserved, allThings, true, 'admin/things/thingreserved'); 
        
    }

    async categoriesList(){ 

        let categories = document.querySelector('.container section .categories');
        
        const layoutCateogoriesList = new  LayoutCateogoriesList();
        layoutCateogoriesList.create(categories);
             

    } 
    
    goToThingRegister(){
        document.querySelector(".register-thing-button").addEventListener("click",()=>{  
            
           window.location.href = `${config.urlBase}/src/views/admin/things/register/?prevPage=${this.currentPage}`;

        });
    
    }

    goToManageThings(){
        document.querySelector(".manage-things-button").addEventListener("click",()=>{  

           window.location.href = `${config.urlBase}/src/views/admin/things/`;

        });
        
    } 

    goToReservedThing(){  
        
        let thingsList =  document.querySelectorAll(".things-list figure");              
       
        thingsList.forEach((thing)=>{
            thing.addEventListener("click", (e)=>{   
                let id = thing.getAttribute("data-id")            
                window.location.href = `${config.urlBase}/src/views/admin/things/thingreserved/?id=${id}`;                  
            });    
        })
       
          
       
    }  
    
    goToReturnedThing(){
        document.querySelector(".returned-thing-button").addEventListener("click",()=>{  
            window.location.href = `${config.urlBase}/src/views/admin/things/qrcodereader/`;            

        });
        
    }
    
    createHeaderContent(){
        const contentHeader = new LayoutHeaderContent();
        contentHeader.create(document.querySelector('header .container'), `${config.urlBase}/src/views/admin/panel/`, true, true, false, false);
    }  
    

    handleChangeThingsByBategories(){
        if(document.querySelectorAll('#categories-list') === null) return;
        let categoriesLinks = document.querySelectorAll('#categories-list');

        HelperCategories.handleChangeThingsReservedByBategories(categoriesLinks);
    }
    

}

const panel = new Panel();
panel.createHeaderContent();
await panel.categoriesList();
await panel.ListThingsReserved();
panel.goToThingRegister();
panel.goToReturnedThing();
panel.goToManageThings();
panel.goToReservedThing();
panel.handleChangeThingsByBategories();

HelperSandwichMenu.createSandwichMenu();
HelperSandwichMenu.goToProfile();
HelperSandwichMenu.goToDiscardeThings();
HelperSandwichMenu.goToCategoryManager();
HelperSandwichMenu.openSandwichMenu();
HelperSandwichMenu.closeSandwichMenu();
// HelperSandwichMenu.goToReturnedThings();

HelperSearch.createModalSearch();
HelperSearch.searchItem();
HelperSearch.openSearchModal();
HelperSearch.closeSearchModal();

