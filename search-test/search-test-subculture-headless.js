const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

//mocha describe block
describe("search test Subculture", function () {
    //timeout
    this.timeout(30000);
    //headless options
    let driver;

    before(async function () {
        this.timeout(30000);
        const options = new chrome.Options();
        options.addArguments(
            '--headless',
            '--disable-gpu'
        );

    after(async function(){
        await driver.quit();
    });   

        //открыть браузер
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    //mocha it для Субкультура
    it("Stevie search", async function () {

        //перейти на сайт
        await driver.get("https://www.salonsecret.ru");

        //принять куки
        const cookiebtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Принять все cookies')]")), 10000);
        await driver.wait(until.elementIsVisible(cookiebtn), 5000);
        await driver.wait(until.elementIsEnabled(cookiebtn), 5000);
        await cookiebtn.click();

        //кликнуть поиск
        const lupaBtnXPath = '//button[.//img[@alt="закрыть"] and contains(@class, "SearchBarUpd_submitBtn__q3ak4")]';
        const lupa = await driver.wait(until.elementLocated(By.xpath(lupaBtnXPath)), 10000);
        await lupa.click();

        //ввести и отправить поисковый запрос
        const searchfieldXPath = '//input[contains(@class, "SearchBarUpd_input__5L0iO")]';
        const searchfield = await driver.wait(until.elementLocated(By.xpath(searchfieldXPath)), 10000);
        await searchfield.sendKeys("субкультура", Key.RETURN);

        //проверить результат
        const resultXPath = '//div[contains(@class, "LinesEllipsis") and contains(normalize-space(.), "Субкультура приходит")]';
        await driver.wait(until.elementLocated(By.xpath(resultXPath)), 10000);
        let searchresult = await driver.findElement(By.xpath(resultXPath), 10000).getText().then(function (value) {
            return value;
        });
        assert.strictEqual(searchresult, "Субкультура приходит в салоны красоты");

    })
    
});