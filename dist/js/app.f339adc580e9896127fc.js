webpackJsonp([0],{"5gEP":function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 90 90"}},[e("path",{attrs:{d:"M65.709 10.5c1.17 2.657 1.928 7.07.797 10.301 4.625 3.949 6.215 13.549 3.982 21.394 6.592.503 14.444-.242 19.512 1.781-4.738-.609-11.209-1.804-17.32-1.388-1.158.079-2.873-.044-2.789 1.585 7.074.555 14.104 1.16 19.912 2.973-5.761-.941-12.754-2.375-19.912-2.574-2.957 5.835-8.908 8.703-17.123 9.307.883 1.922 2.574 2.653 2.987 5.744.616 4.618-.964 11.381.595 14.459.748 1.475 1.967 1.514 2.789 2.775-2.012 2.381-7-.268-7.568-2.775-.973-4.295 1.482-10.953-1.192-13.865.188 4.685-1.108 11.264.199 15.449.515 1.646 2.002 2.281 1.593 3.766-9.352.949-5.443-12.104-6.972-19.81-1.411.101-.791 2.113-.796 2.972-.04 7.524 1.54 17.844-6.57 16.838-.237-1.582 1.088-2.119 1.593-3.563 1.479-4.233-.277-10.542.401-15.651-3.095 2.334.325 10.48-1.593 14.657-1.105 2.404-4.666 3.45-7.367 2.377.352-1.79 2.2-1.501 2.984-3.169 1.096-2.324.008-5.674.399-9.111-5.729 1.144-10.173-.166-12.348-3.764-.973-1.615-1.214-3.52-2.39-4.951-1.17-1.432-3.04-1.625-3.582-3.563 7.095-1.708 7.367 7.302 13.739 7.524 1.954.071 2.97-.563 4.778-.988.506-2.272 1.589-3.967 3.186-5.153-7.929-1.085-14.477-3.554-17.522-9.504-7.208.354-13.804 1.317-19.913 2.771 5.545-2.014 12.384-2.736 19.715-2.973-.432-2.596-4.219-1.882-6.57-1.782-4.37.192-9.87.735-13.343 1.387 5.034-1.795 12.098-1.571 18.918-1.585-2.086-6.54-1.363-16.929 3.186-20.798-1.289-3.249-.889-8.563.796-11.093 5.079.228 8.159 2.443 11.35 4.557 3.957-1.125 8.118-1.685 13.54-1.387 2.28.126 4.651 1.151 6.369.989 1.685-.158 3.542-2.049 5.178-2.771 2.131-.941 3.934-1.3 6.372-1.388z"}})])},toString:function(){return"C:\\Users\\lexsw\\Documents\\GitHub\\lexswed.github.io\\src\\assets\\svg\\git.svg"}}},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("/5sW"),a={links:[{to:"/",text:"Home",name:"main"},{to:"/about",text:"About",name:"about"},{to:"/showcase",text:"Showcase",name:"showcase"}],data:function(){return{pointerLeft:0,pointerWidth:0}},watch:{$route:function(t,e){t!==e&&this.setPointerStyle()}},mounted:function(){this.setPointerStyle(),window.addEventListener("resize",this.setPointerStyle)},beforeDestroy:function(){window.removeEventListener("resize",this.setPointerStyle)},methods:{setPointerStyle:function(){if(!this.$route.name)return null;var t=this.$refs[this.$route.name][0].$el,e=t.getBoundingClientRect();this.pointerLeft=t.offsetLeft,this.pointerWidth=e.width}},computed:{getPointerStyle:function(){return{transform:"translateX("+this.pointerLeft+"px) scaleX("+this.pointerWidth/10+")"}}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"nav"},[n("transition",{attrs:{name:"nav",appear:"","appear-class":"nav-appear"}},[n("ul",[t._l(this.$options.links,function(e,s){var a=e.to,r=e.text,o=e.name;return n("router-link",{key:s,ref:o,refInFor:!0,staticClass:"nav-link",style:{animationDelay:.3*s+2+"s"},attrs:{tag:"li",to:a}},[n("a",[t._v(t._s(r))])])}),t._v(" "),n("span",{ref:"pointer",staticClass:"pointer",style:t.getPointerStyle})],2)])],1)},staticRenderFns:[]};var o={data:function(){return{main:"white",about:"white",showcase:"white"}},mounted:function(){var t=window.getComputedStyle(this.$el,null);this.main=t.getPropertyValue("--main-accent"),this.about=t.getPropertyValue("--about-accent"),this.showcase=t.getPropertyValue("--showcase-accent"),this.updateColor(this.routeName)},methods:{updateColor:function(t){var e=this[t];document.querySelector("meta[name=theme-color]").setAttribute("content",e),document.documentElement.style.setProperty("--accent",e)}},computed:{routeName:function(){return this.$route.name}},watch:{$route:function(t){var e=this,n=t.name;setTimeout(function(){e.updateColor(n)},325)}},components:{Navbar:n("VU/8")(a,r,!1,function(t){n("wH0R")},null,null).exports}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("main",{style:"background-color: var(--"+this.routeName+")",attrs:{id:"app"}},[e("navbar"),this._v(" "),e("div",{staticClass:"main"},[e("transition",{attrs:{mode:"out-in",duration:1e3,name:this.routeName}},[e("router-view")],1)],1)],1)},staticRenderFns:[]};var c=n("VU/8")(o,i,!1,function(t){n("nF4V")},null,null).exports,u=n("/ocq"),l=n("OERB"),h=n.n(l),v=n("RVeb"),m=n.n(v),d=n("5gEP"),f=n.n(d),p=n("Nosb"),g=n.n(p),w={adjs:["Eager","Passionate","Clever","Keen","Smart","Resolute","Enthusiastic"],links:[{href:"https://github.com/LexSwed",svg:f.a},{href:"https://www.linkedin.com/in/lexswed/",svg:g.a},{href:"https://facebook.com/lexswed",svg:h.a},{href:"https://twitter.com/lexswed",svg:m.a}],data:function(){return{randomNumber:0}},props:["scroll","scrollHeight"],mounted:function(){this.interval=setInterval(this.setRandomNumber,2600)},computed:{adj:function(){return this.$options.adjs[this.randomNumber]},heading:function(){return"alexander swed".split("").reduce(function(t,e,n){var s=2*Math.random()+"s",a=3*Math.random()+"s";return t.push({l:e,style:{animationDelay:s,animationDuration:a}}),t},[])}},methods:{setRandomNumber:function(){this.randomNumber=Math.floor(Math.random()*this.$options.adjs.length)}},beforeDestroy:function(){clearInterval(this.interval)}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"page-main"},[n("h1",{staticClass:"heading"},t._l(t.heading,function(e,s){var a=e.l,r=e.style;return n("span",{key:s,style:r},[t._v(t._s(a))])})),t._v(" "),n("p",{staticClass:"desc"},[n("b",[t._v(t._s(t.adj))]),t._v(" software engineer")]),t._v(" "),n("div",{staticClass:"social"},t._l(t.$options.links,function(t,e){var s=t.href,a=t.svg;return n("a",{key:e,staticClass:"link",attrs:{href:s,rel:"noopener",target:"_blank"}},[n(a,{tag:"component"})],1)}))])},staticRenderFns:[]};var y=n("VU/8")(w,_,!1,function(t){n("VkV3")},null,null).exports,b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"about"},[t._m(0),t._v(" "),n("div",{staticClass:"s-card"},[n("header",[t._v("What you can ask me for:")]),t._v(" "),n("ul",{staticClass:"skills-grid"},t._l(t.$options.skills,function(e,s){return n("li",{key:e.name,style:"transition-delay: "+.15*s+"s"},[n("div",{staticClass:"s-name"},[t._v(t._s(e.name))]),t._v(" "),n("div",{staticClass:"s-short"},[t._v(t._s(e.short))])])}))])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",[n("p",[t._v("\n                My real name is "),n("span",{staticStyle:{color:"var(--about-accent)"}},[t._v("Oleksandr Shvechykov")]),t._v(".\n                I am from "),n("span",{staticStyle:{color:"var(--about-accent)"}},[t._v("Ukraine")]),t._v(" but currently I study in "),n("span",{staticStyle:{color:"var(--about-accent)"}},[t._v("Tartu")]),t._v(".\n                I love front end a lot, but I was taught "),n("span",{staticStyle:{color:"var(--about-accent)"}},[t._v("much more")]),t._v(".\n            ")])])}]};var x=n("VU/8")({skills:[{name:"HTML / CSS",short:"Confident in layout creation and styling. Use a lot on daily basis."},{name:"Node.js",short:"Have a not long experience in creating API using Node.js."},{name:"Java",short:"I wrote some Java for some university courses."},{name:"Elixir",short:"Used with phoenix for university course. Like it."},{name:"React",short:"Good experience in rewriting project from jQuery to React. I always keep an eye on latest news."},{name:"Vue.js",short:"Main tool for creating front end applications. Used it a lot for the project that were given to me."},{name:"F#",short:"I have learnt some basics for the `Advanced programming` course. Love it the most from all FP languages I tried."},{name:"R",short:"I have used it a lot for the Data Mining course."}],data:function(){return{active:0}}},b,!1,function(t){n("e/dm")},null,null).exports,k={render:function(){var t=this.$createElement;return(this._self._c||t)("section",{staticClass:"showcase"})},staticRenderFns:[]};var C=n("VU/8")({},k,!1,function(t){n("qDXt")},null,null).exports;s.a.use(u.a);var S=new u.a({routes:[{name:"main",path:"/",component:y},{name:"about",path:"/about",component:x},{name:"showcase",path:"/showcase",component:C}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:S,render:function(t){return t(c)}})},Nosb:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 455.731 455.731"}},[e("path",{attrs:{d:"M0 0v455.73h455.73V0H0zm139.94 375.963c0 5.804-4.705 10.51-10.51 10.51H84.71c-5.804 0-10.51-4.706-10.51-10.51V185.18c0-5.804 4.706-10.51 10.51-10.51h44.72c5.805 0 10.51 4.706 10.51 10.51v190.783zM106.998 145.49c-20.308.412-38.155-16.55-38.15-38.187 0-20.985 17.28-38.105 38.407-38.088 20.873.017 38.088 17.257 38.043 38.234-.05 21.963-18.278 38.52-38.3 38.04zm279.886 236.663a4.362 4.362 0 0 1-4.364 4.362l-57.152-.014a4.361 4.361 0 0 1-4.362-4.362V264.33c0-10.182-4.126-19.406-10.802-26.078-6.764-6.768-16.15-10.916-26.5-10.8-20.28.23-36.455 17.07-36.455 37.35v117.322a4.363 4.363 0 0 1-4.365 4.362l-57.01-.014a4.362 4.362 0 0 1-4.362-4.362V179.034a4.363 4.363 0 0 1 4.363-4.363h55.795a4.364 4.364 0 0 1 4.364 4.364v23.418c.005-.01.225.018.6.075a63.404 63.404 0 0 1 3.52-5.658c11.627-16.69 30.96-27.607 52.84-27.607h11.47c39.997 0 72.42 32.423 72.42 72.42v140.47z"}})])},toString:function(){return"C:\\Users\\lexsw\\Documents\\GitHub\\lexswed.github.io\\src\\assets\\svg\\linkedin.svg"}}},OERB:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 96.124 96.123"}},[e("path",{attrs:{d:"M72.089.02L59.624 0C45.62 0 36.57 9.285 36.57 23.656v10.907H24.037a1.96 1.96 0 0 0-1.96 1.961v15.803a1.96 1.96 0 0 0 1.96 1.96H36.57v39.876a1.96 1.96 0 0 0 1.96 1.96h16.352a1.96 1.96 0 0 0 1.96-1.96V54.287h14.654a1.96 1.96 0 0 0 1.96-1.96l.006-15.803a1.963 1.963 0 0 0-1.961-1.961H56.842v-9.246c0-4.444 1.059-6.7 6.848-6.7l8.397-.003a1.96 1.96 0 0 0 1.959-1.96V1.98A1.96 1.96 0 0 0 72.089.02z"}})])},toString:function(){return"C:\\Users\\lexsw\\Documents\\GitHub\\lexswed.github.io\\src\\assets\\svg\\f.svg"}}},RVeb:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 612 612"}},[e("path",{attrs:{d:"M612 116.258a250.746 250.746 0 0 1-72.088 19.772c25.93-15.527 45.777-40.155 55.184-69.41-24.322 14.378-51.17 24.82-79.775 30.48-22.906-24.438-55.49-39.66-91.63-39.66-69.333 0-125.55 56.218-125.55 125.514 0 9.828 1.11 19.427 3.25 28.606-104.325-5.24-196.834-55.223-258.75-131.174-10.822 18.51-16.98 40.078-16.98 63.1 0 43.56 22.182 81.994 55.836 104.48A125.556 125.556 0 0 1 24.63 232.21v1.568c0 60.806 43.29 111.554 100.692 123.104-10.517 2.83-21.607 4.398-33.08 4.398-8.107 0-15.947-.803-23.634-2.333 15.985 49.907 62.336 86.2 117.253 87.194-42.946 33.655-97.098 53.656-155.915 53.656-10.134 0-20.116-.612-29.944-1.72 55.568 35.68 121.537 56.484 192.44 56.484 230.947 0 357.187-191.29 357.187-357.188l-.42-16.253c24.661-17.595 46.001-39.7 62.791-64.863z"}})])},toString:function(){return"C:\\Users\\lexsw\\Documents\\GitHub\\lexswed.github.io\\src\\assets\\svg\\t.svg"}}},VkV3:function(t,e){},"e/dm":function(t,e){},nF4V:function(t,e){},qDXt:function(t,e){},wH0R:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f339adc580e9896127fc.js.map