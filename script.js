const NBU_API = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json";
let nbuRate = null;
let recordId = null

getNBU();

function calculateDifference(dealRate, nbuRate) {
    if (dealRate && nbuRate && !isNaN(dealRate) && !isNaN(nbuRate)) {
        const diff = ((dealRate - nbuRate) / nbuRate) * 100;
        document.getElementById("difference").textContent = diff.toFixed(2) + " %";
    }
}

function getNBU() {
    fetch(NBU_API)
        .then(res => res.json())
        .then(data => {
            nbuRate = data[0].rate;
            document.getElementById("nbuRate").textContent = nbuRate.toFixed(2);
        })
        .catch(err => {
            document.getElementById("nbuRate").textContent = "Помилка";
        });
}

ZOHO.embeddedApp.init()
    .then(() => {
        console.log("✅ SDK инициализирован успешно");

        ZOHO.embeddedApp.on('PageLoad', function(data){
            console.log("Page Loaded...")
            console.log(data);
            console.log("Entity Name is :::::");
            console.log(data.Entity);

            ZOHO.CRM.API.getRecord({
                Entity: "Deals",
                RecordID: data.RecordID
            }).then(response => {
                if (response && response.data[0]) {
                    const deal = response.data[0];
                    let dealRate = null;

                    if (deal['Currency_Rate'] !== undefined && deal['Currency_Rate'] !== null) {
                        dealRate = parseFloat(deal['Currency_Rate']);
                    }

                    if (dealRate && !isNaN(dealRate)) {
                        document.getElementById("dealRate").textContent = dealRate.toFixed(2);
                        calculateDifference(dealRate, nbuRate);
                    } else {
                        document.getElementById("dealRate").textContent = "Поле не знайдено";
                    }
                }
            }).catch(err => {
                document.getElementById("dealRate").textContent = "Помилка";
            });
        });

    }).catch(err => {
    document.getElementById("dealRate").textContent = "Помилка SDK";
});