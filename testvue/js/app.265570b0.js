(function(t){function e(e){for(var o,a,n=e[0],u=e[1],l=e[2],f=0,p=[];f<n.length;f++)a=n[f],s[a]&&p.push(s[a][0]),s[a]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);c&&c(e);while(p.length)p.shift()();return r.push.apply(r,l||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],o=!0,n=1;n<i.length;n++){var u=i[n];0!==s[u]&&(o=!1)}o&&(r.splice(e--,1),t=a(a.s=i[0]))}return t}var o={},s={app:0},r=[];function a(e){if(o[e])return o[e].exports;var i=o[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=o,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(i,o,function(e){return t[e]}.bind(null,o));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/testvue/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],u=n.push.bind(n);n.push=e,n=n.slice();for(var l=0;l<n.length;l++)e(n[l]);var c=u;r.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"020b":function(t,e,i){"use strict";var o=i("bfc9"),s=i.n(o);s.a},"0cfb":function(t,e,i){},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("f751"),i("097d");var o=i("2b0e"),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"landing"},[i("middle")],1)},r=[],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h1",[t._v("top")])},n=[],u={},l=u,c=i("2877"),f=Object(c["a"])(l,a,n,!1,null,"5233b316",null),p=f.exports,m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"section"},[t._m(0),i("div",{staticClass:"section__content"},[i("h2",{staticClass:"section__title"},[t._v("Зарегистрировав у нас домен, вы получите")]),i("div",{staticClass:"features"},[t._l(t.topRowFeatures,function(e,o,s){return i("div",{key:s,class:"feature-"+o,on:{mouseenter:function(i){return t.changeTooltip(e,s,"top")}}},[i("p",{staticClass:"feature__title"},[t._v(t._s(e.title))])])}),i("div",{staticClass:"features__tooltip"},[i("span",{ref:"tooltipCursor",staticClass:"features__tooltipCursor",style:t.pos}),i("p",{staticClass:"features__text"},[t._v(t._s(t.tooltipText))])]),t._l(t.bottomRowFeatures,function(e,o,s){return i("div",{key:s,class:"feature-"+o,on:{mouseenter:function(i){return t.changeTooltip(e,s,"bottom")}}},[i("p",{staticClass:"feature__title"},[t._v(t._s(e.title))])])})],2)]),t._m(1)])},d=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"section__header"},[i("a",{staticClass:"logo",attrs:{href:""}},[t._v("Джино'"),i("span",[t._v("Домены")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"section__footer"},[i("a",{staticClass:"btn",attrs:{href:"#"}},[t._v("Создать аккаунт")])])}],h={data:function(){return{pos:{},tooltipText:"",topRowFeatures:{dns:{title:"Поддержка DNS",tooltip:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quaerat, veniam.Animi architecto assumenda deserunt exercitationem laborum rem repellendus soluta. Ab accusamus hic illumiusto, officia quasi rerum! Ipsam, iusto!"},autorenewal:{title:"Поддержка DNS",tooltip:"consectetur adipisicing elit. Nihil quaerat, veniam.Animi architecto assumenda deserunt exercitationem laborum rem repellendus soluta. Ab accusamus hic illumiusto, officia quasi rerum! Ipsam, iusto!"},businesscard:{title:"Поддержка DNS",tooltip:"Llaborum rem repellendus soluta. Ab accusamus hic illumiusto, officia quasi rerum! Ipsam, iusto!"},certificate:{title:"Поддержка DNS",tooltip:"exercitationem laborum rem repellendus soluta. Ab accusamus hic illumiusto, officia quasi rerum! Ipsam, iusto!"}},bottomRowFeatures:{dnssec:{title:"Поддержка DNS",tooltip:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quaerat, veniam.Animi architecto assumenda deserunt exercitationem laborum rem repellendus soluta. Ab accusamus hic illumiusto, officia quasi rerum! Ipsam, iusto!"},freessl:{title:"Поддержка DNS",tooltip:"consectetur adipisicing elit. Nihil quaerat, veniam.Animi architecto assumenda deserunt exercitationem laborum rem repellendus soluta. Ab accusamus hic illumiusto, officia quasi rerum! Ipsam, iusto!"},integration:{title:"Поддержка DNS",tooltip:"Llaborum rem repellendus soluta. Ab accusamus hic illumiusto, officia quasi rerum! Ipsam, iusto!"},interface:{title:"Поддержка DNS",tooltip:"exercitationem laborum rem repellendus soluta. Ab accusamus hic illumiusto, officia quasi rerum! Ipsam, iusto!"}}}},methods:{changeTooltip:function(t,e,i){this.tooltipText=t.tooltip,this.pos=this.tooltipCursorPosition(e,i)},tooltipCursorPosition:function(t,e){var i=25*t,o=12.5,s={};return s.left="".concat(o+i,"%"),s[e]="-20px",s}},created:function(){this.changeTooltip(this.topRowFeatures.dns,0,"top")}},_=h,b=(i("020b"),Object(c["a"])(_,m,d,!1,null,null,null)),v=b.exports,g=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h1",[t._v("Bottom")])},x=[],w={},y=w,C=Object(c["a"])(y,g,x,!1,null,"1389c70c",null),S=C.exports,O={components:{Top:p,Middle:v,Bottom:S}},j=O,q=(i("cf25"),Object(c["a"])(j,s,r,!1,null,null,null)),A=q.exports,N=i("8c4f");o["a"].use(N["a"]);var T=new N["a"]({routes:[]}),D=i("2f62");o["a"].use(D["a"]);var I=new D["a"].Store({state:{},mutations:{},actions:{}});o["a"].config.productionTip=!1,new o["a"]({router:T,store:I,render:function(t){return t(A)}}).$mount("#app")},bfc9:function(t,e,i){},cf25:function(t,e,i){"use strict";var o=i("0cfb"),s=i.n(o);s.a}});
//# sourceMappingURL=app.265570b0.js.map