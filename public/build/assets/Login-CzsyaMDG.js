import{s as V}from"./index-D26DkL6j.js";import{n as j,c as w,o as u,e as a,p as h,B as G,q as F,v as O,x as N,y as L,z as q,A as I,C as E,j as x,k as y,D as f,r as M,g as U,a as c,w as d,u as s,h as H,t as l,l as b,i as D,m as W,s as K,E as S,F as Z}from"./app-f6RwKniR.js";import{s as J}from"./index-C-b1Sasf.js";import{s as Q,a as R,b as X}from"./index-CmaZe0Ng.js";import{s as Y}from"./index-CCi38iRy.js";import{_ as ee}from"./_plugin-vue_export-helper-DlAUqK2U.js";/* empty css            */var z={name:"MinusIcon",extends:j};function te(e){return ie(e)||re(e)||oe(e)||ne()}function ne(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oe(e,t){if(e){if(typeof e=="string")return v(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}function re(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function ie(e){if(Array.isArray(e))return v(e)}function v(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function ae(e,t,n,o,i,r){return u(),w("svg",h({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),te(t[0]||(t[0]=[a("path",{d:"M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z",fill:"currentColor"},null,-1)])),16)}z.render=ae;var ce=`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`,se={root:function(t){var n=t.instance,o=t.props;return["p-checkbox p-component",{"p-checkbox-checked":n.checked,"p-disabled":o.disabled,"p-invalid":n.$pcCheckboxGroup?n.$pcCheckboxGroup.$invalid:n.$invalid,"p-variant-filled":n.$variant==="filled","p-checkbox-sm p-inputfield-sm":o.size==="small","p-checkbox-lg p-inputfield-lg":o.size==="large"}]},box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},de=G.extend({name:"checkbox",style:ce,classes:se}),le={name:"BaseCheckbox",extends:O,props:{value:null,binary:Boolean,indeterminate:{type:Boolean,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:de,provide:function(){return{$pcCheckbox:this,$parentInstance:this}}};function m(e){"@babel/helpers - typeof";return m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(e)}function ue(e,t,n){return(t=he(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function he(e){var t=pe(e,"string");return m(t)=="symbol"?t:t+""}function pe(e,t){if(m(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var o=n.call(e,t);if(m(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function be(e){return xe(e)||fe(e)||ke(e)||me()}function me(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ke(e,t){if(e){if(typeof e=="string")return _(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}function fe(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function xe(e){if(Array.isArray(e))return _(e)}function _(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var A={name:"Checkbox",extends:le,inheritAttrs:!1,emits:["change","focus","blur","update:indeterminate"],inject:{$pcCheckboxGroup:{default:void 0}},data:function(){return{d_indeterminate:this.indeterminate}},watch:{indeterminate:function(t){this.d_indeterminate=t,this.updateIndeterminate()}},mounted:function(){this.updateIndeterminate()},updated:function(){this.updateIndeterminate()},methods:{getPTOptions:function(t){var n=t==="root"?this.ptmi:this.ptm;return n(t,{context:{checked:this.checked,indeterminate:this.d_indeterminate,disabled:this.disabled}})},onChange:function(t){var n=this;if(!this.disabled&&!this.readonly){var o=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value,i;this.binary?i=this.d_indeterminate?this.trueValue:this.checked?this.falseValue:this.trueValue:this.checked||this.d_indeterminate?i=o.filter(function(r){return!q(r,n.value)}):i=o?[].concat(be(o),[this.value]):[this.value],this.d_indeterminate&&(this.d_indeterminate=!1,this.$emit("update:indeterminate",this.d_indeterminate)),this.$pcCheckboxGroup?this.$pcCheckboxGroup.writeValue(i,t):this.writeValue(i,t),this.$emit("change",t)}},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){var n,o;this.$emit("blur",t),(n=(o=this.formField).onBlur)===null||n===void 0||n.call(o,t)},updateIndeterminate:function(){this.$refs.input&&(this.$refs.input.indeterminate=this.d_indeterminate)}},computed:{groupName:function(){return this.$pcCheckboxGroup?this.$pcCheckboxGroup.groupName:this.$formName},checked:function(){var t=this.$pcCheckboxGroup?this.$pcCheckboxGroup.d_value:this.d_value;return this.d_indeterminate?!1:this.binary?t===this.trueValue:L(this.value,t)},dataP:function(){return N(ue({invalid:this.$invalid,checked:this.checked,disabled:this.disabled,filled:this.$variant==="filled"},this.size,this.size))}},components:{CheckIcon:F,MinusIcon:z}},ge=["data-p-checked","data-p-indeterminate","data-p-disabled","data-p"],ye=["id","value","name","checked","tabindex","disabled","readonly","required","aria-labelledby","aria-label","aria-invalid"],ve=["data-p"];function _e(e,t,n,o,i,r){var k=I("CheckIcon"),g=I("MinusIcon");return u(),w("div",h({class:e.cx("root")},r.getPTOptions("root"),{"data-p-checked":r.checked,"data-p-indeterminate":i.d_indeterminate||void 0,"data-p-disabled":e.disabled,"data-p":r.dataP}),[a("input",h({ref:"input",id:e.inputId,type:"checkbox",class:[e.cx("input"),e.inputClass],style:e.inputStyle,value:e.value,name:r.groupName,checked:r.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,required:e.required,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:t[0]||(t[0]=function(){return r.onFocus&&r.onFocus.apply(r,arguments)}),onBlur:t[1]||(t[1]=function(){return r.onBlur&&r.onBlur.apply(r,arguments)}),onChange:t[2]||(t[2]=function(){return r.onChange&&r.onChange.apply(r,arguments)})},r.getPTOptions("input")),null,16,ye),a("div",h({class:e.cx("box")},r.getPTOptions("box"),{"data-p":r.dataP}),[E(e.$slots,"icon",{checked:r.checked,indeterminate:i.d_indeterminate,class:f(e.cx("icon")),dataP:r.dataP},function(){return[r.checked?(u(),x(k,h({key:0,class:e.cx("icon")},r.getPTOptions("icon"),{"data-p":r.dataP}),null,16,["class","data-p"])):i.d_indeterminate?(u(),x(g,h({key:1,class:e.cx("icon")},r.getPTOptions("icon"),{"data-p":r.dataP}),null,16,["class","data-p"])):y("",!0)]})],16,ve)],16,ge)}A.render=_e;const we={class:"w-full max-w-md mx-auto mt-6"},$e={class:"bg-white dark:secondary-dark-bg rounded-xl shadow-lg transition-shadow duration-500 ease-in-out hover:dark:shadow-blue-500/30 border border-slate-300 dark:border-slate-700/50 p-8"},Ce={class:"text-2xl font-bold dark:primary-dark-mode-text mb-6 text-center"},Ie={class:"space-y-5"},Se={for:"email_or_phone"},ze={class:"flex items-center justify-between"},Ae={class:"flex items-center gap-2"},Pe={for:"remember",class:"max-sm:!text-xs"},Be={class:"mt-6"},Te={class:"text-center text-sm dark:secondary-dark-mode-text"},Ve={__name:"Login",props:["errors"],setup(e){M(!1);const t=U({login:null,password:null,remember:!1});function n(){t.post(route("login.post"),{replace:!0,preserveState:!0,onSuccess:()=>{},onError:o=>{console.log(o)}})}return(o,i)=>{const r=Y,k=Q,g=K,$=W,C=R,P=J,B=A,T=V;return u(),w(Z,null,[c(s(H),null,{default:d(()=>[...i[3]||(i[3]=[a("title",null,"Login",-1)])]),_:1}),a("div",we,[a("div",$e,[a("h1",Ce,l(o.$t("authorize.sign_in")),1),o.$page.props.errors.message?(u(),x(r,{key:0,class:"mb-8",severity:"error",icon:"pi pi-exclamation-circle",closable:!0},{default:d(()=>[b(l(o.$page.props.errors.message),1)]),_:1})):y("",!0),o.$page.props.flash.message?(u(),x(r,{key:1,class:"mb-8",severity:"success",icon:"pi pi-check-circle",closable:!0},{default:d(()=>[b(l(o.$page.props.flash.message),1)]),_:1})):y("",!0),a("form",{onSubmit:D(n,["prevent"])},[a("div",Ie,[c(C,null,{default:d(()=>[c(k,null,{default:d(()=>[...i[4]||(i[4]=[a("i",{class:"pi pi-envelope"},null,-1)])]),_:1}),c($,{variant:"on"},{default:d(()=>[c(g,{id:"email_or_phone",modelValue:s(t).login,"onUpdate:modelValue":i[0]||(i[0]=p=>s(t).login=p),"pt:root:class":"rounded-l-none border-slate-300 dark:border-slate-100/20 focus:dark:border-slate-100/20",class:f({"p-invalid":s(t).errors.login})},null,8,["modelValue","class"]),a("label",Se,l(o.$t("authorize.email_or_phone")),1)]),_:1})]),_:1}),c(C,null,{default:d(()=>[c(k,null,{default:d(()=>[...i[5]||(i[5]=[a("i",{class:"pi pi-lock"},null,-1)])]),_:1}),c($,{variant:"on"},{default:d(()=>[c(P,{toggleMask:"","pt:unmaskIcon:class":"-mt -2",feedback:!1,inputClass:"w-full rounded-md focus:shadow-none rounded-l-none border-slate-300 dark:border-slate-100/20 focus:dark:border-slate-100/20",class:f([{"p-invalid":s(t).errors.password},"w-full"]),modelValue:s(t).password,"onUpdate:modelValue":i[1]||(i[1]=p=>s(t).password=p),inputId:"password"},null,8,["class","modelValue"]),a("label",{for:"password",class:f({"text-danger":s(t).errors.password})},l(o.$t("authorize.password")),3)]),_:1})]),_:1}),a("div",ze,[a("div",Ae,[c(B,{modelValue:s(t).remember,"onUpdate:modelValue":i[2]||(i[2]=p=>s(t).remember=p),inputId:"remember",binary:""},null,8,["modelValue"]),a("label",Pe,l(o.$t("authorize.remember_me")),1)]),c(s(S),{href:o.route("show.forgot.password"),class:"text-xs sm:text-sm text-slate-800 dark:secondary-dark-mode-text"},{default:d(()=>[b(l(o.$t("authorize.forgot_password")),1)]),_:1},8,["href"])]),a("div",null,[c(T,{type:"submit",icon:"pi pi-user",label:o.$t("authorize.sign_in"),class:"w-full flex justify-center items-center py-2.5 px-4 rounded-lg border-none shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500/90"},null,8,["label"])])])],32),a("div",Be,[c(s(X)),a("p",Te,[b(l(o.$t("authorize.dont_have_account"))+" ",1),c(s(S),{href:o.route("register.show"),class:"font-medium text-blue-500 hover:text-brand-500/80 transition-colors"},{default:d(()=>[b(l(o.$t("authorize.create_account")),1)]),_:1},8,["href"])])]),i[6]||(i[6]=a("div",{class:"space-y-3"},null,-1))])])],64)}}},Ee=ee(Ve,[["__scopeId","data-v-12d7154f"]]);export{Ee as default};
