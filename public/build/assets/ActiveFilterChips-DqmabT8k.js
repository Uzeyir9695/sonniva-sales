import{B as f,b0 as b,g as y,f as k,o as n,c as t,an as d,m as a,a7 as p,a9 as m,ab as s,ah as w,ae as C,a as h,ad as $,ai as I,aT as B}from"./app-Dy1gO9bV.js";/* empty css            */var z=`
    .p-chip {
        display: inline-flex;
        align-items: center;
        background: dt('chip.background');
        color: dt('chip.color');
        border-radius: dt('chip.border.radius');
        padding-block: dt('chip.padding.y');
        padding-inline: dt('chip.padding.x');
        gap: dt('chip.gap');
    }

    .p-chip-icon {
        color: dt('chip.icon.color');
        font-size: dt('chip.icon.font.size');
        width: dt('chip.icon.size');
        height: dt('chip.icon.size');
    }

    .p-chip-image {
        border-radius: 50%;
        width: dt('chip.image.width');
        height: dt('chip.image.height');
        margin-inline-start: calc(-1 * dt('chip.padding.y'));
    }

    .p-chip:has(.p-chip-remove-icon) {
        padding-inline-end: dt('chip.padding.y');
    }

    .p-chip:has(.p-chip-image) {
        padding-block-start: calc(dt('chip.padding.y') / 2);
        padding-block-end: calc(dt('chip.padding.y') / 2);
    }

    .p-chip-remove-icon {
        cursor: pointer;
        font-size: dt('chip.remove.icon.size');
        width: dt('chip.remove.icon.size');
        height: dt('chip.remove.icon.size');
        color: dt('chip.remove.icon.color');
        border-radius: 50%;
        transition:
            outline-color dt('chip.transition.duration'),
            box-shadow dt('chip.transition.duration');
        outline-color: transparent;
    }

    .p-chip-remove-icon:focus-visible {
        box-shadow: dt('chip.remove.icon.focus.ring.shadow');
        outline: dt('chip.remove.icon.focus.ring.width') dt('chip.remove.icon.focus.ring.style') dt('chip.remove.icon.focus.ring.color');
        outline-offset: dt('chip.remove.icon.focus.ring.offset');
    }
`,S={root:"p-chip p-component",image:"p-chip-image",icon:"p-chip-icon",label:"p-chip-label",removeIcon:"p-chip-remove-icon"},K=f.extend({name:"chip",style:z,classes:S}),P={name:"BaseChip",extends:y,props:{label:{type:[String,Number],default:null},icon:{type:String,default:null},image:{type:String,default:null},removable:{type:Boolean,default:!1},removeIcon:{type:String,default:void 0}},style:K,provide:function(){return{$pcChip:this,$parentInstance:this}}},u={name:"Chip",extends:P,inheritAttrs:!1,emits:["remove"],data:function(){return{visible:!0}},methods:{onKeydown:function(i){(i.key==="Enter"||i.key==="Backspace")&&this.close(i)},close:function(i){this.visible=!1,this.$emit("remove",i)}},computed:{dataP:function(){return k({removable:this.removable})}},components:{TimesCircleIcon:b}},T=["aria-label","data-p"],x=["src"];function A(e,i,l,v,r,o){return r.visible?(n(),t("div",a({key:0,class:e.cx("root"),"aria-label":e.label},e.ptmi("root"),{"data-p":o.dataP}),[d(e.$slots,"default",{},function(){return[e.image?(n(),t("img",a({key:0,src:e.image},e.ptm("image"),{class:e.cx("image")}),null,16,x)):e.$slots.icon?(n(),p(m(e.$slots.icon),a({key:1,class:e.cx("icon")},e.ptm("icon")),null,16,["class"])):e.icon?(n(),t("span",a({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):s("",!0),e.label!==null?(n(),t("div",a({key:3,class:e.cx("label")},e.ptm("label")),w(e.label),17)):s("",!0)]}),e.removable?d(e.$slots,"removeicon",{key:0,removeCallback:o.close,keydownCallback:o.onKeydown},function(){return[(n(),p(m(e.removeIcon?"span":"TimesCircleIcon"),a({class:[e.cx("removeIcon"),e.removeIcon],onClick:o.close,onKeydown:o.onKeydown},e.ptm("removeIcon")),null,16,["class","onClick","onKeydown"]))]}):s("",!0)],16,T)):s("",!0)}u.render=A;const D={key:0,class:"flex items-center gap-2 sm:mb-4 overflow-x-auto no-scrollbar scroll-smooth"},N={class:"flex flex-row-reverse gap-x-2"},V={__name:"ActiveFilterChips",props:{chips:{type:Array,required:!0}},emits:["remove","reset"],setup(e,{emit:i}){const l=i;return(v,r)=>{const o=u,g=B;return e.chips.length?(n(),t("div",D,[C((n(),t("div",{onClick:r[0]||(r[0]=c=>l("reset")),class:"flex items-center justify-center group p-2 rounded-lg bg-slate-100 cursor-pointer shrink-0"},[...r[1]||(r[1]=[h("i",{class:"pi pi-trash text-sm text-gray-500 group-hover:text-red-500"},null,-1)])])),[[g,"გასუფთავება",void 0,{top:!0}]]),h("div",N,[(n(!0),t($,null,I(e.chips,c=>(n(),p(o,{key:c.id,label:c.label,removable:"",onRemove:E=>l("remove",c),class:"text-xs whitespace-nowrap bg-green-600/10 font-bold text-green-700 shrink-0","pt:removeIcon:class":"text-green-700"},null,8,["label","onRemove"]))),128))])])):s("",!0)}}};export{V as default};
