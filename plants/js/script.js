document.addEventListener('DOMContentLoaded', () => {
    
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
                    showCard(original_select_element.options[i].id);
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
          
          document.querySelector(".custom-select").classList.toggle("custom-select-expanded");
        });
    }

    function showCard(elementIndex){
       var cards = Array.from(document.getElementsByClassName("city__card"));
       var select = document.querySelector(".custom-select");

       cards.forEach(card => {
            if (card.classList.contains(elementIndex)){
                card.classList.remove("hidden");
                if (!select.classList.contains("custom-select-selected")){
                    select.classList.add("custom-select-selected")
                }
            }else{
                if (!card.classList.contains("hidden")){
                    card.classList.add("hidden");
                }
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
            y[i].closest(".custom-select").classList.remove("custom-select-expanded");
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
    }
    
    document.addEventListener("click", closeAllSelect);

    (function () {
        const burger_element = document.querySelector(".burger");
        const burger_close_element = document.querySelector(".header__nav__close");

        burger_element.addEventListener('click', ()=> {
            document.querySelector(".header__nav").classList.add("header__nav__visible");
        });

        burger_close_element.addEventListener('click', ()=> {
            document.querySelector(".header__nav").classList.remove("header__nav__visible");
        });
              
        document.querySelectorAll(".header__nav-list-item").forEach(e=>{
            e.addEventListener('click', ()=> {
                document.querySelector(".header__nav").classList.remove("header__nav__visible");
            });
        });

        document.querySelectorAll(".service__button").forEach(button => {
            button.addEventListener('click', ()=> {

                if (button.classList.contains("service__button__disabled")) return;
                
                var isActive = false;               
                if(button.classList.contains('service__button__active')){
                    isActive = false;
                    button.classList.remove('service__button__active');
                }
                else{
                    isActive = true;
                    button.classList.add('service__button__active');
                }

                var active_buttons_ids = Array.from(document.querySelectorAll(".service__button__active")).map(element => element.id);
                if (active_buttons_ids.length >= 2){
                    document.querySelectorAll(".service__button").forEach(b=>{
                        if (!b.classList.contains("service__button__active")){
                            b.classList.add("service__button__disabled");
                        }
                    });

                }else{
                    document.querySelectorAll(".service__button").forEach(b=>{
                        if (b.classList.contains("service__button__disabled")){
                            b.classList.remove("service__button__disabled");
                        }
                    });
                }

                document.querySelectorAll(".service__card").forEach(card => {

                    if (active_buttons_ids.length == 0){
                        card.classList.remove("blur");
                        return;
                    }

                    card.classList.add("blur");

                    if (Array.from(card.classList).some(c=> active_buttons_ids.includes(c))){
                        card.classList.remove("blur");
                    }
                });
            });
        });

        document.querySelectorAll('.price__list-item-header-btn').forEach(item => {
            item.addEventListener('click', ()=> {

                let buttons = Array.from(document.querySelectorAll(".price__list-item-header-btn"));
                let pressed_button_id = item.getAttribute('id');
                buttons.forEach(expand_button=>{
    
                    let current_button_id = expand_button.getAttribute('id');
                    let parent = expand_button.closest(".price__list-item");
                    let content_item = parent.querySelector(".price__list-item-content");
                    
    
                    if (current_button_id != pressed_button_id || (current_button_id == pressed_button_id && !content_item.classList.contains("hidden")))
                    {
                        content_item.classList.add("hidden");
                        expand_button.classList.remove("price__list-item-header-btn__expanded");
                        parent.classList.remove("price__list-item__expanded");
    
                    }else{
                        content_item.classList.remove("hidden");
                        parent.classList.add("price__list-item__expanded");
                        expand_button.classList.add("price__list-item-header-btn__expanded");
                    }
                });    
            });
        });

        document.querySelectorAll(".call__us-button").forEach(call_button => {
            call_button.addEventListener('click', ()=>{
                var card = call_button.closest(".city__card");
                var phone = card.querySelector(".phone").innerHTML.replaceAll("&nbsp;", "");
                window.open(`tel:${phone}`);
            });
        });

    }());


    const part1 = "1.При нажатии на кнопки: Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50 \n";
    const part2 = "2.Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50 \n";
    const part3 = "3.В разделе contacts реализован select с выбором городов +25 \n";
    
    const part4 = "Оценка за задание 125 баллов  \n";

    console.log(part1 + part2 + part3 + part4);
});