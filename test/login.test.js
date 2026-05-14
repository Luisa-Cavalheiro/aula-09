import assert from 'node:assert';
import { Builder, Browser, By, Key, until } from 'selenium-webdriver';

describe('Testes do Módulo de Login', function() {
  it('Deve permitir o login quando usar credenciais válidas', async () => {
    //Arrange
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
     await driver.get('https://quick-notes.club/');

    //Act
    await driver.findElement(By.id('login-email')).sendKeys('luisacavalheiro@gmail.com');
    await driver.findElement(By.id('login-password')).sendKeys('PGATS26!', Key.ENTER);

    //Assert
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('user-name'))), 5000);
    const saudacao = await driver.findElement(By.id('user-name')).getText();
    assert.equal(saudacao, 'Hi, Luísa Cavalheiro')
  });
});