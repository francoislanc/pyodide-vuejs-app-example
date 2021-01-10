(function(e){function t(t){for(var a,i,l=t[0],o=t[1],c=t[2],d=0,g=[];d<l.length;d++)i=l[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&g.push(s[i][0]),s[i]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);u&&u(t);while(g.length)g.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,l=1;l<n.length;l++){var o=n[l];0!==s[o]&&(a=!1)}a&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},s={app:0},r=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/pyodide-vuejs-app-example/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=o;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"046a":function(e,t,n){},"08c3":function(e,t,n){"use strict";n("046a")},4746:function(e,t,n){"use strict";n("c36c")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("TrainTestSplit")],1)},r=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container m-auto"},[n("div",{staticClass:"grid grid-cols-2 gap-4"},[e._m(0),n("div",{staticClass:"col-span-2 flex justify-center items-center gap-4"},[e.pyodideLoaded?[n("label",{staticClass:"label-file",attrs:{for:"file"}},[e._v("Upload new csv")]),n("input",{staticClass:"input-file",attrs:{id:"file",type:"file"},on:{change:e.onFileChanged}})]:[n("loading",{attrs:{msg:"Loading pyodide..."}})]],2),n("div",{staticClass:"col-span-2"},[n("h1",{staticClass:"text-xl text-center font-semibold"},[e._v(" Input dataset ("+e._s(e.languages.rows.length)+") ")]),n("p",{staticClass:"text-center"},[e._v("Select columns used for stratified split")])]),n("div",{staticClass:"col-span-2 flex justify-center"},[n("Table",{attrs:{columns:e.languages.columns,rows:e.languages.rows,selected:e.languages.selected,toogleCheck:e.toogleCheck}})],1),n("div",{staticClass:"col-span-2 flex justify-center items-center gap-4"},[e.pyodideLoaded?[n("button",{staticClass:"button",on:{click:e.splitDataset}},[e._m(1)])]:[n("loading",{attrs:{msg:"Loading pyodide..."}})]],2),e.errorMsg?[n("div",{staticClass:"col-span-2 flex justify-center items-center gap-4"},[n("alert",{attrs:{msg:e.errorMsg}})],1)]:e._e(),n("div",{staticClass:"col-span-1 flex justify-center"},[n("h1",{staticClass:"text-xl text-center font-semibold"},[e._v(" Train dataset ("+e._s(e.languagesTrain.rows.length)+") ")])]),n("div",{staticClass:"col-span-1 flex justify-center"},[n("h1",{staticClass:"text-xl text-center font-semibold"},[e._v(" Test dataset ("+e._s(e.languagesTest.rows.length)+") ")])]),n("div",{staticClass:"col-span-1 flex justify-center mb-4"},[e.splittingDataset?[n("loading",{attrs:{msg:"Waiting results..."}})]:[n("Table",{attrs:{columns:e.languagesTrain.columns,rows:e.languagesTrain.rows,selected:null}})]],2),n("div",{staticClass:"col-span-1 flex justify-center mb-4"},[e.splittingDataset?[n("loading",{attrs:{msg:"Waiting results..."}})]:[n("Table",{attrs:{columns:e.languagesTest.columns,rows:e.languagesTest.rows,selected:null}})]],2),e.languagesTest.rows.length>0?[n("div",{staticClass:"col-span-2 flex justify-center items-center gap-4 mb-4"},[n("button",{staticClass:"button",on:{click:e.downloadDataset}},[n("span",{staticStyle:{"white-space":"pre"}},[e._v(" Download datasets ")])])])]:e._e()],2)])},l=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-span-2"},[n("div",{staticClass:"text-center m-4 p-4 bg-indigo-800 items-center text-indigo-100 leading-none rounded-lg",attrs:{role:"alert"}},[n("span",{staticClass:"whitespace-pre text-lg font-semibold mr-2 text-left"},[e._v('Running "train_test_split" from scikit-learn in a Vue.js App 🧐')]),n("br"),n("br"),n("span",{staticClass:"whitespace-pre"},[e._v("#pyodide #webassembly #python #javascript")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticStyle:{"white-space":"pre"}},[e._v(" Split dataset "),n("br"),e._v("(with scikit-learn 🐍) ")])}],o=n("3835"),c=(n("96cf"),n("1da1")),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.rows.length>0?n("table",{staticClass:"table-auto mx-auto"},[n("thead",[n("tr",{staticClass:"bg-gray-100"},[e._l(e.columns,(function(t,a){return[n("th",{key:a,staticClass:"px-4 py-2 text-center"},[e.selected?n("input",{directives:[{name:"model",rawName:"v-model",value:e.selected[a],expression:"selected[i]"}],attrs:{type:"checkbox",id:"checkbox"},domProps:{checked:Array.isArray(e.selected[a])?e._i(e.selected[a],null)>-1:e.selected[a]},on:{change:function(t){var n=e.selected[a],s=t.target,r=!!s.checked;if(Array.isArray(n)){var i=null,l=e._i(n,i);s.checked?l<0&&e.$set(e.selected,a,n.concat([i])):l>-1&&e.$set(e.selected,a,n.slice(0,l).concat(n.slice(l+1)))}else e.$set(e.selected,a,r)}}}):e._e(),n("label",{attrs:{for:"checkbox"}}),e._v(" "+e._s(t)+" ")])]}))],2)]),n("tbody",[e._l(e.displayedRows,(function(t,a){return[n("tr",{key:a},[e._l(e.columns,(function(a,s){return[n("td",{key:s,staticClass:"px-4 py-2 text-center"},[e._v(e._s(t[a]))])]}))],2)]}))],2)]):e._e(),n("div",{staticClass:"flex justify-center mb-4"},[n("div",{attrs:{role:"alert"}},e._l(e.pages,(function(t,a){return n("button",{key:a,staticClass:"h-12 w-8 text-center m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded",attrs:{type:"button"},on:{click:function(n){e.page=t}}},[e._v(" "+e._s(t)+" ")])})),0)])])},d=[],g=(n("fb6a"),{name:"Table",data:function(){return{page:1,perPage:5,pages:[]}},computed:{displayedRows:function(){return this.paginate(this.rows)}},methods:{setPages:function(){var e=Math.ceil(this.rows.length/this.perPage);this.pages=[];for(var t=1;t<=e;t++)this.pages.push(t)},paginate:function(e){var t=this.page,n=this.perPage,a=t*n-n,s=t*n;return e.slice(a,s)}},mounted:function(){this.setPages()},watch:{rows:function(){this.setPages()}},props:{toogleCheck:Function,columns:Array,rows:Array,selected:{type:Array,default:function(){return[]}}}}),p=g,f=n("2877"),m=Object(f["a"])(p,u,d,!1,null,null,null),h=m.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("button",{staticClass:"animate-pulse button",attrs:{type:"button",disabled:""}},[e._v(" "+e._s(e.msg)+" ")])])},y=[],_={name:"Loading",props:{msg:String}},b=_,w=(n("08c3"),Object(f["a"])(b,v,y,!1,null,"e4c7e54e",null)),x=w.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",attrs:{role:"alert"}},[n("strong",{staticClass:"font-bold"},[e._v(e._s(e.msg))])])])},j=[],C={name:"Loading",props:{msg:String}},k=C,P=Object(f["a"])(k,T,j,!1,null,null,null),O=P.exports,S=!1,D="http://localhost:8081/",X="import sys\nsys.version",A='import sys\nimport js\nimport json\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\n\nlanguages = json.loads(js.languages)\nrows = languages["rows"]\ncolumns = languages["columns"]\nselected = languages["selected"]\nfiltered_columns = [i for (i, v) in zip(columns, selected) if v]\n\nif len(filtered_columns) < 1:\n    filtered_columns = columns[-1]\n\nlanguages_df = pd.DataFrame(rows)\nX = languages_df.to_dict(\'records\')\ny = languages_df[filtered_columns].values.tolist()\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y)\n\nX_train_pd = pd.DataFrame(X_train)\nX_test_pd = pd.DataFrame(X_test)\nX_train_csv = X_train_pd.to_csv(index=False)\nX_test_csv = X_test_pd.to_csv(index=False)\n\n(X_train, X_test, X_train_csv, X_test_csv)\n',E="import io\nimport csv\nimport js\n\ncsv_content = js.csvContent\n\nreader = csv.DictReader(io.StringIO(csv_content))\nheaders = []\nrows = []\n\nheaders = reader.fieldnames\nfor line in reader:\n    rows.append(line)\n\n(headers, rows)",M={name:"TrainTestSplit",components:{Table:h,Alert:O,Loading:x},data:function(){return{splittingDataset:!1,errorMsg:null,pyodideLoaded:!1,languages:{selected:[!1,!1],columns:["name","language"],rows:[{name:"Pasquin",language:"java"},{name:"Flimflam",language:"java"},{name:"Flimflam2",language:"java"},{name:"Donvidn",language:"python"},{name:"Zoography",language:"python"},{name:"Tetramorph",language:"python"},{name:"Tetramorph1",language:"python"},{name:"Tetramorph2",language:"python"},{name:"Tetramorph3",language:"python"},{name:"Tetramorph4",language:"python"},{name:"Kamagraphy",language:"python"},{name:"Quietya57",language:"c"},{name:"Sequacious",language:"c"},{name:"Sequacious2",language:"c"}]},languagesTrain:{columns:["name","language"],rows:[],csv:""},languagesTest:{columns:["name","language"],rows:[],csv:""}}},methods:{initializePyodide:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,!S){e.next=7;break}return window.languagePluginUrl="".concat(D),e.next=5,a["a"].loadScript("".concat(D,"pyodide.js"));case 5:e.next=10;break;case 7:return window.languagePluginUrl="https://cdn.jsdelivr.net/pyodide/v0.16.1/full/",e.next=10,a["a"].loadScript("https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js");case 10:return e.next=12,window.languagePluginLoader;case 12:return e.next=14,window.pyodide.loadPackage(["pandas","scikit-learn"]);case 14:this.pyodideLoaded=!0,e.next=20;break;case 17:e.prev=17,e.t0=e["catch"](0),this.errorMsg=e.t0;case 20:case"end":return e.stop()}}),e,this,[[0,17]])})));function t(){return e.apply(this,arguments)}return t}(),runPythonSplitDataset:function(){try{var e=window.pyodide.runPython(A),t=Object(o["a"])(e,4),n=t[0],a=t[1],s=t[2],r=t[3];this.languagesTrain.rows=n,this.languagesTest.rows=a,this.languagesTrain.csv=s,this.languagesTest.csv=r}catch(i){this.errorMsg=i}this.splittingDataset=!1},resetTables:function(e,t){if(this.languagesTrain.rows=[],this.languagesTest.rows=[],this.languagesTrain.csv="",this.languagesTest.csv="",this.languagesTrain.columns=e,this.languagesTest.columns=e,this.errorMsg=null,t){this.languages.selected=[];for(var n=0;n<this.languages.selected.length;n++)this.languages.selected.push(!1)}},splitDataset:function(){window.languages=JSON.stringify(this.languages),this.resetTables(this.languages.columns,!1),this.splittingDataset=!0,setTimeout(this.runPythonSplitDataset,500)},downloadDataset:function(){this.download("train.csv",this.languagesTrain.csv),this.download("test.csv",this.languagesTest.csv)},onFileChanged:function(e){var t=e.target.files[0],n=new FileReader,a=this;n.onload=function(e){window.csvContent=e.target.result;var t=window.pyodide.runPython(E),n=Object(o["a"])(t,2),s=n[0],r=n[1];a.languages.columns=s,a.languages.rows=r,a.resetTables(a.languages.columns,!0)},n.readAsText(t)},runTestCommand:function(){console.log(window.pyodide.runPython(X))},download:function(e,t){var n=document.createElement("a");if(n.setAttribute("href","data:text/csv;charset=utf-8,"+encodeURIComponent(t)),n.setAttribute("download",e),document.createEvent){var a=document.createEvent("MouseEvents");a.initEvent("click",!0,!0),n.dispatchEvent(a)}else n.click()},toogleCheck:function(e){this.$set(this.languages.selected,e,!this.languages.selected[e])}},mounted:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.initializePyodide();case 2:this.runTestCommand();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},$=M,F=(n("4746"),Object(f["a"])($,i,l,!1,null,"7eeef7a7",null)),L=F.exports,R={name:"App",components:{TrainTestSplit:L}},z=R,U=Object(f["a"])(z,s,r,!1,null,null,null),q=U.exports,I=n("67b0");n("c898");a["a"].use(I["a"]),a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(q)}}).$mount("#app")},c36c:function(e,t,n){},c898:function(e,t,n){}});
//# sourceMappingURL=app.d428f829.js.map