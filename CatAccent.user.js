// ==UserScript==
// @name        CatAccent
// @description Add a cat accent to your web viewing experience!
// @namespace   http://zemkat.org/
// @include     *
// @version     1.0
// @icon	http://zemkat.org/toys/CatAccent/cat32.png
// @updateURL   http://zemkat.org/toys/CatAccent/CatAccent.meta.js
// @downloadURL   http://zemkat.org/toys/CatAccent/CatAccent.user.js
// ==/UserScript==

/* THIS FUNCTION NEEDS MANY IMPROVEMENTS! :) */
function cat_translate() { /* regexes for cat translations */
    add_to_list(/\bnow\b/gi, "meow", true);
    add_to_list(/\bnew\b/gi, "mew", true);
    add_to_list(/\bperfect/gi, "purrfect", true);
    add_to_list(/\bhis\b/gi, "hiss", true);
    add_to_list(/\bbaby\b/gi, "kitten", true);
    add_to_list(/\bbabies\b/gi, "kittens", true);
    add_to_list(/\bangry\b/gi, "grumpy", true);
    add_to_list(/\bcheeseburger\b/gi, "cheezburger", true);
    add_to_list(/\bcat\b/gi, "boss", true);
    add_to_list(/\bwere\b/gi, "purr", true);
}

var cat_match = []; /* regexes to match */
var cat_replace = []; /* what to replace them with */
var cat_case = []; /* try to match case of source? */

cat_translate(); /* populate arrays */

/* add a rule to the arrays */
function add_to_list(regex_match, regex_replace, match_case) {
    cat_match.push(regex_match);
    cat_replace.push(regex_replace);
    cat_case.push(match_case);
}

/* replace string with cat version */
function cat_string(text) {
    for (j=0;j<=cat_match.length;j++) {
		if (cat_case[j]) {
        		text = text.replace(cat_match[j],function(w) { return alter_case(w,cat_replace[j]); });
		} else {
        		text = text.replace(cat_match[j],cat_replace[j]);
		}
    }
    return text;
}

/* return target, with capitalization similar to source */
function alter_case(source, target) {
	if (source[0].toLowerCase() != source[0]) { // first letter is capital
		if (source.length == 1) return target.toUpperCase();
		if (source[1].toLowerCase() != source[1]) { // near enough to all caps
			return target.toUpperCase();
		} else { // only first letter is capital
			return target[0].toUpperCase() + target.slice(1).toLowerCase();
		}
	} else {
		return target; 
	}
}

/* apply cat accent to the tree */
function cat_page(node) {
    var treeWalker = document.createTreeWalker(
        node, /* root */
        NodeFilter.SHOW_TEXT, /* nodes to show */
        null, /* custom filter? */
        false /* expand entity references? */
    );

    /* traverse the tree */
    while(treeWalker.nextNode()) {
        var current = treeWalker.currentNode;
        current.textContent = cat_string(current.textContent);
    }
}

cat_page(document.body); /* do it! */

