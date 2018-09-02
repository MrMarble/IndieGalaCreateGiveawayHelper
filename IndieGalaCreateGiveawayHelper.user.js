// ==UserScript==
// @name         IndieGala Create Giveaway Helper
// @namespace    https://github.com/MrMarble/IndieGalaCreateGiveawayHelper
// @version      0.1
// @description  Creating a giveaway is now  a lot easier!!
// @author       MrMarble
// @updateURL    https://raw.githubusercontent.com/MrMarble/IndieGalaCreateGiveawayHelper/master/waitForKeyElements.js
// @downloadURL  https://raw.githubusercontent.com/MrMarble/IndieGalaCreateGiveawayHelper/master/waitForKeyElements.js
// @match        https://www.indiegala.com/profile?user_id=*
// @match        https://www.indiegala.com/gift?gift_id=*
// @require      https://raw.githubusercontent.com/MrMarble/IndieGalaCreateGiveawayHelper/master/waitForKeyElements.js
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     style https://raw.githubusercontent.com/MrMarble/IndieGalaCreateGiveawayHelper/master/style.css
// ==/UserScript==

(function() {
  'use strict';
  $.noConflict();
  run();

  function run() {
    if (!'URLSearchParams' in window) {
      throw "Web Browser not supported!";
    }

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('user_id')) {
      fillGiveaway(searchParams);
    } else if (searchParams.has('gift_id')) {
      GM_addStyle(GM_getResourceText('style'));
      waitForKeyElements("#steam-key-games", addButton, true);
    }
  }

  function addButton() {
    jQuery('div[id^="serial_"]').each((i, element) => {
      jQuery(element).append('<div class="entry-elem align-c create-giveaway-helper"><i aria-hidden="true" class="fa fa-gift"></i></div>');
      let game_url = jQuery(element).parent('.game-key-string').find('a.game-steam-url').attr('href');
      let game_serial = jQuery(element).find('input[id^=serial_n_]').val();
    });
    jQuery('.create-giveaway-helper').on('click', function() {
      let w = window.open('https://www.indiegala.com/profile','_blank','top=10,height=500,menubar=0,status=0,toolbar=0');
      w.game_url = game_url;
      w.game_serial = game_serial;
    });
  }

  function fillGiveaway(searchParams) {
    //TODO Create this function
  }
})();
