import{B,b as x,o as l,c,q as f,m as s,aa as V,a as h,R as A,f as S,b4 as v,b5 as z,z as g,aq as E,ap as b,v as O,aw as C,r as P,w as m,h as y,i as w,j as L,ac as R,d as F,as as p,l as _,n as W}from"./app-ByvooRRx.js";import{s as D}from"./index-LLSsbGq3.js";var H=`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`,U={root:function(t){var n=t.props;return["p-tabs p-component",{"p-tabs-scrollable":n.scrollable}]}},j=B.extend({name:"tabs",style:H,classes:U}),M={name:"BaseTabs",extends:x,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:j,provide:function(){return{$pcTabs:this,$parentInstance:this}}},q={name:"Tabs",extends:M,inheritAttrs:!1,emits:["update:value"],data:function(){return{d_value:this.value}},watch:{value:function(t){this.d_value=t}},methods:{updateValue:function(t){this.d_value!==t&&(this.d_value=t,this.$emit("update:value",t))},isVertical:function(){return this.orientation==="vertical"}}};function Q(e,t,n,a,i,r){return l(),c("div",s({class:e.cx("root")},e.ptmi("root")),[f(e.$slots,"default")],16)}q.render=Q;var N={name:"ChevronLeftIcon",extends:V};function Z(e){return Y(e)||X(e)||J(e)||G()}function G(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function J(e,t){if(e){if(typeof e=="string")return T(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?T(e,t):void 0}}function X(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Y(e){if(Array.isArray(e))return T(e)}function T(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=Array(t);n<t;n++)a[n]=e[n];return a}function tt(e,t,n,a,i,r){return l(),c("svg",s({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),Z(t[0]||(t[0]=[h("path",{d:"M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",fill:"currentColor"},null,-1)])),16)}N.render=tt;var et={root:"p-tablist",content:"p-tablist-content p-tablist-viewport",tabList:"p-tablist-tab-list",activeBar:"p-tablist-active-bar",prevButton:"p-tablist-prev-button p-tablist-nav-button",nextButton:"p-tablist-next-button p-tablist-nav-button"},nt=B.extend({name:"tablist",classes:et}),at={name:"BaseTabList",extends:x,props:{},style:nt,provide:function(){return{$pcTabList:this,$parentInstance:this}}},rt={name:"TabList",extends:at,inheritAttrs:!1,inject:["$pcTabs"],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,watch:{showNavigators:function(t){t?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:"post",handler:function(){this.updateInkBar()}}},mounted:function(){var t=this;setTimeout(function(){t.updateInkBar()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver()},methods:{onScroll:function(t){this.showNavigators&&this.updateButtonState(),t.preventDefault()},onPrevButtonClick:function(){var t=this.$refs.content,n=this.getVisibleButtonWidths(),a=v(t)-n,i=Math.abs(t.scrollLeft),r=a*.8,o=i-r,d=Math.max(o,0);t.scrollLeft=C(t)?-1*d:d},onNextButtonClick:function(){var t=this.$refs.content,n=this.getVisibleButtonWidths(),a=v(t)-n,i=Math.abs(t.scrollLeft),r=a*.8,o=i+r,d=t.scrollWidth-a,u=Math.min(o,d);t.scrollLeft=C(t)?-1*u:u},bindResizeObserver:function(){var t=this;this.resizeObserver=new ResizeObserver(function(){return t.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var t;(t=this.resizeObserver)===null||t===void 0||t.unobserve(this.$refs.list),this.resizeObserver=void 0},updateInkBar:function(){var t=this.$refs,n=t.content,a=t.inkbar,i=t.tabs;if(a){var r=g(n,'[data-pc-name="tab"][data-p-active="true"]');this.$pcTabs.isVertical()?(a.style.height=E(r)+"px",a.style.top=b(r).top-b(i).top+"px"):(a.style.width=O(r)+"px",a.style.left=b(r).left-b(i).left+"px")}},updateButtonState:function(){var t=this.$refs,n=t.list,a=t.content,i=a.scrollTop,r=a.scrollWidth,o=a.scrollHeight,d=a.offsetWidth,u=a.offsetHeight,$=Math.abs(a.scrollLeft),k=[v(a),z(a)],I=k[0],K=k[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=i!==0,this.isNextButtonEnabled=n.offsetHeight>=u&&parseInt(i)!==o-K):(this.isPrevButtonEnabled=$!==0,this.isNextButtonEnabled=n.offsetWidth>=d&&parseInt($)!==r-I)},getVisibleButtonWidths:function(){var t=this.$refs,n=t.prevButton,a=t.nextButton,i=0;return this.showNavigators&&(i=(n?.offsetWidth||0)+(a?.offsetWidth||0)),i}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return S({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeftIcon:N,ChevronRightIcon:D},directives:{ripple:A}},it=["data-p"],st=["aria-label","tabindex"],ot=["data-p"],lt=["aria-orientation"],dt=["aria-label","tabindex"];function ct(e,t,n,a,i,r){var o=P("ripple");return l(),c("div",s({ref:"list",class:e.cx("root"),"data-p":r.dataP},e.ptmi("root")),[r.showNavigators&&i.isPrevButtonEnabled?m((l(),c("button",s({key:0,ref:"prevButton",type:"button",class:e.cx("prevButton"),"aria-label":r.prevButtonAriaLabel,tabindex:r.$pcTabs.tabindex,onClick:t[0]||(t[0]=function(){return r.onPrevButtonClick&&r.onPrevButtonClick.apply(r,arguments)})},e.ptm("prevButton"),{"data-pc-group-section":"navigator"}),[(l(),y(w(r.templates.previcon||"ChevronLeftIcon"),s({"aria-hidden":"true"},e.ptm("prevIcon")),null,16))],16,st)),[[o]]):L("",!0),h("div",s({ref:"content",class:e.cx("content"),onScroll:t[1]||(t[1]=function(){return r.onScroll&&r.onScroll.apply(r,arguments)}),"data-p":r.dataP},e.ptm("content")),[h("div",s({ref:"tabs",class:e.cx("tabList"),role:"tablist","aria-orientation":r.$pcTabs.orientation||"horizontal"},e.ptm("tabList")),[f(e.$slots,"default"),h("span",s({ref:"inkbar",class:e.cx("activeBar"),role:"presentation","aria-hidden":"true"},e.ptm("activeBar")),null,16)],16,lt)],16,ot),r.showNavigators&&i.isNextButtonEnabled?m((l(),c("button",s({key:1,ref:"nextButton",type:"button",class:e.cx("nextButton"),"aria-label":r.nextButtonAriaLabel,tabindex:r.$pcTabs.tabindex,onClick:t[2]||(t[2]=function(){return r.onNextButtonClick&&r.onNextButtonClick.apply(r,arguments)})},e.ptm("nextButton"),{"data-pc-group-section":"navigator"}),[(l(),y(w(r.templates.nexticon||"ChevronRightIcon"),s({"aria-hidden":"true"},e.ptm("nextIcon")),null,16))],16,dt)),[[o]]):L("",!0)],16,it)}rt.render=ct;var ut={root:function(t){var n=t.instance,a=t.props;return["p-tab",{"p-tab-active":n.active,"p-disabled":a.disabled}]}},bt=B.extend({name:"tab",classes:ut}),pt={name:"BaseTab",extends:x,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1}},style:bt,provide:function(){return{$pcTab:this,$parentInstance:this}}},ht={name:"Tab",extends:pt,inheritAttrs:!1,inject:["$pcTabs","$pcTabList"],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break}},onArrowRightKey:function(t){var n=this.findNextTab(t.currentTarget);n?this.changeFocusedTab(t,n):this.onHomeKey(t),t.preventDefault()},onArrowLeftKey:function(t){var n=this.findPrevTab(t.currentTarget);n?this.changeFocusedTab(t,n):this.onEndKey(t),t.preventDefault()},onHomeKey:function(t){var n=this.findFirstTab();this.changeFocusedTab(t,n),t.preventDefault()},onEndKey:function(t){var n=this.findLastTab();this.changeFocusedTab(t,n),t.preventDefault()},onPageDownKey:function(t){this.scrollInView(this.findLastTab()),t.preventDefault()},onPageUpKey:function(t){this.scrollInView(this.findFirstTab()),t.preventDefault()},onEnterKey:function(t){this.changeActiveValue()},findNextTab:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=n?t:t.nextElementSibling;return a?p(a,"data-p-disabled")||p(a,"data-pc-section")==="activebar"?this.findNextTab(a):g(a,'[data-pc-name="tab"]'):null},findPrevTab:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=n?t:t.previousElementSibling;return a?p(a,"data-p-disabled")||p(a,"data-pc-section")==="activebar"?this.findPrevTab(a):g(a,'[data-pc-name="tab"]'):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(t,n){F(n),this.scrollInView(n)},scrollInView:function(t){var n;t==null||(n=t.scrollIntoView)===null||n===void 0||n.call(t,{block:"nearest"})}},computed:{active:function(){var t;return R((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tab_").concat(this.value)},ariaControls:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.$id,"_tabpanel_").concat(this.value)},attrs:function(){return s(this.asAttrs,this.a11yAttrs,this.ptmi("root",this.ptParams))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:"tab","aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":"tab","data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return S({active:this.active})}},directives:{ripple:A}};function ft(e,t,n,a,i,r){var o=P("ripple");return e.asChild?f(e.$slots,"default",{key:1,dataP:r.dataP,class:W(e.cx("root")),active:r.active,a11yAttrs:r.a11yAttrs,onClick:r.onClick}):m((l(),y(w(e.as),s({key:0,class:e.cx("root"),"data-p":r.dataP,onClick:r.onClick},r.attrs),{default:_(function(){return[f(e.$slots,"default")]}),_:3},16,["class","data-p","onClick"])),[[o]])}ht.render=ft;export{ht as a,q as b,rt as s};
