import{m as o}from"./vue.ea0348c7.js";import{M as i,F as l,a0 as r,Q as c,s as m,t as _,V as d,v as u,z as p,A as h,B as f,a as x,a5 as v,E as g,x as a,D as b}from"./index.24880ff7.js";import{_ as y}from"./VDialog.c611819e.js";import{_ as C}from"./VContainer.aab99810.js";const k={name:"RenameModal",mixins:[i,l],props:{hash:String},data(){return{name:"",mdiFile:r}},computed:{...o(["getTorrent"]),torrent(){return this.getTorrent(this.hash)},isPhone(){return this.$vuetify.breakpoint.xsOnly}},mounted(){document.addEventListener("keydown",this.handleKeyboardShortcut)},created(){this.name=this.torrent.name,this.isUrl()},beforeDestroy(){document.removeEventListener("keydown",this.handleKeyboardShortcut)},methods:{urlDecode(){this.name=decodeURIComponent(this.name),this.isUrl()},isUrl(){this.enableUrlDecode=!1,this.name.indexOf(" ")===-1&&/\+|%/.test(this.name)&&(this.enableUrlDecode=!0)},async rename(){await c.setTorrentName(this.hash,this.name),this.close()},close(){this.dialog=!1},handleKeyboardShortcut(n){n.key==="Escape"?this.close():n.keyCode===13&&this.rename()}}};var D=function(){var e=this,t=e._self._c;return t(y,{attrs:{scrollable:"","max-width":"750px","content-class":e.isPhone?"rounded-0":"rounded-form",fullscreen:e.isPhone},model:{value:e.dialog,callback:function(s){e.dialog=s},expression:"dialog"}},[t(_,[t(d,{staticClass:"pa-0"},[t(u,{staticClass:"ma-4 primarytext--text"},[t("h3",[e._v(e._s(e.$t("modals.rename.title")))])])],1),t(p,[t(C,[t(h,[t(f,[t(x,{attrs:{clearable:"",label:e.$t("modals.rename.torrentName"),"prepend-inner-icon":e.mdiFile},model:{value:e.name,callback:function(s){e.name=s},expression:"name"}})],1)],1)],1)],1),t(v),t(g,{staticClass:"justify-end"},[e.enableUrlDecode?t(a,{staticClass:"info white--text elevation-0 px-4",on:{click:e.urlDecode}},[e._v(" URL DECODE ")]):e._e(),t(b),t(a,{staticClass:"accent white--text elevation-0 px-4",on:{click:e.rename}},[e._v(" "+e._s(e.$t("save"))+" ")]),t(a,{staticClass:"error white--text elevation-0 px-4",on:{click:e.close}},[e._v(" "+e._s(e.$t("cancel"))+" ")])],1)],1)],1)},U=[],$=m(k,D,U,!1,null,null,null,null);const M=$.exports;export{M as default};
