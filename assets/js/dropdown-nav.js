
(function(){
  const cities = [
    ["cities/kyiv.html","קייב","בירה, דניפרו וזהות מדינית"],
    ["cities/lviv.html","לביב","תרבות גליציאנית ואדריכלות"],
    ["cities/odesa.html","אודסה","נמל, ים שחור וקהילות"],
    ["cities/kharkiv.html","חרקוב","תעשייה, מדע ומזרח אוקראינה"],
    ["cities/dnipro.html","דניפרו","נהר, תעשייה וחלל"],
    ["cities/chernivtsi.html","צ׳רניבצי","בוקובינה, רב־תרבותיות ומורשת יהודית"]
  ];
  function inCities(){return location.pathname.includes("/cities/")}
  function prefix(path){return inCities() ? "../"+path : path}
  function cityPath(path){return inCities() ? path.replace("cities/","") : path}
  function item(href,label,note,icon){
    const a=document.createElement("a");
    a.className="geh-menu-link";
    a.href=href;
    a.innerHTML=`<span><strong>${label}</strong><small>${note||""}</small></span><span><i class="${icon||"fa-solid fa-arrow-up-right-from-square"}"></i></span>`;
    return a;
  }
  function section(title){
    const s=document.createElement("section");
    s.className="geh-menu-section";
    const h=document.createElement("h2");
    h.className="geh-menu-title";
    h.textContent=title;
    s.appendChild(h);
    return s;
  }
  function build(){
    if(document.querySelector(".geh-nav-shell")) return;
    const nav=document.createElement("div");
    nav.className="geh-nav-shell";
    nav.innerHTML=`<div class="geh-nav-inner">
      <a class="geh-brand" href="${prefix("index.html")}"><span class="geh-brand-mark"><i class="fa-solid fa-house"></i></span><span>מרכז מחקר אוקראינה</span></a>
      <button class="geh-menu-button" type="button" aria-expanded="false" aria-controls="gehDropdownMenu"><i class="fa-solid fa-bars"></i><span>פתח ניווט</span><i class="fa-solid fa-chevron-down"></i></button>
    </div>
    <div class="geh-dropdown" id="gehDropdownMenu" hidden><div class="geh-menu-scroll"><div class="geh-menu-grid"></div></div></div>`;
    document.body.insertBefore(nav,document.body.firstChild);
    const grid=nav.querySelector(".geh-menu-grid");
    const main=section("עמודים ראשיים");
    main.appendChild(item(prefix("index.html"),"ראשי","אינדקס המחקר","fa-solid fa-house"));
    main.appendChild(item(prefix("ukraine.html"),"אוקראינה","מחקר מדינה מלא","fa-solid fa-flag"));
    main.appendChild(item(prefix("timeline.html"),"ציר זמן","היסטוריה בלחיצה","fa-solid fa-clock-rotate-left"));
    main.appendChild(item(prefix("jewish-ukraine.html"),"יהדות אוקראינה","קהילה, תרבות וזיכרון","fa-solid fa-star-of-david"));
    main.appendChild(item(prefix("sources.html"),"מקורות","קרדיטים ורישיונות","fa-solid fa-link"));
    main.appendChild(item(prefix("about.html"),"אודות","מידע על הפרויקט","fa-solid fa-circle-info"));
    const c=section("דפי ערים");
    cities.forEach(([path,label,note])=>c.appendChild(item(cityPath(path),label,note,"fa-solid fa-city")));
    const misc=section("קפיצות מהירות");
    misc.appendChild(item("#top","ראש הדף","חזרה לתחילת העמוד","fa-solid fa-arrow-up"));
    misc.appendChild(item(prefix("assets/images/README-images.txt"),"שמות תמונות","רשימת קבצי תמונות מומלצים","fa-solid fa-image"));
    grid.appendChild(main);grid.appendChild(c);grid.appendChild(misc);
    const btn=nav.querySelector("button");
    const dd=nav.querySelector(".geh-dropdown");
    function setOpen(open){dd.hidden=!open;btn.setAttribute("aria-expanded",String(open));btn.querySelector("span").textContent=open?"סגור ניווט":"פתח ניווט";}
    btn.addEventListener("click",()=>setOpen(dd.hidden));
    document.addEventListener("click",e=>{if(!nav.contains(e.target))setOpen(false)});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")setOpen(false)});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",build); else build();
})();