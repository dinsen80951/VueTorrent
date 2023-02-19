import i from"./ShareLimitInput.88876287.js";import{m as o}from"./vue.ea0348c7.js";import{M as r,F as n,Q as l,s as m,t as _,V as c,v as p,z as d,a5 as h,E as u,x as e}from"./index.24880ff7.js";import{_ as f}from"./VDialog.c611819e.js";import"./VSwitch.559d4943.js";import"./index.5e049671.js";const x={name:"ShareLimitModal",components:{ShareLimitInput:i},mixins:[r,n],props:{mode:String,hash:String},computed:{...o(["getTorrent"]),torrent(){return this.getTorrent(this.hash)},isPhone(){return this.$vuetify.breakpoint.xsOnly}},methods:{save(){l.setShareLimit([this.hash],this.$refs.ratio.export(),this.$refs.time.export()),this.close()},close(){this.dialog=!1}}};var v=function(){var t=this,s=t._self._c;return s(f,{attrs:{scrollable:"","content-class":"rounded-form","max-width":"500px",fullscreen:t.isPhone},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[s(_,{staticClass:"px-2"},[s(c,{staticClass:"pa-0"},[s(p,{staticClass:"ma-4 primarytext--text"},[s("h3",[t._v(t._s(t.$t("modals.shareLimit.limitRatio")))])])],1),s(d,{staticClass:"px-4 py-2"},[s(i,{ref:"ratio",attrs:{title:t.$t("modals.shareLimit.titleRatio"),"initial-limit":t.torrent.ratio_limit}}),s(i,{ref:"time",staticClass:"mt-2",attrs:{title:t.$t("modals.shareLimit.titleDuration"),"initial-limit":t.torrent.ratio_time_limit}})],1),s(h),s(u,{staticClass:"justify-end"},[s(e,{staticClass:"accent white--text elevation-0 px-4",on:{click:t.save}},[t._v(" "+t._s(t.$t("save"))+" ")]),s(e,{staticClass:"error white--text elevation-0 px-4",on:{click:t.close}},[t._v(" "+t._s(t.$t("cancel"))+" ")])],1)],1)],1)},g=[],C=m(x,v,g,!1,null,"09a1cdf7",null,null);const V=C.exports;export{V as default};
