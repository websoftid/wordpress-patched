var wpp_params=null,WordPressPopularPosts=function(){var m=function(){},h=!!HTMLElement.prototype.attachShadow,f=function(b,c,a,g,k){var e=new XMLHttpRequest,d={"X-Requested-With":"XMLHttpRequest"};b=-1!=["GET","POST"].indexOf(b)?b:"GET";"POST"==b&&(d["Content-Type"]="application/x-www-form-urlencoded");"object"==typeof k&&Object.keys(k).length&&(d=Object.assign({},d,k));e.open(b,c+("GET"==b?"?"+a:""),!0);for(var l in d)d.hasOwnProperty(l)&&e.setRequestHeader(l,d[l]);e.onreadystatechange=function(){4===
    e.readyState&&200<=e.status&&300>e.status&&"function"===typeof g&&g.call(void 0,e.response)};e.send("POST"==b?a:null)};return{get:function(b,c,a,g){a="function"===typeof a?a:m;f("GET",b,c,a,g)},post:function(b,c,a,g){a="function"===typeof a?a:m;f("POST",b,c,a,g)},ajax:f,theme:function(b){if(h){var c=document.createElement("style"),a=document.createElement("ul");a.innerHTML='<li><a href="#"></a></li>';b.parentNode.appendChild(a);var g=getComputedStyle(a.querySelector("li")),k=getComputedStyle(a.querySelector("li a"));
    c.innerHTML=".wpp-list li {font-size: "+g.fontSize+"}";c.innerHTML+=".wpp-list li a {color: "+k.color+"}";b.parentNode.removeChild(a);a=b.attachShadow({mode:"open"});for(a.append(c);b.firstElementChild;)a.append(b.firstElementChild)}}}}();
    (function(){try{var m=document.querySelector("script#wpp-json"),h=!0;wpp_params=JSON.parse(m.textContent);wpp_params.ID&&("1"==wpp_params.sampling_active&&(h=1===Math.floor(Math.random()*wpp_params.sampling_rate)+1),h&&WordPressPopularPosts.post(wpp_params.ajax_url,"_wpnonce="+wpp_params.token+"&wpp_id="+wpp_params.ID+"&sampling="+wpp_params.sampling_active+"&sampling_rate="+wpp_params.sampling_rate,function(f){wpp_params.debug&&window.console&&window.console.log&&window.console.log(JSON.parse(f))}))}catch(f){console.error("WPP: Couldn't read JSON data")}})();
    document.addEventListener("DOMContentLoaded",function(){function m(b){var c=b.getAttribute("data-widget-id"),a="GET",g="",k={},e="";if(c)g=wpp_params.ajax_url+"/widget/"+c.split("-")[1],e="is_single="+wpp_params.ID+(wpp_params.lang?"&lang="+wpp_params.lang:""),k={"X-WP-Nonce":wpp_params.token};else if(a="POST",g=wpp_params.api_url+"/v2/widget?is_single="+wpp_params.ID+(wpp_params.lang?"&lang="+wpp_params.lang:""),k={"Content-Type":"application/json","X-WP-Nonce":wpp_params.token},c=b.parentNode.querySelector('script[type="application/json"]'))e=
    JSON.parse(c.textContent),e=JSON.stringify(e);WordPressPopularPosts.ajax(a,g,e,function(d){b.insertAdjacentHTML("afterend",JSON.parse(d).widget);d=b.parentNode;var l=d.querySelector(".popular-posts-sr"),n=d.querySelector('script[type="application/json"]');n&&d.removeChild(n);d.removeChild(b);d.classList.add("wpp-ajax");l&&WordPressPopularPosts.theme(l);l=new Event("wpp-onload",{bubbles:!0,cancelable:!1});d.dispatchEvent(l)},k)}for(var h=document.querySelectorAll(".wpp-widget-placeholder, .wpp-widget-block-placeholder"),
    f=0;f<h.length;)m(h[f]),f++;h=document.querySelectorAll(".popular-posts-sr");if(h.length)for(f=0;f<h.length;f++)WordPressPopularPosts.theme(h[f])});