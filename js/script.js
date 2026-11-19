const services=[['TRAILER MANUFACTURING','Custom-built, durable trailers designed for practical agricultural and commercial needs.','assets/service-trailer.jpg'],['WATER TANKER MANUFACTURING','Robust water tanker fabrication for transportation, agriculture and other applications.','assets/service-water-tanker.jpg'],['IRON GATES & GRILLS','Strong and stylish iron gates, safety grills and customised metalwork.','assets/service-iron-gate.jpg'],['IRON SHUTTERS','Practical, secure metal shutter fabrication for commercial and other properties.','https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80'],['CUSTOM STEEL FABRICATION','Made-to-requirement iron and steel fabrication for residential and industrial use.','assets/service-tank-fabrication.jpg'],['ON-SITE WELDING','Professional welding and fabrication support at your project location.','https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80']];document.getElementById('service-grid').innerHTML=services.map(([name,desc,img])=>`<article class="service"><img src="${img}" alt="${name} by KGN Engineering Works" loading="lazy"><div class="service-body"><h3>${name}</h3><p>${desc}</p><a href="https://wa.me/919955399634?text=${encodeURIComponent('Hello, I would like a quotation for '+name+'.')}" target="_blank" rel="noopener">ENQUIRE NOW →</a></div></article>`).join('');document.getElementById('year').textContent=new Date().getFullYear();const menu=document.getElementById('menu');
const nav=document.getElementById('links');
const pages=new Set(['home','about','services','vehicle','contact']);
function showPage(page,scroll=true){
  if(!pages.has(page))page='home';
  document.querySelectorAll('main > section[data-page]').forEach(section=>{
    section.hidden=section.dataset.page!==page;
  });
  document.querySelectorAll('.links a').forEach(link=>{
    const selected=link.getAttribute('href')==='#'+page;
    link.classList.toggle('active',selected);
    if(selected)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  nav.classList.remove('show');
  menu.setAttribute('aria-expanded','false');
  if(scroll)window.scrollTo({top:0,behavior:'instant'});
}
menu.addEventListener('click',()=>{
  nav.classList.toggle('show');
  menu.setAttribute('aria-expanded',String(nav.classList.contains('show')));
});
// Works for navigation, footer links and buttons inside the site.
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',event=>{
    const target=link.getAttribute('href').slice(1);
    const page=target==='contact-section'?'contact':target;
    if(!pages.has(page))return;
    event.preventDefault();
    if(location.hash!=='#'+page)history.pushState(null,'','#'+page);
    showPage(page);
  });
});
window.addEventListener('popstate',()=>showPage(location.hash.slice(1)));
window.addEventListener('hashchange',()=>showPage(location.hash.slice(1)));
showPage(location.hash.slice(1),false);
