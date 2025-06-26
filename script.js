const NBU_API_KEY = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json";

let nbuRate = 0;

// 1. Получаем курс НБУ
fetch(NBU_API_KEY)
    .then(res => res.json())
    .then(data => {
        nbuRate = data[0].rate;
        document.getElementById("nbuRate").textContent = nbuRate.toFixed(4);
        console.log("Курс НБУ:", nbuRate);
    })
    .catch(error => {
        console.log("Ошибка при получении курса НБУ:", error);
    });

// 2. Ждём пока загрузится Zoho API
ZOHO.embeddedApp.init().then(() => {
    ZOHO.embeddedApp.on("PageLoad", function(data) {
        const recordId = data.EntityId;

        // 3. Получаем запись сделки по ID
        ZOHO.CRM.API.getRecord({
            Entity: "Deals",
            RecordID: recordId
        }).then(response => {
            const dealData = response.data[0];
            const dealRate = dealData.Currency_Rate; // ← замените на нужное имя поля

            document.getElementById("dealRate").textContent = dealRate;

            // 4. Считаем разницу
            if (nbuRate) {
                const diff = ((dealRate - nbuRate) / nbuRate) * 100;
                document.getElementById("difference").textContent = diff.toFixed(2) + " %";
            } else {
                console.log("Курс НБУ ещё не загружен");
            }
        });
    });
});
