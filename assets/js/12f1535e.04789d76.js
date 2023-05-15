"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4781],{5318:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),c=p(n),u=o,k=c["".concat(i,".").concat(u)]||c[u]||d[u]||a;return n?r.createElement(k,s(s({ref:t},m),{},{components:n})):r.createElement(k,s({ref:t},m))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=c;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:o,s[1]=l;for(var p=2;p<a;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4625:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=n(5773),o=(n(7378),n(5318));const a={title:"Release Notes - Podman Desktop 0.12",description:"Podman Desktop 0.12 has been released!",slug:"podman-desktop-release-0.12",authors:["slemeur"],tags:["podman-desktop","release","kubernetes"],hide_table_of_contents:!1},s=void 0,l={permalink:"/blog/podman-desktop-release-0.12",source:"@site/blog/2023-02-15-release-0.12.md",title:"Release Notes - Podman Desktop 0.12",description:"Podman Desktop 0.12 has been released!",date:"2023-02-15T00:00:00.000Z",formattedDate:"February 15, 2023",tags:[{label:"podman-desktop",permalink:"/blog/tags/podman-desktop"},{label:"release",permalink:"/blog/tags/release"},{label:"kubernetes",permalink:"/blog/tags/kubernetes"}],readingTime:4.505,hasTruncateMarker:!0,authors:[{name:"Stevan Le Meur",title:"Product Manager",url:"https://github.com/slemeur",imageURL:"https://github.com/slemeur.png",key:"slemeur"}],frontMatter:{title:"Release Notes - Podman Desktop 0.12",description:"Podman Desktop 0.12 has been released!",slug:"podman-desktop-release-0.12",authors:["slemeur"],tags:["podman-desktop","release","kubernetes"],hide_table_of_contents:!1},prevItem:{title:"5 things to know about Podman Desktop for a Docker user",permalink:"/blog/5-things-to-know-for-a-docker-user"},nextItem:{title:"Release Notes - Podman Desktop 0.11",permalink:"/blog/podman-desktop-release-0.11"}},i={authorsImageUrls:[void 0]},p=[],m={toc:p};function d(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,r.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This release note covers Podman Desktop 0.12 release changes."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Podman Version"),": Podman 4.4.1 now included in Windows and Mac installers."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Containers Configuration"),": Configure port mappings for an image without exported ports."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Windows Home Support"),": Podman Desktop now supports Windows Home Edition."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Start minimized"),": Option to start Podman Desktop minimized to system tray."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"UX and UI Improvements"),": Consistent actions, placeholder for logs, unified icons and others.")),(0,o.kt)("p",null,"Podman Desktop 0.12 is now available. ",(0,o.kt)("a",{parentName:"p",href:"/downloads"},"Click here to download it"),"!"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"podman-desktop-0-12-hero",src:n(4132).Z,width:"1015",height:"580"})))}d.isMDXComponent=!0},4132:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/podman-desktop-release-0.12-d5d46c8986e6e893b9ad30aac05c09f7.png"}}]);