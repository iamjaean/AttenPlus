
const menu = document.querySelector('.user-menu-modal');

function toggleMenuList(){
if(menu.classList.contains('is-active')){
    menu.classList.remove('is-active') 
}else{
    menu.classList.add('is-active')
}
}