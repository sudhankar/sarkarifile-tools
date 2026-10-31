(function () {
  "use strict";
  window.SarkariFileTools = window.SarkariFileTools || {};

  var $ = function (root, selector) { return root.querySelector(selector); };
  var $$ = function (root, selector) { return Array.prototype.slice.call(root.querySelectorAll(selector)); };
  var TEMPLATES = {
    funny: {
      hi: [
        "{{name}} जी, आपकी हँसी पर GST लगना चाहिए—इतनी महँगी खुशी मुफ्त में बाँट रहे हो! 😂",
        "Breaking News: {{name}} ने आज फिर काम करने का नाटक किया। चाय विभाग ने जाँच शुरू कर दी है! ☕🤣",
        "आपके फोन में जरूरी अपडेट आया है: मुस्कुराइए, वरना आपका चेहरा ‘Low Battery’ दिखा रहा है! 🔋😄",
        "{{name}} जी, आप इतने खास हैं कि आपकी आलस को भी लोग Talent समझ लेते हैं! 😜",
        "एक रिसर्च के अनुसार, जो यह मैसेज पढ़ रहा है उसे तुरंत समोसा और छुट्टी चाहिए। रिपोर्ट सही लगती है! 😂"
      ],
      hinglish: [
        "{{name}} bro, tumhari smile par GST lagna chahiye—इतनी premium खुशी free में बाँट रहे हो! 😂",
        "Breaking News: {{name}} ने आज फिर काम करने का acting किया. Chai department investigation कर रहा है! ☕🤣",
        "Phone update: Smile कर लो, वरना face ‘Low Battery’ दिखा रहा है! 🔋😄",
        "{{name}} ji, आपकी आलस भी premium quality की है. Respect! 😎",
        "Research कहती है कि ये message पढ़ने वाले को समोसा और छुट्टी दोनों चाहिए. Case closed! 😂"
      ],
      en: [
        "{{name}}, your smile is so valuable it should come with a GST invoice. Keep spreading the premium joy! 😂",
        "Breaking News: {{name}} was spotted pretending to work. The Tea Department has launched an investigation! ☕🤣",
        "Important phone update: Please smile. Your face is currently showing ‘Low Battery’. 🔋😄",
        "{{name}}, even your laziness has premium features. We respect the dedication! 😜",
        "A scientific study says whoever reads this message deserves a snack and an unexpected holiday. Seems legit! 😂"
      ]
    },
    friendship: {
      hi: [
        "{{name}}, तू दोस्त नहीं, मेरी ज़िंदगी का वो ऐप है जो बैटरी तो खाता है, लेकिन Uninstall नहीं होता! ❤️😂",
        "दोस्ती का नियम: मुसीबत में सबसे पहले तुझे याद करूँगा… और काम पड़ने पर भी! 🤝😜",
        "दुनिया चाहे कितनी भी Smart हो जाए, तेरे जैसे नमूने की कमी हमेशा रहेगी। खुश रह! 😂",
        "{{name}}, दोस्ती Wi-Fi जैसी है—कभी signal कम होता है, पर connection दिल से बना रहता है! 💛"
      ],
      hinglish: [
        "{{name}}, tu दोस्त नहीं, meri life ka वो app hai jo battery खाता है but uninstall नहीं होता! ❤️😂",
        "Friendship rule: मुसीबत में सबसे पहले तुझे याद करूँगा… aur काम पड़ने पर भी! 🤝😜",
        "World कितनी भी smart हो जाए, तेरे जैसे नमूने की कमी हमेशा रहेगी. Stay blessed! 😂",
        "Dosti Wi-Fi जैसी है—signal कभी low, but दिल वाला connection always full! 💛"
      ],
      en: [
        "{{name}}, you're not just a friend. You're that app that drains my battery but can never be uninstalled! ❤️😂",
        "Friendship rule: I'll remember you first in trouble… and whenever I need a favour too! 🤝😜",
        "The world may become smarter, but it will never find another original character like you. Stay awesome! 😂",
        "Friendship is like Wi-Fi: the signal may be weak sometimes, but the connection stays in the heart. 💛"
      ]
    },
    birthday: {
      hi: [
        "{{name}} को जन्मदिन की ढेर सारी बधाई! उम्र बस नंबर है… लेकिन केक की मोमबत्तियाँ अब Fire Safety का मामला हैं! 🎂😂",
        "आज आपका दिन है, इसलिए आज calories count नहीं होंगी। केक खाओ, मुस्कुराओ और treat देना मत भूलना! 🎉",
        "भगवान आपको लंबी उम्र, खुशियाँ और इतना पैसा दे कि अगली birthday party का bill देखकर calculator भी मुस्कुराए! 🥳"
      ],
      hinglish: [
        "Happy Birthday {{name}}! Age is just a number… लेकिन cake की candles अब Fire Safety का topic हैं! 🎂😂",
        "आज आपका day है. Calories count नहीं होंगी—cake खाओ, smile करो और treat देना मत भूलना! 🎉",
        "May God give you long life, happiness aur इतना पैसा कि party bill देखकर calculator भी smile करे! 🥳"
      ],
      en: [
        "Happy Birthday, {{name}}! Age is just a number… but those cake candles are now a fire-safety discussion! 🎂😂",
        "It's your day, so calories don't count. Eat cake, smile big and remember: the treat is not optional! 🎉",
        "Wishing you joy, good health and enough money to make your next birthday bill look adorable! 🥳"
      ]
    },
    love: {
      hi: [
        "तुम्हें देखकर दिल Wi-Fi जैसा हो जाता है—बिना password पूछे connect होना चाहता है। 💖📶",
        "तुम्हारी मुस्कान दिन का वो notification है जिसे मैं कभी mute नहीं करना चाहता। 😊❤️",
        "अगर खुशी का कोई पता होता, तो शायद उसका रास्ता तुम्हारे पास से होकर जाता। बस इतना कहना था। 🌷"
      ],
      hinglish: [
        "Tumhe देखकर दिल Wi-Fi जैसा हो जाता है—बिना password पूछे connect होना चाहता है. 💖📶",
        "Your smile दिन का वो notification है जिसे मैं कभी mute नहीं करना चाहता. 😊❤️",
        "अगर happiness का कोई address होता, शायद उसका रास्ता तुम्हारे पास से होकर जाता. 🌷"
      ],
      en: [
        "Whenever I see you, my heart turns into Wi-Fi—trying to connect without even asking for a password. 💖📶",
        "Your smile is the one notification I never want to mute. 😊❤️",
        "If happiness had an address, I think its directions would pass right by you. 🌷"
      ]
    },
    office: {
      hi: [
        "प्रिय {{name}}, आपकी मेहनत देखकर Excel भी सोचता है—इतने confidence से खाली cells कौन छोड़ता है! 😄📊",
        "आज का Office मंत्र: पहले चाय, फिर काम, फिर एक और चाय… और उसके बाद काम पर विचार। ☕😂",
        "आपका काम इतना शानदार है कि Monday भी आपसे थोड़ा डरता है। Keep going! 💼😎"
      ],
      hinglish: [
        "Dear {{name}}, आपकी मेहनत देखकर Excel भी पूछता है—इतने confidence से blank cells कौन छोड़ता है! 😄📊",
        "Office mantra: पहले chai, फिर work, फिर एक और chai… उसके बाद work पर विचार. ☕😂",
        "Your work इतना शानदार है कि Monday भी आपसे थोड़ा डरता है. Keep going! 💼😎"
      ],
      en: [
        "Dear {{name}}, your work is so impressive that even Excel wonders who leaves blank cells with such confidence! 😄📊",
        "Today's office mantra: Coffee first, work second, coffee again… then schedule a meeting about the work. ☕😂",
        "Your work is so strong that even Monday is a little intimidated. Keep going! 💼😎"
      ]
    },
    motivation: {
      hi: [
        "रास्ते में रुकावट आए तो घबराना मत—कभी-कभी GPS भी ‘Recalculating’ करता है। चलते रहो! 🚀",
        "धीरे चलना भी progress है। बस चलते रहो—तुम्हारा अगला कदम तुम्हें मंज़िल के करीब ले जा सकता है। 🌱",
        "आज का छोटा प्रयास कल की बड़ी जीत बन सकता है। खुद पर भरोसा रखो! ✨"
      ],
      hinglish: [
        "रास्ते में problem आए तो घबराना मत—कभी-कभी GPS भी ‘Recalculating’ करता है. Keep moving! 🚀",
        "Slow चलना भी progress है. बस चलते रहो—next step तुम्हें मंज़िल के करीब ले जाएगा. 🌱",
        "आज का छोटा effort कल की बड़ी जीत बन सकता है. Believe in yourself! ✨"
      ],
      en: [
        "When the road gets confusing, don't panic—even GPS says ‘Recalculating’. Keep moving! 🚀",
        "Moving slowly is still progress. Keep going; your next step may bring you closer to the goal. 🌱",
        "A small effort today can become a big win tomorrow. Keep believing in yourself! ✨"
      ]
    },
    sorry: {
      hi: [
        "मुझसे गलती हुई, और मैं उसे मानता/मानती हूँ। सॉरी! अगली बार बेहतर करने की पूरी कोशिश रहेगी। 🙏",
        "नाराज़गी आपकी जायज़ है, लेकिन एक मौका सुधार का भी दे दीजिए। दिल से माफ़ी। 💛",
        "मेरी गलती को इतना बड़ा मत बनाइए… मैं पहले ही उसे दिल से uninstall कर चुका/चुकी हूँ। सॉरी! 😅"
      ],
      hinglish: [
        "मेरी गलती थी और I own it. Sorry! अगली बार better करने की पूरी कोशिश रहेगी. 🙏",
        "आपकी नाराज़गी valid है, but एक chance सुधार का भी दे दीजिए. दिल से sorry. 💛",
        "मेरी गलती को इतना बड़ा मत बनाइए… मैंने उसे दिल से uninstall कर दिया है. Sorry! 😅"
      ],
      en: [
        "I made a mistake, and I own it. I'm sorry. I'll do my best to handle things better next time. 🙏",
        "Your feelings are valid. I hope you'll give me a chance to make things right. Truly sorry. 💛",
        "Please don't make my mistake a permanent feature… I've already uninstalled it from my heart. Sorry! 😅"
      ]
    },
    festival: {
      hi: [
        "आपके जीवन में खुशियों की रोशनी, अपनों का साथ और हर दिन नई उम्मीद लेकर आए। ढेर सारी शुभकामनाएँ! ✨🎉",
        "त्योहार की मिठास आपके घर-आँगन में हमेशा बनी रहे। खुश रहिए, सुरक्षित रहिए और मुस्कुराते रहिए! 🪔💛",
        "खुशियों का मौसम आपके नाम हो, हर सपना धीरे-धीरे मुकाम पाए। हार्दिक शुभकामनाएँ! 🌸"
      ],
      hinglish: [
        "आपकी life में खुशियों की light, अपनों का साथ aur हर दिन नई उम्मीद लेकर आए. Best wishes! ✨🎉",
        "त्योहार की मिठास आपके घर में हमेशा बनी रहे. खुश रहिए, safe रहिए aur मुस्कुराते रहिए! 🪔💛",
        "खुशियों का मौसम आपके नाम हो, हर dream अपना मुकाम पाए. शुभकामनाएँ! 🌸"
      ],
      en: [
        "May your days shine with happiness, your home be filled with warmth and every new day bring fresh hope. Best wishes! ✨🎉",
        "May the sweetness of the festival stay with your family. Stay happy, stay safe and keep smiling! 🪔💛",
        "Wishing you a season full of joy and dreams that slowly find their way to reality. 🌸"
      ]
    }
  };

  var EMOJI = { funny: "😂", friendship: "🤝", birthday: "🎂", love: "💖", office: "💼", motivation: "🚀", sorry: "🙏", festival: "🎉" };
  var THEMES = { candy: ["#ff5470", "#f6a83d"], sunset: ["#ff8b55", "#ffd36e"], midnight: ["#172b55", "#5744a8"], rose: ["#ed8aab", "#a84e8a"], mint: ["#70cbb3", "#c4e88d"] };

  function initFunnyMessageShareMaker(root) {
    if (!root || root.dataset.sfFmReady === "true") return;
    var el = {
      category: $(root, "[data-category]"), language: $(root, "[data-language]"), recipient: $(root, "[data-recipient]"), sender: $(root, "[data-sender]"), custom: $(root, "[data-custom-message]"), theme: $(root, "[data-theme]"), difficulty: $(root, "[data-difficulty]"),
      count: $(root, "[data-char-count]"), card: $(root, "[data-message-card]"), cardChip: $(root, "[data-card-chip]"), cardEmoji: $(root, "[data-card-emoji]"), cardTo: $(root, "[data-card-to]"), preview: $(root, "[data-message-preview]"), cardFrom: $(root, "[data-card-from]"), status: $(root, "[data-status]"), shareStatus: $(root, "[data-share-status]"),
      incoming: $(root, "[data-incoming]"), incomingText: $(root, "[data-incoming-text]"), includeLink: $(root, "[data-include-message-link]"), gameStage: $(root, "[data-game-stage]"), playfield: $(root, "[data-playfield]"), runner: $(root, "[data-runner]"), gameHint: $(root, "[data-game-hint]"), dodgeCount: $(root, "[data-dodge-count]"), progress: $(root, "[data-progress]"), reveal: $(root, "[data-reveal]"), revealed: $(root, "[data-revealed-message]"), gameResult: $(root, "[data-game-result]")
    };
    var currentMessage = "";
    var currentTemplate = "";
    var escapes = 0;
    var escapeLimit = 6;
    var lastEscapeAt = 0;
    var gameStartedAt = 0;
    var gameActive = false;
    var gameFinished = false;
    var currentX = 0;
    var currentY = 0;
    var readAloud = false;
    var speech = window.speechSynthesis || null;

    function safeText(value, max) { return String(value == null ? "" : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max || 700); }
    function replaceNames(text) {
      var name = safeText(el.recipient.value, 40) || (el.language.value === "en" ? "friend" : "दोस्त");
      var sender = safeText(el.sender.value, 40) || (el.language.value === "en" ? "your friend" : "आपका दोस्त");
      return String(text || "").replace(/\{\{\s*(name|नाम)\s*\}\}/gi, name).replace(/\{\{\s*(sender|भेजनेवाला)\s*\}\}/gi, sender);
    }
    function chooseTemplate(random) {
      var category = el.category.value;
      var lang = el.language.value;
      var collection = TEMPLATES[category] && TEMPLATES[category][lang] ? TEMPLATES[category][lang] : TEMPLATES.funny.hi;
      if (!collection || !collection.length) collection = TEMPLATES.funny.hi;
      var index = random ? Math.floor(Math.random() * collection.length) : 0;
      currentTemplate = collection[index];
      return currentTemplate;
    }
    function getCurrentMessage(randomTemplate) {
      var raw = safeText(el.custom.value, 700);
      if (raw) return replaceNames(raw);
      if (!currentTemplate || randomTemplate) chooseTemplate(!!randomTemplate);
      return replaceNames(currentTemplate || chooseTemplate(true));
    }
    function setStatus(message, isError, share) {
      var target = share ? el.shareStatus : el.status;
      if (!target) return;
      target.textContent = message || "";
      target.classList.toggle("is-error", !!isError);
    }
    function refreshPreview(message) {
      currentMessage = safeText(message || getCurrentMessage(false), 700);
      if (!currentMessage) currentMessage = "यहाँ आपका संदेश दिखाई देगा।";
      el.preview.textContent = currentMessage;
      var name = safeText(el.recipient.value, 40);
      var sender = safeText(el.sender.value, 40);
      el.cardTo.textContent = name ? "खास तौर पर " + name + " के लिए" : (el.language.value === "en" ? "A little message just for you" : "एक खास इंसान के लिए");
      el.cardFrom.textContent = sender ? "दिल से, " + sender : (el.language.value === "en" ? "With good vibes 💛" : "दिल से, आपका दोस्त 💛");
      el.cardEmoji.textContent = EMOJI[el.category.value] || "💌";
      el.cardChip.textContent = el.language.value === "en" ? "JUST FOR YOU" : (el.language.value === "hinglish" ? "SIRF TUMHARE LIYE" : "सिर्फ आपके लिए");
      el.card.classList.remove("is-candy", "is-sunset", "is-midnight", "is-rose", "is-mint");
      el.card.classList.add("is-" + (THEMES[el.theme.value] ? el.theme.value : "candy"));
      el.count.textContent = String(el.custom.value.length);
    }
    function generate(random) {
      var message = getCurrentMessage(!!random);
      refreshPreview(message);
      setStatus(random ? "एक नया Surprise Message तैयार है!" : "आपका मैसेज तैयार है। अब कॉपी, शेयर या चैलेंज खेलें।", false, false);
      setStatus("", false, true);
      return message;
    }
    function getShareUrl(includeMessage) {
      var url;
      try { url = new URL(window.location.href); } catch (err) { return window.location.href; }
      ["sfchallenge", "sfmsg", "sfby", "sfto", "sflang", "sftype"].forEach(function (key) { url.searchParams.delete(key); });
      url.searchParams.set("sfchallenge", "1");
      if (includeMessage) {
        if (currentMessage.length > 500) {
          setStatus("Challenge link में संदेश जोड़ने के लिए 500 अक्षरों तक छोटा करें। WhatsApp या Share में पूरा मैसेज भेज सकते हैं।", true, true);
        } else {
          url.searchParams.set("sfmsg", currentMessage);
          if (el.sender.value) url.searchParams.set("sfby", safeText(el.sender.value, 40));
          if (el.recipient.value) url.searchParams.set("sfto", safeText(el.recipient.value, 40));
          url.searchParams.set("sflang", el.language.value);
          url.searchParams.set("sftype", el.category.value);
        }
      }
      return url.toString();
    }
    function shareText(includeUrl) {
      var intro = el.language.value === "en" ? "💌 A little message for you!" : "💌 आपके लिए एक छोटा-सा मैसेज!";
      var invite = el.includeLink.checked
        ? (el.language.value === "en" ? "Catch the button to reveal it 😜" : "इसे पकड़कर पूरा पढ़िए 😜")
        : (el.language.value === "en" ? "Make your own fun message challenge here 😜" : "अपना मजेदार मैसेज और चैलेंज यहाँ बनाइए 😜");
      var text = intro + "\n\n" + currentMessage + "\n\n" + invite;
      if (includeUrl) text += "\n" + getShareUrl(!!el.includeLink.checked);
      return text;
    }
    function copyText(text, successMessage, isShare) {
      function done(ok) {
        if (ok) setStatus(successMessage, false, !!isShare);
        else setStatus("कॉपी नहीं हो पाया। टेक्स्ट चुनकर मैन्युअली कॉपी करें।", true, !!isShare);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }).catch(function () { done(fallbackCopy(text)); });
      } else done(fallbackCopy(text));
    }
    function fallbackCopy(text) {
      var area = document.createElement("textarea");
      area.value = text; area.setAttribute("readonly", "readonly");
      area.style.position = "fixed"; area.style.left = "-9999px"; area.style.top = "0";
      root.appendChild(area); area.focus(); area.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
      area.remove(); return ok;
    }
    function openWhatsApp() {
      var text = shareText(true);
      var link = "https://wa.me/?text=" + encodeURIComponent(text);
      window.open(link, "_blank", "noopener,noreferrer");
      setStatus("WhatsApp share window खुल रहा है। भेजने से पहले संदेश देख लें।", false, true);
    }
    function nativeShare() {
      var url = getShareUrl(!!el.includeLink.checked);
      var data = { title: "Funny Message Challenge", text: shareText(false) + "\n\n" + url, url: url };
      if (navigator.share) {
        navigator.share(data).then(function () { setStatus("Share sheet खोल दी गई।", false, true); }).catch(function (err) {
          if (err && err.name !== "AbortError") setStatus("Share उपलब्ध नहीं हुआ। WhatsApp या Copy विकल्प इस्तेमाल करें।", true, true);
        });
      } else openWhatsApp();
    }
    function roundedRect(ctx, x, y, w, h, r) {
      var radius = Math.min(r, w / 2, h / 2);
      ctx.beginPath(); ctx.moveTo(x + radius, y); ctx.arcTo(x + w, y, x + w, y + h, radius); ctx.arcTo(x + w, y + h, x, y + h, radius); ctx.arcTo(x, y + h, x, y, radius); ctx.arcTo(x, y, x + w, y, radius); ctx.closePath();
    }
    function wrapCanvasText(ctx, text, maxWidth) {
      var paragraphs = String(text || "").split(/\n/);
      var lines = [];
      paragraphs.forEach(function (paragraph) {
        var words = paragraph.split(/\s+/);
        var line = "";
        words.forEach(function (word) {
          var test = line ? line + " " + word : word;
          if (line && ctx.measureText(test).width > maxWidth) { lines.push(line); line = word; }
          else line = test;
          while (ctx.measureText(line).width > maxWidth && line.length > 1) {
            var cut = Math.max(1, Math.floor(line.length * maxWidth / ctx.measureText(line).width));
            lines.push(line.slice(0, cut)); line = line.slice(cut);
          }
        });
        if (line) lines.push(line);
      });
      return lines;
    }
    function downloadCard() {
      refreshPreview(currentMessage || getCurrentMessage(false));
      var canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1080;
      var ctx = canvas.getContext("2d");
      if (!ctx) { setStatus("इस browser में PNG export उपलब्ध नहीं है।", true, true); return; }
      var colors = THEMES[el.theme.value] || THEMES.candy;
      var gradient = ctx.createLinearGradient(100, 80, 970, 1000); gradient.addColorStop(0, colors[0]); gradient.addColorStop(1, colors[1]);
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1080, 1080);
      ctx.fillStyle = "rgba(255,255,255,.12)"; ctx.beginPath(); ctx.arc(930, 130, 190, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(110, 980, 170, 0, Math.PI * 2); ctx.fill();
      roundedRect(ctx, 62, 62, 956, 956, 44); ctx.fillStyle = "rgba(255,255,255,.13)"; ctx.fill();
      var ink = el.theme.value === "midnight" || el.theme.value === "rose" ? "#ffffff" : "#462b3d";
      ctx.fillStyle = ink; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = "800 27px system-ui, 'Noto Sans Devanagari', Mangal, sans-serif";
      ctx.fillText(el.language.value === "en" ? "JUST FOR YOU" : "सिर्फ आपके लिए", 540, 145);
      ctx.font = "68px system-ui, 'Noto Sans Devanagari', Mangal, sans-serif"; ctx.fillText(EMOJI[el.category.value] || "💌", 540, 270);
      ctx.font = "700 32px system-ui, 'Noto Sans Devanagari', Mangal, sans-serif";
      var toLabel = el.recipient.value ? (el.language.value === "en" ? "For " : "खास तौर पर ") + safeText(el.recipient.value, 40) : (el.language.value === "en" ? "A little message for you" : "एक खास इंसान के लिए");
      ctx.fillText(toLabel, 540, 365, 850);
      var long = currentMessage.length > 260; var fontSize = long ? 35 : (currentMessage.length > 150 ? 41 : 48);
      ctx.font = "800 " + fontSize + "px system-ui, 'Noto Sans Devanagari', Mangal, sans-serif";
      var lines = wrapCanvasText(ctx, currentMessage, 820); var maxLines = 10;
      if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/[.…]*$/, "…"); }
      var lineHeight = fontSize * 1.42; var startY = 540 - ((lines.length - 1) * lineHeight / 2);
      lines.forEach(function (line, i) { ctx.fillText(line, 540, startY + i * lineHeight, 860); });
      ctx.globalAlpha = .78; ctx.font = "700 22px system-ui, 'Noto Sans Devanagari', Mangal, sans-serif";
      var by = el.sender.value ? "दिल से, " + safeText(el.sender.value, 40) : "Made with good vibes";
      ctx.fillText(by, 540, 900, 830); ctx.font = "800 16px system-ui, sans-serif"; ctx.fillText("SARKARI FILE · MESSAGE STUDIO", 540, 960); ctx.globalAlpha = 1;
      function save(blob) {
        if (!blob) { setStatus("PNG तैयार नहीं हो पाया।", true, true); return; }
        var objectUrl = URL.createObjectURL(blob); var a = document.createElement("a"); a.href = objectUrl; a.download = "funny-message-card.png"; root.appendChild(a); a.click(); a.remove(); window.setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 1500);
        setStatus("आपका PNG Message Card डाउनलोड हो गया।", false, true);
      }
      if (canvas.toBlob) canvas.toBlob(save, "image/png");
      else { try { var data = canvas.toDataURL("image/png"); var a = document.createElement("a"); a.href = data; a.download = "funny-message-card.png"; a.click(); setStatus("PNG Message Card डाउनलोड हो गया।", false, true); } catch (err) { setStatus("PNG export इस browser में उपलब्ध नहीं है।", true, true); } }
    }
    function getEscapeLimit() { return el.difficulty.value === "easy" ? 4 : (el.difficulty.value === "ninja" ? 9 : 6); }
    function updateGameProgress() {
      el.dodgeCount.textContent = escapes + " / " + escapeLimit;
      el.progress.style.width = Math.round((escapes / escapeLimit) * 100) + "%";
    }
    function clearFragments() { $$(el.playfield, ".sf-fm-story-word").forEach(function (node) { node.remove(); }); }
    function dropFragment(text, left, top) {
      if (!text) return;
      var node = document.createElement("span"); node.className = "sf-fm-story-word"; node.textContent = text;
      var rect = el.playfield.getBoundingClientRect();
      var x = Math.max(8, Math.min(rect.width - 150, left + 8 + (Math.random() * 26 - 13)));
      var y = Math.max(36, Math.min(rect.height - 42, top + 4 + (Math.random() * 25 - 12)));
      node.style.left = x + "px"; node.style.top = y + "px"; el.playfield.appendChild(node);
    }
    function setRunnerPosition(x, y) {
      var bounds = el.playfield.getBoundingClientRect();
      var w = el.runner.offsetWidth || 140; var h = el.runner.offsetHeight || 48;
      currentX = Math.max(8, Math.min(bounds.width - w - 8, x));
      currentY = Math.max(8, Math.min(bounds.height - h - 8, y));
      el.runner.style.left = currentX + "px"; el.runner.style.top = currentY + "px"; el.runner.style.transform = "none";
    }
    function centerRunner() {
      var bounds = el.playfield.getBoundingClientRect();
      setRunnerPosition((bounds.width - (el.runner.offsetWidth || 140)) / 2, (bounds.height - (el.runner.offsetHeight || 48)) / 2);
    }
    function splitMessageIntoChunks(message, count) {
      var words = String(message || "").split(/\s+/).filter(Boolean);
      if (!words.length) return [];
      var chunkSize = Math.max(1, Math.ceil(words.length / count)); var chunks = [];
      for (var i = 0; i < words.length; i += chunkSize) chunks.push(words.slice(i, i + chunkSize).join(" "));
      return chunks;
    }
    var gameChunks = [];
    function evade(pointerX, pointerY) {
      if (!gameActive || gameFinished || escapes >= escapeLimit) return;
      var now = Date.now(); if (now - lastEscapeAt < 440) return; lastEscapeAt = now;
      var bounds = el.playfield.getBoundingClientRect();
      var runnerW = el.runner.offsetWidth || 140; var runnerH = el.runner.offsetHeight || 48;
      var centerX = currentX + runnerW / 2; var centerY = currentY + runnerH / 2;
      var angle = Math.atan2(centerY - pointerY, centerX - pointerX);
      if (!isFinite(angle) || Math.abs(centerX - pointerX) + Math.abs(centerY - pointerY) < 4) angle = Math.random() * Math.PI * 2;
      var speed = el.difficulty.value === "ninja" ? 128 : (el.difficulty.value === "easy" ? 78 : 100);
      var distance = speed + Math.random() * 24;
      var oldX = currentX; var oldY = currentY;
      setRunnerPosition(currentX + Math.cos(angle) * distance, currentY + Math.sin(angle) * distance);
      dropFragment(gameChunks[escapes] || "✨", oldX, oldY);
      escapes += 1; updateGameProgress();
      if (escapes >= escapeLimit) {
        el.runner.classList.add("is-tired"); el.runner.textContent = "अब पकड़ो 😅";
        el.gameHint.textContent = "हाय! अब मैं नहीं भागूँगा—मुझे पकड़कर मैसेज खोलिए!";
      } else {
        el.runner.textContent = escapes % 2 ? "नहीं पकड़ पाओगे! 😜" : "फिर से कोशिश करो! 🏃";
        el.gameHint.textContent = "अच्छा पीछा कर रहे हैं! बटन के और करीब आइए…";
      }
    }
    function catchMessage() {
      if (!gameActive || escapes < escapeLimit) {
        if (gameActive) {
          var r = el.runner.getBoundingClientRect(); var p = el.playfield.getBoundingClientRect();
          evade(r.left - p.left + r.width / 2, r.top - p.top + r.height / 2);
        }
        return;
      }
      gameActive = false; gameFinished = true; el.runner.textContent = "पकड़ लिया! 🎉";
      var seconds = Math.max(1, Math.round((Date.now() - gameStartedAt) / 1000));
      el.revealed.textContent = currentMessage;
      el.gameResult.textContent = "आपने " + escapeLimit + " बार पीछा किया और " + seconds + " सेकंड में मैसेज पकड़ लिया!";
      el.gameStage.hidden = true; el.reveal.hidden = false;
      setStatus("Challenge पूरा! अब मैसेज आगे शेयर करें।", false, false);
    }
    function startGame() {
      currentMessage = getCurrentMessage(false); refreshPreview(currentMessage);
      escapes = 0; escapeLimit = getEscapeLimit(); lastEscapeAt = 0; gameStartedAt = Date.now(); gameActive = true; gameFinished = false;
      gameChunks = splitMessageIntoChunks(currentMessage, escapeLimit);
      clearFragments(); el.reveal.hidden = true; el.gameStage.hidden = false;
      el.runner.classList.remove("is-tired"); el.runner.textContent = "मुझे पकड़ो 😜";
      el.gameHint.textContent = "लाल बटन को पकड़ने की कोशिश करें…"; updateGameProgress();
      window.requestAnimationFrame(centerRunner);
      if (el.gameStage.scrollIntoView) el.gameStage.scrollIntoView({ behavior: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    }

    $(root, "[data-generate]").addEventListener("click", function () { generate(false); });
    $(root, "[data-surprise]").addEventListener("click", function () { el.custom.value = ""; chooseTemplate(true); generate(false); });
    $(root, "[data-clear]").addEventListener("click", function () {
      el.category.value = "funny"; el.language.value = "hi"; el.recipient.value = ""; el.sender.value = ""; el.custom.value = ""; el.theme.value = "candy"; el.difficulty.value = "normal"; el.includeLink.checked = false; chooseTemplate(true); generate(false); stopSpeech();
      el.gameStage.hidden = true; el.reveal.hidden = true; gameActive = false; clearFragments(); setStatus("फॉर्म रीसेट कर दिया गया है।", false, false);
    });
    [el.category, el.language, el.recipient, el.sender, el.custom, el.theme].forEach(function (control) {
      control.addEventListener("input", function () { if (!el.custom.value.trim() && (control === el.category || control === el.language)) chooseTemplate(false); refreshPreview(getCurrentMessage(false)); });
      control.addEventListener("change", function () { if (!el.custom.value.trim() && (control === el.category || control === el.language)) chooseTemplate(false); refreshPreview(getCurrentMessage(false)); });
    });
    el.difficulty.addEventListener("change", function () { setStatus("नई कठिनाई अगली Challenge में लागू होगी।", false, false); });
    $(root, "[data-copy-message]").addEventListener("click", function () { refreshPreview(getCurrentMessage(false)); copyText(currentMessage, "मैसेज कॉपी हो गया! अब कहीं भी Paste करें।", true); });
    $(root, "[data-whatsapp]").addEventListener("click", function () { refreshPreview(getCurrentMessage(false)); openWhatsApp(); });
    $(root, "[data-share]").addEventListener("click", function () { refreshPreview(getCurrentMessage(false)); nativeShare(); });
    $(root, "[data-download-card]").addEventListener("click", downloadCard);
    $(root, "[data-copy-link]").addEventListener("click", function () { refreshPreview(getCurrentMessage(false)); copyText(getShareUrl(!!el.includeLink.checked), "Challenge link कॉपी हो गया! इसे दोस्तों के साथ शेयर करें।", true); });
    $(root, "[data-start-game]").addEventListener("click", startGame);
    $(root, "[data-restart-game]").addEventListener("click", startGame);
    $(root, "[data-play-again]").addEventListener("click", startGame);
    $(root, "[data-share-reveal]").addEventListener("click", function () { nativeShare(); });
    el.runner.addEventListener("click", function () { if (escapes >= escapeLimit) catchMessage(); else {
      var r = el.runner.getBoundingClientRect(); var p = el.playfield.getBoundingClientRect();
      evade(r.left - p.left + r.width / 2, r.top - p.top + r.height / 2);
    }});
    el.playfield.addEventListener("pointermove", function (event) {
      if (!gameActive || gameFinished || escapes >= escapeLimit || (event.target && event.target.closest && event.target.closest("[data-runner]"))) return;
      var rect = el.playfield.getBoundingClientRect(); var px = event.clientX - rect.left; var py = event.clientY - rect.top;
      var rw = el.runner.offsetWidth || 140; var rh = el.runner.offsetHeight || 48;
      var distance = Math.hypot(px - (currentX + rw / 2), py - (currentY + rh / 2));
      var threshold = event.pointerType === "touch" ? 98 : 112;
      if (distance < threshold) evade(px, py);
    });
    $(root, "[data-speak]").addEventListener("click", function () {
      if (!speech || !window.SpeechSynthesisUtterance) { setStatus("इस browser में Text-to-Speech उपलब्ध नहीं है।", true, false); return; }
      if (readAloud) { stopSpeech(); return; }
      stopSpeech(); var utterance = new SpeechSynthesisUtterance(currentMessage); utterance.lang = el.language.value === "en" ? "en-IN" : "hi-IN"; utterance.rate = 0.94; utterance.onend = function () { readAloud = false; $(root, "[data-speak]").textContent = "🔊 फिर सुनें"; }; utterance.onerror = function () { readAloud = false; $(root, "[data-speak]").textContent = "🔊 सुनें"; };
      readAloud = true; $(root, "[data-speak]").textContent = "⏹ रोकें"; speech.speak(utterance);
    });
    function stopSpeech() { if (speech) speech.cancel(); readAloud = false; var b = $(root, "[data-speak]"); if (b) b.textContent = "🔊 सुनें"; }

    // Shared challenge links are opt-in: the message is only embedded when the sender selected the checkbox.
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get("sfchallenge") === "1") {
        var incomingMessage = params.get("sfmsg") || "";
        var incomingFrom = params.get("sfby") || "";
        var incomingTo = params.get("sfto") || "";
        var incomingLanguage = params.get("sflang"); var incomingCategory = params.get("sftype");
        if (incomingLanguage && ["hi", "hinglish", "en"].indexOf(incomingLanguage) !== -1) el.language.value = incomingLanguage;
        if (incomingCategory && TEMPLATES[incomingCategory]) el.category.value = incomingCategory;
        if (incomingMessage) el.custom.value = safeText(incomingMessage, 700);
        if (incomingFrom) el.sender.value = safeText(incomingFrom, 40);
        if (incomingTo) el.recipient.value = safeText(incomingTo, 40);
        chooseTemplate(false); generate(false);
        el.incoming.hidden = false;
        el.incomingText.textContent = incomingMessage ? (incomingFrom ? incomingFrom + " की ओर से आया संदेश पकड़कर खोलिए।" : "संदेश पकड़कर खोलिए।") : "किसी ने आपको एक Catch Challenge भेजा है—अपना संदेश बनाकर खेलें!";
        if (incomingMessage) setStatus("Incoming challenge तैयार है। गेम शुरू करके मैसेज खोलें।", false, false);
      } else { chooseTemplate(true); generate(false); }
    } catch (err) { chooseTemplate(true); generate(false); }
    window.addEventListener("pagehide", stopSpeech, { once: true });
    root.dataset.sfFmReady = "true";
  }

  window.SarkariFileTools.initFunnyMessageShareMaker = initFunnyMessageShareMaker;
})();
