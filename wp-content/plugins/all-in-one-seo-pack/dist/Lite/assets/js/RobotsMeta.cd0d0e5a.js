import{B as P}from"./Checkbox.56c563fd.js";import{G as $,a as y}from"./Row.3c0caea3.js";import{r as i,o as n,c as u,e as a,w as m,g as l,t as r,F as S,h as N,d as O,a as g,b as p}from"./vue.runtime.esm-bundler.3acceac0.js";import{_ as I}from"./_plugin-vue_export-helper.109ab23d.js";const k={components:{BaseCheckbox:P,GridColumn:$,GridRow:y},props:{options:{type:Object,required:!0},mainOptions:Object,global:Boolean},data(){return{settings:[{value:"noindex",label:this.$t.__("No Index",this.$td)},{value:"nofollow",label:this.$t.__("No Follow",this.$td)},{value:"noarchive",label:this.$t.__("No Archive",this.$td)},{value:"notranslate",label:this.$t.__("No Translate",this.$td)},{value:"noimageindex",label:this.$t.__("No Image Index",this.$td)},{value:"nosnippet",label:this.$t.__("No Snippet",this.$td)},{value:"noodp",label:this.$t.__("No ODP",this.$td)}],globalSettings:[{value:"noindexPaginated",label:this.$t.__("No Index Paginated",this.$td)},{value:"nofollowPaginated",label:this.$t.__("No Follow Paginated",this.$td)},{value:"noindexFeed",label:this.$t.__("No Index RSS Feeds",this.$td)}],strings:{useDefaultSettings:this.$t.__("Use Default Settings",this.$td),robotsMeta:this.$t.__("Robots meta:",this.$td),maxSnippet:this.$t.__("Max Snippet",this.$td),maxVideoPreview:this.$t.__("Max Video Preview",this.$td),maxImagePreview:this.$t.__("Max Image Preview",this.$td),standard:this.$t.__("Standard",this.$td),none:this.$t.__("None",this.$td),large:this.$t.__("Large",this.$td)}}},watch:{noindex(s){this.mainOptions&&(this.mainOptions.show=!s)},default(s){if(this.mainOptions){if(s){this.mainOptions.show=!0;return}this.mainOptions.show=!this.noindex}}},computed:{robotsSettings(){return this.global?this.settings.concat(this.globalSettings):this.settings},noindex(){return this.options.noindex},default(){return this.options.default},imagePreviewOptions(){return[{label:this.strings.none,value:"none"},{label:this.strings.standard,value:"standard"},{label:this.strings.large,value:"large"}]}},methods:{getImagePreviewOption(s){return this.imagePreviewOptions.find(o=>o.value===s)}}},U={class:"aioseo-robots-meta"},B={key:0,class:"global-robots-settings aioseo-description"},C={class:"global-robots-settings-options"},M={key:0,class:"max-snippet aioseo-description"},F={class:"max-video-preview aioseo-description"},R={key:1,class:"max-image-preview aioseo-description"};function D(s,o,e,z,d,_){const h=i("base-toggle"),b=i("base-checkbox"),v=i("grid-column"),x=i("grid-row"),c=i("base-input"),f=i("base-select");return n(),u("div",U,[a(h,{modelValue:e.options.default,"onUpdate:modelValue":o[0]||(o[0]=t=>e.options.default=t)},{default:m(()=>[l(r(d.strings.useDefaultSettings),1)]),_:1},8,["modelValue"]),e.options.default?p("",!0):(n(),u("div",B,[l(r(d.strings.robotsMeta)+" ",1),a(x,{class:"settings"},{default:m(()=>[(n(!0),u(S,null,N(_.robotsSettings,(t,w)=>(n(),O(v,{key:w,xl:"3",md:"4",sm:"6"},{default:m(()=>[a(b,{size:"medium",modelValue:e.options[t.value],"onUpdate:modelValue":V=>e.options[t.value]=V},{default:m(()=>[l(r(t.label),1)]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024))),128))]),_:1}),g("div",C,[e.options.nosnippet?p("",!0):(n(),u("div",M,[l(r(d.strings.maxSnippet)+" ",1),a(c,{type:"number",size:"medium",modelValue:e.options.maxSnippet,"onUpdate:modelValue":o[1]||(o[1]=t=>e.options.maxSnippet=t)},null,8,["modelValue"])])),g("div",F,[l(r(d.strings.maxVideoPreview)+" ",1),a(c,{type:"number",size:"medium",modelValue:e.options.maxVideoPreview,"onUpdate:modelValue":o[2]||(o[2]=t=>e.options.maxVideoPreview=t)},null,8,["modelValue"])]),e.options.noimageindex?p("",!0):(n(),u("div",R,[l(r(d.strings.maxImagePreview)+" ",1),a(f,{size:"medium",options:_.imagePreviewOptions,modelValue:_.getImagePreviewOption(e.options.maxImagePreview),"onUpdate:modelValue":o[3]||(o[3]=t=>e.options.maxImagePreview=t.value)},null,8,["options","modelValue"])]))])]))])}const T=I(k,[["render",D]]);export{T as C};