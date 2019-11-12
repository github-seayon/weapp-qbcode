!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o=e();for(var r in o)("object"==typeof exports?exports:t)[r]=o[r]}}(window,(function(){return function(t){var e={};function o(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=1)}([function(t,e){const o=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],r={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},n={L:1,M:0,Q:3,H:2},s=0,i=1,a=2,h=3,l=4,u=5,c=6,f=7;function g(t,e){let r=1;const s=function(t){const e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!==t?3:0)}(t);for(let t=0,i=o.length;t<=i;t++){let i=0;switch(e){case n.L:i=o[t][0];break;case n.M:i=o[t][1];break;case n.Q:i=o[t][2];break;case n.H:i=o[t][3]}if(s<=i)break;r++}if(r>o.length)throw new Error("Too long data");return r}function d(t){this.mode=r.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(let t=0,e=this.data.length;t<e;t++){const e=[],o=this.data.charCodeAt(t);o>65536?(e[0]=240|(1835008&o)>>>18,e[1]=128|(258048&o)>>>12,e[2]=128|(4032&o)>>>6,e[3]=128|63&o):o>2048?(e[0]=224|(61440&o)>>>12,e[1]=128|(4032&o)>>>6,e[2]=128|63&o):o>128?(e[0]=192|(1984&o)>>>6,e[1]=128|63&o):e[0]=o,this.parsedData.push(e)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function p(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function m(){this.buffer=[],this.length=0}d.prototype={getLength(t){return this.parsedData.length},write(t){for(let e=0,o=this.parsedData.length;e<o;e++)t.put(this.parsedData[e],8)}},p.prototype={addData(t){const e=new d(t);this.dataList.push(e),this.dataCache=null},isDark(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(`${t},${e}`);return this.modules[t][e]},getModuleCount(){return this.moduleCount},make(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(let t=0;t<this.moduleCount;t++){this.modules[t]=new Array(this.moduleCount);for(let e=0;e<this.moduleCount;e++)this.modules[t][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=p.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern(t,e){for(let o=-1;o<=7;o++)if(!(t+o<=-1||this.moduleCount<=t+o))for(let r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(o>=0&&o<=6&&(0===parseInt(r,10)||6===parseInt(r,10))||r>=0&&r<=6&&(0===parseInt(o,10)||6===parseInt(o,10))||o>=2&&o<=4&&r>=2&&r<=4?this.modules[t+o][e+r]=!0:this.modules[t+o][e+r]=!1)},getBestMaskPattern(){let t=0,e=0;for(let o=0;o<8;o++){this.makeImpl(!0,o);const r=w.getLostPoint(this);(0==o||t>r)&&(t=r,e=o)}return e},createMovieClip(t,e,o){const r=t.createEmptyMovieClip(e,o);this.make();for(let t=0;t<this.modules.length;t++){const e=1*t;for(let o=0;o<this.modules[t].length;o++){const n=1*o;this.modules[t][o]&&(r.beginFill(0,100),r.moveTo(n,e),r.lineTo(n+1,e),r.lineTo(n+1,e+1),r.lineTo(n,e+1),r.endFill())}}return r},setupTimingPattern(){for(let t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(let t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=t%2==0)},setupPositionAdjustPattern(){const t=w.getPatternPosition(this.typeNumber);for(let e=0;e<t.length;e++)for(let o=0;o<t.length;o++){const r=t[e],n=t[o];if(null==this.modules[r][n])for(let t=-2;t<=2;t++)for(let e=-2;e<=2;e++)this.modules[r+t][n+e]=-2===t||2===t||-2===e||2===e||0===t&&0===e}},setupTypeNumber(t){const e=w.getBCHTypeNumber(this.typeNumber);for(var o=0;o<18;o++){var r=!t&&1==(e>>o&1);this.modules[Math.floor(o/3)][o%3+this.moduleCount-8-3]=r}for(o=0;o<18;o++){r=!t&&1==(e>>o&1);this.modules[o%3+this.moduleCount-8-3][Math.floor(o/3)]=r}},setupTypeInfo(t,e){const o=this.errorCorrectLevel<<3|e,r=w.getBCHTypeInfo(o);for(var n=0;n<15;n++){var s=!t&&1==(r>>n&1);n<6?this.modules[n][8]=s:n<8?this.modules[n+1][8]=s:this.modules[this.moduleCount-15+n][8]=s}for(n=0;n<15;n++){s=!t&&1==(r>>n&1);n<8?this.modules[8][this.moduleCount-n-1]=s:n<9?this.modules[8][15-n-1+1]=s:this.modules[8][15-n-1]=s}this.modules[this.moduleCount-8][8]=!t},mapData(t,e){let o=-1,r=this.moduleCount-1,n=7,s=0;for(let i=this.moduleCount-1;i>0;i-=2)for(6==i&&i--;;){for(let o=0;o<2;o++)if(null==this.modules[r][i-o]){let a=!1;s<t.length&&(a=1==(t[s]>>>n&1)),w.getMask(e,r,i-o)&&(a=!a),this.modules[r][i-o]=a,-1===--n&&(s++,n=7)}if((r+=o)<0||this.moduleCount<=r){r-=o,o=-o;break}}}},p.PAD0=236,p.PAD1=17,p.createData=function(t,e,o){const r=_.getRSBlocks(t,e),n=new m;for(var s=0;s<o.length;s++){const e=o[s];n.put(e.mode,4),n.put(e.getLength(),w.getLengthInBits(e.mode,t)),e.write(n)}let i=0;for(s=0;s<r.length;s++)i+=r[s].dataCount;if(n.getLengthInBits()>8*i)throw new Error(`code length overflow. (${n.getLengthInBits()}>${8*i})`);for(n.getLengthInBits()+4<=8*i&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(!1);for(;!(n.getLengthInBits()>=8*i||(n.put(p.PAD0,8),n.getLengthInBits()>=8*i));)n.put(p.PAD1,8);return p.createBytes(n,r)},p.createBytes=function(t,e){let o=0,r=0,n=0;const s=new Array(e.length),i=new Array(e.length);for(var a=0;a<e.length;a++){const l=e[a].dataCount,u=e[a].totalCount-l;r=Math.max(r,l),n=Math.max(n,u),s[a]=new Array(l);for(var h=0;h<s[a].length;h++)s[a][h]=255&t.buffer[h+o];o+=l;const c=w.getErrorCorrectPolynomial(u),f=new B(s[a],c.getLength()-1).mod(c);i[a]=new Array(c.getLength()-1);for(h=0;h<i[a].length;h++){const t=h+f.getLength()-i[a].length;i[a][h]=t>=0?f.get(t):0}}let l=0;for(h=0;h<e.length;h++)l+=e[h].totalCount;const u=new Array(l);let c=0;for(h=0;h<r;h++)for(a=0;a<e.length;a++)h<s[a].length&&(u[c++]=s[a][h]);for(h=0;h<n;h++)for(a=0;a<e.length;a++)h<i[a].length&&(u[c++]=i[a][h]);return u},m.prototype={get(t){const e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put(t,e){for(let o=0;o<e;o++)this.putBit(1==(t>>>e-o-1&1))},getLengthInBits(){return this.length},putBit(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};const C={glog(t){if(t<1)throw new Error(`glog(${t})`);return C.LOG_TABLE[t]},gexp(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return C.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(let t=0;t<8;t++)C.EXP_TABLE[t]=1<<t;for(let t=8;t<256;t++)C.EXP_TABLE[t]=C.EXP_TABLE[t-4]^C.EXP_TABLE[t-5]^C.EXP_TABLE[t-6]^C.EXP_TABLE[t-8];for(let t=0;t<255;t++)C.LOG_TABLE[C.EXP_TABLE[t]]=t;function B(t,e){if(void 0===t.length)throw new Error(`${t.length}/${e}`);let o=0;for(;o<t.length&&0==t[o];)o++;this.num=new Array(t.length-o+e);for(let e=0;e<t.length-o;e++)this.num[e]=t[e+o]}function _(t,e){this.totalCount=t,this.dataCount=e}B.prototype={get(t){return this.num[t]},getLength(){return this.num.length},multiply(t){const e=new Array(this.getLength()+t.getLength()-1);for(let o=0;o<this.getLength();o++)for(let r=0;r<t.getLength();r++)e[o+r]^=C.gexp(C.glog(this.get(o))+C.glog(t.get(r)));return new B(e,0)},mod(t){if(this.getLength()-t.getLength()<0)return this;const e=C.glog(this.get(0))-C.glog(t.get(0)),o=new Array(this.getLength());for(let t=0;t<this.getLength();t++)o[t]=this.get(t);for(let r=0;r<t.getLength();r++)o[r]^=C.gexp(C.glog(t.get(r))+e);return new B(o,0).mod(t)}},_.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],_.getRSBlocks=function(t,e){const o=_.getRsBlockTable(t,e);if(void 0===o)throw new Error(`bad rs block @ typeNumber:${t}/errorCorrectLevel:${e}`);const r=o.length/3,n=[];for(let t=0;t<r;t++){const e=o[3*t+0],r=o[3*t+1],s=o[3*t+2];for(let t=0;t<e;t++)n.push(new _(r,s))}return n},_.getRsBlockTable=function(t,e){switch(e){case n.L:return _.RS_BLOCK_TABLE[4*(t-1)+0];case n.M:return _.RS_BLOCK_TABLE[4*(t-1)+1];case n.Q:return _.RS_BLOCK_TABLE[4*(t-1)+2];case n.H:return _.RS_BLOCK_TABLE[4*(t-1)+3];default:return}};const w={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo(t){let e=t<<10;for(;w.getBCHDigit(e)-w.getBCHDigit(w.G15)>=0;)e^=w.G15<<w.getBCHDigit(e)-w.getBCHDigit(w.G15);return(t<<10|e)^w.G15_MASK},getBCHTypeNumber(t){let e=t<<12;for(;w.getBCHDigit(e)-w.getBCHDigit(w.G18)>=0;)e^=w.G18<<w.getBCHDigit(e)-w.getBCHDigit(w.G18);return t<<12|e},getBCHDigit(t){let e=0;for(;0!==parseInt(t,10);)e++,t>>>=1;return e},getPatternPosition:t=>w.PATTERN_POSITION_TABLE[t-1],getMask(t,e,o){switch(t){case s:return(e+o)%2==0;case i:return e%2==0;case a:return o%3==0;case h:return(e+o)%3==0;case l:return(Math.floor(e/2)+Math.floor(o/3))%2==0;case u:return e*o%2+e*o%3==0;case c:return(e*o%2+e*o%3)%2==0;case f:return(e*o%3+(e+o)%2)%2==0;default:throw new Error(`bad maskPattern:${t}`)}},getErrorCorrectPolynomial(t){let e=new B([1],0);for(let o=0;o<t;o++)e=e.multiply(new B([1,C.gexp(o)],0));return e},getLengthInBits(t,e){if(e>=1&&e<10)switch(t){case r.MODE_NUMBER:return 10;case r.MODE_ALPHA_NUM:return 9;case r.MODE_8BIT_BYTE:case r.MODE_KANJI:return 8;default:throw new Error(`mode:${t}`)}else if(e<27)switch(t){case r.MODE_NUMBER:return 12;case r.MODE_ALPHA_NUM:return 11;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 10;default:throw new Error(`mode:${t}`)}else{if(!(e<41))throw new Error(`type:${e}`);switch(t){case r.MODE_NUMBER:return 14;case r.MODE_ALPHA_NUM:return 13;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 12;default:throw new Error(`mode:${t}`)}}},getLostPoint(t){const e=t.getModuleCount();let o=0;for(let r=0;r<e;r++)for(let n=0;n<e;n++){let s=0;const i=t.isDark(r,n);for(let o=-1;o<=1;o++)if(!(r+o<0||e<=r+o))for(let a=-1;a<=1;a++)n+a<0||e<=n+a||0==o&&0==a||i==t.isDark(r+o,n+a)&&s++;s>5&&(o+=3+s-5)}for(let r=0;r<e-1;r++)for(let n=0;n<e-1;n++){let e=0;t.isDark(r,n)&&e++,t.isDark(r+1,n)&&e++,t.isDark(r,n+1)&&e++,t.isDark(r+1,n+1)&&e++,0!=e&&4!=e||(o+=3)}for(let r=0;r<e;r++)for(let n=0;n<e-6;n++)t.isDark(r,n)&&!t.isDark(r,n+1)&&t.isDark(r,n+2)&&t.isDark(r,n+3)&&t.isDark(r,n+4)&&!t.isDark(r,n+5)&&t.isDark(r,n+6)&&(o+=40);for(let r=0;r<e;r++)for(let n=0;n<e-6;n++)t.isDark(n,r)&&!t.isDark(n+1,r)&&t.isDark(n+2,r)&&t.isDark(n+3,r)&&t.isDark(n+4,r)&&!t.isDark(n+5,r)&&t.isDark(n+6,r)&&(o+=40);let r=0;for(let o=0;o<e;o++)for(let n=0;n<e;n++)t.isDark(n,o)&&r++;return o+=10*(Math.abs(100*r/e/e-50)/5)}};function A(t={}){this._options={width:256,height:256,typeNumber:4,fontColor:"#000000",backColor:"#ffffff",correctLevel:n.H};const e="string"==typeof t?{text:t}:t;Object.assign(this._options,e),this._options.text&&this._options.canvasId&&(this._oQRCode=null,this.makeCode(this._options.text))}A.prototype.makeCode=function(t){this._oQRCode=new p(g(t,this._options.correctLevel),this._options.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this.makeImage()},A.prototype.makeImage=function(){let t;t=this._options.usingIn?wx.createCanvasContext(this._options.canvasId,this._options.usingIn):wx.createCanvasContext(this._options.canvasId);const{_options:e}=this,o=this._oQRCode,r=o.getModuleCount(),n=e.padding?(e.width-2*e.padding)/r:e.width/r,s=e.padding?(e.height-2*e.padding)/r:e.height/r,i=Math.round(s),a=Math.round(n);t.setFillStyle("#fff"),t.fillRect(0,0,e.width,e.height),t.save();for(let h=0;h<r;h++)for(let l=0;l<r;l++){const r=o.isDark(h,l),u=e.padding?l*n+e.padding:l*n,c=e.padding?h*s+e.padding:h*s;t.setStrokeStyle(r?e.fontColor:e.backColor),t.setLineWidth(1),t.setFillStyle(r?e.fontColor:e.backColor),t.fillRect(u,c,n,s),t.strokeRect(Math.floor(u)+.5,Math.floor(c)+.5,i),t.strokeRect(Math.ceil(u)-.5,Math.ceil(c)-.5,a,i)}if(e.image&&"object"==typeof e.image){const o=e.width/2-e.image.destWidth/2,r=e.height/2-e.image.destHeight/2;t.drawImage(e.image.imageResource,e.image.dx||o,e.image.dy||r,e.image.destWidth,e.image.destHeight)}t.draw(!1,()=>{setTimeout(()=>{this.exportImage()},800)})},A.prototype.exportImage=function(){if(!this._options.callback||"function"!=typeof this._options.callback)return;const t={x:0,y:0,width:this._options.width,height:this._options.height,destWidth:this._options.width,destHeight:this._options.height,canvasId:this._options.canvasId,success:this._options.callback};wx.canvasToTempFilePath(t,this._options.usingIn)},A.CorrectLevel=n,t.exports=A},function(t,e,o){"use strict";o.r(e);const r=126,n=103,s=104,i=105,a=98,h=101,l=100,u=106,c={CHAR_TILDE:102},f={ANY:1,AB:2,A:3,B:4,C:5},g=[[2,1,2,2,2,2,0,0],[2,2,2,1,2,2,0,0],[2,2,2,2,2,1,0,0],[1,2,1,2,2,3,0,0],[1,2,1,3,2,2,0,0],[1,3,1,2,2,2,0,0],[1,2,2,2,1,3,0,0],[1,2,2,3,1,2,0,0],[1,3,2,2,1,2,0,0],[2,2,1,2,1,3,0,0],[2,2,1,3,1,2,0,0],[2,3,1,2,1,2,0,0],[1,1,2,2,3,2,0,0],[1,2,2,1,3,2,0,0],[1,2,2,2,3,1,0,0],[1,1,3,2,2,2,0,0],[1,2,3,1,2,2,0,0],[1,2,3,2,2,1,0,0],[2,2,3,2,1,1,0,0],[2,2,1,1,3,2,0,0],[2,2,1,2,3,1,0,0],[2,1,3,2,1,2,0,0],[2,2,3,1,1,2,0,0],[3,1,2,1,3,1,0,0],[3,1,1,2,2,2,0,0],[3,2,1,1,2,2,0,0],[3,2,1,2,2,1,0,0],[3,1,2,2,1,2,0,0],[3,2,2,1,1,2,0,0],[3,2,2,2,1,1,0,0],[2,1,2,1,2,3,0,0],[2,1,2,3,2,1,0,0],[2,3,2,1,2,1,0,0],[1,1,1,3,2,3,0,0],[1,3,1,1,2,3,0,0],[1,3,1,3,2,1,0,0],[1,1,2,3,1,3,0,0],[1,3,2,1,1,3,0,0],[1,3,2,3,1,1,0,0],[2,1,1,3,1,3,0,0],[2,3,1,1,1,3,0,0],[2,3,1,3,1,1,0,0],[1,1,2,1,3,3,0,0],[1,1,2,3,3,1,0,0],[1,3,2,1,3,1,0,0],[1,1,3,1,2,3,0,0],[1,1,3,3,2,1,0,0],[1,3,3,1,2,1,0,0],[3,1,3,1,2,1,0,0],[2,1,1,3,3,1,0,0],[2,3,1,1,3,1,0,0],[2,1,3,1,1,3,0,0],[2,1,3,3,1,1,0,0],[2,1,3,1,3,1,0,0],[3,1,1,1,2,3,0,0],[3,1,1,3,2,1,0,0],[3,3,1,1,2,1,0,0],[3,1,2,1,1,3,0,0],[3,1,2,3,1,1,0,0],[3,3,2,1,1,1,0,0],[3,1,4,1,1,1,0,0],[2,2,1,4,1,1,0,0],[4,3,1,1,1,1,0,0],[1,1,1,2,2,4,0,0],[1,1,1,4,2,2,0,0],[1,2,1,1,2,4,0,0],[1,2,1,4,2,1,0,0],[1,4,1,1,2,2,0,0],[1,4,1,2,2,1,0,0],[1,1,2,2,1,4,0,0],[1,1,2,4,1,2,0,0],[1,2,2,1,1,4,0,0],[1,2,2,4,1,1,0,0],[1,4,2,1,1,2,0,0],[1,4,2,2,1,1,0,0],[2,4,1,2,1,1,0,0],[2,2,1,1,1,4,0,0],[4,1,3,1,1,1,0,0],[2,4,1,1,1,2,0,0],[1,3,4,1,1,1,0,0],[1,1,1,2,4,2,0,0],[1,2,1,1,4,2,0,0],[1,2,1,2,4,1,0,0],[1,1,4,2,1,2,0,0],[1,2,4,1,1,2,0,0],[1,2,4,2,1,1,0,0],[4,1,1,2,1,2,0,0],[4,2,1,1,1,2,0,0],[4,2,1,2,1,1,0,0],[2,1,2,1,4,1,0,0],[2,1,4,1,2,1,0,0],[4,1,2,1,2,1,0,0],[1,1,1,1,4,3,0,0],[1,1,1,3,4,1,0,0],[1,3,1,1,4,1,0,0],[1,1,4,1,1,3,0,0],[1,1,4,3,1,1,0,0],[4,1,1,1,1,3,0,0],[4,1,1,3,1,1,0,0],[1,1,3,1,4,1,0,0],[1,1,4,1,3,1,0,0],[3,1,1,1,4,1,0,0],[4,1,1,1,3,1,0,0],[2,1,1,4,1,2,0,0],[2,1,1,2,1,4,0,0],[2,1,1,2,3,2,0,0],[2,3,3,1,1,1,2,0]];function d(t,e){return void 0===e?t>=32?t-32:t+64:parseInt(String.fromCharCode(t)+String.fromCharCode(e),10)}function p(t){return t>=48&&t<=57?f.ANY:t>=32&&t<=95?f.AB:t<32?f.A:f.B}function m(t,e){const o=p(t);return o===f.ANY||(o===f.AB||(o===f.A&&e===f.A||o===f.B&&e===f.B))}var C=function({canvasId:t,text:e,x:o=0,y:C=0,width:B=0,height:_=0,usingIn:w,callback:A,fontColor:y="#000000",backColor:L="#ffffff"}){const D=t&&wx.createCanvasContext(t,w),E=parseInt(B,10),b=parseInt(_,10),k=function(t){const e={currcs:f.C},o=function(t){const e=[];for(let o=0;o<t.length;o++)e.push(t.charCodeAt(o));return e}(t);let g=o[0]===r?1:0;const C=o.length>0?p(o[g++]):f.AB,B=o.length>0?p(o[g++]):f.AB;function _(t,o,r){const n=[];let s=-1,i=r;if(m(t,i))i===f.C&&(-1===o?(s=l,i=f.B):-1===o||m(o,i)||(m(o,f.A)?(s=h,i=f.A):(s=l,i=f.B)));else if(-1===o||m(o,i))s=a;else switch(i){case f.A:s=l,i=f.B;break;case f.B:s=h,i=f.A}return-1!==s?(n.push(s),n.push(d(o))):i===f.C?n.push(d(t,o)):n.push(d(t)),e.currcs=i,n}e.currcs=function(t,e){let o=0;return o+=t===f.A?1:0,o+=t===f.B?-1:0,o+=e===f.A?1:0,(o+=e===f.B?-1:0)>0?f.A:f.B}(C,B),e.currcs=function(t,e){for(let n=0;n<o.length;n++){const o=t[n];if((o<48||o>57)&&o!==r)return e}return f.C}(o,e.currcs);let w=new Array;switch(e.currcs){case f.A:w.push(n);break;case f.B:w.push(s);break;default:w.push(i)}for(let t=0;t<o.length;t++){let r=o[t];r in c&&(w.push(c[r]),t++,r=o[t]);const n=o.length>t+1?o[t+1]:-1;w=w.concat(_(r,n,e.currcs)),e.currcs===f.C&&t++}let A=w[0];for(let t=1;t<w.length;t++)A+=t*w[t];return w.push(A%103),w.push(u),w}(e);D.setFillStyle(L),D.fillRect(o,C,E,b);const T=E/(11*(k.length-3)+35);for(let t=0,e=o,r=C;t<k.length;t++){const o=k[t];for(let t=0;t<8;t+=2){const n=g[o][t]*T,s=_-r,i=g[o][t+1]*T;n>0&&(D.setFillStyle(y),D.fillRect(e,r,n,s)),e+=n+i}}D.draw(!1,()=>{setTimeout(()=>{if(!A||"function"!=typeof A)return;const e={x:0,y:0,width:B,height:_,destWidth:B,destHeight:_,canvasId:t,success:A};wx.canvasToTempFilePath(e,w)},800)})},B=o(0),_=o.n(B);o.d(e,"Barcode",(function(){return y})),o.d(e,"Qrcode",(function(){return L}));const{windowWidth:w}=wx.getSystemInfoSync();function A(t){return Math.round(w*t/750)}function y(t={}){const e={...t,width:A(t.width||0),height:A(t.height||0)};C(e)}function L(t={}){const{image:e}=t;e&&(e.destWidth=A(e.destWidth||0),e.destHeight=A(e.destHeight||0));const o={...t,image:e,width:A(t.width||0),height:A(t.height||0)};new _.a(o)}e.default={Barcode:y,Qrcode:L}}])}));