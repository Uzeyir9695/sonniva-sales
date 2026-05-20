import{s as k}from"./index-CSYZR7wc.js";import{s as B}from"./index-LdOkY5w_.js";import{a as w,l as $,aI as P,aH as C,a8 as A,aA as D,ar as o,a0 as r,X as i,az as d,ai as n,aX as h,$ as p,ak as S,a4 as m,be as b,Z as y,aC as I,bf as L,bb as T,o as K,h as f,ay as N,a3 as E,aZ as V,ag as z}from"./app-NdpKHB5c.js";var j=`
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
`,M={root:function(t){var c=t.props;return["p-panel p-component",{"p-panel-toggleable":c.toggleable}]},header:"p-panel-header",title:"p-panel-title",headerActions:"p-panel-header-actions",pcToggleButton:"p-panel-toggle-button",contentContainer:"p-panel-content-container",content:"p-panel-content",footer:"p-panel-footer"},X=w.extend({name:"panel",style:j,classes:M}),Z={name:"BasePanel",extends:C,props:{header:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}}},style:X,provide:function(){return{$pcPanel:this,$parentInstance:this}}},F={name:"Panel",extends:Z,inheritAttrs:!1,emits:["update:collapsed","toggle"],data:function(){return{d_collapsed:this.collapsed}},watch:{collapsed:function(t){this.d_collapsed=t}},methods:{toggle:function(t){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:t,value:this.d_collapsed})},onKeyDown:function(t){(t.code==="Enter"||t.code==="NumpadEnter"||t.code==="Space")&&(this.toggle(t),t.preventDefault())}},computed:{buttonAriaLabel:function(){return this.toggleButtonProps&&this.toggleButtonProps.ariaLabel?this.toggleButtonProps.ariaLabel:this.header},dataP:function(){return A({toggleable:this.toggleable})}},components:{PlusIcon:B,MinusIcon:k,Button:P},directives:{ripple:$}},H=["data-p"],O=["data-p"],R=["id"],q=["id","aria-labelledby"];function G(e,t,c,u,a,l){var v=D("Button");return o(),r("div",n({class:e.cx("root"),"data-p":l.dataP},e.ptmi("root")),[i("div",n({class:e.cx("header"),"data-p":l.dataP},e.ptm("header")),[d(e.$slots,"header",{id:e.$id+"_header",class:S(e.cx("title")),collapsed:a.d_collapsed},function(){return[e.header?(o(),r("span",n({key:0,id:e.$id+"_header",class:e.cx("title")},e.ptm("title")),h(e.header),17,R)):p("",!0)]}),i("div",n({class:e.cx("headerActions")},e.ptm("headerActions")),[d(e.$slots,"icons"),e.toggleable?d(e.$slots,"togglebutton",{key:0,collapsed:a.d_collapsed,toggleCallback:function(g){return l.toggle(g)},keydownCallback:function(g){return l.onKeyDown(g)}},function(){return[m(v,n({id:e.$id+"_header",class:e.cx("pcToggleButton"),"aria-label":l.buttonAriaLabel,"aria-controls":e.$id+"_content","aria-expanded":!a.d_collapsed,unstyled:e.unstyled,onClick:t[0]||(t[0]=function(s){return l.toggle(s)}),onKeydown:t[1]||(t[1]=function(s){return l.onKeyDown(s)})},e.toggleButtonProps,{pt:e.ptm("pcToggleButton")}),{icon:b(function(s){return[d(e.$slots,e.$slots.toggleicon?"toggleicon":"togglericon",{collapsed:a.d_collapsed},function(){return[(o(),y(I(a.d_collapsed?"PlusIcon":"MinusIcon"),n({class:s.class},e.ptm("pcToggleButton").icon),null,16,["class"]))]})]}),_:3},16,["id","class","aria-label","aria-controls","aria-expanded","unstyled","pt"])]}):p("",!0)],16)],16,O),m(K,n({name:"p-toggleable-content"},e.ptm("transition")),{default:b(function(){return[L(i("div",n({id:e.$id+"_content",class:e.cx("contentContainer"),role:"region","aria-labelledby":e.$id+"_header"},e.ptm("contentContainer")),[i("div",n({class:e.cx("content")},e.ptm("content")),[d(e.$slots,"default")],16),e.$slots.footer?(o(),r("div",n({key:0,class:e.cx("footer")},e.ptm("footer")),[d(e.$slots,"footer")],16)):p("",!0)],16,q),[[T,!a.d_collapsed]])]}),_:3},16)],16,H)}F.render=G;const J={class:"text-sm text-gray-500 sticky top-20 flex items-center text-nowrap overflow-x-auto px-3 sm:px-4 py-3 no-scrollbar scroll-smooth z-20"},Q={key:1,class:"text-gray-400 cursor-not-allowed"},U={key:2,class:"pi pi-chevron-right text-xs mx-1"},x={__name:"Breadcrumbs",props:["breadcrumbs"],setup(e){return(t,c)=>(o(),r("div",J,[(o(!0),r(f,null,N(e.breadcrumbs,(u,a)=>(o(),r(f,{key:a},[a<e.breadcrumbs.length-1?(o(),y(V(z),{key:0,href:t.route("items.index",e.breadcrumbs.slice(0,a+1).map(l=>l.slug)),class:""},{default:b(()=>[E(h(u.label),1)]),_:2},1032,["href"])):(o(),r("span",Q,h(u.label),1)),a<e.breadcrumbs.length-1?(o(),r("i",U)):p("",!0)],64))),128))]))}};export{x as _,F as s};
