import{B as K,R,aP as D,g as E,A as z,ai as Q,aj as I,o as f,c as m,a as r,ar as P,ag as W,m as k,ah as O,am as w,k as B,D as V,ad as Y,F as T,an as N,ae as j,as as J,w as u,aO as X,aE as Z,aF as L,aK as tt,b as i,u as d,h as et,ak as nt,aM as ot,at as lt,aQ as at,r as rt,al as it,aN as dt}from"./app-vpINQVyW.js";import{s as st}from"./index-C3GP5Xyb.js";import{s as ut}from"./index-CzQfSQ9u.js";import{s as pt,a as gt,b as bt}from"./index-Csu-V7Hq.js";/* empty css            */import"./index-2CEaIhhT.js";var ct=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`,ft={root:function(e){var o=e.instance,s=e.props;return["p-togglebutton p-component",{"p-togglebutton-checked":o.active,"p-invalid":o.$invalid,"p-togglebutton-fluid":s.fluid,"p-togglebutton-sm p-inputfield-sm":s.size==="small","p-togglebutton-lg p-inputfield-lg":s.size==="large"}]},content:"p-togglebutton-content",icon:"p-togglebutton-icon",label:"p-togglebutton-label"},mt=K.extend({name:"togglebutton",style:ct,classes:ft}),yt={name:"BaseToggleButton",extends:D,props:{onIcon:String,offIcon:String,onLabel:{type:String,default:"Yes"},offLabel:{type:String,default:"No"},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:mt,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}};function S(t){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(t)}function vt(t,e,o){return(e=ht(e))in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function ht(t){var e=kt(t,"string");return S(e)=="symbol"?e:e+""}function kt(t,e){if(S(t)!="object"||!t)return t;var o=t[Symbol.toPrimitive];if(o!==void 0){var s=o.call(t,e);if(S(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var U={name:"ToggleButton",extends:yt,inheritAttrs:!1,emits:["change"],methods:{getPTOptions:function(e){var o=e==="root"?this.ptmi:this.ptm;return o(e,{context:{active:this.active,disabled:this.disabled}})},onChange:function(e){!this.disabled&&!this.readonly&&(this.writeValue(!this.d_value,e),this.$emit("change",e))},onBlur:function(e){var o,s;(o=(s=this.formField).onBlur)===null||o===void 0||o.call(s,e)}},computed:{active:function(){return this.d_value===!0},hasLabel:function(){return z(this.onLabel)&&z(this.offLabel)},label:function(){return this.hasLabel?this.d_value?this.onLabel:this.offLabel:" "},dataP:function(){return E(vt({checked:this.active,invalid:this.$invalid},this.size,this.size))}},directives:{ripple:R}},wt=["tabindex","disabled","aria-pressed","aria-label","aria-labelledby","data-p-checked","data-p-disabled","data-p"],xt=["data-p"];function St(t,e,o,s,g,a){var l=Q("ripple");return I((f(),m("button",k({type:"button",class:t.cx("root"),tabindex:t.tabindex,disabled:t.disabled,"aria-pressed":t.d_value,onClick:e[0]||(e[0]=function(){return a.onChange&&a.onChange.apply(a,arguments)}),onBlur:e[1]||(e[1]=function(){return a.onBlur&&a.onBlur.apply(a,arguments)})},a.getPTOptions("root"),{"aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,"data-p-checked":a.active,"data-p-disabled":t.disabled,"data-p":a.dataP}),[r("span",k({class:t.cx("content")},a.getPTOptions("content"),{"data-p":a.dataP}),[P(t.$slots,"default",{},function(){return[P(t.$slots,"icon",{value:t.d_value,class:W(t.cx("icon"))},function(){return[t.onIcon||t.offIcon?(f(),m("span",k({key:0,class:[t.cx("icon"),t.d_value?t.onIcon:t.offIcon]},a.getPTOptions("icon")),null,16)):O("",!0)]}),r("span",k({class:t.cx("label")},a.getPTOptions("label")),w(a.label),17)]})],16,xt)],16,wt)),[[l]])}U.render=St;var Vt=`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`,Ot={root:function(e){var o=e.props,s=e.instance;return["p-selectbutton p-component",{"p-invalid":s.$invalid,"p-selectbutton-fluid":o.fluid}]}},_t=K.extend({name:"selectbutton",style:Vt,classes:Ot}),Bt={name:"BaseSelectButton",extends:D,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:_t,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function Lt(t,e){var o=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=F(t))||e){o&&(t=o);var s=0,g=function(){};return{s:g,n:function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}},e:function(n){throw n},f:g}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,l=!0,p=!1;return{s:function(){o=o.call(t)},n:function(){var n=o.next();return l=n.done,n},e:function(n){p=!0,a=n},f:function(){try{l||o.return==null||o.return()}finally{if(p)throw a}}}}function It(t){return $t(t)||Tt(t)||F(t)||Pt()}function Pt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function F(t,e){if(t){if(typeof t=="string")return $(t,e);var o={}.toString.call(t).slice(8,-1);return o==="Object"&&t.constructor&&(o=t.constructor.name),o==="Map"||o==="Set"?Array.from(t):o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?$(t,e):void 0}}function Tt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function $t(t){if(Array.isArray(t))return $(t)}function $(t,e){(e==null||e>t.length)&&(e=t.length);for(var o=0,s=Array(e);o<e;o++)s[o]=t[o];return s}var q={name:"SelectButton",extends:Bt,inheritAttrs:!1,emits:["change"],methods:{getOptionLabel:function(e){return this.optionLabel?V(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?V(e,this.optionValue):e},getOptionRenderKey:function(e){return this.dataKey?V(e,this.dataKey):this.getOptionLabel(e)},isOptionDisabled:function(e){return this.optionDisabled?V(e,this.optionDisabled):!1},isOptionReadonly:function(e){if(this.allowEmpty)return!1;var o=this.isSelected(e);return this.multiple?o&&this.d_value.length===1:o},onOptionSelect:function(e,o,s){var g=this;if(!(this.disabled||this.isOptionDisabled(o)||this.isOptionReadonly(o))){var a=this.isSelected(o),l=this.getOptionValue(o),p;if(this.multiple)if(a){if(p=this.d_value.filter(function(c){return!B(c,l,g.equalityKey)}),!this.allowEmpty&&p.length===0)return}else p=this.d_value?[].concat(It(this.d_value),[l]):[l];else{if(a&&!this.allowEmpty)return;p=a?null:l}this.writeValue(p,e),this.$emit("change",{event:e,value:p})}},isSelected:function(e){var o=!1,s=this.getOptionValue(e);if(this.multiple){if(this.d_value){var g=Lt(this.d_value),a;try{for(g.s();!(a=g.n()).done;){var l=a.value;if(B(l,s,this.equalityKey)){o=!0;break}}}catch(p){g.e(p)}finally{g.f()}}}else o=B(this.d_value,s,this.equalityKey);return o}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return E({invalid:this.$invalid})}},directives:{ripple:R},components:{ToggleButton:U}},At=["aria-labelledby","data-p"];function Ct(t,e,o,s,g,a){var l=Y("ToggleButton");return f(),m("div",k({class:t.cx("root"),role:"group","aria-labelledby":t.ariaLabelledby},t.ptmi("root"),{"data-p":a.dataP}),[(f(!0),m(T,null,N(t.options,function(p,c){return f(),j(l,{key:a.getOptionRenderKey(p),modelValue:a.isSelected(p),onLabel:a.getOptionLabel(p),offLabel:a.getOptionLabel(p),disabled:t.disabled||a.isOptionDisabled(p),unstyled:t.unstyled,size:t.size,readonly:a.isOptionReadonly(p),onChange:function(_){return a.onOptionSelect(_,p,c)},pt:t.ptm("pcToggleButton")},J({_:2},[t.$slots.option?{name:"default",fn:u(function(){return[P(t.$slots,"option",{option:p,index:c},function(){return[r("span",k({ref_for:!0},t.ptm("pcToggleButton").label),w(a.getOptionLabel(p)),17)]})]}),key:"0"}:void 0]),1032,["modelValue","onLabel","offLabel","disabled","unstyled","size","readonly","onChange","pt"])}),128))],16,At)}q.render=Ct;const zt={class:"w-full max-w-md mx-auto my-6"},Kt={class:"bg-white rounded-xl shadow-lg transition-shadow duration-500 ease-in-out border transiton-all border-gray-200 p-8"},Rt={class:"flex justify-center my-4"},Dt={key:0,class:"mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex"},Et={class:"text-red-600 dark:text-red-200 text-sm"},Nt={for:"name"},jt={for:"id-number"},Ut={key:1,class:"flex items-center gap-2"},Ft={class:"flex justify-center gap-x-2 text-sm dark:secondary-dark-mode-text"},qt={class:"flex items-center w-fit gap-x-2 text-nowrap"},Mt={__name:"Register",props:["errors"],setup(t){const o=Z().props.recaptcha_site_key,s=L([{key:"individual",value:"Individual"},{key:"legal_entity",value:"Legal Entity"}]),g=L({key:"individual",value:"Individual"}),a=L("GE"),l=tt({user_type:null,is_handyman:!1,name:null,lastname:null,phone_country:a.value,phone:null,tax_id:null,email:null,password:null,password_confirmation:null,captcha_token:null});async function p(){l.captcha_token=await grecaptcha.enterprise.execute(o,{action:"signup"}),g.value?.key!=="individual"&&delete l.lastname,l.transform(c=>({...c,user_type:g.value?g.value?.key:null})).post(route("register"),{preserveState:!0})}return(c,n)=>{const _=q,y=pt,x=lt,v=ot,h=gt,A=ut,M=st,G=rt,C=at;return f(),m(T,null,[i(d(et),null,{default:u(()=>[...n[9]||(n[9]=[r("title",null,"Register",-1)])]),_:1}),r("div",zt,[r("div",Kt,[n[28]||(n[28]=r("h1",{class:"text-2xl font-bold text-gray-800 dark:primary-dark-mode-text text-center"},"Register",-1)),r("div",Rt,[i(_,{modelValue:g.value,"onUpdate:modelValue":n[0]||(n[0]=b=>g.value=b),optionLabel:"key","allow-empty":!1,options:s.value},{option:u(b=>[r("p",null,w(b.option.value),1)]),_:1},8,["modelValue","options"])]),Object.keys(t.errors).length>0?(f(),m("div",Dt,[n[10]||(n[10]=r("i",{class:"pi pi-exclamation-circle text-red-400 mr-3 mt-0.5"},null,-1)),r("div",Et,[(f(!0),m(T,null,N(t.errors,(b,H)=>(f(),m("p",{key:H},w(b),1))),128))])])):O("",!0),r("form",{onSubmit:nt(p,["prevent"]),class:"flex flex-col gap-6"},[i(h,null,{default:u(()=>[i(y,null,{default:u(()=>[...n[11]||(n[11]=[r("i",{class:"pi pi-user text-gray-400"},null,-1)])]),_:1}),i(v,{variant:"on"},{default:u(()=>[i(x,{id:"name",modelValue:d(l).name,"onUpdate:modelValue":n[1]||(n[1]=b=>d(l).name=b),"pt:root:class":"rounded-l-none border-slate-300",invalid:!!d(l).errors.name},null,8,["modelValue","invalid"]),r("label",Nt,w(g.value?.key==="individual"?"Name":"Company Name"),1)]),_:1})]),_:1}),g.value?.key==="individual"?(f(),j(h,{key:0},{default:u(()=>[i(y,null,{default:u(()=>[...n[12]||(n[12]=[r("i",{class:"pi pi-users text-gray-400"},null,-1)])]),_:1}),i(v,{variant:"on"},{default:u(()=>[i(x,{id:"lastname",modelValue:d(l).lastname,"onUpdate:modelValue":n[2]||(n[2]=b=>d(l).lastname=b),"pt:root:class":"rounded-l-none border-slate-300",invalid:!!d(l).errors.lastname},null,8,["modelValue","invalid"]),n[13]||(n[13]=r("label",{for:"lastname"}," Lastname ",-1))]),_:1})]),_:1})):O("",!0),i(h,null,{default:u(()=>[i(y,null,{default:u(()=>[...n[14]||(n[14]=[r("i",{class:"pi pi-mobile text-gray-400"},null,-1)])]),_:1}),i(v,{variant:"on"},{default:u(()=>[I(i(x,{id:"phone",modelValue:d(l).phone,"onUpdate:modelValue":n[3]||(n[3]=b=>d(l).phone=b),"pt:root:class":"rounded-l-none border-slate-300",invalid:!!d(l).errors.phone},null,8,["modelValue","invalid"]),[[C,{pattern:/[\d+]+$/,validateOnly:!0}]]),n[15]||(n[15]=r("label",{for:"phone"}," Phone Number ",-1))]),_:1})]),_:1}),i(h,null,{default:u(()=>[i(y,null,{default:u(()=>[...n[16]||(n[16]=[r("i",{class:"pi pi-id-card text-gray-400"},null,-1)])]),_:1}),i(v,{variant:"on"},{default:u(()=>[I(i(x,{id:"id-number",modelValue:d(l).tax_id,"onUpdate:modelValue":n[4]||(n[4]=b=>d(l).tax_id=b),maxlength:11,"pt:root:class":"rounded-l-none border-slate-300",invalid:!!d(l).errors.tax_id},null,8,["modelValue","invalid"]),[[C,{pattern:/[\d+]+$/,validateOnly:!0}]]),r("label",jt,w(g.value?.key==="individual"?"ID Number":"Tax ID"),1)]),_:1})]),_:1}),i(h,null,{default:u(()=>[i(y,null,{default:u(()=>[...n[17]||(n[17]=[r("i",{class:"pi pi-envelope text-gray-400"},null,-1)])]),_:1}),i(v,{variant:"on"},{default:u(()=>[i(x,{id:"email",modelValue:d(l).email,"onUpdate:modelValue":n[5]||(n[5]=b=>d(l).email=b),"pt:root:class":"rounded-l-none border-slate-300",invalid:!!d(l).errors.email},null,8,["modelValue","invalid"]),n[18]||(n[18]=r("label",{for:"email"},"Email",-1))]),_:1})]),_:1}),i(h,null,{default:u(()=>[i(y,null,{default:u(()=>[...n[19]||(n[19]=[r("i",{class:"pi pi-lock text-gray-400 dark:text-slate-400"},null,-1)])]),_:1}),i(v,{variant:"on"},{default:u(()=>[i(A,{modelValue:d(l).password,"onUpdate:modelValue":n[6]||(n[6]=b=>d(l).password=b),inputId:"password",toggleMask:"",feedback:!1,class:"w-full",invalid:!!d(l).errors.password,inputClass:"w-full border-left-none border border-gray-300 rounded-r-lg text-gray-800 focus:shadow-none"},null,8,["modelValue","invalid"]),n[20]||(n[20]=r("label",{for:"password"}," Password ",-1))]),_:1})]),_:1}),i(h,null,{default:u(()=>[i(y,null,{default:u(()=>[...n[21]||(n[21]=[r("i",{class:"pi pi-lock text-gray-400 dark:text-slate-400"},null,-1)])]),_:1}),i(v,{variant:"on"},{default:u(()=>[i(A,{modelValue:d(l).password_confirmation,"onUpdate:modelValue":n[7]||(n[7]=b=>d(l).password_confirmation=b),inputId:"password_confirm",toggleMask:"",feedback:!1,class:"w-full",invalid:!!d(l).errors.password_confirmation,inputClass:"w-full border-left-none border border-gray-300 rounded-r-lg text-gray-800 focus:shadow-none"},null,8,["modelValue","invalid"]),n[22]||(n[22]=r("label",{for:"password_confirm"}," Repeat Password ",-1))]),_:1})]),_:1}),g.value?.key==="individual"?(f(),m("div",Ut,[i(M,{modelValue:d(l).is_handyman,"onUpdate:modelValue":n[8]||(n[8]=b=>d(l).is_handyman=b),binary:""},null,8,["modelValue"]),n[23]||(n[23]=r("label",{for:"ingredient1"}," I am a handyman ",-1))])):O("",!0),r("div",null,[i(G,{type:"submit",icon:"pi pi-user-plus",label:"Submit",class:"w-full bg-blue-500 hover:bg-blue-500/90 border-none text-white rounded-lg py-2.5"})]),i(d(bt),{"pt:root:class":"m-0"}),r("div",null,[r("div",Ft,[n[26]||(n[26]=r("p",{class:"w-fit"},"Already have an account?",-1)),r("div",qt,[n[25]||(n[25]=r("i",{class:"pi pi-user text-brand-500"},null,-1)),i(d(dt),{href:c.route("login"),class:"flex items-center text-brand-500 text-sm no-underline"},{default:u(()=>[...n[24]||(n[24]=[it(" Sing in ",-1)])]),_:1},8,["href"])])]),n[27]||(n[27]=r("div",null,null,-1))])],32)])])],64)}}},Xt=X(Mt,[["__scopeId","data-v-b7b7a8f8"]]);export{Xt as default};
