// ==UserScript==
// @name         IndieGala Create Giveaway Helper
// @namespace    https://github.com/MrMarble/IndieGalaCreateGiveawayHelper
// @version      0.5
// @description  Creating a giveaway is now  a lot easier!!
// @author       MrMarble
// @updateURL    https://github.com/MrMarble/IndieGalaCreateGiveawayHelper/raw/master/IndieGalaCreateGiveawayHelper.user.js
// @downloadURL  https://github.com/MrMarble/IndieGalaCreateGiveawayHelper/raw/master/IndieGalaCreateGiveawayHelper.user.js
// @match        https://www.indiegala.com/profile?user_id=*
// @match        https://www.indiegala.com/gift?gift_id=*
// @require      https://raw.githubusercontent.com/MrMarble/IndieGalaCreateGiveawayHelper/master/waitForKeyElements.js
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  run();

  function run() {
    if (!'URLSearchParams' in window) {
      throw "Web Browser not supported!";
    }

    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('user_id')) {
      fillGiveaway();
    } else if (searchParams.has('gift_id')) {
      add_style();
      waitForKeyElements("#steam-key-games", addButton, true);
    }
  }

  function addButton() {
    jQuery('div[id^="serial_"]').each((i, element) => {
      jQuery(element).append('<div class="entry-elem align-c create-giveaway-helper"><i aria-hidden="true" class="fa fa-gift"></i></div>');
    });
    jQuery('.create-giveaway-helper').on('click', function() {
      let game_url = jQuery(this).parents('.game-key-string').find('a.game-steam-url').attr('href');
      let game_serial = jQuery(this).prevAll('input[id^=serial_n_]').val();

      let w = window.open('https://www.indiegala.com/profile', '_blank', 'top=10,height=500,menubar=0,status=0,toolbar=0');
      w.opener = null;
      w.game_url = game_url;
      w.game_serial = game_serial;
    });
  }

  function fillGiveaway() {
    jQuery(document).ready(function() {
      if (window.game_url !== undefined && window.game_serial !== undefined) {
        jQuery('.giveaways-new-cont').slideToggle();
        jQuery('#collapseGiveaways').toggleClass('in').css('height', 'auto');

        jQuery('textarea.giveaway-description').val('IndieGala Giveaway');
        jQuery('.form-not-guaranteed input').val(window.game_url);
        jQuery('.form-not-guaranteed button.form-button-1').trigger('click');
        waitForKeyElements('ul.form-not-guaranteed input[rel="steamSerialKey"]', function() {
          jQuery('ul.form-not-guaranteed input[rel="steamSerialKey"]').val(window.game_serial);
          jQuery('button.btn-add-rel-game').trigger('click');
          waitForKeyElements('span.points-result', function() {
            jQuery('button.btn-calculate-giv-value').trigger('click');
          }, true);
        }, true);
      }
    });
  }

  function add_style() {
    let css = `div.create-giveaway-helper {
      position: absolute;
      height: 24px;
      top: 1px;
      line-height: 10px;
      padding: 4px 10px;
      margin-left: 1px;
      color: #8c2222;
    }
    div.create-giveaway-helper:hover{
      cursor: pointer;
    }
    `;
    jQuery('head').append('<style>' + css + '</style>');
  }
})();
