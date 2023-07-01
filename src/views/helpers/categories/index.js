import ModelThings from '../../../models/things/index.js';
import LayoutThing from '../../components/thing/index.js';

class HelperCategories{
    constructor(){}

    static handleChangeThingsReservedByBategories(selectOptions){
        this.modelThings = new ModelThings();
        this.layoutThing = new LayoutThing(); 

        if(selectOptions === null) return;

        let categoriesLinks = selectOptions;        
        
        for (let i = 0; i < categoriesLinks.length; i++) {
            categoriesLinks[i].addEventListener('change',async(e)=>{                
                let categoriesId = e.target.value;  
               
                let allThingsReserved = {};

                if(categoriesId == "0"){
                    allThingsReserved = await this.modelThings.getThingsReserved();

                }else{
                    allThingsReserved = await this.modelThings.getThingsByCategoryIdAndReserved(categoriesId);                      
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                
                this.layoutThing.create(thingsList, allThingsReserved, true, 'admin/things/thingreserved');                 
            });
            
        }


    }

    static handleChangeThingsByBategories(selectOptions){
        this.modelThings = new ModelThings();
        this.layoutThing = new LayoutThing(); 

        if(selectOptions === null) return;

        let categoriesLinks = selectOptions;        
        
        for (let i = 0; i < categoriesLinks.length; i++) {
            categoriesLinks[i].addEventListener('change',async(e)=>{                
                let categoriesId = e.target.value;  
               
                let allThingsReserved = {};

                if(categoriesId == "0"){
                    allThingsReserved = await this.modelThings.getThings();

                }else{
                    allThingsReserved = await this.modelThings.getThingsByCategoryId(categoriesId);                      
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                
                this.layoutThing.create(thingsList, allThingsReserved, true, 'admin/things/thingreserved');                 
            });
            
        }


    }

    static handleThingsByCategoriesHome(allLinks){
        this.modelThings = new ModelThings();
        this.layoutThing = new LayoutThing(); 

        if(allLinks === null) return;        
        
        const filters =  document.querySelectorAll(".filter-things span"); 
        
        for (let i = 0; i < allLinks.length; i++) {

            if(allLinks[i].getAttribute('id') === 'all-categories') continue

            allLinks[i].addEventListener('click',async(e)=>{

                let categoriesId = e.target.parentNode.getAttribute("data-id");                
                for (let j = 0; j < allLinks.length; j++) {                                  
                    allLinks[j].parentNode.removeAttribute('class');                 
                }

                if(e.target.parentNode.parentNode.classList.contains('active')){                    
                    e.target.parentNode.parentNode.removeAttribute('class');   
                }else{
                    e.target.parentNode.parentNode.setAttribute('class','active');
                }

                let lostThingsFilters = filters.item(0).getAttribute('status');                                
                let allThings = {};

                if(categoriesId == "0" &&  Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getAll();

                }else if(categoriesId == "0" &&  !Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getThingsReserved(); 
                
                }else if(Number.parseInt(lostThingsFilters)){
                    allThings = await this.modelThings.getThingsByCategoryId(categoriesId);  
                    
                }else{
                    allThings = await this.modelThings.getThingsByCategoryIdAndReserved(categoriesId);  
                }

                let thingsList = document.querySelector(".things-list");              

                thingsList.innerHTML = "";
                
                this.layoutThing.create(thingsList, allThings, true, 'users/things/show-object');
            });
            
        }
    }


}

export default HelperCategories;