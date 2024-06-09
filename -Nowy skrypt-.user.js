// ==UserScript==
// @name         Typing Bot
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Wpisywanie ustalonego tekstu po naciśnięciu klawiszy F1, F2, F3, F4, F5 lub F6 z możliwością dostosowania i zapisu ustawień oraz chowania pól tekstowych
// @author       Twoje Imię
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Domyślne teksty do wpisania
    const defaultTexts = {
        F1: "hejka, pisze wybiórczo a oferuje fot, filmy (pakiety). chętnie wyśle próbki na emaila, a tu popisze :P",
        F2: "zakres cen od 30-100zł, dowolna kwota i różne ilosci. im więcej tym więcej gratisów. wybierz coś, a powiem czego i ile.",
        F3: "Przykładowy tekst dla F3",
        F4: "fot filmy - tematycznie ze striptizu i masturbacji - nagie, pozowane jak i masturbacja z bliska, w calosci",
        F5: "Przykładowy tekst dla F5",
        F6: "Przykładowy tekst dla F6"
    };

    // Funkcja do zapisywania tekstów w localStorage
    function saveText(key, value) {
        localStorage.setItem(key, value);
    }

    // Funkcja do odczytywania tekstów z localStorage lub ustawiania domyślnych
    function getText(key, defaultValue) {
        return localStorage.getItem(key) || defaultValue;
    }

    // Teksty do wpisania dla poszczególnych klawiszy
    let predefinedTextF1 = getText('predefinedTextF1', defaultTexts.F1);
    let predefinedTextF2 = getText('predefinedTextF2', defaultTexts.F2);
    let predefinedTextF3 = getText('predefinedTextF3', defaultTexts.F3);
    let predefinedTextF4 = getText('predefinedTextF4', defaultTexts.F4);
    let predefinedTextF5 = getText('predefinedTextF5', defaultTexts.F5);
    let predefinedTextF6 = getText('predefinedTextF6', defaultTexts.F6);

    // Funkcja symulująca ręczne wpisywanie tekstu
    function typeText(element, text, minInterval = 20, maxInterval = 50) {
        let index = 0;
        function typeCharacter() {
            if (index < text.length) {
                const event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });
                element.value += text.charAt(index);
                element.dispatchEvent(event);
                index++;
                const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
                setTimeout(typeCharacter, interval);
            }
        }
        typeCharacter();
    }

    // Funkcja nasłuchująca na naciśnięcie klawiszy F1, F2, F3, F4, F5 i F6
    document.addEventListener('keydown', function(event) {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            switch(event.key) {
                case 'F1':
                    event.preventDefault();
                    typeText(activeElement, predefinedTextF1);
                    break;
                case 'F2':
                    event.preventDefault();
                    typeText(activeElement, predefinedTextF2);
                    break;
                case 'F3':
                    event.preventDefault();
                    typeText(activeElement, predefinedTextF3);
                    break;
                case 'F4':
                    event.preventDefault();
                    typeText(activeElement, predefinedTextF4);
                    break;
                case 'F5':
                    event.preventDefault();
                    typeText(activeElement, predefinedTextF5);
                    break;
                case 'F6':
                    event.preventDefault();
                    typeText(activeElement, predefinedTextF6);
                    break;
            }
        }
    });

    // Funkcja dodająca pole tekstowe i nasłuchująca zmiany dla danego klawisza
    function createInputField(top, placeholder, callback, initialValue) {
        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('placeholder', placeholder);
        inputField.style.position = 'fixed';
        inputField.style.top = top;
        inputField.style.left = '10px';
        inputField.style.zIndex = '9999';
        inputField.style.color = 'black';  // Ustawienie koloru czcionki na czarny
        inputField.value = initialValue;
        document.body.appendChild(inputField);
        inputField.addEventListener('input', function() {
            callback(this.value);
        });
        return inputField;
    }

    // Tworzenie przycisku do chowania i pokazywania pól tekstowych
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Pokaż/Ukryj pola tekstowe';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '10px';
    toggleButton.style.left = '10px';
    toggleButton.style.zIndex = '9999';
    document.body.appendChild(toggleButton);

    // Dodawanie pól tekstowych dla F2, F3, F4, F5 i F6
    const inputFields = [
        createInputField('50px', 'Wpisz własny tekst dla F2...', function(value) { predefinedTextF2 = value; saveText('predefinedTextF2', value); }, predefinedTextF2),
        createInputField('90px', 'Wpisz własny tekst dla F3...', function(value) { predefinedTextF3 = value; saveText('predefinedTextF3', value); }, predefinedTextF3),
        createInputField('130px', 'Wpisz własny tekst dla F4...', function(value) { predefinedTextF4 = value; saveText('predefinedTextF4', value); }, predefinedTextF4),
        createInputField('170px', 'Wpisz własny tekst dla F5...', function(value) { predefinedTextF5 = value; saveText('predefinedTextF5', value); }, predefinedTextF5),
        createInputField('210px', 'Wpisz własny tekst dla F6...', function(value) { predefinedTextF6 = value; saveText('predefinedTextF6', value); }, predefinedTextF6)
    ];

    // Funkcja do chowania/pokazywania pól tekstowych
    toggleButton.addEventListener('click', function() {
        const areFieldsVisible = inputFields[0].style.display !== 'none';
        inputFields.forEach(field => {
            field.style.display = areFieldsVisible ? 'none' : 'block';
        });
    });

})();
