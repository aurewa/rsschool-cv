document.addEventListener('DOMContentLoaded', () => {
    
    let service_buttons = Array.from(document.getElementsByClassName('service__button'));
    service_buttons.forEach(element=> {
        element.addEventListener('click', ()=>{
            let service_cards = Array.from(document.getElementsByClassName('service__card'));
            service_cards.forEach(card => {
                card.classList.remove("blur");

                let cardTag = card.getAttribute('tag');
                let btnTag = element.getAttribute('name');

                if (cardTag !== btnTag){
                    card.classList.add("blur");
                }
            });     
        });
    });

    let price_list_items = Array.from(document.getElementsByClassName('price__list-item-header-btn'));
    price_list_items.forEach(item =>{
        item.addEventListener('click', ()=> {
            let price_list_items_content = Array.from(document.getElementsByClassName('price__list-item-content'));
            price_list_items_content.forEach(content_item => {

                let contentTag = content_item.getAttribute('tag');
                let btnName = item.getAttribute('name');

                if (contentTag === btnName){
                    if (content_item.classList.contains("hidden")){
                        content_item.classList.remove("hidden");
                    }else{
                        content_item.classList.add("hidden");
                    }
                }
            });
        });
    });

    var custom_select_elements, i, j, custom_select_elements_count, current_select_element_items_count, current_select_element, options_div_tmp, select_options_div, option_tmp;

    custom_select_elements = document.getElementsByClassName("custom-select");
    custom_select_elements_count = custom_select_elements.length;
    
    for (i = 0; i < custom_select_elements_count; i++) {
      current_select_element = custom_select_elements[i].getElementsByTagName("select")[0];
      current_select_element_items_count = current_select_element.length; 
    
      options_div_tmp = document.createElement("div");
      options_div_tmp.setAttribute("class", "select-selected");
      options_div_tmp.innerHTML = current_select_element.options[current_select_element.selectedIndex].innerHTML;
      
      custom_select_elements[i].appendChild(options_div_tmp);
    
      select_options_div = document.createElement("div");
      select_options_div.setAttribute("class", "select-items select-hide");
      
      for (j = 1; j < current_select_element_items_count; j++) {
      
        option_tmp = document.createElement("div");
        option_tmp.innerHTML = current_select_element.options[j].innerHTML;

         option_tmp.addEventListener("click", function(e) {

            var same_as_selected, i, n, original_select_element, previousNode, original_select_element_items_count;
            original_select_element = this.parentNode.parentNode.getElementsByTagName("select")[0];
            original_select_element_items_count = original_select_element.length;
            
            previousNode = this.parentNode.previousSibling;
            for (i = 0; i < original_select_element_items_count; i++) {

                if (original_select_element.options[i].innerHTML == this.innerHTML) {
                    original_select_element.selectedIndex = i;
                    previousNode.innerHTML = this.innerHTML;
                    
                    same_as_selected = this.parentNode.getElementsByClassName("same-as-selected");	
                    for (n = 0; n < same_as_selected.length; n++) {
                        same_as_selected[n].removeAttribute("class");
                    }

                    this.setAttribute("class", "same-as-selected");
                    showCard(original_select_element.selectedIndex);
                    break;
                }
            }

            previousNode.click();
        });
        
        select_options_div.appendChild(option_tmp);
      }
      
      custom_select_elements[i].appendChild(select_options_div);
      
      options_div_tmp.addEventListener("click", function(e) {
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
    }

    function showCard(elementIndex){

        var cards = Array.from(document.getElementsByClassName("city__card"));
       cards.forEach(card => {
            let cardTag = parseInt(card.getAttribute('tag'));
            if (cardTag !== elementIndex){
                if (!card.classList.contains("hidden")){
                    card.classList.add("hidden");
                }
            }else{
                card.classList.remove("hidden");
            }
       });
    }
    
    function closeAllSelect(elmnt) {
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");

        xl = x.length;
        yl = y.length;

        for (i = 0; i < yl; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i)
          } else {
            y[i].classList.remove("select-arrow-active");
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
    }
    
    document.addEventListener("click", closeAllSelect);
});