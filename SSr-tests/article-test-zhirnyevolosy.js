const { Builder, By, until, } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const assert = require("assert");

//mocha describe block
describe("zhirnye volosy test", function() {
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

    //mocha it для zhirnye volosy
    it("Zhirnye volosy article test", async function() {

        //открыть страницу статьи
        await driver.get('https://www.salonsecret.ru/uhod/problemy/zhirnye-volosy');
        
        //принять куки
        const cookiebtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Принять все cookies')]")), 10000);
        await driver.wait(until.elementIsVisible(cookiebtn), 5000);
        await driver.wait(until.elementIsEnabled(cookiebtn), 5000);
        await cookiebtn.click();

        //проверить результат
        const headerElement = await driver.wait(until.elementLocated(By.css('h1')), 10000);
        const headerText = await headerElement.getText();
        assert.strictEqual(headerText, "ЖИРНЫЕ ВОЛОСЫ: КАК ТАК ПОЛУЧИЛОСЬ И ЧТО С ЭТИМ ДЕЛАТЬ");

    });

});