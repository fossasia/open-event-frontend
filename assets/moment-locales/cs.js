(function(e,n){"object"==typeof exports&&"undefined"!=typeof module&&"function"==typeof require?n(require("../moment")):"function"==typeof define&&define.amd?define(["../moment"],n):n(e.moment)})(this,function(e){"use strict"
var n="leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),t="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_")
function r(e){return e>1&&e<5&&1!=~~(e/10)}function s(e,n,t,s){var u=e+" "
switch(t){case"s":return n||s?"pár sekund":"pár sekundami"
case"ss":return n||s?u+(r(e)?"sekundy":"sekund"):u+"sekundami"
case"m":return n?"minuta":s?"minutu":"minutou"
case"mm":return n||s?u+(r(e)?"minuty":"minut"):u+"minutami"
case"h":return n?"hodina":s?"hodinu":"hodinou"
case"hh":return n||s?u+(r(e)?"hodiny":"hodin"):u+"hodinami"
case"d":return n||s?"den":"dnem"
case"dd":return n||s?u+(r(e)?"dny":"dní"):u+"dny"
case"M":return n||s?"měsíc":"měsícem"
case"MM":return n||s?u+(r(e)?"měsíce":"měsíců"):u+"měsíci"
case"y":return n||s?"rok":"rokem"
case"yy":return n||s?u+(r(e)?"roky":"let"):u+"lety"}}return e.defineLocale("cs",{months:n,monthsShort:t,monthsParse:function(e,n){var t,r=[]
for(t=0;t<12;t++)r[t]=new RegExp("^"+e[t]+"$|^"+n[t]+"$","i")
return r}(n,t),shortMonthsParse:function(e){var n,t=[]
for(n=0;n<12;n++)t[n]=new RegExp("^"+e[n]+"$","i")
return t}(t),longMonthsParse:function(e){var n,t=[]
for(n=0;n<12;n++)t[n]=new RegExp("^"+e[n]+"$","i")
return t}(n),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm",l:"D. M. YYYY"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT"
case 1:case 2:return"[v] dddd [v] LT"
case 3:return"[ve středu v] LT"
case 4:return"[ve čtvrtek v] LT"
case 5:return"[v pátek v] LT"
case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT"
case 1:case 2:return"[minulé] dddd [v] LT"
case 3:return"[minulou středu v] LT"
case 4:case 5:return"[minulý] dddd [v] LT"
case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:s,ss:s,m:s,mm:s,h:s,hh:s,d:s,dd:s,M:s,MM:s,y:s,yy:s},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}})})

//# sourceMappingURL=cs.map