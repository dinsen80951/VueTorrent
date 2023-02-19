import{ae as l,bu as c,ag as d,r as u,Q as m,s as _,A as n,B as o,E as f,x as p,y as r,a as v}from"./index.24880ff7.js";import{d as h,a as y}from"./vue.ea0348c7.js";import{_ as g}from"./VDataTable.8ce8c0fa.js";import{_ as x}from"./VCheckbox.7dac1810.js";import"./index.5e049671.js";const b=h({name:"RssArticles",mixins:[l],data(){return{headers:[{text:this.$t("modals.rss.columnTitle.id"),value:"id"},{text:this.$t("modals.rss.columnTitle.title"),value:"title"},{text:this.$t("modals.rss.columnTitle.category"),value:"category"},{text:this.$t("modals.rss.columnTitle.author"),value:"author"},{text:this.$t("modals.rss.columnTitle.date"),value:"parsedDate"},{text:this.$t("modals.rss.columnTitle.feedName"),value:"feedName"},{text:this.$t("modals.rss.columnTitle.actions"),value:"actions",sortable:!1}],filter:"",filterUnread:!1,sortBy:"parsedDate",reverse:!0,mdiEmailOpen:c,mdiDownload:d,mdiClose:u}},mounted(){document.addEventListener("keydown",this.handleKeyboardShortcut)},created(){this.$store.commit("FETCH_FEEDS")},beforeDestroy(){document.removeEventListener("keydown",this.handleKeyboardShortcut)},computed:{...y(["rss"]),articles(){const a=[];return this.rss.feeds.forEach(e=>{e.articles&&a.push(...e.articles.map(t=>({feedName:e.name,parsedDate:new Date(t.date),...t})))}),a.filter(e=>this.filterUnread?!e.isRead:!0)}},methods:{close(){this.$router.back()},customFilter(a,e,t){return t.title.toLowerCase().indexOf(e.toLowerCase())!==-1},getRowStyle(a){return a.isRead?"rss-read":"rss-unread"},downloadTorrent(a){this.createModal("AddModal",{initialMagnet:a.torrentURL})},async markAsRead(a){await m.markAsRead(a.feedName,a.id),this.$store.commit("FETCH_FEEDS")},handleKeyboardShortcut(a){a.key==="Escape"&&this.close()}}});var k=function(){var e=this,t=e._self._c;return e._self._setupProxy,t("div",{staticClass:"px-1 px-sm-5 background noselect"},[t(n,{staticClass:"grey--text",attrs:{"no-gutters":"",align:"center",justify:"center"}},[t(o,[t("h1",{staticClass:"subtitle-1 ml-2",staticStyle:{"font-size":"1.6em !important"}},[e._v(" "+e._s(e.$t("modals.rss.title"))+" ")])]),t(o,{staticClass:"align-center justify-center"},[t(f,{staticClass:"justify-end"},[t(p,{attrs:{small:"",elevation:"0"},on:{click:e.close}},[t(r,[e._v(e._s(e.mdiClose))])],1)],1)],1)],1),t(n,{staticClass:"ma-0 pa-0"},[t(g,{attrs:{id:"articlesTable",headers:e.headers,items:e.articles,"items-per-page":15,search:e.filter,"custom-filter":e.customFilter,"sort-by":e.sortBy,"sort-desc":e.reverse,"item-class":e.getRowStyle},on:{"update:sortBy":function(s){e.sortBy=s},"update:sort-by":function(s){e.sortBy=s},"update:sortDesc":function(s){e.reverse=s},"update:sort-desc":function(s){e.reverse=s}},scopedSlots:e._u([{key:"top",fn:function(){return[t("div",{staticClass:"mx-4"},[t(v,{attrs:{label:e.$t("filter")},model:{value:e.filter,callback:function(s){e.filter=s},expression:"filter"}}),t(x,{attrs:{label:e.$t("modals.rss.filterRead"),"hide-details":""},model:{value:e.filterUnread,callback:function(s){e.filterUnread=s},expression:"filterUnread"}})],1)]},proxy:!0},{key:"item.title",fn:function({item:s}){return[t("a",{attrs:{href:s.link,target:"_blank"},domProps:{textContent:e._s(s.title)}})]}},{key:"item.parsedDate",fn:function({item:s}){return[e._v(" "+e._s(s.parsedDate.toLocaleString())+" ")]}},{key:"item.actions",fn:function({item:s}){return[t("span",{staticClass:"rss-actions"},[t(r,{on:{click:function(i){return e.markAsRead(s)}}},[e._v(e._s(e.mdiEmailOpen))]),t(r,{on:{click:function(i){return e.downloadTorrent(s)}}},[e._v(e._s(e.mdiDownload))])],1)]}}],null,!0)})],1)],1)},C=[],$=_(b,k,C,!1,null,"647eb8b6",null,null);const S=$.exports;export{S as default};
