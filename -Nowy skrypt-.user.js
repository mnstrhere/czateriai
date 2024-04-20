// ==UserScript==
// @name         Obejście anty kopiowanie na czateria.interia.pl
// @namespace    http://tam.gdzie.masz.skrypt
// @version      0.1
// @description  Obejście anty kopiowanie na czateria.interia.pl
// @author       Twój Nick
// @match        https://czateria.interia.pl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('wiadomosc').onpaste = null;
})();
