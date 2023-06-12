import ModelCategories from '../../../models/categories/index.js';
import Controller from '../../../core/controller/index.js';
import config from '../../../../config.js';

class Things extends Controller{

    constructor(){    
        super();        
        this.modelCategories = new  ModelCategories();        
        this.currentPage = this.retrieveURLCurrentPage();       
    }
    
    createLayouCategoryComponent(container, allCategories){

        if(allCategories.error !== '') return;
                    
        for (let i = 0; i < allCategories.result.length; ++i) {  
            let li = document.createElement("li"); 
            let a = document.createElement("a");                
            a.setAttribute("data-id",allCategories.result[i].id);                                
            a.appendChild(document.createTextNode((allCategories.result[i].name)));
            li.appendChild(a);
            container.appendChild(li);                 
        }

    }
    
    async categoriesList(){         
        let ul = document.querySelector("#categories-list");
        const allCategories = await this.modelCategories.getAll();
        
        this.createLayouCategoryComponent(ul, allCategories)
            
    } 
    
    handleClickCategory(){
        
        document.querySelector("#categories-list").addEventListener("click", async (e)=>{      
            
            let categoryId = e.target.getAttribute('data-id');           

            window.location.href = `${config.urlBase}/src/views/admin/things/manager/?id=${categoryId}`;            
            
        }); 
    }

    goToRegisterthing(){
        document.querySelector("#register-things-button").addEventListener("click",(e)=>{            
            e.preventDefault();
            let prevPage = `${config.urlBase}/src/views/admin/things/manager/`;
            window.location.href = `${config.urlBase}/src/views/admin/things/register/?prevPage=${prevPage}`;           
            
        });
        
    }

}

const things = new Things();

things.categoriesList();
things.handleClickCategory();
things.goToRegisterthing();