(function(){"use strict";
window.SarkariFileTools=window.SarkariFileTools||{};
var LIB="https://sarkarifile-tools.pages.dev/libs/pdf-lib/pdf-lib.min.js";
function getPdfLib(){if(window.PDFLib)return Promise.resolve(window.PDFLib);if(window.__sfPdfLibPromise)return window.__sfPdfLibPromise;window.__sfPdfLibPromise=new Promise(function(ok,no){var s=document.createElement("script");s.src=LIB;s.async=true;s.onload=function(){window.PDFLib?ok(window.PDFLib):no(Error("PDFLib नहीं मिला"))};s.onerror=function(){no(Error("PDF library लोड नहीं हो पाई"))};document.head.appendChild(s)});return window.__sfPdfLibPromise}
function safeName(n){return(n||"document.pdf").replace(/\.pdf$/i,"").replace(/[\\/:*?"<>|]+/g,"-").slice(0,80)||"document"}
function clamp(v,min,max,def){v=Number(v);return Number.isFinite(v)?Math.min(max,Math.max(min,v)):def}
window.SarkariFileTools.initPdfWatermark=function(root){
 if(root.dataset.sfpwReady)return;root.dataset.sfpwReady="1";
 var input=root.querySelector("[data-sfpw-file]"),preview=root.querySelector("[data-sfpw-preview]"),selected=root.querySelector("[data-sfpw-selected]"),status=root.querySelector("[data-sf-status]"),text=root.querySelector("[data-sfpw-text]"),size=root.querySelector("[data-sfpw-size]"),color=root.querySelector("[data-sfpw-color]"),position=root.querySelector("[data-sfpw-position]"),rotation=root.querySelector("[data-sfpw-rotation]"),pages=root.querySelector("[data-sfpw-pages]"),download=root.querySelector("[data-sfpw-download]"),clear=root.querySelector("[data-sfpw-clear]"),file=null,count=0,busy=false;
 function update(){download.disabled=!file||!count||busy||!text.value.trim();clear.disabled=!file||busy;selected.textContent=file?file.name+" · "+count+" पेज":"अभी कोई PDF चुनी नहीं गई है।"}
 function reset(){file=null;count=0;input.value="";preview.replaceChildren();status.textContent="";update()}
 input.addEventListener("change",function(){file=input.files&&input.files[0]||null;count=0;preview.replaceChildren();if(!file){update();return}status.textContent="पेज थंबनेल बनाए जा रहे हैं…";window.SarkariFileTools.previewPdf.render(file,preview,{width:145}).then(function(n){count=n;status.textContent="प्रीव्यू तैयार है। वॉटरमार्क का टेक्स्ट और जगह चुनें।";update()}).catch(function(e){file=null;status.textContent="Preview नहीं बन पाया: "+(e.message||"PDF पढ़ने में समस्या");preview.replaceChildren();update()});update()});
 [text,size,color,position,rotation,pages].forEach(function(el){el.addEventListener("input",update);el.addEventListener("change",update)});
 clear.addEventListener("click",reset);
 download.addEventListener("click",async function(){if(!file||busy||!text.value.trim())return;busy=true;update();
  try{status.textContent="PDF पर वॉटरमार्क लगाया जा रहा है…";var P=await getPdfLib(),doc=await P.PDFDocument.load(await file.arrayBuffer()),font=await doc.embedFont(P.StandardFonts.HelveticaBold),label=text.value.trim().slice(0,180),fs=clamp(size.value,8,96,36),rgb=color.value||"#777777",r=parseInt(rgb.slice(1,3),16)/255,g=parseInt(rgb.slice(3,5),16)/255,b=parseInt(rgb.slice(5,7),16)/255,rot=clamp(rotation.value,-90,90, -45),pos=position.value,range=pages.value.trim(),selectedPages=new Set();
  if(range){range.split(",").forEach(function(part){var p=part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);if(!p)throw Error("पेज रेंज गलत है। उदाहरण: 1-3, 5");var a=Number(p[1]),z=Number(p[2]||p[1]);if(a<1||z<a||z>doc.getPageCount())throw Error("पेज नंबर PDF की सीमा में रखें।");for(var k=a;k<=z;k++)selectedPages.add(k-1)})}
  var rad=rot*Math.PI/180;doc.getPages().forEach(function(page,i){if(selectedPages.size&&!selectedPages.has(i))return;var w=page.getWidth(),h=page.getHeight(),tw=font.widthOfTextAtSize(label,fs),x=(w-tw)/2,y=(h-fs)/2;
   if(pos==="top")y=h-fs-28;else if(pos==="bottom")y=28;else if(pos==="diagonal"){x=(w-tw)/2;y=(h-fs)/2}
   page.drawText(label,{x:Math.max(0,Math.min(x,w-tw)),y:Math.max(0,Math.min(y,h-fs)),size:fs,font:font,color:P.rgb(r,g,b),rotate:P.degrees(pos==="diagonal"?-45:rot)});
  });
  var bytes=await doc.save(),url=URL.createObjectURL(new Blob([bytes],{type:"application/pdf"})),a=document.createElement("a");a.href=url;a.download=safeName(file.name)+"-watermarked.pdf";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},60000);status.textContent="तैयार! वॉटरमार्क वाली PDF डाउनलोड हो रही है।";
  }catch(e){console.error("PDF watermark error",e);status.textContent=e&&e.message&&/पेज|रेंज/.test(e.message)?e.message:"वॉटरमार्क नहीं लगाया जा सका। PDF password-protected हो सकती है या फ़ाइल में समस्या हो सकती है।"}
  finally{busy=false;update()}
 });
 update()
};
})();