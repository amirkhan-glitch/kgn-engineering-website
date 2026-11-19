'use strict';

// KGN Engineering Works — clean URL navigation for Vercel.
const services = [
  ['TRAILER MANUFACTURING', 'Custom-built, durable trailers designed for practical agricultural and commercial needs.', '/assets/service-trailer.jpg'],
  ['WATER TANKER MANUFACTURING', 'Robust water tanker fabrication for transportation, agriculture and other applications.', '/assets/service-water-tanker.jpg'],
  ['IRON GATES & GRILLS', 'Strong and stylish iron gates, safety grills and customised metalwork.', '/assets/service-iron-gate.jpg'],
  ['IRON SHUTTERS', 'Practical, secure metal shutter fabrication for commercial and other properties.', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80'],
  ['CUSTOM STEEL FABRICATION', 'Made-to-requirement iron and steel fabrication for residential and industrial use.', '/assets/service-tank-fabrication.jpg'],
  ['ON-SITE WELDING', 'Professional welding and fabrication support at your project location.', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80']
];
const grid = document.getElementById('service-grid');
if (grid) grid.innerHTML = services.map(([name, description, image]) => `
  <article class="service">
    <img src="${image}" alt="${name} by KGN Engineering Works" loading="lazy">
    <div class="service-body"><h3>${name}</h3><p>${description}</p>
      <a href="https://wa.me/919955399634?text=${encodeURIComponent('Hello, I would like a quotation for ' + name + '.')}" target="_blank" rel="noopener noreferrer">ENQUIRE NOW →</a>
    </div>
  </article>`).join('');
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const menu = document.getElementById('menu');
const nav = document.getElementById('links');
const paths = {'/':'home','/about':'about','/services':'services','/vehicle-services':'vehicle','/contact':'contact'};
const pagePaths = {home:'/',about:'/about',services:'/services',vehicle:'/vehicle-services',contact:'/contact'};
function closeMenu(){
  nav?.classList.remove('show');
  menu?.setAttribute('aria-expanded','false');
}
function showPage(page, scroll=true){
  const selected = pagePaths[page] ? page : 'home';
  document.querySelectorAll('main > section[data-page]').forEach(section => {
    section.hidden = section.dataset.page !== selected;
  });
  document.querySelectorAll('a[data-page]').forEach(link => {
    const active = link.dataset.page === selected;
    link.classList.toggle('active',active);
    if(active) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  document.title = (selected === 'home' ? 'KGN Engineering Works' :
    ({about:'About Us',services:'Our Services',vehicle:'Vehicle Services',contact:'Contact Us'}[selected] + ' | KGN Engineering Works'));
  closeMenu();
  if(scroll) window.scrollTo({top:0,behavior:'instant'});
}
function currentPage(){
  const path = window.location.pathname.replace(/\/$/,'') || '/';
  return paths[path] || 'home';
}
menu?.addEventListener('click',()=>{
  const open = nav?.classList.toggle('show') || false;
  menu.setAttribute('aria-expanded',String(open));
});
document.addEventListener('click',event=>{
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const url = new URL(link.href,window.location.href);
  if(url.origin !== window.location.origin) return;
  const path = url.pathname.replace(/\/$/,'') || '/';
  if(!(path in paths)) return;
  event.preventDefault();
  if(window.location.pathname !== path || window.location.hash){
    history.pushState({page:paths[path]},'',path);
  }
  showPage(paths[path]);
});
window.addEventListener('popstate',()=>showPage(currentPage()));
// Support old bookmarks such as /#about.
const legacy = {home:'/',about:'/about',services:'/services',vehicle:'/vehicle-services',contact:'/contact'};
const hash = window.location.hash.slice(1);
if(hash in legacy && currentPage()==='home') history.replaceState(null,'',legacy[hash]);
showPage(currentPage(),false);
