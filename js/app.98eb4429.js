(function(t){function e(e){for(var i,o,r=e[0],l=e[1],c=e[2],h=0,p=[];h<r.length;h++)o=r[h],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(i=!1)}i&&(s.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},a={app:0},s=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var u=l;s.push(["8c94","chunk-vendors"]),n()})({"013a":function(t,e,n){"use strict";n("5448")},5448:function(t,e,n){},"8c94":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),a=(n("38cf"),{id:"app"}),s=Object(i["f"])("h1",null,"nice-waves",-1),o=Object(i["f"])("h3",null,[Object(i["f"])("a",{class:"docsLink",href:"#"},"Docs")],-1),r=Object(i["f"])("div",{id:"waves"},null,-1),l={class:"setup"},c={class:"setup-content"},u={class:"setup-block main"},h=Object(i["f"])("h3",null,"fills",-1),p=["onClick"],f={key:0},v=["min","max","step","onUpdate:modelValue","name"],d={key:1},b={class:"setup-block main"},m=Object(i["g"])(" Re-mount "),O=[m],g=Object(i["g"])(" Reset "),y=[g],w={class:"lang-js"};function j(t,e,n,m,g,j){var S=Object(i["n"])("color-input"),x=Object(i["o"])("tooltip");return Object(i["l"])(),Object(i["e"])("div",a,[s,o,r,Object(i["f"])("div",l,[(Object(i["l"])(!0),Object(i["e"])(i["a"],null,Object(i["m"])(j.opts.fills,(function(t,e){return Object(i["l"])(),Object(i["e"])("div",{class:"fill-blender",style:Object(i["k"])({background:t}),key:"fill_blender_"+e},null,4)})),128)),Object(i["f"])("div",c,[Object(i["f"])("div",u,[h,(Object(i["l"])(!0),Object(i["e"])(i["a"],null,Object(i["m"])(g.fills,(function(t,e){return Object(i["l"])(),Object(i["e"])("div",{class:"color-input-wrapper",key:"fill_"+t.id},[Object(i["h"])(S,{modelValue:t.color,"onUpdate:modelValue":function(e){return t.color=e},onChange:j.fillChangeHandler},null,8,["modelValue","onUpdate:modelValue","onChange"]),1!=g.fills.length?(Object(i["l"])(),Object(i["e"])("button",{key:0,class:"remove-fill",onClick:function(t){return j.removeFill(e)}}," ✕ ",8,p)):Object(i["d"])("",!0)])})),128)),Object(i["f"])("button",{class:"add-fill",onClick:e[0]||(e[0]=function(){return j.addFill&&j.addFill.apply(j,arguments)})},"⊕")]),Object(i["f"])("div",{class:"setup-grid",style:Object(i["k"])({gridTemplateColumns:"1fr ".repeat(t.propsLayout.cols)})},[(Object(i["l"])(!0),Object(i["e"])(i["a"],null,Object(i["m"])(t.propsLayout.items,(function(t){return Object(i["l"])(),Object(i["e"])("div",{class:"setup-block",key:"setup_"+t},[t?(Object(i["l"])(),Object(i["e"])("div",f,[Object(i["f"])("h3",null,Object(i["p"])(t),1),Object(i["t"])(Object(i["f"])("input",{type:"range",min:g.wavesOpts[t].range[0],max:g.wavesOpts[t].range[1],step:g.wavesOpts[t].range[1]>5?1:.01,"onUpdate:modelValue":function(e){return g.wavesOpts[t]["value"]=e},name:t,onChange:e[1]||(e[1]=function(){return j.parameterChangeHandler&&j.parameterChangeHandler.apply(j,arguments)})},null,40,v),[[i["q"],g.wavesOpts[t]["value"],void 0,{number:!0}]]),Object(i["f"])("p",null,Object(i["p"])(g.wavesOpts[t].value),1)])):(Object(i["l"])(),Object(i["e"])("div",d))])})),128))],4),Object(i["f"])("div",b,[Object(i["f"])("button",{class:"control-btn",onClick:e[2]||(e[2]=function(){return j.playStopHandler&&j.playStopHandler.apply(j,arguments)})},Object(i["p"])(j.playStopText),1),Object(i["f"])("button",{class:"control-btn",onClick:e[3]||(e[3]=function(){return j.showOptsHandler&&j.showOptsHandler.apply(j,arguments)})}," Show opts "),Object(i["t"])(Object(i["f"])("button",{class:"control-btn",onClick:e[4]||(e[4]=function(){return j.mountWaves()})},O,512),[[x,"Generate new instance with same options"]]),Object(i["t"])(Object(i["f"])("button",{class:"control-btn",onClick:e[5]||(e[5]=function(){return j.resetOpts&&j.resetOpts.apply(j,arguments)})},y,512),[[x,"Reset all opts to default settings"]])])])]),Object(i["t"])(Object(i["f"])("div",{class:"popup-opts",onPointerdown:e[7]||(e[7]=function(){return j.showOptsHandler&&j.showOptsHandler.apply(j,arguments)})},[Object(i["f"])("div",{class:"code",onPointerdown:e[6]||(e[6]=Object(i["v"])((function(){}),["stop"]))},[Object(i["f"])("pre",null,[Object(i["f"])("code",w,Object(i["p"])(j.optsString),1)])],32)],544),[[i["r"],g.showOpts]])])}var S=n("3835"),x=(n("c1f9"),n("d81d"),n("b64b"),n("159b"),n("ac1f"),n("5319"),n("99af"),n("caad"),n("b0c0"),n("cb29"),n("a434"),n("0481"),n("2909")),k=n("53ca");n("4fad"),n("fb6a");function R(t,e){return Math.floor(t+Math.random()*(e-t+1))}function E(t,e,n,i){var a=(i-n)*e;return t-=.5*a,t<n?t=n:t+a>i&&(t=i-a),t+Math.random()*a}function C(t,e,n){return Math.min(e,Math.max(n,t))}function H(t,e){for(var n=document.createElementNS("http://www.w3.org/2000/svg",t),i=0,a=Object.entries(e);i<a.length;i++){var s=Object(S["a"])(a[i],2),o=s[0],r=s[1];n.setAttributeNS(null,o,r)}return n}var P={fills:{value:["rgba(0, 0, 0, 0.65)","rgba(0, 0, 0, 0.6)","rgba(0, 0, 0, 0.5)"]},flowRate:{value:.6,range:[0,5]},swayRate:{value:.6,range:[0,1]},wavelength:{value:14,range:[1,20]},complexity:{value:6,range:[1,10]},curviness:{value:.8,range:[0,1]},offset:{value:0,range:[0,1]},randomFlowRate:{value:0,range:[0,1]},randomComplexity:{value:0,range:[0,1]},randomHeight:{value:.4,range:[0,1]},swayVelocity:{value:.5,range:[0,1]},randomSwayRate:{value:.4,range:[0,1]},randomOffset:{value:0,range:[0,1]}},N=n("d4ec"),M=n("bee2");n("a9e3"),n("a15b"),n("b680");function A(t,e,n){var i=[];return t.forEach((function(t){t=JSON.parse(JSON.stringify(t)),t.points&&t.points.forEach((function(t){void 0!==t[e]&&(t[e]+=n)})),i.push(t)})),i}function V(t,e){var n=[],i=48;return t.forEach((function(a,s){a=JSON.parse(JSON.stringify(a));var o=a.points[a.points.length-1].y;o=s!=t.length-1?o<25?E(o,e,2,25):E(o,e,25,48):48,a.points.forEach((function(t,e){return t.y=0==e?i:o})),i=o,n.push(a)})),n}function F(t){return t.map((function(t){return t.cmd+" "+(t.points?t.points.map((function(t){return(void 0===t.x?"":Number(t.x.toFixed(1)))+" "+(void 0===t.y?"":Number(t.y.toFixed(1)))})).join(" "):"")})).join(" ")}var J=function(){function t(e){for(var n in Object(N["a"])(this,t),e)this[n]=e[n];this.complexity=Math.round(e.complexity),this.period=100*this.wavelength,this.path=_.call(this),this.pathDoubleString=this.path.clone().double().string;var i=this.period/this.complexity,a=this.offset*this.id*i;a=E(a,this.randomOffset,0,2*i),this.svgEl=H("svg",{width:2*this.period,x:-a}),this.pathEl=H("path",{d:this.pathDoubleString,fill:this.fill,"shape-rendering":"geometricPrecision"}),this.svgEl.append(this.pathEl);var s=20.3-20*this.swayRate;this.swayRate&&(this.animateEl=H("animate",{attributeName:"d",values:this.pathDoubleString+";"+this.path.clone().morph(this.swayVelocity).double().string+";"+this.pathDoubleString,dur:s+"s",repeatCount:"indefinite",calcMode:"spline",keyTimes:"0; 0.5; 1",keySplines:"0.4 0 0.6 1;".repeat(2)}),this.pathEl.append(this.animateEl))}return Object(M["a"])(t,[{key:"x",get:function(){return Number(this.svgEl.getAttribute("x"))},set:function(t){this.svgEl.setAttribute("x",t)}},{key:"animationStep",value:function(){var t=this.x-this.flowRate;t<-this.period&&(t+=this.period),this.x=t}}]),t}();function _(){var t=this,e=2*this.complexity,n=this.period/e,i=Array(e).fill(n).map((function(t,e){return t*(e+1)})),a=48,s=48;return i=i.map((function(e){var i=R(0,23)*t.randomHeight;a=Math.round(e)!=Math.round(t.period)?a<25?48-i:2+i:48;var o={cmd:"C",points:[{x:e-n+n*t.curviness,y:s},{x:e-n*t.curviness,y:a},{x:e,y:a}]};return s=a,o})),new T({open:[{cmd:"M",points:[{x:0,y:48}]}],curve:i,close:[{cmd:"V",points:[{y:50}]},{cmd:"H",points:[{y:0}]},{cmd:"Z"}]})}var T=function(){function t(e){Object(N["a"])(this,t),this.open=e.open,this.curve=e.curve,this.close=e.close}return Object(M["a"])(t,[{key:"double",value:function(){return this.curve=this.curve.concat(A(this.curve,"x",this.curve[this.curve.length-1].points[2].x),this.close),this}},{key:"morph",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return this.curve=V(this.curve,t),this}},{key:"clone",value:function(){return new t(this)}},{key:"string",get:function(){return F(this.open.concat(this.curve,this.close))}}]),t}();function q(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!(this instanceof q))return new q(e);for(var n=0,i=Object.entries(P);n<i.length;n++){var a=Object(S["a"])(i[n],2),s=a[0],o=a[1],r=e[s],l=o.value;void 0==r||Object(k["a"])(r)!=Object(k["a"])(l)?this[s]=l:o.range?this[s]=C.apply(void 0,Object(x["a"])(o.range).concat([r])):this[s]=r}this.randomFlowRate*=1/P.flowRate.range[1],this.randomSwayRate*=1/P.swayRate.range[1],this.curviness*=.5,this.randomSwayRate*=.5,this.offset/=this.fills.length,this.waves=[];for(var c=function(e){var n={id:e+1,randomHeight:t.randomHeight,offset:t.offset,curviness:t.curviness,wavelength:t.wavelength,fill:t.fills[e],randomOffset:t.randomOffset,swayRate:t.swayRate,swayVelocity:t.swayVelocity};Array("complexity","flowRate","swayRate").forEach((function(e){n[e]=t[e]>0?E(t[e],t["random"+e.charAt(0).toUpperCase()+e.slice(1)],P[e].range[0],P[e].range[1]):0}));var i=new J(n);t.waves.push(i)},u=0;u<this.fills.length;u++)c(u);this.animation={isPlaying:!1}}q.prototype={mount:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#waves";if("string"==typeof t&&(t=document.querySelector(t)),!t||1!==t.ELEMENT_NODE)return console.error("waves: can't mount"),!1;var e=H("svg",{viewBox:"0 0 100 50",width:"100%",height:"100%",preserveAspectRatio:"none"});return t.innerHTML="",this.waves.forEach((function(t){return e.append(t.svgEl)})),t.append(e),this.play(),this.mounted=e,this},play:function(){return!this.animation.isPlaying&&(this.flowRate||this.swayRate&&this.swayVelocity)?(this.flowRate&&(this.animation.request=window.requestAnimationFrame(this.animationStep.bind(this))),this.swayRate&&this.waves.forEach((function(t){return t.svgEl.unpauseAnimations()})),this.animation.isPlaying=!0,this):this},stop:function(){return this.animation.isPlaying?(window.cancelAnimationFrame(this.animation.request),this.animation.isPlaying=!1,this.waves.forEach((function(t){return t.svgEl.pauseAnimations()})),this):this},animationStep:function(){this.waves.forEach((function(t){return t.animationStep()})),this.animation.request=window.requestAnimationFrame(this.animationStep.bind(this))}};var D=q,L=n("9ed2"),W=n("8c7a"),U=n.n(W);n("cb55"),n("416b"),n("a878");U.a.manual=!0;var B={name:"ServeDev",components:{ColorInput:L["a"]},data:function(){return{waves:{animation:{isPlaying:null}},fills:[],showOpts:!1,wavesOpts:{fills:[],flowRate:0,swayRate:0,swayVelocity:0}}},computed:{playStopText:function(){return this.waves.animation.isPlaying?"Stop":"Play"},opts:function(){var t=this,e=Object.fromEntries(Object.keys(this.wavesOpts).map((function(e){return[e,t.wavesOpts[e].value]})));return e},optsString:function(){var t=JSON.parse(JSON.stringify(this.opts));return Object.keys(t).forEach((function(e){JSON.stringify(t[e])==JSON.stringify(P[e].value)&&delete t[e]})),t=JSON.stringify(t,null,2).replace(/"(\S*)":/gm,"$1:"),"const opts = ".concat(t,"\n\nwaves(opts).mount()").concat(this.waves.animation.isPlaying?"":".stop()")}},methods:{fillChangeHandler:function(){this.wavesOpts.fills={value:this.fills.map((function(t){return t.color}))},this.mountWaves()},parameterChangeHandler:function(t){var e=!1;["flowRate","swayRate"].includes(t.target.name)&&t.target.value>0&&(e=!0),this.mountWaves(e)},mountWaves:function(t){var e=!this.waves.mounted||this.waves.animation.isPlaying;this.waves=D(this.opts).mount(),e||t||this.waves.stop()},playStopHandler:function(){this.waves.animation.isPlaying?this.waves.stop():this.waves.play()},addFill:function(){var t=Array(3).fill(null).map((function(){return R(0,190)})),e=Object(S["a"])(t,3),n=e[0],i=e[1],a=e[2];this.fills.push({id:this.fills.length+1,color:"rgba("+n+", "+i+", "+a+", 0.5)"}),this.fillChangeHandler()},removeFill:function(t){this.fills.splice(t,1),this.fillChangeHandler()},showOptsHandler:function(){this.showOpts=!this.showOpts,U.a.highlightAll()},resetOpts:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.wavesOpts=JSON.parse(JSON.stringify(P)),this.fills=this.wavesOpts.fills.value.map((function(t,e){return{id:e+1,color:t}})),t&&this.mountWaves()}},created:function(){this.resetOpts(!1);var t=[["flowRate","swayRate","wavelength","randomHeight","offset"],["randomFlowRate","swayVelocity","complexity","curviness","randomOffset"],["","randomSwayRate"]],e=t.reduce((function(t,e){return e.length>t?e.length:t}),0),n=t.flat();this.propsLayout={cols:e,items:n}},mounted:function(){this.mountWaves()}},G=(n("013a"),n("6b0d")),I=n.n(G);const Z=I()(B,[["render",j]]);var $=Z,z=n("af2c"),K=Object(i["c"])($);K.use(z["a"]),K.mount("#app"),document.title="nice-waves"}});
//# sourceMappingURL=app.98eb4429.js.map