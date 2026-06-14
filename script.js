// ANNO - Script för kursen Analys och effektmätning
document.addEventListener("DOMContentLoaded", function() {

    console.log("ANNO Analytics Script initierat. Redo för GA4 och konverteringsmätning.");

    // FUNKTION: Hämta och visa UTM-taggar på Tacksidan (thank-you.html)
    // Detta hjälper dig att verifiera att dina spårningslänkar (t.ex. från Google Ads eller Meta) fungerar korrekt.
    if (window.location.pathname.includes("thank-you.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const utmDebugger = document.getElementById("utm-debugger");
        
        if (utmDebugger) {
            let debugHTML = "<strong>Registrerad trafikdata för analys:</strong><br>";
            let hasParams = false;

            // Kontrollera om det finns några URL-parametrar (både UTM och formulärdata)
            urlParams.forEach((value, key) => {
                hasParams = true;
                debugHTML += `<span style="color: #c05621;">${key}</span>: ${value}<br>`;
            });

            if (!hasParams) {
                debugHTML += "<em style='color:#888;'>Inga specifika URL-parametrar hittades. (Tips: Testa att lägga till ?utm_source=google&utm_medium=cpc på föregående sida för att testa din funnel!)</em>";
            }

            utmDebugger.innerHTML = debugHTML;
        }
    }

    // EVENT LISTENER: Spåra formulärskick (Mock-up för event-baserad konverteringsspårning)
    // Du kan använda dessa IDn för att konfigurera Custom Events i Google Tag Manager (GTM)
    const forms = document.querySelectorAll(".track-form");
    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            const formId = form.getAttribute("id");
            const source = form.querySelector('input[name="conversion_source"]')?.value || "unknown";
            
            // Loggar händelsen till webbläsarkonsolen så att du kan se att skriptet exekveras innan redirect sker
            console.log(`Konvertering identifierad! Formulär: ${formId}, Källa: ${source}`);
            
            // I ett skarpt läge med GA4 skickar du datalagerevent här:
            // window.dataLayer = window.dataLayer || [];
            // window.dataLayer.push({ 'event': 'form_submission', 'form_id': formId, 'form_source': source });
        });
    });
});