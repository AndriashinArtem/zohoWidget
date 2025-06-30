const NBU_API = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json";
let nbuRate = null;
let dealRate = null;
let recordId = null;
let entityName = null;

function calculateDifference(dealRate, nbuRate) {
    if (dealRate && nbuRate) {
        const diff = ((dealRate / nbuRate) - 1) * 100;
        document.getElementById("difference").textContent = diff.toFixed(2) + " %";

        const updateButton = document.getElementById("updateButton");

        if(Math.abs(diff) > 5){
            updateButton.style.display = "block";
        }else{
            updateButton.style.display = "none";
        }
    }
}

function getNBU() {
    fetch(NBU_API)
        .then(response => response.json())
        .then(data => {
            nbuRate = data[0].rate;
            document.getElementById("nbuRate").textContent = nbuRate.toFixed(2);
            console.log("Курс НБУ отримано:", nbuRate);
        })
        .catch(err => {
            document.getElementById("nbuRate").textContent = "Неможливості отримати курс НБУ";
        });
}

function updateDealRate() {
    console.log("Кнопка 'Оновити' натиснута");

    ZOHO.CRM.API.updateRecord({
        Entity: entityName,
        APIData: {
            id: recordId,
            Currency_Rate: nbuRate
        }
    }).then(() => {
        dealRate = nbuRate;
        document.getElementById("dealRate").textContent = nbuRate.toFixed(2);
        calculateDifference(dealRate, nbuRate);
        console.log("Оновлення виконано успішно");
    }).catch(err => {
        document.getElementById("nbuRate").textContent = "Помилки при оновленні поля в CRM";
        console.error("Помилка при оновленні CRM:", err);
    });
}

ZOHO.embeddedApp.on("PageLoad", function (data) {
    recordId = data.EntityId;
    entityName = data.Entity;

    getNBU();
    const updateButton = document.getElementById("updateButton");
    updateButton.removeEventListener("click", updateDealRate);
    updateButton.addEventListener("click", updateDealRate);
    
    ZOHO.CRM.API.getRecord({
        Entity: entityName,
        RecordID: recordId
    }).then(response => {
        if (response && response.data[0]) {
            const deal = response.data[0];

            if (deal['Currency_Rate'] !== undefined && deal['Currency_Rate'] !== null) {
                dealRate = parseFloat(deal['Currency_Rate']);
            }

            if (dealRate && !isNaN(dealRate)) {
                document.getElementById("dealRate").textContent = dealRate.toFixed(2);
                calculateDifference(dealRate, nbuRate);
            }
        }
    }).catch(err => {
        document.getElementById("dealRate").textContent = "Помилка отримання даних";
    });
});

ZOHO.embeddedApp.init();
