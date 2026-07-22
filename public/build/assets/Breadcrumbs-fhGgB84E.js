import{s as $}from"./index-CumIV5mp.js";import{a as P,R as C,aR as D,b6 as A,aU as L,ae as S,aM as K,aD as n,a5 as r,a2 as c,aL as d,au as o,b8 as b,a4 as p,aw as T,a9 as m,bs as u,a3 as B,aO as I,bt as N,bp as E,q as V,a8 as f,ba as y,as as v,i as k,aK as M}from"./app-D6VDa3Jp.js";var R=`
    .p-panel {
        display: block;
        border: 1px solid dt('panel.border.color');
        border-radius: dt('panel.border.radius');
        background: dt('panel.background');
        color: dt('panel.color');
    }

    .p-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('panel.header.padding');
        background: dt('panel.header.background');
        color: dt('panel.header.color');
        border-style: solid;
        border-width: dt('panel.header.border.width');
        border-color: dt('panel.header.border.color');
        border-radius: dt('panel.header.border.radius');
    }

    .p-panel-toggleable .p-panel-header {
        padding: dt('panel.toggleable.header.padding');
    }

    .p-panel-title {
        line-height: 1;
        font-weight: dt('panel.title.font.weight');
    }

    .p-panel-content {
        padding: dt('panel.content.padding');
    }

    .p-panel-footer {
        padding: dt('panel.footer.padding');
    }
`,j={root:function(t){var i=t.props;return["p-panel p-component",{"p-panel-toggleable":i.toggleable}]},header:"p-panel-header",title:"p-panel-title",headerActions:"p-panel-header-actions",pcToggleButton:"p-panel-toggle-button",contentContainer:"p-panel-content-container",content:"p-panel-content",footer:"p-panel-footer"},z=P.extend({name:"panel",style:R,classes:j}),O={name:"BasePanel",extends:L,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}}},style:z,provide:function(){return{$pcPanel:this,$parentInstance:this}}},q={name:"Panel",extends:O,inheritAttrs:!1,emits:["update:collapsed","toggle"],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(t){this.d_collapsed=t}},methods:{toggle:function(t){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:t,value:this.d_collapsed})},onKeyDown:function(t){(t.code==="Enter"||t.code==="NumpadEnter"||t.code==="Space")&&(this.toggle(t),t.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header},dataP:function(){return S({toggleable:this.toggleable})}},components:{PlusIcon:A,MinusIcon:$,Button:D},directives:{ripple:C}},F=["data-p"],U=["data-p"],G=["id"],H=["id","aria-labelledby"];function J(e,t,i,g,a,l){var w=K("Button");return n(),r("div",o({class:e.cx("root"),"data-p":l.dataP},e.ptmi("root")),[c("div",o({class:e.cx("header"),"data-p":l.dataP},e.ptm("header")),[d(e.$slots,"header",{id:e.$id+"_header",class:T(e.cx("title")),collapsed:a.d_collapsed},function(){return[e.header?(n(),r("span",o({key:0,id:e.$id+"_header",class:e.cx("title")},e.ptm("title")),b(e.header),17,G)):p("",!0)]}),c("div",o({class:e.cx("headerActions")},e.ptm("headerActions")),[d(e.$slots,"icons"),e.toggleable?d(e.$slots,"togglebutton",{key:0,collapsed:a.d_collapsed,toggleCallback:function(h){return l.toggle(h)},keydownCallback:function(h){return l.onKeyDown(h)}},function(){return[m(w,o({id:e.$id+"_header",class:e.cx("pcToggleButton"),"aria-label":l.buttonAriaLabel,"aria-controls":e.$id+"_content","aria-expanded":!a.d_collapsed,unstyled:e.unstyled,onClick:t[0]||(t[0]=function(s){return l.toggle(s)}),onKeydown:t[1]||(t[1]=function(s){return l.onKeyDown(s)})},e.toggleButtonProps,{pt:e.ptm("pcToggleButton")}),{icon:u(function(s){return[d(e.$slots,e.$slots.toggleicon?"toggleicon":"togglericon",{collapsed:a.d_collapsed},function(){return[(n(),B(I(a.d_collapsed?"PlusIcon":"MinusIcon"),o({class:s.class},e.ptm("pcToggleButton").icon),null,16,["class"]))]})]}),_:3},16,["id","class","aria-label","aria-controls","aria-expanded","unstyled","pt"])]}):p("",!0)],16)],16,U),m(V,o({name:"p-toggleable-content"},e.ptm("transition")),{default:u(function(){return[N(c("div",o({id:e.$id+"_content",class:e.cx("contentContainer"),role:"region","aria-labelledby":e.$id+"_header"},e.ptm("contentContainer")),[c("div",o({class:e.cx("content")},e.ptm("content")),[d(e.$slots,"default")],16),e.$slots.footer?(n(),r("div",o({key:0,class:e.cx("footer")},e.ptm("footer")),[d(e.$slots,"footer")],16)):p("",!0)],16,H),[[E,!a.d_collapsed]])]}),_:3},16)],16,F)}q.render=J;const Q={class:"text-sm text-gray-500 sticky top-16 sm:top-20 flex items-center text-nowrap overflow-x-auto px-3 sm:px-4 py-3 no-scrollbar scroll-smooth z-20"},W={key:0,class:"pi pi-chevron-right text-xs mx-1 shrink-0"},X={key:1,class:"text-gray-400 cursor-not-allowed"},Y={key:2,class:"pi pi-chevron-right text-xs mx-1"},_={__name:"Breadcrumbs",props:["breadcrumbs"],setup(e){return(t,i)=>(n(),r("div",Q,[m(y(v),{href:t.route("home"),class:"shrink-0 font-semibold"},{default:u(()=>[...i[0]||(i[0]=[f(" საწყისი გვერდი ",-1)])]),_:1},8,["href"]),e.breadcrumbs?.length?(n(),r("i",W)):p("",!0),(n(!0),r(k,null,M(e.breadcrumbs,(g,a)=>(n(),r(k,{key:a},[a<e.breadcrumbs.length-1?(n(),B(y(v),{key:0,href:t.route("items.index",e.breadcrumbs.slice(0,a+1).map(l=>l.slug)),class:""},{default:u(()=>[f(b(g.label),1)]),_:2},1032,["href"])):(n(),r("span",X,b(g.label),1)),a<e.breadcrumbs.length-1?(n(),r("i",Y)):p("",!0)],64))),128))]))}};export{_,q as s};
