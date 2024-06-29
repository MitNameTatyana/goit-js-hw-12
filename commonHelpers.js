import{a as f,S,i as p}from"./assets/vendor-b0d10f48.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();f.defaults.baseURL="https://pixabay.com";async function g(t,a){const o={key:"44649525-fae4a92093e5fa87b7d67167e",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15};return(await f.get("/api/",{params:o})).data}function h(t){return t.map(({webformatURL:a,largeImageURL:o,tags:n,likes:e,views:r,comments:i,downloads:M})=>`<li class="gallery-item">
  <a class="gallery-link" href="${o}">
    <img class="gallery-img" src="${a}" alt="${n}" />
  </a>
  <ul class="list-img">
    <li class="item-img">
      <span class="label">Likes</span>
      <span class="value">${e}</span>
    </li>
    <li class="item-img">
      <span class="label">Views</span>
      <span class="value">${r}</span>
    </li>
    <li class="item-img">
      <span class="label">Comments</span>
      <span class="value">${i}</span>
    </li>
    <li class="item-img">
      <span class="label">Downloads</span>
      <span class="value">${M}</span>
    </li>
  </ul>
</li>`).join("")}const s={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more-button"),loader:document.querySelector(".loader")};let c="",l=1,u=1;const P=15,y=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});s.form.addEventListener("submit",q);s.btnLoadMore.addEventListener("click",O);async function q(t){if(t.preventDefault(),s.gallery.innerHTML="",c=t.target.elements["search-input"].value.trim().toLowerCase(),!c){B("Please enter a search query");return}l=1,m(),b();try{const a=await g(c,l);if(u=Math.ceil(a.totalHits/P),u===0){w("Sorry, there are no images matching your search query. Please try again!"),d(),t.target.reset();return}const o=h(a.hits);s.gallery.innerHTML=o,y.refresh()}catch{}d(),L(),t.target.reset()}async function O(t){t.preventDefault(),l++,m(),b();try{const a=await g(c,l),o=h(a.hits);s.gallery.insertAdjacentHTML("beforeend",o),y.refresh(),$()}catch{}d(),L()}function L(){l>=u?(m(),u&&w("We're sorry, but you've reached the end of search results")):x()}function $(){const a=s.gallery.children[0].getBoundingClientRect().height;scrollBy({top:a*3,behavior:"smooth"})}function x(){s.btnLoadMore.classList.remove("hidden")}function m(){s.btnLoadMore.classList.add("hidden")}function b(){s.loader.classList.remove("hidden")}function d(){s.loader.classList.add("hidden")}const v={position:"center",backgroundColor:"rgb(78, 117, 255)",theme:"dark",messageSize:"16",messageColor:"white",messageLineHeight:"1,5",progressBar:!1,pauseOnHover:!0,timeout:3e3};function B(t){p.info({message:t,...v})}function w(t){p.error({message:t,maxWidth:"432",...v})}
//# sourceMappingURL=commonHelpers.js.map
