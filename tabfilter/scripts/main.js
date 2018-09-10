document.addEventListener('DOMContentLoaded', function() {
 
  var filter    = document.getElementById('selectFilter'),
      display   = document.getElementById('display'),
      menu      = document.getElementById('menu'),
      filterVal = [],
      activeTab,
      reg;
  
  filter.addEventListener('click', function(event){
    var parent;
    
    if(event.target.classList.contains('selectFilter__input')) {
      
      menu.style.display =  menu.style.display === '' ? 'flex' : '';
      
      parent = event.target.parentElement;
      parent.classList.contains('selectFilter__params-active') ?
        parent.classList.remove('selectFilter__params-active') :
        parent.classList.add('selectFilter__params-active');
    }
    
    if(event.target.classList.contains('menu__check')){
      document.getElementById('contentBox').style.display = 'block';
      if(event.target.id === 'item1'){
        document.getElementById('list').style.display = 'none';
        document.getElementById('dSelect').style.display = '';
      
      }else {
        document.getElementById('dSelect').style.display = 'none';
        document.getElementById('list').style.display = '';
      }
      activeTab = event.target;
    }
  
    if(event.target.classList.contains('list__item')){
    
      if(event.target.classList.contains('list__item-checked')){
        reg = new RegExp(event.target.innerText +'_*', 'g');
      
        filterVal =
          filterVal.join('_').replace(reg , '') ?
            filterVal.join('_').replace(reg , '').split('_') :
            [];
        event.target.classList.remove('list__item-checked');
      
      }else{
      
        filterVal.push(event.target.innerText);
        event.target.classList.add('list__item-checked');
      }
      
      if(filterVal.length){
        activeTab.classList.add('menu__item-change');
      }else{
        activeTab.classList.remove('menu__item-change');
      }
    
      showVal(filterVal, display);
      
    }
    
  });
  
  function showVal(valArr, display){
    display.value = valArr.join(', ');
  }
  
  
});

