(function(){ 
    const pages = document.querySelectorAll(".Random-Container");
    pages.forEach(page => {
        page.style.display = 'none';
    });
    pages[0].style.display = 'flex';

    let count = 1;
    document.addEventListener('keydown', function(e){
        if(e.key === 'p' || e.key === 'P'){
            pages.forEach(page => {
                page.style.display = 'none';
            });
            pages[count++ % pages.length].style.display = "flex";
        }
    })
})();