const { Builder, By, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const assert = require("assert");

//mocha describe block
describe("meta tarot test", function () {
   //timeout
   this.timeout(30000);
   //headless
   let driver;

    before(async function() {
       this.timeout(30000);
       const options = new firefox.Options();
       options.addArguments(
        '--headless',
        '--disable-gpu'
    );

    after(async function() {
        await driver.quit();
    });

    //открыть браузер
    driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    });

    //mocha it для Таро
    it("Таро meta test", async function() {

        //перейти на страницу статьи
        await driver.get('https://www.salonsecret.ru/ok-salon-secret/taro-2025');

        //принять куки
        const cookiebtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Принять все cookies')]")), 10000);
        await driver.wait(until.elementIsVisible(cookiebtn), 5000);
        await driver.wait(until.elementIsEnabled(cookiebtn), 5000);
        await cookiebtn.click();
        
        //найти и проверить тайтл
        const title = await driver.getTitle();
        assert.strictEqual(title, "Гадание на таро — 2025 по гороскопу: расклад стилиста и адепта таро Андрея Ромашова");

        //найти и проверить дескрипшн
        const metaDescription = await driver.findElement(By.css('meta[name="description"]'), 10000);
        const metaDescriptionContent = await metaDescription.getAttribute('content');
        assert.strictEqual(metaDescriptionContent, "Предсказание будущего на уникальной колоде таро SalonSecret. Энергетика 2025 года, точки роста и бьюти-советы для всех знаков зодиака.");
    })
    
});