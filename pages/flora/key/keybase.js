/**
 * Copyright 2016, Atlas of Living Australia (ALA)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Version 1.0.0
 *
 * Created by Niels Klazenga on 10/04/2015.
 *
 * $.prototype.keybase([action], options);
 *
 * var options = {
 *   baseUrl: "http://keybase.rbg.vic.gov.au/ws/keyJSON",
 *   ajaxDataType: "json",
 *   key: 2672,
 *   title: true,
 *   titleDiv: ".keybase-key-title",
 *   source: true,
 *   sourceDiv: ".keybase-key-source",
 *   cssClass: {
 *     currentNode: "keybase-player-currentnode",
 *     path: "keybase-player-path",
 *     remainingItems: "keybase-player-remainingitems",
 *     discardedItems: "keybase-player-discardeditems",
 *     stepBack: "keybase-player-stepback",
 *     startOver: "keybase-player-startover"
 *   },
 *   playerDiv: "#keybase-player",
 *   currentNodeDisplay: function(node, currentNodeDiv),
 *   discardedItemsDisplay: function(items, itemsDiv),
 *   pathDisplay: function(path, pathDiv),
 *   playerEvents: function(),
 *   playerWindow: function(),
 *   remainingItemsDisplay: function(items, itemsDiv),
 *   resultDisplay: function(result, resultDiv),
 *   renderItemLink: function(item),
 *   filterItems: []|undefined,     // array of item IDs
 *   filterItemNames: []|undefined  // array of item names
 *
 * };
 *
 * Possible actions are 'player', 'indentedKey' and 'bracketedKey'. Action is optional: if no action is given, 'player'
 * is assumed.
 *
 * There are default values for all options except 'key'. 'key' may also be replaced with a 'data' object, when another
 * web service or file is being used. When a file is used 'data' should be an empty object or not defined at all and
 * 'baseURL' should contain the entire path to the file. 'ajaxDataType' can be either 'json' (default) or 'jsonp'.
 */

try {
  window.$ = window.jQuery = require("jquery");
  window.JSPath = require("jspath");
} catch (e) {}

(function($) {
  var json;
  var settings;
  var nested_sets;

  var rootNodeID;
  var next_id;
  var keyNodes;
  var current_node;

  var currentNodeElem;
  var pathElem;
  var remainingItemsElem;
  var discardedItemsElem;

  var filter_items;
  var filter_leads = [];
  var filter_parents = [];
  var filter_nodes = [];
  var activeFilter;

  var bracketed_key;
  var indented_key;
  var indentedKeyHtml;

  var i;

  $.prototype.keybase = function() {
    $.prototype.keybase.getters = {
      jsonKey: function() {
        return json;
      },
      settings: function() {
        return settings;
      },
      nestedSets: function() {
        return nested_sets;
      },
      currentNode: function() {
        return current_node;
      },
      bracketedKey: function() {
        return bracketed_key;
      },
      indentedKey: function() {
        return indented_key;
      },
      filterItems: function() {
        return filter_items;
      },
      filterLeads: function() {
        return filter_leads;
      },
      filterParents: function() {
        return filter_parents;
      },
      filterNodes: function() {
        return filter_nodes;
      },
      keyNodes: function() {
        return keyNodes;
      }
    };

    var options;
    if (arguments.length === 1) {
      options = arguments[0];
    }

    var action;
    if (arguments.length === 2) {
      action = arguments[0];
      options = arguments[1];
    }

    settings = $.extend(
      true,
      {},
      $.prototype.keybase.defaults,
      settings,
      options
    );

    if (settings.filterItems.length > 0) {
      filter_items = settings.filterItems;
    } else {
      if (settings.filterItemNames.length > 0) {
        filter_items = JSPath.apply(
          ".items{.item_name===$item_name}.item_id",
          $.prototype.keybase.getters.jsonKey(),
          { item_name: settings.filterItemNames }
        );
      } else {
        if (
          !(
            filter_items !== undefined &&
            filter_items.length > 0 &&
            settings.reset !== true
          )
        ) {
          filter_items = [];
        }
      }
    }
    $.prototype.keybase.setActiveFilter = function(filter) {
      activeFilter = filter;
    };
    $.prototype.keybase.getters.activeFilter = function() {
      return activeFilter;
    };
    $.prototype.keybase.setFilterItems = function(items) {
      filter_items = items;
    };

    var data;
    if (settings.data) {
      data = settings.data;
    } else {
      if (settings.key) {
        data = { key_id: settings.key };
      } else {
        data = false;
      }
    }

    if (!json || settings.reset === true) {
      var contentType = "application/x-www-form-urlencoded; charset=utf-8";

      if (window.XDomainRequest)
        //for IE8,IE9
        contentType = "text/plain";

      $.ajax({
        url: settings.baseUrl + '/' + settings.key,
        contentType: contentType,
        crossDomain: true,
        processData: true,
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Headers": "origin, content-type, accept"
        // },
        beforeSend: function() {
          settings.beforeSend();
        },
        success: function(data) {
          json = data;
          settings.onJson();

          if (settings.title) {
            settings.keyTitle(json);
          }

          if (settings.source) {
            settings.keySource(json.source);
          }

          if (
            (!action || action === "player") &&
            !$(".keybase-player-window").length
          ) {
            settings.playerWindow();
          }

          // root node
          rootNodeID = json.first_step.root_node_id;
          next_id = rootNodeID;

          linkItems();
          sortItems();

          nestedSets();
          getNodes();
          if (filter_items.length > 0) {
            setFilter();
          } else {
            nextCouplet();
          }
          settings.playerEvents();

          if (action === "indentedKey") {
            indentedKey();
            settings.indentedKeyDisplay(json);
          }

          if (action === "bracketedKey") {
            bracketedKey();
            settings.bracketedKeyDisplay(json);
          }

          settings.onLoad(json);
        },
        complete: function() {
          settings.onComplete();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("You can not send Cross Domain AJAX requests: " + errorThrown);
        }
      });
    } else {
      if (settings.title) {
        settings.keyTitle(json);
      }

      if (settings.source) {
        settings.keySource(json.source);
      }

      if (
        (!action || action === "player") &&
        !$(".keybase-player-window").length
      ) {
        settings.playerWindow();
      }

      // root node
      rootNodeID = json.first_step.root_node_id;
      next_id = rootNodeID;

      nestedSets();
      getNodes();
      if (filter_items.length > 0) {
        filterLeads();
      } else {
        nextCouplet();
      }
      settings.playerEvents();

      if (action === "indentedKey") {
        indentedKey();
        settings.indentedKeyDisplay(json);
      }

      if (action === "bracketedKey") {
        bracketedKey();
        settings.bracketedKeyDisplay(json);
      }
    }
  };

  $.prototype.keybase.defaults = {
    baseUrl: "http://keybase.rbg.vic.gov.au/ws/keyJSON",
    ajaxDataType: "json",
    title: true,
    titleDiv: ".keybase-key-title",
    source: true,
    sourceDiv: ".keybase-key-source",
    playerDiv: "#keybase-player",
    bracketedKeyDiv: "#keybase-bracketed",
    indentedKeyDiv: "#keybase-indented",
    cssClass: {
      currentNode: "keybase-player-currentnode",
      path: "keybase-player-path",
      remainingItems: "keybase-player-remainingitems",
      discardedItems: "keybase-player-discardeditems",
      stepBack: "keybase-player-stepback",
      startOver: "keybase-player-startover"
    },
    reset: false,
    beforeSend: function() {},
    onJson: function() {},
    onLoad: function() {},
    onComplete: function() {},
    onFilterWindowOpen: function() {},
    filterItems: [],
    filterItemNames: [],
    onBracketedKey: function() {},
    onBracketedKeyComplete: function() {},
    onIndentedKey: function() {},
    onIndentedKey: function() {},
    onIndentedKeyComplete: function() {},
    onNextCouplet: function() {}
  };

  /*
   * KeyBase Player display functions
   * Can be overridden by user.
   */

  /**
   * playerEvents function
   *
   * Sets up the events that make the KeyBase Player work. Note: events need to be removed first,
   * so you can run consecutive keys in the same page.
   */
  $.prototype.keybase.defaults.playerEvents = function() {
    $("." + settings.cssClass.currentNode).off(
      "click",
      "a.keybase-lead",
      currentNodeHandler
    );
    $("." + settings.cssClass.currentNode).on(
      "click",
      "a.keybase-lead",
      currentNodeHandler
    );

    $("." + settings.cssClass.path).off("click", "a", stepBackHandler);
    $("." + settings.cssClass.path).on("click", "a", stepBackHandler);

    $("." + settings.cssClass.stepBack).off("click", "a", stepBackHandler);
    $("." + settings.cssClass.stepBack).on("click", "a", stepBackHandler);

    $("." + settings.cssClass.startOver).off("click", "a", startOverHandler);
    $("." + settings.cssClass.startOver).on("click", "a", startOverHandler);

    $("body").off("click", ".keybase-player-filter a", filterHandler);
    $("body").on("click", ".keybase-player-filter a", filterHandler);
  };

  /*
   * currentNodeHandler
   *
   * Finds the next couplet when a lead of the current node is clicked.
   *
   * @param {type} event
   * @returns {undefined}
   */
  var currentNodeHandler = function(event) {
    event.preventDefault();
    if ($(event.target).attr("href")) {
      next_id = $(event.target)
        .attr("href")
        .replace("#l_", "");
    } else {
      next_id = $(event.target)
        .parents("[href]")
        .eq(0)
        .attr("href")
        .replace("#l_", "");
    }
    nextCouplet();
  };

  /**
   * stepBackHandler
   *
   * Finds the previous couplet when the 'step back' button is clicked, or, when a
   * lead in the path is clicked, finds the couplet the lead is in.
   *
   * @param {type} event
   * @returns {undefined}
   */
  var stepBackHandler = function(event) {
    event.preventDefault();
    if ($(event.target).attr("href")) {
      var lead_id = $(event.target)
        .attr("href")
        .replace("#l_", "");
    } else {
      var lead_id = $(event.target)
        .parents("[href]")
        .eq(0)
        .attr("href")
        .replace("#l_", "");
    }
    next_id = getParent(lead_id);
    nextCouplet();
  };

  /**
   * startOverHandler
   *
   * Restarts the key player at the first couplet.
   *
   * @param {type} event
   * @returns {undefined}
   */
  var startOverHandler = function(event) {
    event.preventDefault();
    next_id = $(event.target)
      .parents("a")
      .eq(0)
      .attr("href")
      .replace("#l_", "");
    nextCouplet();
  };

  /**
   * filterHandler
   *
   * @description Runs the localFilter function when the local filter button is clicked
   * @param {type} event
   */
  var filterHandler = function(event) {
    event.preventDefault();
    localFilter();
  };

  /**
   * playerWindow function
   *
   * Sets up the window the KeyBase Player runs in. Can be overridden by the user. Any user-defined playerWindow
   * function either must set up containers (divs) for the current node, path, remaining items and discarded items,
   * or they must be already defined in the HTML.
   */
  $.prototype.keybase.defaults.playerWindow = function() {
    $("<div>", { class: "keybase-player-window" }).appendTo(settings.playerDiv);

    if (!$(".keybase-player-window").height()) {
      var panelHeight = $(".keybase-player-window").width() * 0.67;
      $(".keybase-player-window").css("height", panelHeight + "px");
    }

    var css = {
      position: "absolute",
      height: $(".keybase-player-window").height() * 0.5 - 3 + "px",
      width: "100%"
    };

    $("<div>", { class: "keybase-player-leftpane" }).appendTo(
      ".keybase-player-window"
    );
    currentNodeElem = $("<div>", { class: settings.cssClass.currentNode })
      .css(css)
      .appendTo(".keybase-player-leftpane");
    $("<div>", { class: "keybase-player-drag-updown" }).appendTo(
      ".keybase-player-leftpane"
    );
    pathElem = $("<div>", { class: settings.cssClass.path })
      .css(css)
      .appendTo(".keybase-player-leftpane");
    $("<div>", { class: "keybase-player-drag-leftright" }).appendTo(
      ".keybase-player-window"
    );
    $("<div>", { class: "keybase-player-rightpane" }).appendTo(
      ".keybase-player-window"
    );
    remainingItemsElem = $("<div>", { class: settings.cssClass.remainingItems })
      .css(css)
      .appendTo(".keybase-player-rightpane");
    $("<div>", { class: "keybase-player-drag-updown" }).appendTo(
      ".keybase-player-rightpane"
    );
    discardedItemsElem = $("<div>", { class: settings.cssClass.discardedItems })
      .css(css)
      .appendTo(".keybase-player-rightpane");

    settings.resizePlayerWindow();

    $("<h3>", { html: "Current node" }).appendTo(currentNodeElem);
    $("<h3>", { html: "Path" }).appendTo(pathElem);
    $("<h3>", {
      html: 'Remaining items (<span class="keybase-num-remaining"></span>)'
    }).appendTo(remainingItemsElem);
    $("<h3>", {
      html: 'Discarded items (<span class="keybase-num-discarded"></span>)'
    }).appendTo(discardedItemsElem);

    $("<div>").appendTo(currentNodeElem);
    $("<div>").appendTo(pathElem);
    $("<div>").appendTo(remainingItemsElem);
    $("<div>").appendTo(discardedItemsElem);

    currentNodeElem
      .children("div")
      .css(
        "height",
        currentNodeElem.height() -
          currentNodeElem.children("h3").height() -
          parseInt(currentNodeElem.children("h3").css("padding-top")) * 2 +
          "px"
      );
    pathElem
      .children("div")
      .css(
        "height",
        pathElem.height() -
          pathElem.children("h3").height() -
          parseInt(pathElem.children("h3").css("padding-top")) * 2 +
          "px"
      );
    remainingItemsElem
      .children("div")
      .css(
        "height",
        remainingItemsElem.height() -
          remainingItemsElem.children("h3").height() -
          parseInt(remainingItemsElem.children("h3").css("padding-top")) * 2 +
          "px"
      );
    discardedItemsElem
      .children("div")
      .css(
        "height",
        discardedItemsElem.height() -
          discardedItemsElem.children("h3").height() -
          parseInt(discardedItemsElem.children("h3").css("padding-top")) * 2 +
          "px"
      );

    // KeyBase Player menu
    $("<span>", { class: "keybase-player-menu" }).appendTo(
      "." + settings.cssClass.currentNode + " h3"
    );
    $("<span>", { class: settings.cssClass.stepBack }).appendTo(
      ".keybase-player-menu"
    );
    $("<a>", { href: "#", title: "Step back" }).appendTo(
      "." + settings.cssClass.stepBack
    );
    $("<span>", { class: settings.cssClass.startOver }).appendTo(
      ".keybase-player-menu"
    );
    $("<a>", { href: "#", title: "Start over" }).appendTo(
      "." + settings.cssClass.startOver
    );

    // Local filter button
    $("<span>", { class: "keybase-player-menu" }).appendTo(
      "." + settings.cssClass.remainingItems + " h3"
    );
    $("<span>", { class: "keybase-player-filter" }).appendTo(
      "." + settings.cssClass.remainingItems + " .keybase-player-menu"
    );
    $("<a>", { href: "#", title: "Filter" }).appendTo(
      "." + settings.cssClass.remainingItems + " .keybase-player-filter"
    );

    if ($("link[rel=stylesheet][href*=font-awesome]").length > 0) {
      $(".keybase-player-filter a").html(
        '<i class="fa fa-filter fa-lg fa-lg"></i>'
      );
      $("." + settings.cssClass.stepBack + " a").html(
        '<i class="fa fa-undo fa-lg fa-lg"></i>'
      );
      $("." + settings.cssClass.startOver + " a").html(
        '<i class="fa fa-refresh fa-lg fa-lg"></i>'
      );
    }

    // Resize Player panes
    var position;
    $(".keybase-player-window").on(
      "mousedown",
      ".keybase-player-drag-leftright",
      $.prototype.keybase.dragLeftRight
    );
    $(".keybase-player-leftpane").on(
      "mousedown",
      ".keybase-player-drag-updown",
      $.prototype.keybase.dragUpDownLeftPane
    );
    $(".keybase-player-rightpane").on(
      "mousedown",
      ".keybase-player-drag-updown",
      $.prototype.keybase.dragUpDownRightPane
    );

    $(document).mouseup(function(e) {
      $(document).unbind("mousemove");
    });
  };

  $.prototype.keybase.defaults.resizePlayerWindow = function() {
    $(".keybase-player-window").css({
      position: "relative"
    });
    $(".keybase-player-drag-leftright").css({
      width: "6px",
      height: "100%"
    });
    $(".keybase-player-drag-updown").css({
      height: "6px",
      width: "100%"
    });
    $(".keybase-player-leftpane, .keybase-player-rightpane").css({
      height: "100%",
      position: "absolute",
      top: "0px"
    });

    $(".keybase-player-leftpane").css({
      width: $(".keybase-player-window").width() * 0.67 - 3 + "px",
      left: "0px"
    });
    $(".keybase-player-drag-leftright").css({
      position: "absolute",
      top: "0px",
      left: $(".keybase-player-leftpane").width() + "px"
    });
    $(".keybase-player-rightpane").css({
      width: $(".keybase-player-window").width() * 0.33 - 3 + "px",
      left: $(".keybase-player-leftpane").width() + 6 + "px"
    });

    $(".keybase-player-drag-updown").css({
      position: "absolute",
      top: $(".keybase-player-window").height() * 0.5 - 3 + "px"
    });
    $(
      "." + settings.cssClass.path + ", ." + settings.cssClass.discardedItems
    ).css({
      top: $(".keybase-player-window").height() * 0.5 + 3 + "px"
    });
  };

  $.prototype.keybase.dragLeftRight = function(event) {
    event.preventDefault();
    position = $(".keybase-player-window").offset();
    $(document).mousemove(function(e) {
      if (
        e.pageX > position.left + 190 &&
        e.pageX < position.left + $(".keybase-player-window").width() - 190
      ) {
        $(".keybase-player-leftpane").css("width", e.pageX - position.left);
        $(".keybase-player-drag-leftright").css(
          "left",
          e.pageX - position.left
        );
        $(".keybase-player-rightpane").css({
          left: e.pageX - position.left + 6,
          width:
            $(".keybase-player-window").width() -
            $(".keybase-player-leftpane").width() -
            6 +
            "px"
        });
      }
    });
  };

  $.prototype.keybase.dragUpDownLeftPane = function(event) {
    var currentNodeElem = $("." + settings.cssClass.currentNode);
    var pathElem = $("." + settings.cssClass.path);
    event.preventDefault();
    position = $(".keybase-player-leftpane").offset();
    $(document).mousemove(function(e) {
      if (
        e.pageY > position.top + 29 &&
        e.pageY < position.top + $(".keybase-player-window").height() - 32
      ) {
        $(".keybase-player-leftpane .keybase-player-drag-updown").css(
          "top",
          e.pageY - position.top + 2
        );
        currentNodeElem.css("height", e.pageY - position.top);
        pathElem.css({
          top: e.pageY - position.top + 5,
          height:
            $(".keybase-player-window").height() -
            currentNodeElem.height() -
            6 +
            "px"
        });
        currentNodeElem
          .children("div")
          .css(
            "height",
            currentNodeElem.height() -
              currentNodeElem.children("h3").height() -
              parseInt(currentNodeElem.children("h3").css("padding-top")) * 2 +
              "px"
          );
        pathElem
          .children("div")
          .css(
            "height",
            pathElem.height() -
              pathElem.children("h3").height() -
              parseInt(pathElem.children("h3").css("padding-top")) * 2 +
              "px"
          );
        if (pathElem.children("div").height() < 5) {
          pathElem
            .children("div")
            .css("overflow", "hidden")
            .children()
            .hide();
        } else {
          pathElem
            .children("div")
            .css("overflow", "auto")
            .children()
            .show();
        }
      }
    });
  };

  $.prototype.keybase.dragUpDownRightPane = function(event) {
    var remainingItemsElem = $("." + settings.cssClass.remainingItems);
    var discardedItemsElem = $("." + settings.cssClass.discardedItems);
    event.preventDefault();
    position = $(".keybase-player-rightpane").offset();
    $(document).mousemove(function(e) {
      if (
        e.pageY > position.top + 29 &&
        e.pageY < position.top + $(".keybase-player-window").height() - 32
      ) {
        $(".keybase-player-rightpane .keybase-player-drag-updown").css(
          "top",
          e.pageY - position.top + 2
        );
        remainingItemsElem.css("height", e.pageY - position.top);
        discardedItemsElem.css({
          top: e.pageY - position.top + 5,
          height:
            $(".keybase-player-window").height() -
            remainingItemsElem.height() -
            6 +
            "px"
        });
        remainingItemsElem
          .children("div")
          .css(
            "height",
            remainingItemsElem.height() -
              remainingItemsElem.children("h3").height() -
              parseInt(remainingItemsElem.children("h3").css("padding-top")) *
                2 +
              "px"
          );
        discardedItemsElem
          .children("div")
          .css(
            "height",
            discardedItemsElem.height() -
              discardedItemsElem.children("h3").height() -
              parseInt(discardedItemsElem.children("h3").css("padding-top")) *
                2 +
              "px"
          );
        if (discardedItemsElem.children("div").height() < 5) {
          discardedItemsElem
            .children("div")
            .css("overflow", "hidden")
            .children()
            .hide();
        } else {
          discardedItemsElem
            .children("div")
            .css("overflow", "auto")
            .children()
            .show();
        }
      }
    });
  };

  /**
   * currentNodeDisplay function
   *
   * Displays the current node.
   *
   * @param node
   * @param currentNodeDiv
   */
  $.prototype.keybase.defaults.currentNodeDisplay = function(
    node,
    currentNodeDiv
  ) {
    var leads = [];
    $.each(node, function(index, item) {
      var lead =
        '<li><a class="keybase-lead" href="#l_' +
        item.lead_id +
        '">' +
        item.lead_text +
        "</li>";
      leads.push(lead);
    });
    $(currentNodeDiv)
      .eq(0)
      .children("div")
      .eq(0)
      .html("<ul>" + leads.join("") + "</ul>");
  };

  /**
   * resultDisplay function
   *
   * Displays the determination result.
   *
   * @param result
   * @param resultDiv
   */
  $.prototype.keybase.defaults.resultDisplay = function(result, resultDiv) {
    if (result[0].url) {
      var text =
        '<a href="' + result[0].url + '">' + result[0].item_name + "</a>";
    } else {
      var text = result[0].item_name;
    }
    $(resultDiv)
      .eq(0)
      .children("div")
      .eq(0)
      .html(
        '<div class="keybase-player-result">Result: <b>' + text + "</b></div>"
      );
  };

  /**
   * pathDisplay function
   *
   * Displays the path followed to get to the current couplet (or result).
   *
   * @param path
   * @param pathDiv
   */
  $.prototype.keybase.defaults.pathDisplay = function(path, pathDiv) {
    var leads = [];
    $.each(path, function(index, item) {
      var lead;
      if (filter_leads.length === 0 || filter_parents[item.parent_id] > 1) {
        lead =
          '<li><a href="#l_' +
          item.lead_id +
          '">' +
          item.lead_text +
          "</a></li>";
      }
      leads.push(lead);
    });
    $(pathDiv)
      .eq(0)
      .children("div")
      .eq(0)
      .html("<ol>" + leads.join("") + "</ol>");
  };

  /**
   *
   */
  $.prototype.keybase.defaults.renderItemLink = function(item) {
    var link = "";
    if (item.url) {
      link += '<a href="/flora/taxon/' + item.url.split('/').pop() + '">' + item.item_name + "</a>";
    } else {
      link += item.item_name;
    }
    if (item.to_key) {
      link +=
        '<a href="' +
        item.to_key +
        '"> →</a>';
    }

    if (item.link_to_item_id) {
      link += ": ";
      if (item.link_to_url) {
        link +=
          '<a href="' +
          item.link_to_url +
          '">' +
          item.link_to_item_name +
          "</a>";
      } else {
        link += item.link_to_item_name;
      }
      if (item.link_to_key) {
        link +=
          '<a href="' +
          item.link_to_key +
          '"> →</a>';
      }
    }
    return link;
  };

  /**
   * remainingItemsDisplay functions
   *
   * Displays the remaining items.
   *
   * @param items
   * @param itemsDiv
   */
  $.prototype.keybase.defaults.remainingItemsDisplay = function(
    items,
    itemsDiv
  ) {
    var list = itemsDisplay(items);
    $(itemsDiv)
      .eq(0)
      .children("h3")
      .eq(0)
      .children(".keybase-num-remaining")
      .eq(0)
      .html(items.length);
    $(itemsDiv)
      .eq(0)
      .children("div")
      .eq(0)
      .html("<ul>" + list.join("") + "</ul>");
    displayChildItems(itemsDiv);
  };

  /**
   * discardedItemsDisplay function
   *
   * Displays the discarded items.
   *
   * @param array items
   * @param itemsDiv
   */
  $.prototype.keybase.defaults.discardedItemsDisplay = function(
    items,
    itemsDiv
  ) {
    var list = itemsDisplay(items);
    $(itemsDiv)
      .eq(0)
      .children("h3")
      .eq(0)
      .html("Discarded items (" + items.length + ")");
    $(itemsDiv)
      .eq(0)
      .children("div")
      .eq(0)
      .html("<ul>" + list.join("") + "</ul>");
    displayChildItems(itemsDiv);
  };

  /**
   * itemsDisplay function
   *
   * @param array items
   * @returns {undefined}
   */
  var itemsDisplay = function(items) {
    var list = [];
    $.each(items, function(index, item) {
      var entity;
      entity = "<li ";
      entity += 'data-item-id="' + item.item_id + '"';
      if (typeof item.parent_id !== "undefined") {
        entity += ' data-parent-id="' + item.parent_id + '"';
      }
      entity += ">";
      entity += settings.renderItemLink(item);
      entity += "</li>";
      list.push(entity);
    });
    return list;
  };

  var displayChildItems = function(itemsDiv) {
    var childItems = $(itemsDiv + " [data-parent-id]");
    if (childItems.length) {
      childItems.each(function() {
        var selector =
          itemsDiv + ' [data-item-id="' + $(this).data("parent-id") + '"]';
        var parent = $(selector);
        if (parent.length) {
          $("<ul/>")
            .append($(this))
            .appendTo(parent.eq(0));
        }
      });
    }
  };

  /**
   * function keyTitle
   *
   * Displays the title of the key.
   */
  $.prototype.keybase.defaults.keyTitle = function(json) {
    if (!$(settings.titleDiv).length) {
      if (settings.titleDiv.substr(0, 1) === "#") {
        $("<div>", { id: settings.titleDiv.substr(1) }).appendTo(
          settings.playerDiv
        );
      } else {
        $("<div>", { class: settings.titleDiv.substr(1) }).appendTo(
          settings.playerDiv
        );
      }
    }

    $("<div>", { class: "keybase-project-icon" })
      .append('<img src="' + json.project.project_icon + '" alt="" />')
      .appendTo(settings.titleDiv);

    $("<h1>", {
      style: "float:left;",
      html:
        '<a href="/keybase/project/show/' +
        json.project.project_id +
        '"<span class="keybase-project-name">' +
        json.project.project_name +
        '</span></a>: <span class="keybase-key-name">' +
        json.key_title +
        "</span>"
    }).appendTo(settings.titleDiv);
  };

  /**
   * function keySource
   *
   * Displays the source publication of the key.
   *
   * @param source
   */
  $.prototype.keybase.defaults.keySource = function(source) {
    var str;
    if (source.author && source.publication_year && source.title) {
      if (source.is_modified) {
        str = "Modified from: ";
      } else {
        str = "From: ";
      }

      str += "<b>" + source.author + "</b> (" + source.publication_year + "). ";
      if (source.journal) {
        str += source.title + ". <i>" + source.journal + "</i>";
        if (source.series) {
          str += ", ser. " + source.series;
        }
        str += " <b>" + source.volume + "</b>";
        if (source.part) {
          str += "(" + source.part + ")";
        }
        str += ": " + source.page + ".";
      } else {
        if (source.in_title) {
          str += source.title + ". In: ";
          if (source.in_author) {
            str += source.in_author + ", ";
          }
          str += "<i>" + source.in_title + "</i>";
          if (source.volume) {
            str += " <b>" + source.volume + "</b>";
          }
          if (source.page) {
            str += ", pp. " + source.page;
          }
          str += ".";
          if (source.publisher) {
            str += " " + source.publisher;
            if (source.place_of_publication) {
              str += ",";
            } else {
              str += ".";
            }
          }
          if (source.place_of_publication) {
            str += " " + source.place_of_publication + ".";
          }
        }
      }
    }

    if (!$(settings.sourceDiv).length) {
      if (settings.sourceDiv.substr(0, 1) === "#") {
        $("<div>", { id: settings.sourceDiv.substr(1) }).appendTo(
          settings.playerDiv
        );
      } else {
        $("<div>", { class: settings.sourceDiv.substr(1) }).appendTo(
          settings.playerDiv
        );
      }
    }
    $(settings.sourceDiv).html(str);
  };

  /*
   * KeyBase processing functions
   */

  /**
   * function nestedSets
   *
   * Creates the nested sets that are necessary to run or reproduce the key. Initiates the getNode function, which
   * will do the heavy lifting and when the getNode function has traversed all the nodes creates the nested set for
   * the root node.
   */
  var nestedSets = function() {
    nested_sets = [];

    i = 1;
    getNode(rootNodeID);

    nested_sets.sort(function(a, b) {
      return a.left - b.left;
    });

    json.first_step.left = 1;
    json.first_step.right = Math.max.apply(
      Math,
      JSPath.apply(".right", nested_sets)
    );
  };

  /**
   * function getNode
   *
   * Work horse for the nestedSets function: traverses the key by finding the leads for which the parent ID is the
   * ID for the current lead at each step.
   *
   * @param parentID
   */
  var getNode = function(parentID) {
    var leads = JSPath.apply(".leads{.parent_id==" + parentID + "}", json);
    $.each(leads, function(index, lead) {
      i++;
      lead.left = i;
      //if (!lead.item) {
      getNode(lead.lead_id);
      //}
      lead.right = i;
      nested_sets.push(lead);
    });
  };

  var getNodes = function() {
    var parent_ids = JSPath.apply(".parent_id", nested_sets);
    var ids = [];
    keyNodes = [];
    var i = 1;

    $.each(parent_ids, function(index, item) {
      if (ids.indexOf(item) === -1) {
        ids.push(item);
        var node = {
          parent_id: item,
          node_number: i
        };
        keyNodes.push(node);
        i++;
      }
    });
  };

  /**
   * function nextCouplet
   *
   * Main function for the KeyBase Player. Calls the processing functions that return the current node, path followed
   * to get to the current node, and remaining and discarded items as Javascript Objects and then the display
   * functions that will turn the Javascript into human readable HTML. Display functions can be overridden by the user
   * when the KeyBase function is called.
   */
  var nextCouplet = function() {
    if (next_id === rootNodeID) {
      left = json.first_step.left;
      right = json.first_step.right;
    } else {
      var curnode = JSPath.apply('.leads{.lead_id=="' + next_id + '"}', json);
      left = curnode[0].left;
      right = curnode[0].right;
    }

    // Current node
    currentNode(next_id);
    if (current_node.length > 1) {
      settings.currentNodeDisplay(
        current_node,
        "." + settings.cssClass.currentNode
      );
    } else {
      var result = getResult();
      settings.resultDisplay(result, "." + settings.cssClass.currentNode);
    }
    $(".keybase-player-startover:eq(0)>a:eq(0)").attr(
      "href",
      "#l_" + rootNodeID
    );
    $(".keybase-player-stepback:eq(0)>a:eq(0)").attr("href", "#l_" + next_id);

    // Path
    var path = getPath();
    settings.pathDisplay(path, "." + settings.cssClass.path);

    // Remaining and discarded items
    var items = remainingItems();
    settings.remainingItemsDisplay(
      items.remaining,
      "." + settings.cssClass.remainingItems
    );
    settings.discardedItemsDisplay(
      items.discarded,
      "." + settings.cssClass.discardedItems
    );

    $.prototype.keybase.getters.remainingItems = function() {
      return items.remaining;
    };
    $.prototype.keybase.getters.discardedItems = function() {
      return items.discarded;
    };

    settings.onNextCouplet();
  };

  /**
   * function currentNode
   *
   * @param parentID
   * @returns {*}
   */
  var currentNode = function(parentID) {
    if (filter_leads.length === 0) {
      current_node = JSPath.apply(
        '.leads{.parent_id=="' + parentID + '"}',
        json
      );
    } else {
      var path = '.leads{.parent_id=="' + parentID + '"}{.lead_id==$lead_id}';
      var node = JSPath.apply(path, json, { lead_id: filter_leads });
      if (node.length === 1) {
        next_id = node[0].lead_id;
        currentNode(next_id);
      } else {
        current_node = node;
      }
    }
  };

  /**
   * function getResult
   *
   * Gets the determination result when the currentNode is not a couplet, but a taxon.
   *
   * @returns {*}
   */
  var getResult = function() {
    var item_id = JSPath.apply(
      '.leads{.lead_id=="' + next_id + '"}.item',
      json
    )[0];
    return JSPath.apply('.items{.item_id == "' + item_id + '"}', json);
  };

  /**
   * function getPath
   *
   * Gets the path followed to get to the current node.
   *
   * @returns {*}
   */
  var getPath = function() {
    var path = JSPath.apply(
      ".leads{.left <= " + left + " && .right >= " + right + "}",
      json
    );
    $.prototype.keybase.getters.path = function() {
      return path;
    };
    return path;
  };

  /**
   * function remainingItems
   *
   * Splits the items into remaining and discarded items
   *
   * @param aux_remaining
   * @returns {{remaining: Array, discarded: Array}}
   */
  var remainingItems = function() {
    var remaining = JSPath.apply(
      ".leads{.item && .left >= " + left + " && .right <= " + right + "}.item",
      json
    );
    var remaining_items = [];
    var discarded_items = [];

    var items;
    if (filter_items.length === 0) {
      items = json.items;
    } else {
      var path = ".items{.item_id==$item_id}";
      items = JSPath.apply(path, json, { item_id: filter_items });
    }

    $.each(items, function(index, item) {
      if (remaining.indexOf(item.item_id) > -1) {
        remaining_items.push(item);
      } else {
        discarded_items.push(item);
      }
    });

    var items = {
      remaining: remaining_items,
      discarded: discarded_items
    };
    return items;
  };

  /**
   * function getParent
   *
   * Gets the parent ID for the lead (based on the lead ID). Used to get the lead ID to initiate the trace back
   * functions.
   *
   * @param leadID
   * @returns {*}
   */
  var getParent = function(leadID) {
    return JSPath.apply(
      '.leads{.lead_id=="' + leadID + '"}.parent_id[0]',
      json
    );
  };

  /**
   * function indentedKey
   *
   * Initiates the indentedKeyNode function that creates the indented key. At the moment there is no display function
   * for the indented key yet and the display depends on the Dynatree widget.
   */
  var indentedKey = function() {
    indented_key = [];
    var root = {};
    root.title = json.key_title;
    root.isFolder = true;
    root.expand = true;
    root.children = [];
    if (filter_leads.length === 0) {
      indentedKeyNode(rootNodeID, root);
    } else {
      filter_nodes = [];
      $.each(Object.keys(filter_parents), function(index, item) {
        if (filter_parents[item] > 1) {
          filter_nodes.push(item);
        }
      });
      indentedKeyNode(filter_nodes[0], root);
    }
    indented_key.push(root);
    settings.onIndentedKey();
  };

  /**
   * function indentedKeyNode
   *
   * Creates the indented key nodes.
   *
   * @param parent_id
   * @param parent
   */
  var indentedKeyNode = function(parent_id, parent) {
    var children = [];
    if (filter_leads.length === 0) {
      children = JSPath(".{.parent_id==" + parent_id + "}", nested_sets);
    } else {
      children = JSPath(
        ".{.parent_id==" + parent_id + " && .lead_id==$filter_leads}",
        nested_sets,
        { filter_leads: filter_leads }
      );
    }
    parent.children = [];
    if (children.length > 0) {
      if (children.length > 1) {
        var couplet = {};
        couplet.title = "Couplet";
        couplet.isFolder = true;
        couplet.expand = true;
        couplet.children = [];
        parent.children[0] = couplet;

        //parent.children = children;
        $.each(children, function(index, lead) {
          var child = $.extend({}, lead);

          if (filter_leads.length === 0) {
            child.fromNode = JSPath.apply(
              '.{.parent_id=="' + child.parent_id + '"}',
              keyNodes
            )[0].node_number;
          } else {
            child.fromNode = filter_nodes.indexOf(child.parent_id) + 1;
          }

          var toNode = JSPath.apply(
            '.{.parent_id=="' + child.lead_id + '"}',
            keyNodes
          );
          if (toNode.length > 0) {
            child.toNode = toNode[0].node_number;
          }

          child.title = lead.lead_text;
          child.href = "#" + lead.lead_id;
          child.expand = true;
          delete child.left;
          delete child.right;
          if (child.item == null) {
            delete child.item;
          }

          if (filter_leads.length === 0) {
            var toNode = JSPath.apply(
              '.{.parent_id=="' + child.lead_id + '"}',
              keyNodes
            );
            if (toNode.length > 0) {
              child.toNode = toNode[0].node_number;
            }
          } else {
            if (filter_nodes.indexOf(child.lead_id) > -1) {
              child.toNode = filter_nodes.indexOf(child.lead_id) + 1;
            }
          }
          //if (children.length > 1) {
          couplet.children[index] = child;
          //}
          indentedKeyNode(lead.lead_id, child);
        });
      } else {
        lead = children[0];
        if (lead.item !== null) {
          parent.item = lead.item;
        }
        indentedKeyNode(lead.lead_id, parent);
      }
    } else {
      parent.children[0] = indentedKeyItem(parent.item);
      delete parent.item;
    }
  };

  var indentedKeyItem = function(item) {
    var taxa = {};
    taxa.title = "Item";
    taxa.isFolder = true;
    taxa.children = [];
    var taxon = JSPath.apply('.items{.item_id==="' + item + '"}', json)[0];
    taxon.title = taxon.item_name;
    taxa.children[0] = taxon;
    //alert (taxon.title);
    taxa.expand = true;
    return taxa;
  };

  /**
   * function indentedKeyDisplay
   *
   * Displays the indented key. The function is accessible from outside the plugin, so
   * users can overwrite it with their own function.
   */
  $.prototype.keybase.defaults.indentedKeyDisplay = function(json) {
    indentedKeyHtml = '<div class="keybase-indented-key">';
    displayIndentedKeyCouplet(indented_key[0].children[0]);

    indentedKeyHtml += "</div> <!-- /.keybase-indented-key -->";

    $(settings.indentedKeyDiv).html(indentedKeyHtml);
    $(settings.indentedKeyDiv).prepend(
      '<div class="keybase-indented-key-filter"><span class="keybase-player-filter"><a href="#" title="Filter"><i class="fa fa-filter fa-lg"></i></a></span></div>'
    );

    settings.onIndentedKeyComplete();
  };

  /**
   * function displayIndentedKeyCouplet
   */
  var displayIndentedKeyCouplet = function(couplet) {
    var leads = couplet.children;
    indentedKeyHtml += '<ul class="keybase-couplet">';
    for (var i = 0; i < leads.length; i++) {
      var lead = leads[i];
      indentedKeyHtml += "<li>";
      indentedKeyHtml += '<div class="keybase-lead">';
      indentedKeyHtml +=
        '<span class="keybase-from-node">' + lead.fromNode + "</span>";
      indentedKeyHtml +=
        '<span class="keybase-lead-text">' + lead.title + "</span>";
      var child = lead.children[0];
      if (child.title === "Couplet") {
        indentedKeyHtml += "</div> <!-- /.keybase-lead -->";
        displayIndentedKeyCouplet(child);
      } else {
        var item = JSPath.apply(
          '.items{.item_id==="' + child.children[0].item_id + '"}',
          json
        )[0];
        indentedKeyHtml += '<span class="keybase-to-item">';
        if (typeof item.parent_id !== "undefined") {
          var parent = JSPath.apply(
            ".items{.item_id==" + item.parent_id + "}",
            json
          )[0];
          indentedKeyHtml += settings.renderItemLink(parent);
          indentedKeyHtml += ": ";
        }
        indentedKeyHtml += settings.renderItemLink(item);
        indentedKeyHtml += "</span> <!-- /.keybase-to-item -->";
        indentedKeyHtml += "</div> <!-- /.keybase-lead -->";
      }
      indentedKeyHtml += "</li>";
    }

    indentedKeyHtml += "</ul> <!-- /.keybase-couplet -->";
  };

  /**
   * function bracketedKey
   *
   * Creates the bracketed key. At the moment there is no display function for the bracketed key yet and the display
   * depends on the Dynatree widget, which is not very suitable for the purpose.
   */
  var bracketedKey = function() {
    bracketed_key = [];
    var parent_ids = JSPath.apply(
      '.{.lead_text && .lead_text!=="[link through]"}.parent_id',
      nested_sets
    );
    var link_through_parents = JSPath.apply(
      '.{!.lead_text || .lead_text==="[link through]"}.parent_id',
      nested_sets
    );

    $.prototype.keybase.getters.linkThroughParents = function() {
      return link_through_parents;
    };

    var nodes = [];

    var root = {};
    root.title = json.key_title;
    root.isFolder = true;
    root.expand = true;
    root.children = [];

    if (filter_leads.length > 0) {
      var filterNodes = function() {
        var nodes = [];
        $.each(Object.keys(filter_parents), function(index, item) {
          if (filter_parents[item] > 1) {
            nodes.push(item);
          }
        });
        return nodes;
      };
      filter_nodes = filterNodes();
    }

    $.each(parent_ids, function(index, parent) {
      if (
        filter_leads.length === 0 ||
        (Object.keys(filter_parents).indexOf(parent) > -1 &&
          filter_parents[parent] > 1)
      ) {
        if (nodes.indexOf(parent) == -1) {
          nodes.push(parent);

          var couplet = {};
          couplet.title = "Couplet";
          couplet.isFolder = true;
          couplet.expand = true;
          couplet.children = [];

          var leads = JSPath.apply(
            ".{.parent_id==" + parent + "}",
            nested_sets
          );

          $.each(leads, function(index, lead) {
            var l = {};
            if (filter_leads.length === 0) {
              l.fromNode = JSPath.apply(
                '.{.parent_id=="' + lead.parent_id + '"}',
                keyNodes
              )[0].node_number;
            } else {
              l.fromNode = filter_nodes.indexOf(lead.parent_id) + 1;
            }

            l.parent_id = lead.parent_id;
            l.lead_id = lead.lead_id;

            l.title = lead.lead_text;
            l.href = "#" + lead.lead_id;
            l.expand = true;
            l.children = [];
            if (lead.item != null) {
              var items = {};
              items.title = "Item";
              items.isFolder = true;
              items.expand = true;
              items.children = [];
              var item = {};
              item.item_id = lead.item;
              item.title = JSPath.apply(
                '.items{.item_id==="' + lead.item + '"}.item_name',
                json
              )[0];
              item.expand = true;
              items.children.push(item);
              l.children.push(items);
            } else {
              if (filter_leads.length === 0) {
                var toNode = JSPath.apply(
                  '.{.parent_id=="' + lead.lead_id + '"}',
                  keyNodes
                );
                if (toNode.length > 0) {
                  l.toNode = toNode[0].node_number;
                }
              } else {
                var to = filteredBracketedKeyToNode(lead);
                if (to.toNode !== undefined) {
                  l.toNode = to.toNode;
                } else {
                  if (to.items !== undefined) {
                    l.children.push(to.items);
                  }
                }
              }
            }

            if (link_through_parents.indexOf(lead.lead_id) > -1) {
              
              var linkItems = JSPath.apply(
                ".{.parent_id==" + lead.lead_id + "}.item",
                nested_sets
              );

              l.linkItems = JSPath.apply(".items{.item_id===$item}", json, {
                item: linkItems
              });
            }

            couplet.children.push(l);
          });
          root.children.push(couplet);
        }
      }
    });

    bracketed_key.push(root);
    settings.onBracketedKey();
  };

  /*
   * function filteredBracketedKeyToNode
   */
  var filteredBracketedKeyToNode = function(lead) {
    var toNode = JSPath.apply(
      '.{.parent_id=="' + lead.lead_id + '" && .lead_id===$filterLeads}',
      nested_sets,
      { filterLeads: filter_leads }
    );
    if (toNode.length > 0) {
      if (toNode.length > 1) {
        //var nodeNumber = JSPath.apply('.{.parent_id=="' + toNode[0].parent_id + '"}', keyNodes)[0].node_number;
        //return {toNode: nodeNumber};
        return { toNode: filter_nodes.indexOf(toNode[0].parent_id) + 1 };
      } else {
        if (toNode[0].item !== null && toNode[0].item.length > 0) {
          var items = {};
          items.title = "Item";
          items.isFolder = true;
          items.expand = true;
          items.children = [];
          var item = {};
          item.item_id = toNode[0].item;
          item.title = JSPath.apply(
            '.items{.item_id==="' + toNode[0].item + '"}.item_name',
            json
          )[0];
          item.expand = true;
          items.children.push(item);
          return { items: items };
        } else {
          return filteredBracketedKeyToNode(toNode[0]);
        }
      }
    }
  };

  /**
   * function bracketedKeyDisplay
   *
   * Displays the bracketed key. This function is accessible from outside the plugin, so
   * users can use their own function to display the bracketed keys. If the KeyBase plugin
   * is used to manage keys in a project, you might not want to directly link to the next
   * key, for example, but make the user go via the web page for the keyed-out item.
   */
  $.prototype.keybase.defaults.bracketedKeyDisplay = function(json) {
    var html = '<div class="keybase-bracketed-key">';
    var couplets = bracketed_key[0].children;
    for (var i = 0; i < couplets.length; i++) {
       
      var couplet = couplets[i];
      var leads = couplet.children;
      html += '<div class="keybase-couplet" id="l_' + leads[0].parent_id + '">';
    //html += '<span class="test">' + JSON.stringify(couplet.children) + '</span>';
      for (var j = 0; j < leads.length; j++) {
        var lead = leads[j];
        var items = lead.children;

        html += '<div class="keybase-lead">';
        html += '<span class="keybase-from-node">' + lead.fromNode + "</span>";
        html += '<span class="keybase-lead-text">' + lead.title;
        if (lead.toNode !== undefined) {
          html +=
            '<span class="keybase-to-node"><a href="#l_' +
            lead.lead_id +
            '">' +
            lead.toNode +
            "</a></span>";
        } else {
          var toItem = items[0].children[0];
          var item = JSPath.apply(
            '.items{.item_id=="' + toItem.item_id + '"}',
            json
          )[0];
          html += '<span class="keybase-to-item">';
          html += settings.renderItemLink(item);
          if (typeof lead.linkItems !== "undefined") {
            html += " > ";
            $.each(lead.linkItems, function(index, item) {
              html += settings.renderItemLink(item);
            });
          }
          html += "</span> <!-- /.to-item -->";
        }
        html += "</span> <!-- /.keybase-lead-text -->";
        html += "</div> <!-- /.keybase-lead -->";
      }
      html += "</div> <!-- /.keybase-couplet -->";
    }
    html += "</div> <!-- /.keybase-bracketed_key -->";
    $(settings.bracketedKeyDiv).html(html);
    $(settings.bracketedKeyDiv).prepend(
      '<div class="keybase-bracketed-key-filter"><span class="keybase-player-filter"><a href="#" title="Filter"><i class="fa fa-filter fa-lg"></i></a></span></div>'
    );
    settings.onBracketedKeyComplete();
  };

  /*
   * Filter functions
   */

  /**
   * function localFilter
   *
   * Sets up the window for the local filter, as well as the functionality.
   */
  var localFilter = function() {
    var localFilter = $("<div>", { class: "keybase-local-filter" });
    var divIncluded = $("<div>");
    var divExcluded = $("<div>");
    var labelIncluded = $("<label>", {
      for: "initems",
      html: "Included items"
    });
    var labelExcluded = $("<label>", {
      for: "outitems",
      html: "Excluded items"
    });
    var selectIncluded = $("<select>", {
      name: "includedItems",
      id: "initems",
      multiple: "multiple"
    });
    var selectExcluded = $("<select>", {
      name: "excludedItems",
      id: "outitems",
      multiple: "multiple"
    });

    var incl = [];
    var excl = [];
    $.each(json.items, function(index, item) {
      var name = item.item_name;
      name += item.link_to_item_name ? ": " + item.link_to_item_name : "";
      var opt = '<option value="' + item.item_id + '">' + name + "</option>";
      if (
        filter_items.length === 0 ||
        filter_items.indexOf(item.item_id) > -1 ||
        filter_items.indexOf(Number(item.item_id)) > -1
      ) {
        incl.push(opt);
      } else {
        excl.push(opt);
      }
    });

    selectIncluded.append(incl.join(""));
    sortOptions("includedItems");
    if (excl) {
      selectExcluded.append(excl.join(""));
      sortOptions("excludedItems");
    }

    var buttonDiv = $("<div>", { class: "keybase-filter-buttons" });
    buttonDiv
      .append(
        '<span><button class="keybase-filter-button-excl"></button></span>'
      )
      .append(
        '<span><button class="keybase-filter-button-excl-all"></button></span>'
      )
      .append(
        '<span><button class="keybase-filter-button-incl"></button></span>'
      )
      .append(
        '<span><button class="keybase-filter-button-incl-all"></button></span>'
      );

    var footerDiv = $("<div>", { class: "keybase-local-filter-footer" });
    footerDiv
      .append('<button class="keybase-local-filter-cancel">Cancel</button>')
      .append('<button class="keybase-local-filter-ok">OK</button>');

    divIncluded.append(labelIncluded).append(selectIncluded);
    divExcluded.append(labelExcluded).append(selectExcluded);

    localFilter
      .append(divIncluded)
      .append(buttonDiv)
      .append(divExcluded)
      .append(footerDiv);

    keybaseLightBox(localFilter);

    boxHeaders();

    $(".keybase-filter-button-excl").click(function(e) {
      $("[name=includedItems]>option:selected").each(function() {
        $(this).remove();
        $(this).removeAttr("selected");
        $("[name=excludedItems]").append($(this));
      });
      sortOptions("excludedItems");
      $.prototype.keybase.filterItems();
      boxHeaders();
    });

    $(".keybase-filter-button-excl-all").click(function(e) {
      $("[name=includedItems]>option").each(function() {
        $(this).remove();
        $(this).removeAttr("selected");
        $("[name=excludedItems]").append($(this));
      });
      sortOptions("excludedItems");
      $.prototype.keybase.filterItems();
      boxHeaders();
    });

    $(".keybase-filter-button-incl").click(function(e) {
      $("[name=excludedItems]>option:selected").each(function() {
        $(this).remove();
        $(this).removeAttr("selected");
        $("[name=includedItems]").append($(this));
      });
      sortOptions("includedItems");
      $.prototype.keybase.filterItems();
      boxHeaders();
    });

    $(".keybase-filter-button-incl-all").click(function(e) {
      $("[name=excludedItems]>option").each(function() {
        $(this).remove();
        $(this).removeAttr("selected");
        $("[name=includedItems]").append($(this));
      });
      sortOptions("includedItems");
      $.prototype.keybase.filterItems();
      boxHeaders();
    });

    $(".keybase-local-filter-cancel").click(function() {
      closeKeybaseLightbox();
    });

    $(".keybase-local-filter-ok").click(function() {
      closeKeybaseLightbox();

      if (filter_items.length) {
        setFilter();
        bracketedKey();
        settings.bracketedKeyDisplay(json);
        indentedKey();
        settings.indentedKeyDisplay();
      } else {
        removeFilter();
        bracketedKey();
        settings.bracketedKeyDisplay(json);
        indentedKey();
        settings.indentedKeyDisplay();
      }
    });

    settings.onFilterWindowOpen();
  };

  /**
   * function keybaseLightBox
   *
   * LightBox for the local filter.
   *
   * @param content
   */
  var keybaseLightBox = function(content) {
    // add lightbox/shadow <div/>'s if not previously added
    if ($("#keybase-lightbox").length === 0) {
      var theLightbox = $('<div id="keybase-lightbox"/>');
      theLightbox
        .append(
          '<div class="keybase-lightbox-header">' +
            '<i class="keybase-lightbox-close ' +
            'fa fa-close pull-right fa-border"></i>' +
            "</div>"
        )
        .append('<div class="keybase-lightbox-content"></div>')
        .append('<div class="keybase-lightbox-footer"></div>');

      var theShadow = $('<div id="keybase-lightbox-shadow"/>');
      theShadow.css("height", $(document).height() + "px");
      $(theShadow).click(function(e) {
        closeKeybaseLightbox();
      });

      $("body").append(theShadow);
      $("body").append(theLightbox);
      $(document).keydown(function(e) {
        if (e.keyCode == 27) {
          closeKeybaseLightbox();
        }
      });
      $(".keybase-lightbox-close").click(function() {
        closeKeybaseLightbox();
      });
    }

    // remove any previously added content
    $(".keybase-lightbox-content").empty();

    // insert HTML content
    if (content != null) {
      $(".keybase-lightbox-content").append(content);
    }

    // move the lightbox to the current window top + 100px
    $("#keybase-lightbox").css("top", $(window).scrollTop() + 100 + "px");

    // display the lightbox
    $("#keybase-lightbox").show();
    $("#keybase-lightbox-shadow").show();
  };

  /**
   * function closeKeybaseLightbox
   *
   * Closes the light box.
   */
  var closeKeybaseLightbox = function() {
    $("#keybase-lightbox").hide();
    $("#keybase-lightbox-shadow").hide();
  };

  /**
   * function sortOptions
   *
   * Orders the options for the included and excluded items in the local filter.
   *
   * @param select
   */
  var sortOptions = function(select) {
    var options = $("[name=" + select + "]>option");
    options.sort(function(a, b) {
      if (a.text > b.text) return 1;
      else if (a.text < b.text) return -1;
      else return 0;
    });
    $("[name=" + select + "]").html(options);
  };

  /**
   * function boxHeaders
   *
   * Sets the labels for the included and excluded items selects in the local
   * filter. Label includes
   * the number of options in the select.
   */
  var boxHeaders = function() {
    $('label[for="initems"]').text(
      "Included taxa (" + $("#initems>option").length + ")"
    );
    $('label[for="outitems"]').text(
      "Excluded taxa (" + $("#outitems>option").length + ")"
    );
  };

  /**
   * function $.prototype.keybase.filterItems
   *
   * Creates an array of item IDs for items to filter on, based on the options
   * in the Included items select.
   */
  $.prototype.keybase.filterItems = function() {
    filter_items = [];
    var initems = $("[name=includedItems]>option");
    var outitems = $("[name=excludedItems]>option");
    if (initems.length && outitems.length) {
      $("[name=includedItems]>option").each(function() {
        filter_items.push($(this).val());
      });
    }
  };

  /**
   * function setFilter
   *
   * Calls the function that creates the filtered key and restarts the key.
   */
  var setFilter = function() {
    filterLeads();
    next_id = rootNodeID;
    if ($(".keybase-player-window").length === 0) {
      settings.playerWindow();
      settings.playerEvents();
    }
    nextCouplet();

    if ($(".keybase-player-filter-remove").length === 0) {
      $(".keybase-player-filter").after(
        '<span class="keybase-player-filter-remove">' +
          '<a href="#"></a></span>'
      );
      if ($("link[rel=stylesheet][href*=font-awesome]").length > 0) {
        $(".keybase-player-filter-remove a").html(
          '<i class="fa fa-trash fa-lg fa-lg"></i>'
        );
      }

      $(".keybase-player-filter-remove").click(function(e) {
        e.preventDefault();
        removeFilter();
      });
    }
  };

  /**
   * function filterLeads
   *
   * Creates the array with leads that need to be followed to key out all
   * items in the filter.
   */
  var filterLeads = function() {
    var path = ".{.item==$item}.left";
    var filter_nodes = JSPath.apply(path, nested_sets, { item: filter_items });

    filter_leads = [];
    var parents = [];
    $.each(filter_nodes, function(index, node) {
      var leads = JSPath.apply(
        ".{.left <= " + node + "}{.right >= " + node + "}",
        nested_sets
      );
      $.each(leads, function(ind, lead) {
        if (filter_leads.indexOf(lead.lead_id) === -1) {
          filter_leads.push(lead.lead_id);
          parents.push(lead.parent_id);
        }
      });
    });

    // get object with parent_ids and their number of occurrences
    // in the filtered set
    filter_parents = parents.reduce(function(acc, curr) {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});
  };

  /**
   * function removeFilter
   *
   * Destroys the filter.
   */
  var removeFilter = function() {
    filter_items = [];
    filter_leads = [];
    filter_parents = [];
    next_id = rootNodeID;
    nextCouplet();
    $(".keybase-player-filter").css("background-color", "#ddd");
    $(".keybase-player-filter-remove").remove();
  };

  /**
   *
   */
  var linkItems = function() {
    var linkThroughLeads = JSPath.apply(
      '.leads{.lead_text==="[link through]"}',
      json
    );
    if (linkThroughLeads.length > 0) {
      $.each(linkThroughLeads, function(index, lead) {
        var item = JSPath(".items{.item_id==" + lead.item + "}", json)[0];
        var parentLead = JSPath(
          ".leads{.lead_id==" + lead.parent_id + "}",
          json
        )[0];
        if (typeof parentLead.item !== "undefined" && parentLead.item) {
          item.parent_id = parentLead.item;
        }
      });
    }

    /*      var link_through_leads =
                JSPath.apply('.leads{.lead_text==="[link through]"}.parent_id',
                        json);
        if (link_through_leads.length > 0) {
            var link_item_ids = [];
            var link_items = [];
            var removeLeads = [];
            $.each(json.leads, function(index, lead) {
                if (lead.lead_text === "[link through]") {
                    var parent_lead = JSPath.apply('.leads{.lead_id=="'
                            + lead.parent_id + '"}', json)[0];
                    if (link_item_ids.indexOf(lead.item) === -1) {
                        link_item_ids.push(lead.item);
                        var link_item = {
                            item_id: lead.item,
                            parent_id: parent_lead.item
                        };
                        link_items.push(link_item);
                    }
                    parent_lead.item += '_' + lead.item;
                    removeLeads.push(index);
                }
            });

            json.leads = $.grep(json.leads, function(n, i) {
                return $.inArray(i, removeLeads) === -1;
            });

            $.each(json.items, function(index, item) {
                var i = link_item_ids.indexOf(item.item_id);
                if (i > -1) {
                    var parent_item = JSPath.apply('.items{.item_id==="'
                            + link_items[i].parent_id + '"}', json)[0];
                    item.link_to_item_id = item.item_id;
                    item.item_id = parent_item.item_id + '_' + item.item_id;
                    item.link_to_item_name = item.item_name;
                    item.link_to_url = item.url;
                    item.link_to_key = item.to_key;
                    item.item_name = parent_item.item_name;
                    item.url = parent_item.url;
                    item.to_key = parent_item.to_key;
                }
            });

            var keyed_out_items = JSPath.apply('.leads{.item}.item', json);
            var removeItems = [];
            $.each(json.items, function(index, item) {
                if (keyed_out_items.indexOf(item.item_id) === -1) {
                    removeItems.push(index);
                }
            });

            json.items = $.grep(json.items, function(n, i) {
                return $.inArray(i, removeItems) === -1;
            });
        }
*/
  };

  var sortItems = function() {
    json.items.sort(function(a, b) {
      var sort_a =
        a.item_name + (a.link_to_item_name ? a.link_to_item_name : "");
      var sort_b =
        b.item_name + (b.link_to_item_name ? b.link_to_item_name : "");
      if (sort_a > sort_b) {
        return 1;
      }
      if (sort_a < sort_b) {
        return -1;
      }
      return 0;
    });
  };

  var unique = function(list) {
    var result = [];
    $.each(list, function(i, e) {
      if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
  };
})($);
