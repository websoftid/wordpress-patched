
/*====================================================*/
/* FILE /plugins/spam-captcha/core/js/parameters_admin.js*/
/*====================================================*/
/* =====================================================================================
*
*  Toggle folder
*
*/

function activateDeactivate_Params(param, toChange) {
	isChecked = jQuery("#"+param).is(':checked');
	for (i=0; i<toChange.length; i++) {
		if (!isChecked) {
			if (toChange[i].substring(0, 1)!="!") {
				jQuery("label[for='"+toChange[i]+"']").parents("tr").eq(0).hide() ; 
				jQuery("#"+toChange[i]).attr('disabled', 'disabled') ; 
				jQuery("#"+toChange[i]+"_workaround").attr('disabled', 'disabled') ; 
			} else {
				jQuery("label[for='"+toChange[i].substring(1)+"']").parents("tr").eq(0).show() ; 
				jQuery("#"+toChange[i].substring(1)).removeAttr('disabled') ;
				jQuery("#"+toChange[i].substring(1)+"_workaround").removeAttr('disabled') ;
			}
		} else {
			if (toChange[i].substring(0, 1)!="!") {
				jQuery("label[for='"+toChange[i]+"']").parents("tr").eq(0).show() ; 
				jQuery("#"+toChange[i]).removeAttr('disabled') ;
				jQuery("#"+toChange[i]+"_workaround").removeAttr('disabled') ;
			} else {
				jQuery("label[for='"+toChange[i].substring(1)+"']").parents("tr").eq(0).hide() ; 
				jQuery("#"+toChange[i].substring(1)).attr('disabled', 'disabled') ; 
				jQuery("#"+toChange[i].substring(1)+"_workaround").attr('disabled', 'disabled') ; 
			}
		}
	}
	return isChecked ; 
}

/* =====================================================================================
*
*  Remove param
*
*/

function del_param(param, md5, pluginID) {

	jQuery("#wait_"+md5).show();
		
	var arguments = {
		action: 'del_param', 
		pluginID: pluginID, 
		param : param
	} 
	
	//POST the data and append the results to the results div
	jQuery.post(ajaxurl, arguments, function(response) {
		if (response=="ok") {
			document.location = document.location ; 
		}
	}).error(function(x,e) { 
		if (x.status==0){
			//Offline
		} else if (x.status==500){
			remove_param(param) ; 
		} 
	});    
}

/* =====================================================================================
*
*  Add param
*
*/

function add_param(param, md5, pluginID) {

	jQuery("#wait_"+md5).show();
		
	var arguments = {
		action: 'add_param', 
		pluginID: pluginID, 
		param : param
	} 
	
	//POST the data and append the results to the results div
	jQuery.post(ajaxurl, arguments, function(response) {
		if (response=="ok") {
			document.location = document.location ; 
		}
	}).error(function(x,e) { 
		if (x.status==0){
			//Offline
		} else if (x.status==500){
			remove_param(param) ; 
		} 
	});    
}

/* =====================================================================================
*
*  Pour ajouter un media
*
*/

var paramMediaReturn = "" ; 

jQuery(document).ready(function() {
 
	window.send_to_editor = function(html) {
	    imgurl = jQuery('img',html).attr('src');
	    jQuery('#'+paramMediaReturn).val(imgurl);
	    tb_remove();
	}
 
});

/*====================================================*/
/* FILE /plugins/spam-captcha/core/js/translation_admin.js*/
/*====================================================*/

/* =====================================================================================
*
*  Add a new translation
*
*/

function translate_add(plug_param,dom_param,is_framework) {
	if (is_framework!="false") {
		var num = jQuery("#new_translation_frame option:selected").val() ;
		jQuery("#wait_translation_add_frame").show();
	} else {
		var num = jQuery("#new_translation option:selected").val() ;
		jQuery("#wait_translation_add").show();
	}	
	var arguments = {
		action: 'translate_add', 
		idLink : num,
		isFramework : is_framework,
		plugin : plug_param, 
		domain : dom_param
	} 
	//POST the data and append the results to the results div
	jQuery.post(ajaxurl, arguments, function(response) {
		jQuery("#wait_translation_add").fadeOut();
		jQuery("#wait_translation_add_frame").fadeOut();
		jQuery("#zone_edit").html(response);
	}).error(function(x,e) { 
		if (x.status==0){
			//Offline
		} else if (x.status==500){
			jQuery("#zone_edit").html("Error 500: The ajax request is retried");
			translate_add(plug_param,dom_param,is_framework) ; 
		} else {
			jQuery("#zone_edit").html("Error "+x.status+": No data retrieved");
		}
	});    
}

/* =====================================================================================
*
*  Save the new translation
*
*/

function translate_create(plug_param,dom_param,is_framework, lang_param, nombre) {

	jQuery("#wait_translation_create").show();
	
	var result = new Array() ; 
	for (var i=0 ; i<nombre ; i++) {
		result[i] = jQuery("#trad"+i).val()  ;
	}
	
	var arguments = {
		action: 'translate_create', 
		idLink : result,
		isFramework : is_framework,
		name : jQuery("#nameAuthor").val(), 
		email : jQuery("#emailAuthor").val(), 
		lang : lang_param, 
		plugin : plug_param, 
		domain : dom_param
	} 
	//POST the data and append the results to the results div
	jQuery.post(ajaxurl, arguments, function(response) {
		jQuery("#wait_translation_create").fadeOut();
		jQuery("#zone_edit").html("");
		jQuery("#summary_of_translations").html(response);
	}).error(function(x,e) { 
		if (x.status==0){
			//Offline
		} else if (x.status==500){
			jQuery("#summary_of_translations").html("Error 500: The ajax request is retried");
			translate_create(plug_param,dom_param,is_framework, lang_param, nombre) ; 
		} else {
			jQuery("#summary_of_translations").html("Error "+x.status+": No data retrieved");
		}
	});   
}

/* =====================================================================================
*
*  Modify a translation
*
*/

function modify_trans(plug_param,dom_param,is_framework,lang_param) {
	jQuery("#wait_translation_create").show();
	
	var arguments = {
		action: 'translate_modify', 
		isFramework : is_framework,
		lang : lang_param, 
		plugin : plug_param, 
		domain : dom_param
	} 
	//POST the data and append the results to the results div
	jQuery.post(ajaxurl, arguments, function(response) {
		jQuery("#wait_translation_create").fadeOut();
		jQuery("#zone_edit").html(response);
	}).error(function(x,e) { 
		if (x.status==0){
			//Offline
		} else if (x.status==500){
			jQuery("#zone_edit").html("Error 500: The ajax request is retried");
			modify_trans(plug_param,dom_param,is_framework,lang_param) ; 
		} else {
			jQuery("#zone_edit").html("Error "+x.status+": No data retrieved");
		}
	});    
}

/* =====================================================================================
*
*  Save the modification of the translation
*
*/

function translate_save_after_modification (plug_param,dom_param,is_framework,lang_param, nombre) {

	jQuery("#wait_translation_modify").show();
	
	var result = new Array() ; 
	for (var i=0 ; i<nombre ; i++) {
		result[i] = jQuery("#trad"+i).val()  ;
	}
		
	var arguments = {
		action: 'translate_create', 
		idLink : result,
		isFramework : is_framework,
		name : jQuery("#nameAuthor").val(), 
		email : jQuery("#emailAuthor").val(), 
		lang : lang_param, 
		plugin : plug_param, 
		domain : dom_param
	} 
	//POST the data and append the results to the results div
	jQuery.post(ajaxurl, arguments, function(response) {
		jQuery("#wait_translation_modify").fadeOut();
		jQuery("#zone_edit").html("");
		jQuery("#summary_of_translations").html(response);
	}).error(function(x,e) { 
		if (x.status==0){
			//Offline
		} else if (x.status==500){
			jQuery("#summary_of_translations").html("Error 500: The ajax request is retried");
			translate_save_after_modification (plug_param,dom_param,is_framework,lang_param, nombre) ; 
		} else {
			jQuery("#summary_of_translations").html("Error "+x.status+": No data retrieved");
		}
	});    
}

/* =====================================================================================
*
*  Send the modified translation
*
*/

function send_trans(plug_param,dom_param, is_framework, lang_param) {

	jQuery("#wait_translation_modify").show();
	jQuery(".tobehiddenOnSent").hide();
		
	var arguments = {
		action: 'send_translation', 
		lang : lang_param, 
		isFramework : is_framework,
		plugin : plug_param, 
		domain : dom_param
	} 
	
	//POST the data and append the results to the results div
	jQuery.post(ajaxurl, arguments, function(response) {
		jQuery("#wait_translation_modify").fadeOut();
		jQuery("#zone_edit").html(response);
	}).error(function(x,e) { 
		if (x.status==0){
			//Offline
		} else if (x.status==500){
			jQuery("#zone_edit").html("Error 500: The ajax request is retried");
			send_trans(plug_param,dom_param, is_framework, lang_param)  ; 
		} else {
			jQuery("#zone_edit").html("Error "+x.status+": No data retrieved");
		}
	});    
}


/*====================================================*/
/* FILE /plugins/spam-captcha/core/js/progressbar_admin.js*/
/*====================================================*/
/* =====================================================================================
*
*  Modify the progression
*
*/

function progressBar_modifyProgression(newPercentage,id) {
	id = typeof(id) != 'undefined' ? id : "progressbar";
	jQuery("#"+id+"_image").animate({width: newPercentage+'%'}, 500, function() {  });
}

/* =====================================================================================
*
*  Modify the text
*
*/

function progressBar_modifyText(newText, id) {
	id = typeof(id) != 'undefined' ? id : "progressbar";
	jQuery("#"+id+"_text").html(newText);
}


/*====================================================*/
/* FILE /plugins/spam-captcha/core/js/feedback_admin.js*/
/*====================================================*/



/* =====================================================================================
*
*  Send the modified translation
*
*/

function send_feedback(plug_param, plug_ID) {
	jQuery("#wait_feedback").show();
	jQuery("#feedback_submit").remove() ;
		
	var arguments = {
		action: 'send_feedback', 
		name : jQuery("#feedback_name").val(), 
		mail : jQuery("#feedback_mail").val(), 
		comment : jQuery("#feedback_comment").val(), 
		plugin : plug_param,
		pluginID : plug_ID
	} 
	//POST the data and append the results to the results div
	jQuery.post(ajaxurl, arguments, function(response) {
		jQuery("#wait_feedback").fadeOut();
		jQuery("#form_feedback_info").html(response);
		window.location = String(window.location).replace(/\#.*$/, "") + "#top_feedback";
	}).error(function(x,e) { 
		if (x.status==0){
			//Offline
		} else if (x.status==500){
			jQuery("#form_feedback_info").html("Error 500: The ajax request is retried");
			send_feedback(plug_param, plug_ID) ; 
		} else {
			jQuery("#form_feedback_info").html("Error "+x.status+": No data retrieved");
		}
	});  
}

function modifyFormContact() {
	name = jQuery("#feedback_name").val() ; 
	mail = jQuery("#feedback_mail").val() ;
	var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	
	if ((name.length!=0)&&(mail.length!=0)&&(mail.search(emailRegEx)!=-1)) {
		jQuery("#feedback_submit_button").removeAttr('disabled');
	} else {
		jQuery("#feedback_submit_button").attr('disabled', 'disabled') ; 	
	}
	
}

/*====================================================*/
/* FILE /plugins/spam-captcha/core/include/tokenize/jquery.tokenize.js*/
/*====================================================*/
/**
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This software consists of voluntary contributions made by many individuals
 * and is licensed under the new BSD license.
 *
 * @author      David Zeller <me@zellerda.com>
 * @license     http://www.opensource.org/licenses/BSD-3-Clause New BSD license
 * @version     2.5.2
 */
(function($, tokenize){

    // Keycodes
    var KEYS = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESCAPE: 27,
        ARROW_UP: 38,
        ARROW_DOWN: 40
    };

    // Debounce timeout
    var debounce_timeout = null;

    // Data storage constant
    var DATA = 'tokenize';

    /**
     * Get Tokenize object
     *
     * @param {Object} options
     * @param {jQuery} el
     * @returns {$.tokenize}
     */
    var getObject = function(options, el){

        if(!el.data(DATA)){
            var obj = new $.tokenize($.extend({}, $.fn.tokenize.defaults, options));
            el.data(DATA, obj);
            obj.init(el);
        }

        return el.data(DATA);

    };

    /**
     * Tokenize constructor
     *
     * @param {Object} opts
     */
    $.tokenize = function(opts){

        if(opts == undefined){
            opts = $.fn.tokenize.defaults;
        }

        this.options = opts;
    };

    $.extend($.tokenize.prototype, {

        /**
         * Init tokenize object
         *
         * @param {jQuery} el jQuery object of the select
         */
        init: function(el){

            var $this = this;
            this.select = el.attr('multiple', 'multiple').css({margin: 0, padding: 0, border: 0}).hide();

            this.container = $('<div />')
                .attr('class', this.select.attr('class'))
                .addClass('Tokenize');

            if(this.options.maxElements == 1){
                this.container.addClass('OnlyOne');
            }

            this.dropdown = $('<ul />')
                .addClass('Dropdown');

            this.tokensContainer = $('<ul />')
                .addClass('TokensContainer');

            if(this.options.autosize){
                this.tokensContainer
                    .addClass('Autosize');
            }

            this.searchToken = $('<li />')
                .addClass('TokenSearch')
                .appendTo(this.tokensContainer);

            this.searchInput = $('<input />')
                .appendTo(this.searchToken);

            if(this.options.searchMaxLength > 0){
                this.searchInput.attr('maxlength', this.options.searchMaxLength)
            }

            if(this.select.prop('disabled')){
                this.disable();
            }

            if(this.options.sortable){
                if (typeof $.ui != 'undefined'){
                    this.tokensContainer.sortable({
                        items: 'li.Token',
                        cursor: 'move',
                        placeholder: 'Token MovingShadow',
                        forcePlaceholderSize: true,
                        update: function(){
                            $this.updateOrder();
                        },
                        start: function(){
                            $this.searchToken.hide();
                        },
                        stop: function(){
                            $this.searchToken.show();
                        }
                    }).disableSelection();
                } else {
                    this.options.sortable = false;
                    console.error('jQuery UI is not loaded, sortable option has been disabled');
                }
            }

            this.container
                .append(this.tokensContainer)
                .append(this.dropdown)
                .insertAfter(this.select);

            this.tokensContainer.on('click', function(e){
                e.stopImmediatePropagation();
                $this.searchInput.get(0).focus();
                $this.updatePlaceholder();
                if($this.dropdown.is(':hidden') && $this.searchInput.val() != ''){
                    $this.search();
                }
            });

            this.searchInput.on('blur', function(){
                $this.tokensContainer.removeClass('Focused');
            });

            this.searchInput.on('focus click', function(){
                $this.tokensContainer.addClass('Focused');
                if($this.options.displayDropdownOnFocus && $this.options.datas == 'select'){
                    $this.search();
                }
            });

            this.searchInput.on('keydown', function(e){
                $this.resizeSearchInput();
                $this.keydown(e);
            });

            this.searchInput.on('keyup', function(e){
                $this.keyup(e);
            });

            this.searchInput.on('keypress', function(e){
                $this.keypress(e);
            });

            this.searchInput.on('paste', function(){
                setTimeout(function(){ $this.resizeSearchInput(); }, 10);
                setTimeout(function(){
                    var paste_elements = $this.searchInput.val().split(',');
                    if(paste_elements.length > 1){
                        $.each(paste_elements, function(_, value){
                            $this.tokenAdd(value.trim(), '');
                        });
                    }
                }, 20);
            });

            $(document).on('click', function(){
                $this.dropdownHide();
                if($this.options.maxElements == 1){
                    if($this.searchInput.val()){
                        $this.tokenAdd($this.searchInput.val(), '');
                    }
                }
            });

            this.resizeSearchInput();
            this.remap(true);
            this.updatePlaceholder();

        },

        /**
         * Update elements order in the select html element
         */
        updateOrder: function(){

            if(this.options.sortable){
                var previous, current, $this = this;
                $.each(this.tokensContainer.sortable('toArray', {attribute: 'data-value'}), function(k, v){
                    current = $('option[value="' + v + '"]', $this.select);
                    if(previous == undefined){
                        current.prependTo($this.select);
                    } else {
                        previous.after(current);
                    }
                    previous = current;
                });

                this.options.onReorder(this);
            }

        },

        /**
         * Update placeholder visibility
         */
        updatePlaceholder: function(){

            if(this.options.placeholder){
                if(this.placeholder == undefined){
                    this.placeholder = $('<li />').addClass('Placeholder').html(this.options.placeholder);
                    this.placeholder.insertBefore($('li:first-child', this.tokensContainer));
                }

                if(this.searchInput.val().length == 0 && $('li.Token', this.tokensContainer).length == 0){
                    this.placeholder.show();
                } else {
                    this.placeholder.hide();
                }
            }

        },

        /**
         * Display the dropdown
         */
        dropdownShow: function(){

            this.dropdown.show();

        },

        /**
         * Move the focus on the dropdown previous element
         */
        dropdownPrev: function(){

            if($('li.Hover', this.dropdown).length > 0){
                if(!$('li.Hover', this.dropdown).is('li:first-child')){
                    $('li.Hover', this.dropdown).removeClass('Hover').prev().addClass('Hover');
                } else {
                    $('li.Hover', this.dropdown).removeClass('Hover');
                    $('li:last-child', this.dropdown).addClass('Hover');
                }
            } else {
                $('li:first', this.dropdown).addClass('Hover');
            }

        },

        /**
         * Move the focus on the dropdown next element
         */
        dropdownNext: function(){

            if($('li.Hover', this.dropdown).length > 0){
                if(!$('li.Hover', this.dropdown).is('li:last-child')){
                    $('li.Hover', this.dropdown).removeClass('Hover').next().addClass('Hover');
                } else {
                    $('li.Hover', this.dropdown).removeClass('Hover');
                    $('li:first-child', this.dropdown).addClass('Hover');
                }
            } else {
                $('li:first', this.dropdown).addClass('Hover');
            }

        },

        /**
         * Add an item to the dropdown
         *
         * @param {string} value The value of the item
         * @param {string} text The display text of the item
         * @param {string|undefined} [html] The html display text of the item (override previous parameter)
         * @return {$.tokenize}
         */
        dropdownAddItem: function(value, text, html){

            html = html || text;

            if(!$('li[data-value="' + value + '"]', this.tokensContainer).length){
                var $this = this;
                var item = $('<li />')
                    .attr('data-value', value)
                    .attr('data-text', text)
                    .html(html)
                    .on('click', function(e){
                        e.stopImmediatePropagation();
                        $this.tokenAdd($(this).attr('data-value'), $(this).attr('data-text'));
                    }).on('mouseover', function(){
                        $(this).addClass('Hover');
                    }).on('mouseout', function(){
                        $('li', $this.dropdown).removeClass('Hover');
                    });

                this.dropdown.append(item);
                this.options.onDropdownAddItem(value, text, html, this);
            }

            return this;

        },

        /**
         * Hide dropdown
         */
        dropdownHide: function(){

            this.dropdownReset();
            this.dropdown.hide();

        },

        /**
         * Reset dropdown
         */
        dropdownReset: function(){

            this.dropdown.html('');

        },

        /**
         * Resize search input according the value length
         */
        resizeSearchInput: function(){

            this.searchInput.attr('size', Number(this.searchInput.val().length)+5);
            this.updatePlaceholder();

        },

        /**
         * Reset search input
         */
        resetSearchInput: function(){

            this.searchInput.val("");
            this.resizeSearchInput();

        },

        /**
         * Reset pending tokens
         */
        resetPendingTokens: function(){

            $('li.PendingDelete', this.tokensContainer).removeClass('PendingDelete');

        },

        /**
         * Keypress
         *
         * @param {object} e
         */
        keypress: function(e){

            if(String.fromCharCode(e.which) == this.options.delimiter){
                e.preventDefault();
                this.tokenAdd(this.searchInput.val(), '');
            }

        },

        /**
         * Keydown
         *
         * @param {object} e
         */
        keydown: function(e){

            switch(e.keyCode){
                case KEYS.BACKSPACE:
                    if(this.searchInput.val().length == 0){
                        e.preventDefault();
                        if($('li.Token.PendingDelete', this.tokensContainer).length){
                            this.tokenRemove($('li.Token.PendingDelete').attr('data-value'));
                        } else {
                            $('li.Token:last', this.tokensContainer).addClass('PendingDelete');
                        }
                        this.dropdownHide();
                    }
                    break;

                case KEYS.TAB:
                case KEYS.ENTER:
                    if($('li.Hover', this.dropdown).length){
                        var element = $('li.Hover', this.dropdown);
                        e.preventDefault();
                        this.tokenAdd(element.attr('data-value'), element.attr('data-text'));
                    } else {
                        if(this.searchInput.val()){
                            e.preventDefault();
                            this.tokenAdd(this.searchInput.val(), '');
                        }
                    }
                    this.resetPendingTokens();
                    break;

                case KEYS.ESCAPE:
                    this.resetSearchInput();
                    this.dropdownHide();
                    this.resetPendingTokens();
                    break;

                case KEYS.ARROW_UP:
                    e.preventDefault();
                    this.dropdownPrev();
                    break;

                case KEYS.ARROW_DOWN:
                    e.preventDefault();
                    this.dropdownNext();
                    break;

                default:
                    this.resetPendingTokens();
                    break;
            }

        },

        /**
         * Keyup
         *
         * @param {object} e
         */
        keyup: function(e){

            this.updatePlaceholder();
            switch(e.keyCode){
                case KEYS.TAB:
                case KEYS.ENTER:
                case KEYS.ESCAPE:
                case KEYS.ARROW_UP:
                case KEYS.ARROW_DOWN:
                    break;

                case KEYS.BACKSPACE:
                    if(this.searchInput.val()){
                        this.search();
                    } else {
                        this.dropdownHide();
                    }
                    break;
                default:
                    if(this.searchInput.val()){
                        this.search();
                    }
                    break;
            }

        },

        /**
         * Search an element in the select or using ajax
         */
        search: function(){

            var $this = this;
            var count = 1;

            if((this.options.maxElements > 0 && $('li.Token', this.tokensContainer).length >= this.options.maxElements) ||
                this.searchInput.val().length < this.options.searchMinLength){
                return false;
            }

            if(this.options.datas == 'select'){

                var found = false, regexp = new RegExp(this.searchInput.val().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
                this.dropdownReset();

                $('option', this.select).not(':selected, :disabled').each(function(){
                    if(count <= $this.options.nbDropdownElements){
                        if(regexp.test($(this).html())){
                            $this.dropdownAddItem($(this).attr('value'), $(this).html());
                            found = true;
                            count++;
                        }
                    } else {
                        return false;
                    }
                });

                if(found){
                    $('li:first', this.dropdown).addClass('Hover');
                    this.dropdownShow();
                } else {
                    this.dropdownHide();
                }

            } else {

                this.debounce(function(){
                    $.ajax({
                        url: $this.options.datas,
                        data: $this.options.searchParam + "=" + $this.searchInput.val(),
                        dataType: $this.options.dataType,
                        success: function(data){
                            if(data){
                                $this.dropdownReset();
                                $.each(data, function(key, val){
                                    if(count <= $this.options.nbDropdownElements){
                                        var html;
                                        if(val[$this.options.htmlField]){
                                            html = val[$this.options.htmlField];
                                        }
                                        $this.dropdownAddItem(val[$this.options.valueField], val[$this.options.textField], html);
                                        count++;
                                    } else {
                                        return false;
                                    }
                                });
                                if($('li', $this.dropdown).length){
                                    $('li:first', $this.dropdown).addClass('Hover');
                                    $this.dropdownShow();
                                    return true;
                                }
                            }
                            $this.dropdownHide();
                        },
                        error: function(xhr, text_status) {
                            $this.options.onAjaxError($this, xhr, text_status);
                        }
                    });
                }, this.options.debounce);

            }

        },

        /**
         * Debounce method for ajax request
         * @param {function} func
         * @param {number} threshold
         */
        debounce: function(func, threshold){

            var obj = this, args = arguments;
            var delayed = function(){
                func.apply(obj, args);
                debounce_timeout = null;
            };
            if(debounce_timeout){
                clearTimeout(debounce_timeout);
            }
            debounce_timeout = setTimeout(delayed, threshold || this.options.debounce);

        },

        /**
         * Add a token in container
         *
         * @param {string} value The value of the token
         * @param {string|undefined} [text] The label of the token (use value if empty)
         * @param {boolean|undefined} [first] If true, onAddToken event will be not called
         * @return {$.tokenize}
         */
        tokenAdd: function(value, text, first){

            value = this.escape(value);

            if(value == undefined || value == ''){
                return this;
            }

            text = text || value;
            first = first || false;

            if(this.options.maxElements > 0 && $('li.Token', this.tokensContainer).length >= this.options.maxElements){
                this.resetSearchInput();
                return this;
            }

            var $this = this;
            var close_btn = $('<a />')
                .addClass('Close')
                .html("&#215;")
                .on('click', function(e){
                    e.stopImmediatePropagation();
                    $this.tokenRemove(value);
                });

            if($('option[value="' + value + '"]', this.select).length){
                $('option[value="' + value + '"]', this.select).attr('selected', true).prop('selected', true);
            } else if(this.options.newElements || (!this.options.newElements && $('li[data-value="' + value + '"]', this.dropdown).length > 0)) {
                var option = $('<option />')
                    .attr('selected', true)
                    .attr('value', value)
                    .attr('data-type', 'custom')
                    .prop('selected', true)
                    .html(text);
                this.select.append(option);
            } else {
                this.resetSearchInput();
                return this;
            }

            if($('li.Token[data-value="' + value + '"]', this.tokensContainer).length > 0) {
                return this;
            }

            $('<li />')
                .addClass('Token')
                .attr('data-value', value)
                .append('<span>' + text + '</span>')
                .prepend(close_btn)
                .insertBefore(this.searchToken);

            if(!first){
                this.options.onAddToken(value, text, this);
            }

            this.resetSearchInput();
            this.dropdownHide();
            this.updateOrder();

            return this;

        },

        /**
         * Remove a token
         *
         * @param {string} value The value of the token who has to be removed
         * @returns {$.tokenize}
         */
        tokenRemove: function(value){

            var option = $('option[value="' + value + '"]', this.select);

            if(option.attr('data-type') == 'custom'){
                option.remove();
            } else {
                option.removeAttr('selected').prop('selected', false);
            }

            $('li.Token[data-value="' + value + '"]', this.tokensContainer).remove();

            this.options.onRemoveToken(value, this);
            this.resizeSearchInput();
            this.dropdownHide();
            this.updateOrder();

            return this;

        },

        /**
         * Clear tokens
         *
         * @returns {$.tokenize}
         */
        clear: function(){

            var $this = this;

            $('li.Token', this.tokensContainer).each(function(){
                $this.tokenRemove($(this).attr('data-value'));
            });

            this.options.onClear(this);
            this.dropdownHide();

            return this;

        },

        /**
         * Disable tokenize
         *
         * @returns {$.tokenize}
         */
        disable: function(){

            this.select.prop('disabled', true);
            this.searchInput.prop('disabled', true);
            this.container.addClass('Disabled');
            if(this.options.sortable){
                this.tokensContainer.sortable('disable');
            }

            return this;

        },

        /**
         * Enable tokenize
         *
         * @returns {$.tokenize}
         */
        enable: function(){

            this.select.prop('disabled', false);
            this.searchInput.prop('disabled', false);
            this.container.removeClass('Disabled');
            if(this.options.sortable){
                this.tokensContainer.sortable('enable');
            }

            return this;

        },

        /**
         * Refresh tokens reflecting select options
         *
         * @param {boolean} first If true, onAddToken event will be not called
         * @returns {$.tokenize}
         */
        remap: function(first){

            var $this = this;
            var tmp = $("option:selected", this.select);

            first = first || false;

            this.clear();

            tmp.each(function(){
                $this.tokenAdd($(this).val(), $(this).html(), first);
            });

            return this;

        },

        /**
         * Retrieve tokens value to an array
         *
         * @returns {Array}
         */
        toArray: function(){

            var output = [];
            $("option:selected", this.select).each(function(){
                output.push($(this).val());
            });
            return output;

        },

        /**
         * Escape string
         *
         * @param {string} string
         * @returns {string}
         */
        escape: function(string){

            var tmp = document.createElement("div");
            tmp.innerHTML = string;
            string = tmp.textContent || tmp.innerText || "";

            return String(string).replace(/["]/g, function(){
                return '';
            });

        }

    });

    /**
     * Tokenize plugin
     *
     * @param {Object|undefined} [options]
     * @returns {$.tokenize|Array}
     */
    $.fn.tokenize = function(options){

        options = options || {};

        var selector = this.filter('select');

        if(selector.length > 1){
            var objects = [];
            selector.each(function(){
                objects.push(getObject(options, $(this)));
            });
            return objects;
        }
        else
        {
            return getObject(options, $(this));
        }
    };

    $.fn.tokenize.defaults = {

        datas: 'select',
        placeholder: false,
        searchParam: 'search',
        searchMaxLength: 0,
        searchMinLength: 0,
        debounce: 0,
        delimiter: ',',
        newElements: true,
        autosize: false,
        nbDropdownElements: 10,
        displayDropdownOnFocus: false,
        maxElements: 0,
        sortable: false,
        dataType: 'json',
        valueField: 'value',
        textField: 'text',
        htmlField: 'html',

        onAddToken: function(value, text, e){},
        onRemoveToken: function(value, e){},
        onClear: function(e){},
        onReorder: function(e){},
        onDropdownAddItem: function(value, text, html, e){},
        onAjaxError: function(e, xhr, text_status){}

    };

})(jQuery, 'tokenize');


/*====================================================*/
/* FILE /plugins/spam-captcha/js/raphael-min.js*/
/*====================================================*/
//  Raphaël 2.1.2 - JavaScript Vector Library                           \\
//  Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)     \\
//  Copyright © 2008-2012 Sencha Labs (http://sencha.com)               \\
//  Licensed under the MIT (http://raphaeljs.com/license.html) license. \\

!function(a){var b,c,d="0.4.2",e="hasOwnProperty",f=/[\.\/]/,g="*",h=function(){},i=function(a,b){return a-b},j={n:{}},k=function(a,d){a=String(a);var e,f=c,g=Array.prototype.slice.call(arguments,2),h=k.listeners(a),j=0,l=[],m={},n=[],o=b;b=a,c=0;for(var p=0,q=h.length;q>p;p++)"zIndex"in h[p]&&(l.push(h[p].zIndex),h[p].zIndex<0&&(m[h[p].zIndex]=h[p]));for(l.sort(i);l[j]<0;)if(e=m[l[j++]],n.push(e.apply(d,g)),c)return c=f,n;for(p=0;q>p;p++)if(e=h[p],"zIndex"in e)if(e.zIndex==l[j]){if(n.push(e.apply(d,g)),c)break;do if(j++,e=m[l[j]],e&&n.push(e.apply(d,g)),c)break;while(e)}else m[e.zIndex]=e;else if(n.push(e.apply(d,g)),c)break;return c=f,b=o,n.length?n:null};k._events=j,k.listeners=function(a){var b,c,d,e,h,i,k,l,m=a.split(f),n=j,o=[n],p=[];for(e=0,h=m.length;h>e;e++){for(l=[],i=0,k=o.length;k>i;i++)for(n=o[i].n,c=[n[m[e]],n[g]],d=2;d--;)b=c[d],b&&(l.push(b),p=p.concat(b.f||[]));o=l}return p},k.on=function(a,b){if(a=String(a),"function"!=typeof b)return function(){};for(var c=a.split(f),d=j,e=0,g=c.length;g>e;e++)d=d.n,d=d.hasOwnProperty(c[e])&&d[c[e]]||(d[c[e]]={n:{}});for(d.f=d.f||[],e=0,g=d.f.length;g>e;e++)if(d.f[e]==b)return h;return d.f.push(b),function(a){+a==+a&&(b.zIndex=+a)}},k.f=function(a){var b=[].slice.call(arguments,1);return function(){k.apply(null,[a,null].concat(b).concat([].slice.call(arguments,0)))}},k.stop=function(){c=1},k.nt=function(a){return a?new RegExp("(?:\\.|\\/|^)"+a+"(?:\\.|\\/|$)").test(b):b},k.nts=function(){return b.split(f)},k.off=k.unbind=function(a,b){if(!a)return void(k._events=j={n:{}});var c,d,h,i,l,m,n,o=a.split(f),p=[j];for(i=0,l=o.length;l>i;i++)for(m=0;m<p.length;m+=h.length-2){if(h=[m,1],c=p[m].n,o[i]!=g)c[o[i]]&&h.push(c[o[i]]);else for(d in c)c[e](d)&&h.push(c[d]);p.splice.apply(p,h)}for(i=0,l=p.length;l>i;i++)for(c=p[i];c.n;){if(b){if(c.f){for(m=0,n=c.f.length;n>m;m++)if(c.f[m]==b){c.f.splice(m,1);break}!c.f.length&&delete c.f}for(d in c.n)if(c.n[e](d)&&c.n[d].f){var q=c.n[d].f;for(m=0,n=q.length;n>m;m++)if(q[m]==b){q.splice(m,1);break}!q.length&&delete c.n[d].f}}else{delete c.f;for(d in c.n)c.n[e](d)&&c.n[d].f&&delete c.n[d].f}c=c.n}},k.once=function(a,b){var c=function(){return k.unbind(a,c),b.apply(this,arguments)};return k.on(a,c)},k.version=d,k.toString=function(){return"You are running Eve "+d},"undefined"!=typeof module&&module.exports?module.exports=k:"undefined"!=typeof define?define("eve",[],function(){return k}):a.eve=k}(window||this),function(a,b){"function"==typeof define&&define.amd?define(["eve"],function(c){return b(a,c)}):b(a,a.eve)}(this,function(a,b){function c(a){if(c.is(a,"function"))return u?a():b.on("raphael.DOMload",a);if(c.is(a,V))return c._engine.create[D](c,a.splice(0,3+c.is(a[0],T))).add(a);var d=Array.prototype.slice.call(arguments,0);if(c.is(d[d.length-1],"function")){var e=d.pop();return u?e.call(c._engine.create[D](c,d)):b.on("raphael.DOMload",function(){e.call(c._engine.create[D](c,d))})}return c._engine.create[D](c,arguments)}function d(a){if("function"==typeof a||Object(a)!==a)return a;var b=new a.constructor;for(var c in a)a[z](c)&&(b[c]=d(a[c]));return b}function e(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return a.push(a.splice(c,1)[0])}function f(a,b,c){function d(){var f=Array.prototype.slice.call(arguments,0),g=f.join("␀"),h=d.cache=d.cache||{},i=d.count=d.count||[];return h[z](g)?(e(i,g),c?c(h[g]):h[g]):(i.length>=1e3&&delete h[i.shift()],i.push(g),h[g]=a[D](b,f),c?c(h[g]):h[g])}return d}function g(){return this.hex}function h(a,b){for(var c=[],d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4==d?f[3]={x:+a[0],y:+a[1]}:e-2==d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4==d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push(["C",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}function i(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c}function j(a,b,c,d,e,f,g,h,j){null==j&&(j=1),j=j>1?1:0>j?0:j;for(var k=j/2,l=12,m=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],n=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],o=0,p=0;l>p;p++){var q=k*m[p]+k,r=i(q,a,c,e,g),s=i(q,b,d,f,h),t=r*r+s*s;o+=n[p]*N.sqrt(t)}return k*o}function k(a,b,c,d,e,f,g,h,i){if(!(0>i||j(a,b,c,d,e,f,g,h)<i)){var k,l=1,m=l/2,n=l-m,o=.01;for(k=j(a,b,c,d,e,f,g,h,n);Q(k-i)>o;)m/=2,n+=(i>k?1:-1)*m,k=j(a,b,c,d,e,f,g,h,n);return n}}function l(a,b,c,d,e,f,g,h){if(!(O(a,c)<P(e,g)||P(a,c)>O(e,g)||O(b,d)<P(f,h)||P(b,d)>O(f,h))){var i=(a*d-b*c)*(e-g)-(a-c)*(e*h-f*g),j=(a*d-b*c)*(f-h)-(b-d)*(e*h-f*g),k=(a-c)*(f-h)-(b-d)*(e-g);if(k){var l=i/k,m=j/k,n=+l.toFixed(2),o=+m.toFixed(2);if(!(n<+P(a,c).toFixed(2)||n>+O(a,c).toFixed(2)||n<+P(e,g).toFixed(2)||n>+O(e,g).toFixed(2)||o<+P(b,d).toFixed(2)||o>+O(b,d).toFixed(2)||o<+P(f,h).toFixed(2)||o>+O(f,h).toFixed(2)))return{x:l,y:m}}}}function m(a,b,d){var e=c.bezierBBox(a),f=c.bezierBBox(b);if(!c.isBBoxIntersect(e,f))return d?0:[];for(var g=j.apply(0,a),h=j.apply(0,b),i=O(~~(g/5),1),k=O(~~(h/5),1),m=[],n=[],o={},p=d?0:[],q=0;i+1>q;q++){var r=c.findDotsAtSegment.apply(c,a.concat(q/i));m.push({x:r.x,y:r.y,t:q/i})}for(q=0;k+1>q;q++)r=c.findDotsAtSegment.apply(c,b.concat(q/k)),n.push({x:r.x,y:r.y,t:q/k});for(q=0;i>q;q++)for(var s=0;k>s;s++){var t=m[q],u=m[q+1],v=n[s],w=n[s+1],x=Q(u.x-t.x)<.001?"y":"x",y=Q(w.x-v.x)<.001?"y":"x",z=l(t.x,t.y,u.x,u.y,v.x,v.y,w.x,w.y);if(z){if(o[z.x.toFixed(4)]==z.y.toFixed(4))continue;o[z.x.toFixed(4)]=z.y.toFixed(4);var A=t.t+Q((z[x]-t[x])/(u[x]-t[x]))*(u.t-t.t),B=v.t+Q((z[y]-v[y])/(w[y]-v[y]))*(w.t-v.t);A>=0&&1.001>=A&&B>=0&&1.001>=B&&(d?p++:p.push({x:z.x,y:z.y,t1:P(A,1),t2:P(B,1)}))}}return p}function n(a,b,d){a=c._path2curve(a),b=c._path2curve(b);for(var e,f,g,h,i,j,k,l,n,o,p=d?0:[],q=0,r=a.length;r>q;q++){var s=a[q];if("M"==s[0])e=i=s[1],f=j=s[2];else{"C"==s[0]?(n=[e,f].concat(s.slice(1)),e=n[6],f=n[7]):(n=[e,f,e,f,i,j,i,j],e=i,f=j);for(var t=0,u=b.length;u>t;t++){var v=b[t];if("M"==v[0])g=k=v[1],h=l=v[2];else{"C"==v[0]?(o=[g,h].concat(v.slice(1)),g=o[6],h=o[7]):(o=[g,h,g,h,k,l,k,l],g=k,h=l);var w=m(n,o,d);if(d)p+=w;else{for(var x=0,y=w.length;y>x;x++)w[x].segment1=q,w[x].segment2=t,w[x].bez1=n,w[x].bez2=o;p=p.concat(w)}}}}}return p}function o(a,b,c,d,e,f){null!=a?(this.a=+a,this.b=+b,this.c=+c,this.d=+d,this.e=+e,this.f=+f):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function p(){return this.x+H+this.y+H+this.width+" × "+this.height}function q(a,b,c,d,e,f){function g(a){return((l*a+k)*a+j)*a}function h(a,b){var c=i(a,b);return((o*c+n)*c+m)*c}function i(a,b){var c,d,e,f,h,i;for(e=a,i=0;8>i;i++){if(f=g(e)-a,Q(f)<b)return e;if(h=(3*l*e+2*k)*e+j,Q(h)<1e-6)break;e-=f/h}if(c=0,d=1,e=a,c>e)return c;if(e>d)return d;for(;d>c;){if(f=g(e),Q(f-a)<b)return e;a>f?c=e:d=e,e=(d-c)/2+c}return e}var j=3*b,k=3*(d-b)-j,l=1-j-k,m=3*c,n=3*(e-c)-m,o=1-m-n;return h(a,1/(200*f))}function r(a,b){var c=[],d={};if(this.ms=b,this.times=1,a){for(var e in a)a[z](e)&&(d[_(e)]=a[e],c.push(_(e)));c.sort(lb)}this.anim=d,this.top=c[c.length-1],this.percents=c}function s(a,d,e,f,g,h){e=_(e);var i,j,k,l,m,n,p=a.ms,r={},s={},t={};if(f)for(v=0,x=ic.length;x>v;v++){var u=ic[v];if(u.el.id==d.id&&u.anim==a){u.percent!=e?(ic.splice(v,1),k=1):j=u,d.attr(u.totalOrigin);break}}else f=+s;for(var v=0,x=a.percents.length;x>v;v++){if(a.percents[v]==e||a.percents[v]>f*a.top){e=a.percents[v],m=a.percents[v-1]||0,p=p/a.top*(e-m),l=a.percents[v+1],i=a.anim[e];break}f&&d.attr(a.anim[a.percents[v]])}if(i){if(j)j.initstatus=f,j.start=new Date-j.ms*f;else{for(var y in i)if(i[z](y)&&(db[z](y)||d.paper.customAttributes[z](y)))switch(r[y]=d.attr(y),null==r[y]&&(r[y]=cb[y]),s[y]=i[y],db[y]){case T:t[y]=(s[y]-r[y])/p;break;case"colour":r[y]=c.getRGB(r[y]);var A=c.getRGB(s[y]);t[y]={r:(A.r-r[y].r)/p,g:(A.g-r[y].g)/p,b:(A.b-r[y].b)/p};break;case"path":var B=Kb(r[y],s[y]),C=B[1];for(r[y]=B[0],t[y]=[],v=0,x=r[y].length;x>v;v++){t[y][v]=[0];for(var D=1,F=r[y][v].length;F>D;D++)t[y][v][D]=(C[v][D]-r[y][v][D])/p}break;case"transform":var G=d._,H=Pb(G[y],s[y]);if(H)for(r[y]=H.from,s[y]=H.to,t[y]=[],t[y].real=!0,v=0,x=r[y].length;x>v;v++)for(t[y][v]=[r[y][v][0]],D=1,F=r[y][v].length;F>D;D++)t[y][v][D]=(s[y][v][D]-r[y][v][D])/p;else{var K=d.matrix||new o,L={_:{transform:G.transform},getBBox:function(){return d.getBBox(1)}};r[y]=[K.a,K.b,K.c,K.d,K.e,K.f],Nb(L,s[y]),s[y]=L._.transform,t[y]=[(L.matrix.a-K.a)/p,(L.matrix.b-K.b)/p,(L.matrix.c-K.c)/p,(L.matrix.d-K.d)/p,(L.matrix.e-K.e)/p,(L.matrix.f-K.f)/p]}break;case"csv":var M=I(i[y])[J](w),N=I(r[y])[J](w);if("clip-rect"==y)for(r[y]=N,t[y]=[],v=N.length;v--;)t[y][v]=(M[v]-r[y][v])/p;s[y]=M;break;default:for(M=[][E](i[y]),N=[][E](r[y]),t[y]=[],v=d.paper.customAttributes[y].length;v--;)t[y][v]=((M[v]||0)-(N[v]||0))/p}var O=i.easing,P=c.easing_formulas[O];if(!P)if(P=I(O).match(Z),P&&5==P.length){var Q=P;P=function(a){return q(a,+Q[1],+Q[2],+Q[3],+Q[4],p)}}else P=nb;if(n=i.start||a.start||+new Date,u={anim:a,percent:e,timestamp:n,start:n+(a.del||0),status:0,initstatus:f||0,stop:!1,ms:p,easing:P,from:r,diff:t,to:s,el:d,callback:i.callback,prev:m,next:l,repeat:h||a.times,origin:d.attr(),totalOrigin:g},ic.push(u),f&&!j&&!k&&(u.stop=!0,u.start=new Date-p*f,1==ic.length))return kc();k&&(u.start=new Date-u.ms*f),1==ic.length&&jc(kc)}b("raphael.anim.start."+d.id,d,a)}}function t(a){for(var b=0;b<ic.length;b++)ic[b].el.paper==a&&ic.splice(b--,1)}c.version="2.1.2",c.eve=b;var u,v,w=/[, ]+/,x={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},y=/\{(\d+)\}/g,z="hasOwnProperty",A={doc:document,win:a},B={was:Object.prototype[z].call(A.win,"Raphael"),is:A.win.Raphael},C=function(){this.ca=this.customAttributes={}},D="apply",E="concat",F="ontouchstart"in A.win||A.win.DocumentTouch&&A.doc instanceof DocumentTouch,G="",H=" ",I=String,J="split",K="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[J](H),L={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},M=I.prototype.toLowerCase,N=Math,O=N.max,P=N.min,Q=N.abs,R=N.pow,S=N.PI,T="number",U="string",V="array",W=Object.prototype.toString,X=(c._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i,/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),Y={NaN:1,Infinity:1,"-Infinity":1},Z=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,$=N.round,_=parseFloat,ab=parseInt,bb=I.prototype.toUpperCase,cb=c._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0},db=c._availableAnimAttrs={blur:T,"clip-rect":"csv",cx:T,cy:T,fill:"colour","fill-opacity":T,"font-size":T,height:T,opacity:T,path:"path",r:T,rx:T,ry:T,stroke:"colour","stroke-opacity":T,"stroke-width":T,transform:"transform",width:T,x:T,y:T},eb=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,fb={hs:1,rg:1},gb=/,?([achlmqrstvxz]),?/gi,hb=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,ib=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,jb=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,kb=(c._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,{}),lb=function(a,b){return _(a)-_(b)},mb=function(){},nb=function(a){return a},ob=c._rectPath=function(a,b,c,d,e){return e?[["M",a+e,b],["l",c-2*e,0],["a",e,e,0,0,1,e,e],["l",0,d-2*e],["a",e,e,0,0,1,-e,e],["l",2*e-c,0],["a",e,e,0,0,1,-e,-e],["l",0,2*e-d],["a",e,e,0,0,1,e,-e],["z"]]:[["M",a,b],["l",c,0],["l",0,d],["l",-c,0],["z"]]},pb=function(a,b,c,d){return null==d&&(d=c),[["M",a,b],["m",0,-d],["a",c,d,0,1,1,0,2*d],["a",c,d,0,1,1,0,-2*d],["z"]]},qb=c._getPath={path:function(a){return a.attr("path")},circle:function(a){var b=a.attrs;return pb(b.cx,b.cy,b.r)},ellipse:function(a){var b=a.attrs;return pb(b.cx,b.cy,b.rx,b.ry)},rect:function(a){var b=a.attrs;return ob(b.x,b.y,b.width,b.height,b.r)},image:function(a){var b=a.attrs;return ob(b.x,b.y,b.width,b.height)},text:function(a){var b=a._getBBox();return ob(b.x,b.y,b.width,b.height)},set:function(a){var b=a._getBBox();return ob(b.x,b.y,b.width,b.height)}},rb=c.mapPath=function(a,b){if(!b)return a;var c,d,e,f,g,h,i;for(a=Kb(a),e=0,g=a.length;g>e;e++)for(i=a[e],f=1,h=i.length;h>f;f+=2)c=b.x(i[f],i[f+1]),d=b.y(i[f],i[f+1]),i[f]=c,i[f+1]=d;return a};if(c._g=A,c.type=A.win.SVGAngle||A.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==c.type){var sb,tb=A.doc.createElement("div");if(tb.innerHTML='<v:shape adj="1"/>',sb=tb.firstChild,sb.style.behavior="url(#default#VML)",!sb||"object"!=typeof sb.adj)return c.type=G;tb=null}c.svg=!(c.vml="VML"==c.type),c._Paper=C,c.fn=v=C.prototype=c.prototype,c._id=0,c._oid=0,c.is=function(a,b){return b=M.call(b),"finite"==b?!Y[z](+a):"array"==b?a instanceof Array:"null"==b&&null===a||b==typeof a&&null!==a||"object"==b&&a===Object(a)||"array"==b&&Array.isArray&&Array.isArray(a)||W.call(a).slice(8,-1).toLowerCase()==b},c.angle=function(a,b,d,e,f,g){if(null==f){var h=a-d,i=b-e;return h||i?(180+180*N.atan2(-i,-h)/S+360)%360:0}return c.angle(a,b,f,g)-c.angle(d,e,f,g)},c.rad=function(a){return a%360*S/180},c.deg=function(a){return 180*a/S%360},c.snapTo=function(a,b,d){if(d=c.is(d,"finite")?d:10,c.is(a,V)){for(var e=a.length;e--;)if(Q(a[e]-b)<=d)return a[e]}else{a=+a;var f=b%a;if(d>f)return b-f;if(f>a-d)return b-f+a}return b};c.createUUID=function(a,b){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a,b).toUpperCase()}}(/[xy]/g,function(a){var b=16*N.random()|0,c="x"==a?b:3&b|8;return c.toString(16)});c.setWindow=function(a){b("raphael.setWindow",c,A.win,a),A.win=a,A.doc=A.win.document,c._engine.initWin&&c._engine.initWin(A.win)};var ub=function(a){if(c.vml){var b,d=/^\s+|\s+$/g;try{var e=new ActiveXObject("htmlfile");e.write("<body>"),e.close(),b=e.body}catch(g){b=createPopup().document.body}var h=b.createTextRange();ub=f(function(a){try{b.style.color=I(a).replace(d,G);var c=h.queryCommandValue("ForeColor");return c=(255&c)<<16|65280&c|(16711680&c)>>>16,"#"+("000000"+c.toString(16)).slice(-6)}catch(e){return"none"}})}else{var i=A.doc.createElement("i");i.title="Raphaël Colour Picker",i.style.display="none",A.doc.body.appendChild(i),ub=f(function(a){return i.style.color=a,A.doc.defaultView.getComputedStyle(i,G).getPropertyValue("color")})}return ub(a)},vb=function(){return"hsb("+[this.h,this.s,this.b]+")"},wb=function(){return"hsl("+[this.h,this.s,this.l]+")"},xb=function(){return this.hex},yb=function(a,b,d){if(null==b&&c.is(a,"object")&&"r"in a&&"g"in a&&"b"in a&&(d=a.b,b=a.g,a=a.r),null==b&&c.is(a,U)){var e=c.getRGB(a);a=e.r,b=e.g,d=e.b}return(a>1||b>1||d>1)&&(a/=255,b/=255,d/=255),[a,b,d]},zb=function(a,b,d,e){a*=255,b*=255,d*=255;var f={r:a,g:b,b:d,hex:c.rgb(a,b,d),toString:xb};return c.is(e,"finite")&&(f.opacity=e),f};c.color=function(a){var b;return c.is(a,"object")&&"h"in a&&"s"in a&&"b"in a?(b=c.hsb2rgb(a),a.r=b.r,a.g=b.g,a.b=b.b,a.hex=b.hex):c.is(a,"object")&&"h"in a&&"s"in a&&"l"in a?(b=c.hsl2rgb(a),a.r=b.r,a.g=b.g,a.b=b.b,a.hex=b.hex):(c.is(a,"string")&&(a=c.getRGB(a)),c.is(a,"object")&&"r"in a&&"g"in a&&"b"in a?(b=c.rgb2hsl(a),a.h=b.h,a.s=b.s,a.l=b.l,b=c.rgb2hsb(a),a.v=b.b):(a={hex:"none"},a.r=a.g=a.b=a.h=a.s=a.v=a.l=-1)),a.toString=xb,a},c.hsb2rgb=function(a,b,c,d){this.is(a,"object")&&"h"in a&&"s"in a&&"b"in a&&(c=a.b,b=a.s,a=a.h,d=a.o),a*=360;var e,f,g,h,i;return a=a%360/60,i=c*b,h=i*(1-Q(a%2-1)),e=f=g=c-i,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a],zb(e,f,g,d)},c.hsl2rgb=function(a,b,c,d){this.is(a,"object")&&"h"in a&&"s"in a&&"l"in a&&(c=a.l,b=a.s,a=a.h),(a>1||b>1||c>1)&&(a/=360,b/=100,c/=100),a*=360;var e,f,g,h,i;return a=a%360/60,i=2*b*(.5>c?c:1-c),h=i*(1-Q(a%2-1)),e=f=g=c-i/2,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a],zb(e,f,g,d)},c.rgb2hsb=function(a,b,c){c=yb(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g;return f=O(a,b,c),g=f-P(a,b,c),d=0==g?null:f==a?(b-c)/g:f==b?(c-a)/g+2:(a-b)/g+4,d=(d+360)%6*60/360,e=0==g?0:g/f,{h:d,s:e,b:f,toString:vb}},c.rgb2hsl=function(a,b,c){c=yb(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g,h,i;return g=O(a,b,c),h=P(a,b,c),i=g-h,d=0==i?null:g==a?(b-c)/i:g==b?(c-a)/i+2:(a-b)/i+4,d=(d+360)%6*60/360,f=(g+h)/2,e=0==i?0:.5>f?i/(2*f):i/(2-2*f),{h:d,s:e,l:f,toString:wb}},c._path2string=function(){return this.join(",").replace(gb,"$1")};c._preload=function(a,b){var c=A.doc.createElement("img");c.style.cssText="position:absolute;left:-9999em;top:-9999em",c.onload=function(){b.call(this),this.onload=null,A.doc.body.removeChild(this)},c.onerror=function(){A.doc.body.removeChild(this)},A.doc.body.appendChild(c),c.src=a};c.getRGB=f(function(a){if(!a||(a=I(a)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:g};if("none"==a)return{r:-1,g:-1,b:-1,hex:"none",toString:g};!(fb[z](a.toLowerCase().substring(0,2))||"#"==a.charAt())&&(a=ub(a));var b,d,e,f,h,i,j=a.match(X);return j?(j[2]&&(e=ab(j[2].substring(5),16),d=ab(j[2].substring(3,5),16),b=ab(j[2].substring(1,3),16)),j[3]&&(e=ab((h=j[3].charAt(3))+h,16),d=ab((h=j[3].charAt(2))+h,16),b=ab((h=j[3].charAt(1))+h,16)),j[4]&&(i=j[4][J](eb),b=_(i[0]),"%"==i[0].slice(-1)&&(b*=2.55),d=_(i[1]),"%"==i[1].slice(-1)&&(d*=2.55),e=_(i[2]),"%"==i[2].slice(-1)&&(e*=2.55),"rgba"==j[1].toLowerCase().slice(0,4)&&(f=_(i[3])),i[3]&&"%"==i[3].slice(-1)&&(f/=100)),j[5]?(i=j[5][J](eb),b=_(i[0]),"%"==i[0].slice(-1)&&(b*=2.55),d=_(i[1]),"%"==i[1].slice(-1)&&(d*=2.55),e=_(i[2]),"%"==i[2].slice(-1)&&(e*=2.55),("deg"==i[0].slice(-3)||"°"==i[0].slice(-1))&&(b/=360),"hsba"==j[1].toLowerCase().slice(0,4)&&(f=_(i[3])),i[3]&&"%"==i[3].slice(-1)&&(f/=100),c.hsb2rgb(b,d,e,f)):j[6]?(i=j[6][J](eb),b=_(i[0]),"%"==i[0].slice(-1)&&(b*=2.55),d=_(i[1]),"%"==i[1].slice(-1)&&(d*=2.55),e=_(i[2]),"%"==i[2].slice(-1)&&(e*=2.55),("deg"==i[0].slice(-3)||"°"==i[0].slice(-1))&&(b/=360),"hsla"==j[1].toLowerCase().slice(0,4)&&(f=_(i[3])),i[3]&&"%"==i[3].slice(-1)&&(f/=100),c.hsl2rgb(b,d,e,f)):(j={r:b,g:d,b:e,toString:g},j.hex="#"+(16777216|e|d<<8|b<<16).toString(16).slice(1),c.is(f,"finite")&&(j.opacity=f),j)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:g}},c),c.hsb=f(function(a,b,d){return c.hsb2rgb(a,b,d).hex}),c.hsl=f(function(a,b,d){return c.hsl2rgb(a,b,d).hex}),c.rgb=f(function(a,b,c){return"#"+(16777216|c|b<<8|a<<16).toString(16).slice(1)}),c.getColor=function(a){var b=this.getColor.start=this.getColor.start||{h:0,s:1,b:a||.75},c=this.hsb2rgb(b.h,b.s,b.b);return b.h+=.075,b.h>1&&(b.h=0,b.s-=.2,b.s<=0&&(this.getColor.start={h:0,s:1,b:b.b})),c.hex},c.getColor.reset=function(){delete this.start},c.parsePathString=function(a){if(!a)return null;var b=Ab(a);if(b.arr)return Cb(b.arr);var d={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},e=[];return c.is(a,V)&&c.is(a[0],V)&&(e=Cb(a)),e.length||I(a).replace(hb,function(a,b,c){var f=[],g=b.toLowerCase();if(c.replace(jb,function(a,b){b&&f.push(+b)}),"m"==g&&f.length>2&&(e.push([b][E](f.splice(0,2))),g="l",b="m"==b?"l":"L"),"r"==g)e.push([b][E](f));else for(;f.length>=d[g]&&(e.push([b][E](f.splice(0,d[g]))),d[g]););}),e.toString=c._path2string,b.arr=Cb(e),e},c.parseTransformString=f(function(a){if(!a)return null;var b=[];return c.is(a,V)&&c.is(a[0],V)&&(b=Cb(a)),b.length||I(a).replace(ib,function(a,c,d){{var e=[];M.call(c)}d.replace(jb,function(a,b){b&&e.push(+b)}),b.push([c][E](e))}),b.toString=c._path2string,b});var Ab=function(a){var b=Ab.ps=Ab.ps||{};return b[a]?b[a].sleep=100:b[a]={sleep:100},setTimeout(function(){for(var c in b)b[z](c)&&c!=a&&(b[c].sleep--,!b[c].sleep&&delete b[c])}),b[a]};c.findDotsAtSegment=function(a,b,c,d,e,f,g,h,i){var j=1-i,k=R(j,3),l=R(j,2),m=i*i,n=m*i,o=k*a+3*l*i*c+3*j*i*i*e+n*g,p=k*b+3*l*i*d+3*j*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,w=j*e+i*g,x=j*f+i*h,y=90-180*N.atan2(q-s,r-t)/S;return(q>s||t>r)&&(y+=180),{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:w,y:x},alpha:y}},c.bezierBBox=function(a,b,d,e,f,g,h,i){c.is(a,"array")||(a=[a,b,d,e,f,g,h,i]);var j=Jb.apply(null,a);return{x:j.min.x,y:j.min.y,x2:j.max.x,y2:j.max.y,width:j.max.x-j.min.x,height:j.max.y-j.min.y}},c.isPointInsideBBox=function(a,b,c){return b>=a.x&&b<=a.x2&&c>=a.y&&c<=a.y2},c.isBBoxIntersect=function(a,b){var d=c.isPointInsideBBox;return d(b,a.x,a.y)||d(b,a.x2,a.y)||d(b,a.x,a.y2)||d(b,a.x2,a.y2)||d(a,b.x,b.y)||d(a,b.x2,b.y)||d(a,b.x,b.y2)||d(a,b.x2,b.y2)||(a.x<b.x2&&a.x>b.x||b.x<a.x2&&b.x>a.x)&&(a.y<b.y2&&a.y>b.y||b.y<a.y2&&b.y>a.y)},c.pathIntersection=function(a,b){return n(a,b)},c.pathIntersectionNumber=function(a,b){return n(a,b,1)},c.isPointInsidePath=function(a,b,d){var e=c.pathBBox(a);return c.isPointInsideBBox(e,b,d)&&n(a,[["M",b,d],["H",e.x2+10]],1)%2==1},c._removedFactory=function(a){return function(){b("raphael.log",null,"Raphaël: you are calling to method “"+a+"” of removed object",a)}};var Bb=c.pathBBox=function(a){var b=Ab(a);if(b.bbox)return d(b.bbox);if(!a)return{x:0,y:0,width:0,height:0,x2:0,y2:0};a=Kb(a);for(var c,e=0,f=0,g=[],h=[],i=0,j=a.length;j>i;i++)if(c=a[i],"M"==c[0])e=c[1],f=c[2],g.push(e),h.push(f);else{var k=Jb(e,f,c[1],c[2],c[3],c[4],c[5],c[6]);g=g[E](k.min.x,k.max.x),h=h[E](k.min.y,k.max.y),e=c[5],f=c[6]}var l=P[D](0,g),m=P[D](0,h),n=O[D](0,g),o=O[D](0,h),p=n-l,q=o-m,r={x:l,y:m,x2:n,y2:o,width:p,height:q,cx:l+p/2,cy:m+q/2};return b.bbox=d(r),r},Cb=function(a){var b=d(a);return b.toString=c._path2string,b},Db=c._pathToRelative=function(a){var b=Ab(a);if(b.rel)return Cb(b.rel);c.is(a,V)&&c.is(a&&a[0],V)||(a=c.parsePathString(a));var d=[],e=0,f=0,g=0,h=0,i=0;"M"==a[0][0]&&(e=a[0][1],f=a[0][2],g=e,h=f,i++,d.push(["M",e,f]));for(var j=i,k=a.length;k>j;j++){var l=d[j]=[],m=a[j];if(m[0]!=M.call(m[0]))switch(l[0]=M.call(m[0]),l[0]){case"a":l[1]=m[1],l[2]=m[2],l[3]=m[3],l[4]=m[4],l[5]=m[5],l[6]=+(m[6]-e).toFixed(3),l[7]=+(m[7]-f).toFixed(3);break;case"v":l[1]=+(m[1]-f).toFixed(3);break;case"m":g=m[1],h=m[2];default:for(var n=1,o=m.length;o>n;n++)l[n]=+(m[n]-(n%2?e:f)).toFixed(3)}else{l=d[j]=[],"m"==m[0]&&(g=m[1]+e,h=m[2]+f);for(var p=0,q=m.length;q>p;p++)d[j][p]=m[p]}var r=d[j].length;switch(d[j][0]){case"z":e=g,f=h;break;case"h":e+=+d[j][r-1];break;case"v":f+=+d[j][r-1];break;default:e+=+d[j][r-2],f+=+d[j][r-1]}}return d.toString=c._path2string,b.rel=Cb(d),d},Eb=c._pathToAbsolute=function(a){var b=Ab(a);if(b.abs)return Cb(b.abs);if(c.is(a,V)&&c.is(a&&a[0],V)||(a=c.parsePathString(a)),!a||!a.length)return[["M",0,0]];var d=[],e=0,f=0,g=0,i=0,j=0;"M"==a[0][0]&&(e=+a[0][1],f=+a[0][2],g=e,i=f,j++,d[0]=["M",e,f]);for(var k,l,m=3==a.length&&"M"==a[0][0]&&"R"==a[1][0].toUpperCase()&&"Z"==a[2][0].toUpperCase(),n=j,o=a.length;o>n;n++){if(d.push(k=[]),l=a[n],l[0]!=bb.call(l[0]))switch(k[0]=bb.call(l[0]),k[0]){case"A":k[1]=l[1],k[2]=l[2],k[3]=l[3],k[4]=l[4],k[5]=l[5],k[6]=+(l[6]+e),k[7]=+(l[7]+f);break;case"V":k[1]=+l[1]+f;break;case"H":k[1]=+l[1]+e;break;case"R":for(var p=[e,f][E](l.slice(1)),q=2,r=p.length;r>q;q++)p[q]=+p[q]+e,p[++q]=+p[q]+f;d.pop(),d=d[E](h(p,m));break;case"M":g=+l[1]+e,i=+l[2]+f;default:for(q=1,r=l.length;r>q;q++)k[q]=+l[q]+(q%2?e:f)}else if("R"==l[0])p=[e,f][E](l.slice(1)),d.pop(),d=d[E](h(p,m)),k=["R"][E](l.slice(-2));else for(var s=0,t=l.length;t>s;s++)k[s]=l[s];switch(k[0]){case"Z":e=g,f=i;break;case"H":e=k[1];break;case"V":f=k[1];break;case"M":g=k[k.length-2],i=k[k.length-1];default:e=k[k.length-2],f=k[k.length-1]}}return d.toString=c._path2string,b.abs=Cb(d),d},Fb=function(a,b,c,d){return[a,b,c,d,c,d]},Gb=function(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]},Hb=function(a,b,c,d,e,g,h,i,j,k){var l,m=120*S/180,n=S/180*(+e||0),o=[],p=f(function(a,b,c){var d=a*N.cos(c)-b*N.sin(c),e=a*N.sin(c)+b*N.cos(c);return{x:d,y:e}});if(k)y=k[0],z=k[1],w=k[2],x=k[3];else{l=p(a,b,-n),a=l.x,b=l.y,l=p(i,j,-n),i=l.x,j=l.y;var q=(N.cos(S/180*e),N.sin(S/180*e),(a-i)/2),r=(b-j)/2,s=q*q/(c*c)+r*r/(d*d);s>1&&(s=N.sqrt(s),c=s*c,d=s*d);var t=c*c,u=d*d,v=(g==h?-1:1)*N.sqrt(Q((t*u-t*r*r-u*q*q)/(t*r*r+u*q*q))),w=v*c*r/d+(a+i)/2,x=v*-d*q/c+(b+j)/2,y=N.asin(((b-x)/d).toFixed(9)),z=N.asin(((j-x)/d).toFixed(9));y=w>a?S-y:y,z=w>i?S-z:z,0>y&&(y=2*S+y),0>z&&(z=2*S+z),h&&y>z&&(y-=2*S),!h&&z>y&&(z-=2*S)}var A=z-y;if(Q(A)>m){var B=z,C=i,D=j;z=y+m*(h&&z>y?1:-1),i=w+c*N.cos(z),j=x+d*N.sin(z),o=Hb(i,j,c,d,e,0,h,C,D,[z,B,w,x])}A=z-y;var F=N.cos(y),G=N.sin(y),H=N.cos(z),I=N.sin(z),K=N.tan(A/4),L=4/3*c*K,M=4/3*d*K,O=[a,b],P=[a+L*G,b-M*F],R=[i+L*I,j-M*H],T=[i,j];if(P[0]=2*O[0]-P[0],P[1]=2*O[1]-P[1],k)return[P,R,T][E](o);o=[P,R,T][E](o).join()[J](",");for(var U=[],V=0,W=o.length;W>V;V++)U[V]=V%2?p(o[V-1],o[V],n).y:p(o[V],o[V+1],n).x;return U},Ib=function(a,b,c,d,e,f,g,h,i){var j=1-i;return{x:R(j,3)*a+3*R(j,2)*i*c+3*j*i*i*e+R(i,3)*g,y:R(j,3)*b+3*R(j,2)*i*d+3*j*i*i*f+R(i,3)*h}},Jb=f(function(a,b,c,d,e,f,g,h){var i,j=e-2*c+a-(g-2*e+c),k=2*(c-a)-2*(e-c),l=a-c,m=(-k+N.sqrt(k*k-4*j*l))/2/j,n=(-k-N.sqrt(k*k-4*j*l))/2/j,o=[b,h],p=[a,g];return Q(m)>"1e12"&&(m=.5),Q(n)>"1e12"&&(n=.5),m>0&&1>m&&(i=Ib(a,b,c,d,e,f,g,h,m),p.push(i.x),o.push(i.y)),n>0&&1>n&&(i=Ib(a,b,c,d,e,f,g,h,n),p.push(i.x),o.push(i.y)),j=f-2*d+b-(h-2*f+d),k=2*(d-b)-2*(f-d),l=b-d,m=(-k+N.sqrt(k*k-4*j*l))/2/j,n=(-k-N.sqrt(k*k-4*j*l))/2/j,Q(m)>"1e12"&&(m=.5),Q(n)>"1e12"&&(n=.5),m>0&&1>m&&(i=Ib(a,b,c,d,e,f,g,h,m),p.push(i.x),o.push(i.y)),n>0&&1>n&&(i=Ib(a,b,c,d,e,f,g,h,n),p.push(i.x),o.push(i.y)),{min:{x:P[D](0,p),y:P[D](0,o)},max:{x:O[D](0,p),y:O[D](0,o)}}}),Kb=c._path2curve=f(function(a,b){var c=!b&&Ab(a);if(!b&&c.curve)return Cb(c.curve);for(var d=Eb(a),e=b&&Eb(b),f={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},g={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},h=(function(a,b,c){var d,e,f={T:1,Q:1};if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];switch(!(a[0]in f)&&(b.qx=b.qy=null),a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"][E](Hb[D](0,[b.x,b.y][E](a.slice(1))));break;case"S":"C"==c||"S"==c?(d=2*b.x-b.bx,e=2*b.y-b.by):(d=b.x,e=b.y),a=["C",d,e][E](a.slice(1));break;case"T":"Q"==c||"T"==c?(b.qx=2*b.x-b.qx,b.qy=2*b.y-b.qy):(b.qx=b.x,b.qy=b.y),a=["C"][E](Gb(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"][E](Gb(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"][E](Fb(b.x,b.y,a[1],a[2]));break;case"H":a=["C"][E](Fb(b.x,b.y,a[1],b.y));break;case"V":a=["C"][E](Fb(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"][E](Fb(b.x,b.y,b.X,b.Y))}return a}),i=function(a,b){if(a[b].length>7){a[b].shift();for(var c=a[b];c.length;)a.splice(b++,0,["C"][E](c.splice(0,6)));a.splice(b,1),l=O(d.length,e&&e.length||0)}},j=function(a,b,c,f,g){a&&b&&"M"==a[g][0]&&"M"!=b[g][0]&&(b.splice(g,0,["M",f.x,f.y]),c.bx=0,c.by=0,c.x=a[g][1],c.y=a[g][2],l=O(d.length,e&&e.length||0))},k=0,l=O(d.length,e&&e.length||0);l>k;k++){d[k]=h(d[k],f),i(d,k),e&&(e[k]=h(e[k],g)),e&&i(e,k),j(d,e,f,g,k),j(e,d,g,f,k);var m=d[k],n=e&&e[k],o=m.length,p=e&&n.length;f.x=m[o-2],f.y=m[o-1],f.bx=_(m[o-4])||f.x,f.by=_(m[o-3])||f.y,g.bx=e&&(_(n[p-4])||g.x),g.by=e&&(_(n[p-3])||g.y),g.x=e&&n[p-2],g.y=e&&n[p-1]}return e||(c.curve=Cb(d)),e?[d,e]:d},null,Cb),Lb=(c._parseDots=f(function(a){for(var b=[],d=0,e=a.length;e>d;d++){var f={},g=a[d].match(/^([^:]*):?([\d\.]*)/);if(f.color=c.getRGB(g[1]),f.color.error)return null;f.color=f.color.hex,g[2]&&(f.offset=g[2]+"%"),b.push(f)}for(d=1,e=b.length-1;e>d;d++)if(!b[d].offset){for(var h=_(b[d-1].offset||0),i=0,j=d+1;e>j;j++)if(b[j].offset){i=b[j].offset;break}i||(i=100,j=e),i=_(i);for(var k=(i-h)/(j-d+1);j>d;d++)h+=k,b[d].offset=h+"%"}return b}),c._tear=function(a,b){a==b.top&&(b.top=a.prev),a==b.bottom&&(b.bottom=a.next),a.next&&(a.next.prev=a.prev),a.prev&&(a.prev.next=a.next)}),Mb=(c._tofront=function(a,b){b.top!==a&&(Lb(a,b),a.next=null,a.prev=b.top,b.top.next=a,b.top=a)},c._toback=function(a,b){b.bottom!==a&&(Lb(a,b),a.next=b.bottom,a.prev=null,b.bottom.prev=a,b.bottom=a)},c._insertafter=function(a,b,c){Lb(a,c),b==c.top&&(c.top=a),b.next&&(b.next.prev=a),a.next=b.next,a.prev=b,b.next=a},c._insertbefore=function(a,b,c){Lb(a,c),b==c.bottom&&(c.bottom=a),b.prev&&(b.prev.next=a),a.prev=b.prev,b.prev=a,a.next=b},c.toMatrix=function(a,b){var c=Bb(a),d={_:{transform:G},getBBox:function(){return c}};return Nb(d,b),d.matrix}),Nb=(c.transformPath=function(a,b){return rb(a,Mb(a,b))},c._extractTransform=function(a,b){if(null==b)return a._.transform;b=I(b).replace(/\.{3}|\u2026/g,a._.transform||G);var d=c.parseTransformString(b),e=0,f=0,g=0,h=1,i=1,j=a._,k=new o;if(j.transform=d||[],d)for(var l=0,m=d.length;m>l;l++){var n,p,q,r,s,t=d[l],u=t.length,v=I(t[0]).toLowerCase(),w=t[0]!=v,x=w?k.invert():0;"t"==v&&3==u?w?(n=x.x(0,0),p=x.y(0,0),q=x.x(t[1],t[2]),r=x.y(t[1],t[2]),k.translate(q-n,r-p)):k.translate(t[1],t[2]):"r"==v?2==u?(s=s||a.getBBox(1),k.rotate(t[1],s.x+s.width/2,s.y+s.height/2),e+=t[1]):4==u&&(w?(q=x.x(t[2],t[3]),r=x.y(t[2],t[3]),k.rotate(t[1],q,r)):k.rotate(t[1],t[2],t[3]),e+=t[1]):"s"==v?2==u||3==u?(s=s||a.getBBox(1),k.scale(t[1],t[u-1],s.x+s.width/2,s.y+s.height/2),h*=t[1],i*=t[u-1]):5==u&&(w?(q=x.x(t[3],t[4]),r=x.y(t[3],t[4]),k.scale(t[1],t[2],q,r)):k.scale(t[1],t[2],t[3],t[4]),h*=t[1],i*=t[2]):"m"==v&&7==u&&k.add(t[1],t[2],t[3],t[4],t[5],t[6]),j.dirtyT=1,a.matrix=k}a.matrix=k,j.sx=h,j.sy=i,j.deg=e,j.dx=f=k.e,j.dy=g=k.f,1==h&&1==i&&!e&&j.bbox?(j.bbox.x+=+f,j.bbox.y+=+g):j.dirtyT=1}),Ob=function(a){var b=a[0];switch(b.toLowerCase()){case"t":return[b,0,0];case"m":return[b,1,0,0,1,0,0];case"r":return 4==a.length?[b,0,a[2],a[3]]:[b,0];case"s":return 5==a.length?[b,1,1,a[3],a[4]]:3==a.length?[b,1,1]:[b,1]}},Pb=c._equaliseTransform=function(a,b){b=I(b).replace(/\.{3}|\u2026/g,a),a=c.parseTransformString(a)||[],b=c.parseTransformString(b)||[];for(var d,e,f,g,h=O(a.length,b.length),i=[],j=[],k=0;h>k;k++){if(f=a[k]||Ob(b[k]),g=b[k]||Ob(f),f[0]!=g[0]||"r"==f[0].toLowerCase()&&(f[2]!=g[2]||f[3]!=g[3])||"s"==f[0].toLowerCase()&&(f[3]!=g[3]||f[4]!=g[4]))return;for(i[k]=[],j[k]=[],d=0,e=O(f.length,g.length);e>d;d++)d in f&&(i[k][d]=f[d]),d in g&&(j[k][d]=g[d])
}return{from:i,to:j}};c._getContainer=function(a,b,d,e){var f;return f=null!=e||c.is(a,"object")?a:A.doc.getElementById(a),null!=f?f.tagName?null==b?{container:f,width:f.style.pixelWidth||f.offsetWidth,height:f.style.pixelHeight||f.offsetHeight}:{container:f,width:b,height:d}:{container:1,x:a,y:b,width:d,height:e}:void 0},c.pathToRelative=Db,c._engine={},c.path2curve=Kb,c.matrix=function(a,b,c,d,e,f){return new o(a,b,c,d,e,f)},function(a){function b(a){return a[0]*a[0]+a[1]*a[1]}function d(a){var c=N.sqrt(b(a));a[0]&&(a[0]/=c),a[1]&&(a[1]/=c)}a.add=function(a,b,c,d,e,f){var g,h,i,j,k=[[],[],[]],l=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],m=[[a,c,e],[b,d,f],[0,0,1]];for(a&&a instanceof o&&(m=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]),g=0;3>g;g++)for(h=0;3>h;h++){for(j=0,i=0;3>i;i++)j+=l[g][i]*m[i][h];k[g][h]=j}this.a=k[0][0],this.b=k[1][0],this.c=k[0][1],this.d=k[1][1],this.e=k[0][2],this.f=k[1][2]},a.invert=function(){var a=this,b=a.a*a.d-a.b*a.c;return new o(a.d/b,-a.b/b,-a.c/b,a.a/b,(a.c*a.f-a.d*a.e)/b,(a.b*a.e-a.a*a.f)/b)},a.clone=function(){return new o(this.a,this.b,this.c,this.d,this.e,this.f)},a.translate=function(a,b){this.add(1,0,0,1,a,b)},a.scale=function(a,b,c,d){null==b&&(b=a),(c||d)&&this.add(1,0,0,1,c,d),this.add(a,0,0,b,0,0),(c||d)&&this.add(1,0,0,1,-c,-d)},a.rotate=function(a,b,d){a=c.rad(a),b=b||0,d=d||0;var e=+N.cos(a).toFixed(9),f=+N.sin(a).toFixed(9);this.add(e,f,-f,e,b,d),this.add(1,0,0,1,-b,-d)},a.x=function(a,b){return a*this.a+b*this.c+this.e},a.y=function(a,b){return a*this.b+b*this.d+this.f},a.get=function(a){return+this[I.fromCharCode(97+a)].toFixed(4)},a.toString=function(){return c.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},a.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},a.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},a.split=function(){var a={};a.dx=this.e,a.dy=this.f;var e=[[this.a,this.c],[this.b,this.d]];a.scalex=N.sqrt(b(e[0])),d(e[0]),a.shear=e[0][0]*e[1][0]+e[0][1]*e[1][1],e[1]=[e[1][0]-e[0][0]*a.shear,e[1][1]-e[0][1]*a.shear],a.scaley=N.sqrt(b(e[1])),d(e[1]),a.shear/=a.scaley;var f=-e[0][1],g=e[1][1];return 0>g?(a.rotate=c.deg(N.acos(g)),0>f&&(a.rotate=360-a.rotate)):a.rotate=c.deg(N.asin(f)),a.isSimple=!(+a.shear.toFixed(9)||a.scalex.toFixed(9)!=a.scaley.toFixed(9)&&a.rotate),a.isSuperSimple=!+a.shear.toFixed(9)&&a.scalex.toFixed(9)==a.scaley.toFixed(9)&&!a.rotate,a.noRotation=!+a.shear.toFixed(9)&&!a.rotate,a},a.toTransformString=function(a){var b=a||this[J]();return b.isSimple?(b.scalex=+b.scalex.toFixed(4),b.scaley=+b.scaley.toFixed(4),b.rotate=+b.rotate.toFixed(4),(b.dx||b.dy?"t"+[b.dx,b.dy]:G)+(1!=b.scalex||1!=b.scaley?"s"+[b.scalex,b.scaley,0,0]:G)+(b.rotate?"r"+[b.rotate,0,0]:G)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(o.prototype);var Qb=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);v.safari="Apple Computer, Inc."==navigator.vendor&&(Qb&&Qb[1]<4||"iP"==navigator.platform.slice(0,2))||"Google Inc."==navigator.vendor&&Qb&&Qb[1]<8?function(){var a=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});setTimeout(function(){a.remove()})}:mb;for(var Rb=function(){this.returnValue=!1},Sb=function(){return this.originalEvent.preventDefault()},Tb=function(){this.cancelBubble=!0},Ub=function(){return this.originalEvent.stopPropagation()},Vb=function(a){var b=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,c=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft;return{x:a.clientX+c,y:a.clientY+b}},Wb=function(){return A.doc.addEventListener?function(a,b,c,d){var e=function(a){var b=Vb(a);return c.call(d,a,b.x,b.y)};if(a.addEventListener(b,e,!1),F&&L[b]){var f=function(b){for(var e=Vb(b),f=b,g=0,h=b.targetTouches&&b.targetTouches.length;h>g;g++)if(b.targetTouches[g].target==a){b=b.targetTouches[g],b.originalEvent=f,b.preventDefault=Sb,b.stopPropagation=Ub;break}return c.call(d,b,e.x,e.y)};a.addEventListener(L[b],f,!1)}return function(){return a.removeEventListener(b,e,!1),F&&L[b]&&a.removeEventListener(L[b],e,!1),!0}}:A.doc.attachEvent?function(a,b,c,d){var e=function(a){a=a||A.win.event;var b=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,e=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft,f=a.clientX+e,g=a.clientY+b;return a.preventDefault=a.preventDefault||Rb,a.stopPropagation=a.stopPropagation||Tb,c.call(d,a,f,g)};a.attachEvent("on"+b,e);var f=function(){return a.detachEvent("on"+b,e),!0};return f}:void 0}(),Xb=[],Yb=function(a){for(var c,d=a.clientX,e=a.clientY,f=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,g=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft,h=Xb.length;h--;){if(c=Xb[h],F&&a.touches){for(var i,j=a.touches.length;j--;)if(i=a.touches[j],i.identifier==c.el._drag.id){d=i.clientX,e=i.clientY,(a.originalEvent?a.originalEvent:a).preventDefault();break}}else a.preventDefault();var k,l=c.el.node,m=l.nextSibling,n=l.parentNode,o=l.style.display;A.win.opera&&n.removeChild(l),l.style.display="none",k=c.el.paper.getElementByPoint(d,e),l.style.display=o,A.win.opera&&(m?n.insertBefore(l,m):n.appendChild(l)),k&&b("raphael.drag.over."+c.el.id,c.el,k),d+=g,e+=f,b("raphael.drag.move."+c.el.id,c.move_scope||c.el,d-c.el._drag.x,e-c.el._drag.y,d,e,a)}},Zb=function(a){c.unmousemove(Yb).unmouseup(Zb);for(var d,e=Xb.length;e--;)d=Xb[e],d.el._drag={},b("raphael.drag.end."+d.el.id,d.end_scope||d.start_scope||d.move_scope||d.el,a);Xb=[]},$b=c.el={},_b=K.length;_b--;)!function(a){c[a]=$b[a]=function(b,d){return c.is(b,"function")&&(this.events=this.events||[],this.events.push({name:a,f:b,unbind:Wb(this.shape||this.node||A.doc,a,b,d||this)})),this},c["un"+a]=$b["un"+a]=function(b){for(var d=this.events||[],e=d.length;e--;)d[e].name!=a||!c.is(b,"undefined")&&d[e].f!=b||(d[e].unbind(),d.splice(e,1),!d.length&&delete this.events);return this}}(K[_b]);$b.data=function(a,d){var e=kb[this.id]=kb[this.id]||{};if(0==arguments.length)return e;if(1==arguments.length){if(c.is(a,"object")){for(var f in a)a[z](f)&&this.data(f,a[f]);return this}return b("raphael.data.get."+this.id,this,e[a],a),e[a]}return e[a]=d,b("raphael.data.set."+this.id,this,d,a),this},$b.removeData=function(a){return null==a?kb[this.id]={}:kb[this.id]&&delete kb[this.id][a],this},$b.getData=function(){return d(kb[this.id]||{})},$b.hover=function(a,b,c,d){return this.mouseover(a,c).mouseout(b,d||c)},$b.unhover=function(a,b){return this.unmouseover(a).unmouseout(b)};var ac=[];$b.drag=function(a,d,e,f,g,h){function i(i){(i.originalEvent||i).preventDefault();var j=i.clientX,k=i.clientY,l=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,m=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft;if(this._drag.id=i.identifier,F&&i.touches)for(var n,o=i.touches.length;o--;)if(n=i.touches[o],this._drag.id=n.identifier,n.identifier==this._drag.id){j=n.clientX,k=n.clientY;break}this._drag.x=j+m,this._drag.y=k+l,!Xb.length&&c.mousemove(Yb).mouseup(Zb),Xb.push({el:this,move_scope:f,start_scope:g,end_scope:h}),d&&b.on("raphael.drag.start."+this.id,d),a&&b.on("raphael.drag.move."+this.id,a),e&&b.on("raphael.drag.end."+this.id,e),b("raphael.drag.start."+this.id,g||f||this,i.clientX+m,i.clientY+l,i)}return this._drag={},ac.push({el:this,start:i}),this.mousedown(i),this},$b.onDragOver=function(a){a?b.on("raphael.drag.over."+this.id,a):b.unbind("raphael.drag.over."+this.id)},$b.undrag=function(){for(var a=ac.length;a--;)ac[a].el==this&&(this.unmousedown(ac[a].start),ac.splice(a,1),b.unbind("raphael.drag.*."+this.id));!ac.length&&c.unmousemove(Yb).unmouseup(Zb),Xb=[]},v.circle=function(a,b,d){var e=c._engine.circle(this,a||0,b||0,d||0);return this.__set__&&this.__set__.push(e),e},v.rect=function(a,b,d,e,f){var g=c._engine.rect(this,a||0,b||0,d||0,e||0,f||0);return this.__set__&&this.__set__.push(g),g},v.ellipse=function(a,b,d,e){var f=c._engine.ellipse(this,a||0,b||0,d||0,e||0);return this.__set__&&this.__set__.push(f),f},v.path=function(a){a&&!c.is(a,U)&&!c.is(a[0],V)&&(a+=G);var b=c._engine.path(c.format[D](c,arguments),this);return this.__set__&&this.__set__.push(b),b},v.image=function(a,b,d,e,f){var g=c._engine.image(this,a||"about:blank",b||0,d||0,e||0,f||0);return this.__set__&&this.__set__.push(g),g},v.text=function(a,b,d){var e=c._engine.text(this,a||0,b||0,I(d));return this.__set__&&this.__set__.push(e),e},v.set=function(a){!c.is(a,"array")&&(a=Array.prototype.splice.call(arguments,0,arguments.length));var b=new mc(a);return this.__set__&&this.__set__.push(b),b.paper=this,b.type="set",b},v.setStart=function(a){this.__set__=a||this.set()},v.setFinish=function(){var a=this.__set__;return delete this.__set__,a},v.setSize=function(a,b){return c._engine.setSize.call(this,a,b)},v.setViewBox=function(a,b,d,e,f){return c._engine.setViewBox.call(this,a,b,d,e,f)},v.top=v.bottom=null,v.raphael=c;var bc=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.body,e=c.documentElement,f=e.clientTop||d.clientTop||0,g=e.clientLeft||d.clientLeft||0,h=b.top+(A.win.pageYOffset||e.scrollTop||d.scrollTop)-f,i=b.left+(A.win.pageXOffset||e.scrollLeft||d.scrollLeft)-g;return{y:h,x:i}};v.getElementByPoint=function(a,b){var c=this,d=c.canvas,e=A.doc.elementFromPoint(a,b);if(A.win.opera&&"svg"==e.tagName){var f=bc(d),g=d.createSVGRect();g.x=a-f.x,g.y=b-f.y,g.width=g.height=1;var h=d.getIntersectionList(g,null);h.length&&(e=h[h.length-1])}if(!e)return null;for(;e.parentNode&&e!=d.parentNode&&!e.raphael;)e=e.parentNode;return e==c.canvas.parentNode&&(e=d),e=e&&e.raphael?c.getById(e.raphaelid):null},v.getElementsByBBox=function(a){var b=this.set();return this.forEach(function(d){c.isBBoxIntersect(d.getBBox(),a)&&b.push(d)}),b},v.getById=function(a){for(var b=this.bottom;b;){if(b.id==a)return b;b=b.next}return null},v.forEach=function(a,b){for(var c=this.bottom;c;){if(a.call(b,c)===!1)return this;c=c.next}return this},v.getElementsByPoint=function(a,b){var c=this.set();return this.forEach(function(d){d.isPointInside(a,b)&&c.push(d)}),c},$b.isPointInside=function(a,b){var d=this.realPath=qb[this.type](this);return this.attr("transform")&&this.attr("transform").length&&(d=c.transformPath(d,this.attr("transform"))),c.isPointInsidePath(d,a,b)},$b.getBBox=function(a){if(this.removed)return{};var b=this._;return a?((b.dirty||!b.bboxwt)&&(this.realPath=qb[this.type](this),b.bboxwt=Bb(this.realPath),b.bboxwt.toString=p,b.dirty=0),b.bboxwt):((b.dirty||b.dirtyT||!b.bbox)&&((b.dirty||!this.realPath)&&(b.bboxwt=0,this.realPath=qb[this.type](this)),b.bbox=Bb(rb(this.realPath,this.matrix)),b.bbox.toString=p,b.dirty=b.dirtyT=0),b.bbox)},$b.clone=function(){if(this.removed)return null;var a=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(a),a},$b.glow=function(a){if("text"==this.type)return null;a=a||{};var b={width:(a.width||10)+(+this.attr("stroke-width")||1),fill:a.fill||!1,opacity:a.opacity||.5,offsetx:a.offsetx||0,offsety:a.offsety||0,color:a.color||"#000"},c=b.width/2,d=this.paper,e=d.set(),f=this.realPath||qb[this.type](this);f=this.matrix?rb(f,this.matrix):f;for(var g=1;c+1>g;g++)e.push(d.path(f).attr({stroke:b.color,fill:b.fill?b.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(b.width/c*g).toFixed(3),opacity:+(b.opacity/c).toFixed(3)}));return e.insertBefore(this).translate(b.offsetx,b.offsety)};var cc=function(a,b,d,e,f,g,h,i,l){return null==l?j(a,b,d,e,f,g,h,i):c.findDotsAtSegment(a,b,d,e,f,g,h,i,k(a,b,d,e,f,g,h,i,l))},dc=function(a,b){return function(d,e,f){d=Kb(d);for(var g,h,i,j,k,l="",m={},n=0,o=0,p=d.length;p>o;o++){if(i=d[o],"M"==i[0])g=+i[1],h=+i[2];else{if(j=cc(g,h,i[1],i[2],i[3],i[4],i[5],i[6]),n+j>e){if(b&&!m.start){if(k=cc(g,h,i[1],i[2],i[3],i[4],i[5],i[6],e-n),l+=["C"+k.start.x,k.start.y,k.m.x,k.m.y,k.x,k.y],f)return l;m.start=l,l=["M"+k.x,k.y+"C"+k.n.x,k.n.y,k.end.x,k.end.y,i[5],i[6]].join(),n+=j,g=+i[5],h=+i[6];continue}if(!a&&!b)return k=cc(g,h,i[1],i[2],i[3],i[4],i[5],i[6],e-n),{x:k.x,y:k.y,alpha:k.alpha}}n+=j,g=+i[5],h=+i[6]}l+=i.shift()+i}return m.end=l,k=a?n:b?m:c.findDotsAtSegment(g,h,i[0],i[1],i[2],i[3],i[4],i[5],1),k.alpha&&(k={x:k.x,y:k.y,alpha:k.alpha}),k}},ec=dc(1),fc=dc(),gc=dc(0,1);c.getTotalLength=ec,c.getPointAtLength=fc,c.getSubpath=function(a,b,c){if(this.getTotalLength(a)-c<1e-6)return gc(a,b).end;var d=gc(a,c,1);return b?gc(d,b).end:d},$b.getTotalLength=function(){var a=this.getPath();if(a)return this.node.getTotalLength?this.node.getTotalLength():ec(a)},$b.getPointAtLength=function(a){var b=this.getPath();if(b)return fc(b,a)},$b.getPath=function(){var a,b=c._getPath[this.type];if("text"!=this.type&&"set"!=this.type)return b&&(a=b(this)),a},$b.getSubpath=function(a,b){var d=this.getPath();if(d)return c.getSubpath(d,a,b)};var hc=c.easing_formulas={linear:function(a){return a},"<":function(a){return R(a,1.7)},">":function(a){return R(a,.48)},"<>":function(a){var b=.48-a/1.04,c=N.sqrt(.1734+b*b),d=c-b,e=R(Q(d),1/3)*(0>d?-1:1),f=-c-b,g=R(Q(f),1/3)*(0>f?-1:1),h=e+g+.5;return 3*(1-h)*h*h+h*h*h},backIn:function(a){var b=1.70158;return a*a*((b+1)*a-b)},backOut:function(a){a-=1;var b=1.70158;return a*a*((b+1)*a+b)+1},elastic:function(a){return a==!!a?a:R(2,-10*a)*N.sin(2*(a-.075)*S/.3)+1},bounce:function(a){var b,c=7.5625,d=2.75;return 1/d>a?b=c*a*a:2/d>a?(a-=1.5/d,b=c*a*a+.75):2.5/d>a?(a-=2.25/d,b=c*a*a+.9375):(a-=2.625/d,b=c*a*a+.984375),b}};hc.easeIn=hc["ease-in"]=hc["<"],hc.easeOut=hc["ease-out"]=hc[">"],hc.easeInOut=hc["ease-in-out"]=hc["<>"],hc["back-in"]=hc.backIn,hc["back-out"]=hc.backOut;var ic=[],jc=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame||function(a){setTimeout(a,16)},kc=function(){for(var a=+new Date,d=0;d<ic.length;d++){var e=ic[d];if(!e.el.removed&&!e.paused){var f,g,h=a-e.start,i=e.ms,j=e.easing,k=e.from,l=e.diff,m=e.to,n=(e.t,e.el),o={},p={};if(e.initstatus?(h=(e.initstatus*e.anim.top-e.prev)/(e.percent-e.prev)*i,e.status=e.initstatus,delete e.initstatus,e.stop&&ic.splice(d--,1)):e.status=(e.prev+(e.percent-e.prev)*(h/i))/e.anim.top,!(0>h))if(i>h){var q=j(h/i);for(var r in k)if(k[z](r)){switch(db[r]){case T:f=+k[r]+q*i*l[r];break;case"colour":f="rgb("+[lc($(k[r].r+q*i*l[r].r)),lc($(k[r].g+q*i*l[r].g)),lc($(k[r].b+q*i*l[r].b))].join(",")+")";break;case"path":f=[];for(var t=0,u=k[r].length;u>t;t++){f[t]=[k[r][t][0]];for(var v=1,w=k[r][t].length;w>v;v++)f[t][v]=+k[r][t][v]+q*i*l[r][t][v];f[t]=f[t].join(H)}f=f.join(H);break;case"transform":if(l[r].real)for(f=[],t=0,u=k[r].length;u>t;t++)for(f[t]=[k[r][t][0]],v=1,w=k[r][t].length;w>v;v++)f[t][v]=k[r][t][v]+q*i*l[r][t][v];else{var x=function(a){return+k[r][a]+q*i*l[r][a]};f=[["m",x(0),x(1),x(2),x(3),x(4),x(5)]]}break;case"csv":if("clip-rect"==r)for(f=[],t=4;t--;)f[t]=+k[r][t]+q*i*l[r][t];break;default:var y=[][E](k[r]);for(f=[],t=n.paper.customAttributes[r].length;t--;)f[t]=+y[t]+q*i*l[r][t]}o[r]=f}n.attr(o),function(a,c,d){setTimeout(function(){b("raphael.anim.frame."+a,c,d)})}(n.id,n,e.anim)}else{if(function(a,d,e){setTimeout(function(){b("raphael.anim.frame."+d.id,d,e),b("raphael.anim.finish."+d.id,d,e),c.is(a,"function")&&a.call(d)})}(e.callback,n,e.anim),n.attr(m),ic.splice(d--,1),e.repeat>1&&!e.next){for(g in m)m[z](g)&&(p[g]=e.totalOrigin[g]);e.el.attr(p),s(e.anim,e.el,e.anim.percents[0],null,e.totalOrigin,e.repeat-1)}e.next&&!e.stop&&s(e.anim,e.el,e.next,null,e.totalOrigin,e.repeat)}}}c.svg&&n&&n.paper&&n.paper.safari(),ic.length&&jc(kc)},lc=function(a){return a>255?255:0>a?0:a};$b.animateWith=function(a,b,d,e,f,g){var h=this;if(h.removed)return g&&g.call(h),h;var i=d instanceof r?d:c.animation(d,e,f,g);s(i,h,i.percents[0],null,h.attr());for(var j=0,k=ic.length;k>j;j++)if(ic[j].anim==b&&ic[j].el==a){ic[k-1].start=ic[j].start;break}return h},$b.onAnimation=function(a){return a?b.on("raphael.anim.frame."+this.id,a):b.unbind("raphael.anim.frame."+this.id),this},r.prototype.delay=function(a){var b=new r(this.anim,this.ms);return b.times=this.times,b.del=+a||0,b},r.prototype.repeat=function(a){var b=new r(this.anim,this.ms);return b.del=this.del,b.times=N.floor(O(a,0))||1,b},c.animation=function(a,b,d,e){if(a instanceof r)return a;(c.is(d,"function")||!d)&&(e=e||d||null,d=null),a=Object(a),b=+b||0;var f,g,h={};for(g in a)a[z](g)&&_(g)!=g&&_(g)+"%"!=g&&(f=!0,h[g]=a[g]);return f?(d&&(h.easing=d),e&&(h.callback=e),new r({100:h},b)):new r(a,b)},$b.animate=function(a,b,d,e){var f=this;if(f.removed)return e&&e.call(f),f;var g=a instanceof r?a:c.animation(a,b,d,e);return s(g,f,g.percents[0],null,f.attr()),f},$b.setTime=function(a,b){return a&&null!=b&&this.status(a,P(b,a.ms)/a.ms),this},$b.status=function(a,b){var c,d,e=[],f=0;if(null!=b)return s(a,this,-1,P(b,1)),this;for(c=ic.length;c>f;f++)if(d=ic[f],d.el.id==this.id&&(!a||d.anim==a)){if(a)return d.status;e.push({anim:d.anim,status:d.status})}return a?0:e},$b.pause=function(a){for(var c=0;c<ic.length;c++)ic[c].el.id!=this.id||a&&ic[c].anim!=a||b("raphael.anim.pause."+this.id,this,ic[c].anim)!==!1&&(ic[c].paused=!0);return this},$b.resume=function(a){for(var c=0;c<ic.length;c++)if(ic[c].el.id==this.id&&(!a||ic[c].anim==a)){var d=ic[c];b("raphael.anim.resume."+this.id,this,d.anim)!==!1&&(delete d.paused,this.status(d.anim,d.status))}return this},$b.stop=function(a){for(var c=0;c<ic.length;c++)ic[c].el.id!=this.id||a&&ic[c].anim!=a||b("raphael.anim.stop."+this.id,this,ic[c].anim)!==!1&&ic.splice(c--,1);return this},b.on("raphael.remove",t),b.on("raphael.clear",t),$b.toString=function(){return"Raphaël’s object"};var mc=function(a){if(this.items=[],this.length=0,this.type="set",a)for(var b=0,c=a.length;c>b;b++)!a[b]||a[b].constructor!=$b.constructor&&a[b].constructor!=mc||(this[this.items.length]=this.items[this.items.length]=a[b],this.length++)},nc=mc.prototype;nc.push=function(){for(var a,b,c=0,d=arguments.length;d>c;c++)a=arguments[c],!a||a.constructor!=$b.constructor&&a.constructor!=mc||(b=this.items.length,this[b]=this.items[b]=a,this.length++);return this},nc.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},nc.forEach=function(a,b){for(var c=0,d=this.items.length;d>c;c++)if(a.call(b,this.items[c],c)===!1)return this;return this};for(var oc in $b)$b[z](oc)&&(nc[oc]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a][D](c,b)})}}(oc));return nc.attr=function(a,b){if(a&&c.is(a,V)&&c.is(a[0],"object"))for(var d=0,e=a.length;e>d;d++)this.items[d].attr(a[d]);else for(var f=0,g=this.items.length;g>f;f++)this.items[f].attr(a,b);return this},nc.clear=function(){for(;this.length;)this.pop()},nc.splice=function(a,b){a=0>a?O(this.length+a,0):a,b=O(0,P(this.length-a,b));var c,d=[],e=[],f=[];for(c=2;c<arguments.length;c++)f.push(arguments[c]);for(c=0;b>c;c++)e.push(this[a+c]);for(;c<this.length-a;c++)d.push(this[a+c]);var g=f.length;for(c=0;c<g+d.length;c++)this.items[a+c]=this[a+c]=g>c?f[c]:d[c-g];for(c=this.items.length=this.length-=b-g;this[c];)delete this[c++];return new mc(e)},nc.exclude=function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]==a)return this.splice(b,1),!0},nc.animate=function(a,b,d,e){(c.is(d,"function")||!d)&&(e=d||null);var f,g,h=this.items.length,i=h,j=this;if(!h)return this;e&&(g=function(){!--h&&e.call(j)}),d=c.is(d,U)?d:g;var k=c.animation(a,b,d,g);for(f=this.items[--i].animate(k);i--;)this.items[i]&&!this.items[i].removed&&this.items[i].animateWith(f,k,k),this.items[i]&&!this.items[i].removed||h--;return this},nc.insertAfter=function(a){for(var b=this.items.length;b--;)this.items[b].insertAfter(a);return this},nc.getBBox=function(){for(var a=[],b=[],c=[],d=[],e=this.items.length;e--;)if(!this.items[e].removed){var f=this.items[e].getBBox();a.push(f.x),b.push(f.y),c.push(f.x+f.width),d.push(f.y+f.height)}return a=P[D](0,a),b=P[D](0,b),c=O[D](0,c),d=O[D](0,d),{x:a,y:b,x2:c,y2:d,width:c-a,height:d-b}},nc.clone=function(a){a=this.paper.set();for(var b=0,c=this.items.length;c>b;b++)a.push(this.items[b].clone());return a},nc.toString=function(){return"Raphaël‘s set"},nc.glow=function(a){var b=this.paper.set();return this.forEach(function(c){var d=c.glow(a);null!=d&&d.forEach(function(a){b.push(a)})}),b},nc.isPointInside=function(a,b){var c=!1;return this.forEach(function(d){return d.isPointInside(a,b)?(c=!0,!1):void 0}),c},c.registerFont=function(a){if(!a.face)return a;this.fonts=this.fonts||{};var b={w:a.w,face:{},glyphs:{}},c=a.face["font-family"];for(var d in a.face)a.face[z](d)&&(b.face[d]=a.face[d]);if(this.fonts[c]?this.fonts[c].push(b):this.fonts[c]=[b],!a.svg){b.face["units-per-em"]=ab(a.face["units-per-em"],10);for(var e in a.glyphs)if(a.glyphs[z](e)){var f=a.glyphs[e];if(b.glyphs[e]={w:f.w,k:{},d:f.d&&"M"+f.d.replace(/[mlcxtrv]/g,function(a){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[a]||"M"})+"z"},f.k)for(var g in f.k)f[z](g)&&(b.glyphs[e].k[g]=f.k[g])}}return a},v.getFont=function(a,b,d,e){if(e=e||"normal",d=d||"normal",b=+b||{normal:400,bold:700,lighter:300,bolder:800}[b]||400,c.fonts){var f=c.fonts[a];if(!f){var g=new RegExp("(^|\\s)"+a.replace(/[^\w\d\s+!~.:_-]/g,G)+"(\\s|$)","i");for(var h in c.fonts)if(c.fonts[z](h)&&g.test(h)){f=c.fonts[h];break}}var i;if(f)for(var j=0,k=f.length;k>j&&(i=f[j],i.face["font-weight"]!=b||i.face["font-style"]!=d&&i.face["font-style"]||i.face["font-stretch"]!=e);j++);return i}},v.print=function(a,b,d,e,f,g,h,i){g=g||"middle",h=O(P(h||0,1),-1),i=O(P(i||1,3),1);var j,k=I(d)[J](G),l=0,m=0,n=G;if(c.is(e,"string")&&(e=this.getFont(e)),e){j=(f||16)/e.face["units-per-em"];for(var o=e.face.bbox[J](w),p=+o[0],q=o[3]-o[1],r=0,s=+o[1]+("baseline"==g?q+ +e.face.descent:q/2),t=0,u=k.length;u>t;t++){if("\n"==k[t])l=0,x=0,m=0,r+=q*i;else{var v=m&&e.glyphs[k[t-1]]||{},x=e.glyphs[k[t]];l+=m?(v.w||e.w)+(v.k&&v.k[k[t]]||0)+e.w*h:0,m=1}x&&x.d&&(n+=c.transformPath(x.d,["t",l*j,r*j,"s",j,j,p,s,"t",(a-p)/j,(b-s)/j]))}}return this.path(n).attr({fill:"#000",stroke:"none"})},v.add=function(a){if(c.is(a,"array"))for(var b,d=this.set(),e=0,f=a.length;f>e;e++)b=a[e]||{},x[z](b.type)&&d.push(this[b.type]().attr(b));return d},c.format=function(a,b){var d=c.is(b,V)?[0][E](b):arguments;return a&&c.is(a,U)&&d.length-1&&(a=a.replace(y,function(a,b){return null==d[++b]?G:d[b]})),a||G},c.fullfill=function(){var a=/\{([^\}]+)\}/g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,c=function(a,c,d){var e=d;return c.replace(b,function(a,b,c,d,f){b=b||d,e&&(b in e&&(e=e[b]),"function"==typeof e&&f&&(e=e()))}),e=(null==e||e==d?a:e)+""};return function(b,d){return String(b).replace(a,function(a,b){return c(a,b,d)})}}(),c.ninja=function(){return B.was?A.win.Raphael=B.is:delete Raphael,c},c.st=nc,function(a,b,d){function e(){/in/.test(a.readyState)?setTimeout(e,9):c.eve("raphael.DOMload")}null==a.readyState&&a.addEventListener&&(a.addEventListener(b,d=function(){a.removeEventListener(b,d,!1),a.readyState="complete"},!1),a.readyState="loading"),e()}(document,"DOMContentLoaded"),b.on("raphael.DOMload",function(){u=!0}),function(){if(c.svg){var a="hasOwnProperty",b=String,d=parseFloat,e=parseInt,f=Math,g=f.max,h=f.abs,i=f.pow,j=/[, ]+/,k=c.eve,l="",m=" ",n="http://www.w3.org/1999/xlink",o={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},p={};c.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var q=function(d,e){if(e){"string"==typeof d&&(d=q(d));for(var f in e)e[a](f)&&("xlink:"==f.substring(0,6)?d.setAttributeNS(n,f.substring(6),b(e[f])):d.setAttribute(f,b(e[f])))}else d=c._g.doc.createElementNS("http://www.w3.org/2000/svg",d),d.style&&(d.style.webkitTapHighlightColor="rgba(0,0,0,0)");return d},r=function(a,e){var j="linear",k=a.id+e,m=.5,n=.5,o=a.node,p=a.paper,r=o.style,s=c._g.doc.getElementById(k);if(!s){if(e=b(e).replace(c._radial_gradient,function(a,b,c){if(j="radial",b&&c){m=d(b),n=d(c);var e=2*(n>.5)-1;i(m-.5,2)+i(n-.5,2)>.25&&(n=f.sqrt(.25-i(m-.5,2))*e+.5)&&.5!=n&&(n=n.toFixed(5)-1e-5*e)}return l}),e=e.split(/\s*\-\s*/),"linear"==j){var t=e.shift();if(t=-d(t),isNaN(t))return null;var u=[0,0,f.cos(c.rad(t)),f.sin(c.rad(t))],v=1/(g(h(u[2]),h(u[3]))||1);u[2]*=v,u[3]*=v,u[2]<0&&(u[0]=-u[2],u[2]=0),u[3]<0&&(u[1]=-u[3],u[3]=0)}var w=c._parseDots(e);if(!w)return null;if(k=k.replace(/[\(\)\s,\xb0#]/g,"_"),a.gradient&&k!=a.gradient.id&&(p.defs.removeChild(a.gradient),delete a.gradient),!a.gradient){s=q(j+"Gradient",{id:k}),a.gradient=s,q(s,"radial"==j?{fx:m,fy:n}:{x1:u[0],y1:u[1],x2:u[2],y2:u[3],gradientTransform:a.matrix.invert()}),p.defs.appendChild(s);for(var x=0,y=w.length;y>x;x++)s.appendChild(q("stop",{offset:w[x].offset?w[x].offset:x?"100%":"0%","stop-color":w[x].color||"#fff"}))}}return q(o,{fill:"url(#"+k+")",opacity:1,"fill-opacity":1}),r.fill=l,r.opacity=1,r.fillOpacity=1,1},s=function(a){var b=a.getBBox(1);q(a.pattern,{patternTransform:a.matrix.invert()+" translate("+b.x+","+b.y+")"})},t=function(d,e,f){if("path"==d.type){for(var g,h,i,j,k,m=b(e).toLowerCase().split("-"),n=d.paper,r=f?"end":"start",s=d.node,t=d.attrs,u=t["stroke-width"],v=m.length,w="classic",x=3,y=3,z=5;v--;)switch(m[v]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":w=m[v];break;case"wide":y=5;break;case"narrow":y=2;break;case"long":x=5;break;case"short":x=2}if("open"==w?(x+=2,y+=2,z+=2,i=1,j=f?4:1,k={fill:"none",stroke:t.stroke}):(j=i=x/2,k={fill:t.stroke,stroke:"none"}),d._.arrows?f?(d._.arrows.endPath&&p[d._.arrows.endPath]--,d._.arrows.endMarker&&p[d._.arrows.endMarker]--):(d._.arrows.startPath&&p[d._.arrows.startPath]--,d._.arrows.startMarker&&p[d._.arrows.startMarker]--):d._.arrows={},"none"!=w){var A="raphael-marker-"+w,B="raphael-marker-"+r+w+x+y;c._g.doc.getElementById(A)?p[A]++:(n.defs.appendChild(q(q("path"),{"stroke-linecap":"round",d:o[w],id:A})),p[A]=1);var C,D=c._g.doc.getElementById(B);D?(p[B]++,C=D.getElementsByTagName("use")[0]):(D=q(q("marker"),{id:B,markerHeight:y,markerWidth:x,orient:"auto",refX:j,refY:y/2}),C=q(q("use"),{"xlink:href":"#"+A,transform:(f?"rotate(180 "+x/2+" "+y/2+") ":l)+"scale("+x/z+","+y/z+")","stroke-width":(1/((x/z+y/z)/2)).toFixed(4)}),D.appendChild(C),n.defs.appendChild(D),p[B]=1),q(C,k);var E=i*("diamond"!=w&&"oval"!=w);f?(g=d._.arrows.startdx*u||0,h=c.getTotalLength(t.path)-E*u):(g=E*u,h=c.getTotalLength(t.path)-(d._.arrows.enddx*u||0)),k={},k["marker-"+r]="url(#"+B+")",(h||g)&&(k.d=c.getSubpath(t.path,g,h)),q(s,k),d._.arrows[r+"Path"]=A,d._.arrows[r+"Marker"]=B,d._.arrows[r+"dx"]=E,d._.arrows[r+"Type"]=w,d._.arrows[r+"String"]=e}else f?(g=d._.arrows.startdx*u||0,h=c.getTotalLength(t.path)-g):(g=0,h=c.getTotalLength(t.path)-(d._.arrows.enddx*u||0)),d._.arrows[r+"Path"]&&q(s,{d:c.getSubpath(t.path,g,h)}),delete d._.arrows[r+"Path"],delete d._.arrows[r+"Marker"],delete d._.arrows[r+"dx"],delete d._.arrows[r+"Type"],delete d._.arrows[r+"String"];for(k in p)if(p[a](k)&&!p[k]){var F=c._g.doc.getElementById(k);F&&F.parentNode.removeChild(F)}}},u={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},v=function(a,c,d){if(c=u[b(c).toLowerCase()]){for(var e=a.attrs["stroke-width"]||"1",f={round:e,square:e,butt:0}[a.attrs["stroke-linecap"]||d["stroke-linecap"]]||0,g=[],h=c.length;h--;)g[h]=c[h]*e+(h%2?1:-1)*f;q(a.node,{"stroke-dasharray":g.join(",")})}},w=function(d,f){var i=d.node,k=d.attrs,m=i.style.visibility;i.style.visibility="hidden";for(var o in f)if(f[a](o)){if(!c._availableAttrs[a](o))continue;var p=f[o];switch(k[o]=p,o){case"blur":d.blur(p);break;case"title":var u=i.getElementsByTagName("title");if(u.length&&(u=u[0]))u.firstChild.nodeValue=p;else{u=q("title");var w=c._g.doc.createTextNode(p);u.appendChild(w),i.appendChild(u)}break;case"href":case"target":var x=i.parentNode;if("a"!=x.tagName.toLowerCase()){var z=q("a");x.insertBefore(z,i),z.appendChild(i),x=z}"target"==o?x.setAttributeNS(n,"show","blank"==p?"new":p):x.setAttributeNS(n,o,p);break;case"cursor":i.style.cursor=p;break;case"transform":d.transform(p);break;case"arrow-start":t(d,p);break;case"arrow-end":t(d,p,1);break;case"clip-rect":var A=b(p).split(j);if(4==A.length){d.clip&&d.clip.parentNode.parentNode.removeChild(d.clip.parentNode);var B=q("clipPath"),C=q("rect");B.id=c.createUUID(),q(C,{x:A[0],y:A[1],width:A[2],height:A[3]}),B.appendChild(C),d.paper.defs.appendChild(B),q(i,{"clip-path":"url(#"+B.id+")"}),d.clip=C}if(!p){var D=i.getAttribute("clip-path");if(D){var E=c._g.doc.getElementById(D.replace(/(^url\(#|\)$)/g,l));E&&E.parentNode.removeChild(E),q(i,{"clip-path":l}),delete d.clip}}break;case"path":"path"==d.type&&(q(i,{d:p?k.path=c._pathToAbsolute(p):"M0,0"}),d._.dirty=1,d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1)));break;case"width":if(i.setAttribute(o,p),d._.dirty=1,!k.fx)break;o="x",p=k.x;case"x":k.fx&&(p=-k.x-(k.width||0));case"rx":if("rx"==o&&"rect"==d.type)break;case"cx":i.setAttribute(o,p),d.pattern&&s(d),d._.dirty=1;break;case"height":if(i.setAttribute(o,p),d._.dirty=1,!k.fy)break;o="y",p=k.y;case"y":k.fy&&(p=-k.y-(k.height||0));case"ry":if("ry"==o&&"rect"==d.type)break;case"cy":i.setAttribute(o,p),d.pattern&&s(d),d._.dirty=1;break;case"r":"rect"==d.type?q(i,{rx:p,ry:p}):i.setAttribute(o,p),d._.dirty=1;break;case"src":"image"==d.type&&i.setAttributeNS(n,"href",p);break;case"stroke-width":(1!=d._.sx||1!=d._.sy)&&(p/=g(h(d._.sx),h(d._.sy))||1),d.paper._vbSize&&(p*=d.paper._vbSize),i.setAttribute(o,p),k["stroke-dasharray"]&&v(d,k["stroke-dasharray"],f),d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1));break;case"stroke-dasharray":v(d,p,f);break;case"fill":var F=b(p).match(c._ISURL);if(F){B=q("pattern");var G=q("image");B.id=c.createUUID(),q(B,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),q(G,{x:0,y:0,"xlink:href":F[1]}),B.appendChild(G),function(a){c._preload(F[1],function(){var b=this.offsetWidth,c=this.offsetHeight;q(a,{width:b,height:c}),q(G,{width:b,height:c}),d.paper.safari()})}(B),d.paper.defs.appendChild(B),q(i,{fill:"url(#"+B.id+")"}),d.pattern=B,d.pattern&&s(d);break}var H=c.getRGB(p);if(H.error){if(("circle"==d.type||"ellipse"==d.type||"r"!=b(p).charAt())&&r(d,p)){if("opacity"in k||"fill-opacity"in k){var I=c._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g,l));if(I){var J=I.getElementsByTagName("stop");q(J[J.length-1],{"stop-opacity":("opacity"in k?k.opacity:1)*("fill-opacity"in k?k["fill-opacity"]:1)})}}k.gradient=p,k.fill="none";break}}else delete f.gradient,delete k.gradient,!c.is(k.opacity,"undefined")&&c.is(f.opacity,"undefined")&&q(i,{opacity:k.opacity}),!c.is(k["fill-opacity"],"undefined")&&c.is(f["fill-opacity"],"undefined")&&q(i,{"fill-opacity":k["fill-opacity"]});H[a]("opacity")&&q(i,{"fill-opacity":H.opacity>1?H.opacity/100:H.opacity});case"stroke":H=c.getRGB(p),i.setAttribute(o,H.hex),"stroke"==o&&H[a]("opacity")&&q(i,{"stroke-opacity":H.opacity>1?H.opacity/100:H.opacity}),"stroke"==o&&d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1));break;case"gradient":("circle"==d.type||"ellipse"==d.type||"r"!=b(p).charAt())&&r(d,p);break;case"opacity":k.gradient&&!k[a]("stroke-opacity")&&q(i,{"stroke-opacity":p>1?p/100:p});case"fill-opacity":if(k.gradient){I=c._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g,l)),I&&(J=I.getElementsByTagName("stop"),q(J[J.length-1],{"stop-opacity":p}));break}default:"font-size"==o&&(p=e(p,10)+"px");var K=o.replace(/(\-.)/g,function(a){return a.substring(1).toUpperCase()});i.style[K]=p,d._.dirty=1,i.setAttribute(o,p)}}y(d,f),i.style.visibility=m},x=1.2,y=function(d,f){if("text"==d.type&&(f[a]("text")||f[a]("font")||f[a]("font-size")||f[a]("x")||f[a]("y"))){var g=d.attrs,h=d.node,i=h.firstChild?e(c._g.doc.defaultView.getComputedStyle(h.firstChild,l).getPropertyValue("font-size"),10):10;
if(f[a]("text")){for(g.text=f.text;h.firstChild;)h.removeChild(h.firstChild);for(var j,k=b(f.text).split("\n"),m=[],n=0,o=k.length;o>n;n++)j=q("tspan"),n&&q(j,{dy:i*x,x:g.x}),j.appendChild(c._g.doc.createTextNode(k[n])),h.appendChild(j),m[n]=j}else for(m=h.getElementsByTagName("tspan"),n=0,o=m.length;o>n;n++)n?q(m[n],{dy:i*x,x:g.x}):q(m[0],{dy:0});q(h,{x:g.x,y:g.y}),d._.dirty=1;var p=d._getBBox(),r=g.y-(p.y+p.height/2);r&&c.is(r,"finite")&&q(m[0],{dy:r})}},z=function(a,b){this[0]=this.node=a,a.raphael=!0,this.id=c._oid++,a.raphaelid=this.id,this.matrix=c.matrix(),this.realPath=null,this.paper=b,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!b.bottom&&(b.bottom=this),this.prev=b.top,b.top&&(b.top.next=this),b.top=this,this.next=null},A=c.el;z.prototype=A,A.constructor=z,c._engine.path=function(a,b){var c=q("path");b.canvas&&b.canvas.appendChild(c);var d=new z(c,b);return d.type="path",w(d,{fill:"none",stroke:"#000",path:a}),d},A.rotate=function(a,c,e){if(this.removed)return this;if(a=b(a).split(j),a.length-1&&(c=d(a[1]),e=d(a[2])),a=d(a[0]),null==e&&(c=e),null==c||null==e){var f=this.getBBox(1);c=f.x+f.width/2,e=f.y+f.height/2}return this.transform(this._.transform.concat([["r",a,c,e]])),this},A.scale=function(a,c,e,f){if(this.removed)return this;if(a=b(a).split(j),a.length-1&&(c=d(a[1]),e=d(a[2]),f=d(a[3])),a=d(a[0]),null==c&&(c=a),null==f&&(e=f),null==e||null==f)var g=this.getBBox(1);return e=null==e?g.x+g.width/2:e,f=null==f?g.y+g.height/2:f,this.transform(this._.transform.concat([["s",a,c,e,f]])),this},A.translate=function(a,c){return this.removed?this:(a=b(a).split(j),a.length-1&&(c=d(a[1])),a=d(a[0])||0,c=+c||0,this.transform(this._.transform.concat([["t",a,c]])),this)},A.transform=function(b){var d=this._;if(null==b)return d.transform;if(c._extractTransform(this,b),this.clip&&q(this.clip,{transform:this.matrix.invert()}),this.pattern&&s(this),this.node&&q(this.node,{transform:this.matrix}),1!=d.sx||1!=d.sy){var e=this.attrs[a]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":e})}return this},A.hide=function(){return!this.removed&&this.paper.safari(this.node.style.display="none"),this},A.show=function(){return!this.removed&&this.paper.safari(this.node.style.display=""),this},A.remove=function(){if(!this.removed&&this.node.parentNode){var a=this.paper;a.__set__&&a.__set__.exclude(this),k.unbind("raphael.*.*."+this.id),this.gradient&&a.defs.removeChild(this.gradient),c._tear(this,a),"a"==this.node.parentNode.tagName.toLowerCase()?this.node.parentNode.parentNode.removeChild(this.node.parentNode):this.node.parentNode.removeChild(this.node);for(var b in this)this[b]="function"==typeof this[b]?c._removedFactory(b):null;this.removed=!0}},A._getBBox=function(){if("none"==this.node.style.display){this.show();var a=!0}var b={};try{b=this.node.getBBox()}catch(c){}finally{b=b||{}}return a&&this.hide(),b},A.attr=function(b,d){if(this.removed)return this;if(null==b){var e={};for(var f in this.attrs)this.attrs[a](f)&&(e[f]=this.attrs[f]);return e.gradient&&"none"==e.fill&&(e.fill=e.gradient)&&delete e.gradient,e.transform=this._.transform,e}if(null==d&&c.is(b,"string")){if("fill"==b&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==b)return this._.transform;for(var g=b.split(j),h={},i=0,l=g.length;l>i;i++)b=g[i],h[b]=b in this.attrs?this.attrs[b]:c.is(this.paper.customAttributes[b],"function")?this.paper.customAttributes[b].def:c._availableAttrs[b];return l-1?h:h[g[0]]}if(null==d&&c.is(b,"array")){for(h={},i=0,l=b.length;l>i;i++)h[b[i]]=this.attr(b[i]);return h}if(null!=d){var m={};m[b]=d}else null!=b&&c.is(b,"object")&&(m=b);for(var n in m)k("raphael.attr."+n+"."+this.id,this,m[n]);for(n in this.paper.customAttributes)if(this.paper.customAttributes[a](n)&&m[a](n)&&c.is(this.paper.customAttributes[n],"function")){var o=this.paper.customAttributes[n].apply(this,[].concat(m[n]));this.attrs[n]=m[n];for(var p in o)o[a](p)&&(m[p]=o[p])}return w(this,m),this},A.toFront=function(){if(this.removed)return this;"a"==this.node.parentNode.tagName.toLowerCase()?this.node.parentNode.parentNode.appendChild(this.node.parentNode):this.node.parentNode.appendChild(this.node);var a=this.paper;return a.top!=this&&c._tofront(this,a),this},A.toBack=function(){if(this.removed)return this;var a=this.node.parentNode;"a"==a.tagName.toLowerCase()?a.parentNode.insertBefore(this.node.parentNode,this.node.parentNode.parentNode.firstChild):a.firstChild!=this.node&&a.insertBefore(this.node,this.node.parentNode.firstChild),c._toback(this,this.paper);this.paper;return this},A.insertAfter=function(a){if(this.removed)return this;var b=a.node||a[a.length-1].node;return b.nextSibling?b.parentNode.insertBefore(this.node,b.nextSibling):b.parentNode.appendChild(this.node),c._insertafter(this,a,this.paper),this},A.insertBefore=function(a){if(this.removed)return this;var b=a.node||a[0].node;return b.parentNode.insertBefore(this.node,b),c._insertbefore(this,a,this.paper),this},A.blur=function(a){var b=this;if(0!==+a){var d=q("filter"),e=q("feGaussianBlur");b.attrs.blur=a,d.id=c.createUUID(),q(e,{stdDeviation:+a||1.5}),d.appendChild(e),b.paper.defs.appendChild(d),b._blur=d,q(b.node,{filter:"url(#"+d.id+")"})}else b._blur&&(b._blur.parentNode.removeChild(b._blur),delete b._blur,delete b.attrs.blur),b.node.removeAttribute("filter");return b},c._engine.circle=function(a,b,c,d){var e=q("circle");a.canvas&&a.canvas.appendChild(e);var f=new z(e,a);return f.attrs={cx:b,cy:c,r:d,fill:"none",stroke:"#000"},f.type="circle",q(e,f.attrs),f},c._engine.rect=function(a,b,c,d,e,f){var g=q("rect");a.canvas&&a.canvas.appendChild(g);var h=new z(g,a);return h.attrs={x:b,y:c,width:d,height:e,r:f||0,rx:f||0,ry:f||0,fill:"none",stroke:"#000"},h.type="rect",q(g,h.attrs),h},c._engine.ellipse=function(a,b,c,d,e){var f=q("ellipse");a.canvas&&a.canvas.appendChild(f);var g=new z(f,a);return g.attrs={cx:b,cy:c,rx:d,ry:e,fill:"none",stroke:"#000"},g.type="ellipse",q(f,g.attrs),g},c._engine.image=function(a,b,c,d,e,f){var g=q("image");q(g,{x:c,y:d,width:e,height:f,preserveAspectRatio:"none"}),g.setAttributeNS(n,"href",b),a.canvas&&a.canvas.appendChild(g);var h=new z(g,a);return h.attrs={x:c,y:d,width:e,height:f,src:b},h.type="image",h},c._engine.text=function(a,b,d,e){var f=q("text");a.canvas&&a.canvas.appendChild(f);var g=new z(f,a);return g.attrs={x:b,y:d,"text-anchor":"middle",text:e,font:c._availableAttrs.font,stroke:"none",fill:"#000"},g.type="text",w(g,g.attrs),g},c._engine.setSize=function(a,b){return this.width=a||this.width,this.height=b||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},c._engine.create=function(){var a=c._getContainer.apply(0,arguments),b=a&&a.container,d=a.x,e=a.y,f=a.width,g=a.height;if(!b)throw new Error("SVG container not found.");var h,i=q("svg"),j="overflow:hidden;";return d=d||0,e=e||0,f=f||512,g=g||342,q(i,{height:g,version:1.1,width:f,xmlns:"http://www.w3.org/2000/svg"}),1==b?(i.style.cssText=j+"position:absolute;left:"+d+"px;top:"+e+"px",c._g.doc.body.appendChild(i),h=1):(i.style.cssText=j+"position:relative",b.firstChild?b.insertBefore(i,b.firstChild):b.appendChild(i)),b=new c._Paper,b.width=f,b.height=g,b.canvas=i,b.clear(),b._left=b._top=0,h&&(b.renderfix=function(){}),b.renderfix(),b},c._engine.setViewBox=function(a,b,c,d,e){k("raphael.setViewBox",this,this._viewBox,[a,b,c,d,e]);var f,h,i=g(c/this.width,d/this.height),j=this.top,l=e?"xMidYMid meet":"xMinYMin";for(null==a?(this._vbSize&&(i=1),delete this._vbSize,f="0 0 "+this.width+m+this.height):(this._vbSize=i,f=a+m+b+m+c+m+d),q(this.canvas,{viewBox:f,preserveAspectRatio:l});i&&j;)h="stroke-width"in j.attrs?j.attrs["stroke-width"]:1,j.attr({"stroke-width":h}),j._.dirty=1,j._.dirtyT=1,j=j.prev;return this._viewBox=[a,b,c,d,!!e],this},c.prototype.renderfix=function(){var a,b=this.canvas,c=b.style;try{a=b.getScreenCTM()||b.createSVGMatrix()}catch(d){a=b.createSVGMatrix()}var e=-a.e%1,f=-a.f%1;(e||f)&&(e&&(this._left=(this._left+e)%1,c.left=this._left+"px"),f&&(this._top=(this._top+f)%1,c.top=this._top+"px"))},c.prototype.clear=function(){c.eve("raphael.clear",this);for(var a=this.canvas;a.firstChild;)a.removeChild(a.firstChild);this.bottom=this.top=null,(this.desc=q("desc")).appendChild(c._g.doc.createTextNode("Created with Raphaël "+c.version)),a.appendChild(this.desc),a.appendChild(this.defs=q("defs"))},c.prototype.remove=function(){k("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var a in this)this[a]="function"==typeof this[a]?c._removedFactory(a):null};var B=c.st;for(var C in A)A[a](C)&&!B[a](C)&&(B[C]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a].apply(c,b)})}}(C))}}(),function(){if(c.vml){var a="hasOwnProperty",b=String,d=parseFloat,e=Math,f=e.round,g=e.max,h=e.min,i=e.abs,j="fill",k=/[, ]+/,l=c.eve,m=" progid:DXImageTransform.Microsoft",n=" ",o="",p={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},q=/([clmz]),?([^clmz]*)/gi,r=/ progid:\S+Blur\([^\)]+\)/g,s=/-?[^,\s-]+/g,t="position:absolute;left:0;top:0;width:1px;height:1px",u=21600,v={path:1,rect:1,image:1},w={circle:1,ellipse:1},x=function(a){var d=/[ahqstv]/gi,e=c._pathToAbsolute;if(b(a).match(d)&&(e=c._path2curve),d=/[clmz]/g,e==c._pathToAbsolute&&!b(a).match(d)){var g=b(a).replace(q,function(a,b,c){var d=[],e="m"==b.toLowerCase(),g=p[b];return c.replace(s,function(a){e&&2==d.length&&(g+=d+p["m"==b?"l":"L"],d=[]),d.push(f(a*u))}),g+d});return g}var h,i,j=e(a);g=[];for(var k=0,l=j.length;l>k;k++){h=j[k],i=j[k][0].toLowerCase(),"z"==i&&(i="x");for(var m=1,r=h.length;r>m;m++)i+=f(h[m]*u)+(m!=r-1?",":o);g.push(i)}return g.join(n)},y=function(a,b,d){var e=c.matrix();return e.rotate(-a,.5,.5),{dx:e.x(b,d),dy:e.y(b,d)}},z=function(a,b,c,d,e,f){var g=a._,h=a.matrix,k=g.fillpos,l=a.node,m=l.style,o=1,p="",q=u/b,r=u/c;if(m.visibility="hidden",b&&c){if(l.coordsize=i(q)+n+i(r),m.rotation=f*(0>b*c?-1:1),f){var s=y(f,d,e);d=s.dx,e=s.dy}if(0>b&&(p+="x"),0>c&&(p+=" y")&&(o=-1),m.flip=p,l.coordorigin=d*-q+n+e*-r,k||g.fillsize){var t=l.getElementsByTagName(j);t=t&&t[0],l.removeChild(t),k&&(s=y(f,h.x(k[0],k[1]),h.y(k[0],k[1])),t.position=s.dx*o+n+s.dy*o),g.fillsize&&(t.size=g.fillsize[0]*i(b)+n+g.fillsize[1]*i(c)),l.appendChild(t)}m.visibility="visible"}};c.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var A=function(a,c,d){for(var e=b(c).toLowerCase().split("-"),f=d?"end":"start",g=e.length,h="classic",i="medium",j="medium";g--;)switch(e[g]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":h=e[g];break;case"wide":case"narrow":j=e[g];break;case"long":case"short":i=e[g]}var k=a.node.getElementsByTagName("stroke")[0];k[f+"arrow"]=h,k[f+"arrowlength"]=i,k[f+"arrowwidth"]=j},B=function(e,i){e.attrs=e.attrs||{};var l=e.node,m=e.attrs,p=l.style,q=v[e.type]&&(i.x!=m.x||i.y!=m.y||i.width!=m.width||i.height!=m.height||i.cx!=m.cx||i.cy!=m.cy||i.rx!=m.rx||i.ry!=m.ry||i.r!=m.r),r=w[e.type]&&(m.cx!=i.cx||m.cy!=i.cy||m.r!=i.r||m.rx!=i.rx||m.ry!=i.ry),s=e;for(var t in i)i[a](t)&&(m[t]=i[t]);if(q&&(m.path=c._getPath[e.type](e),e._.dirty=1),i.href&&(l.href=i.href),i.title&&(l.title=i.title),i.target&&(l.target=i.target),i.cursor&&(p.cursor=i.cursor),"blur"in i&&e.blur(i.blur),(i.path&&"path"==e.type||q)&&(l.path=x(~b(m.path).toLowerCase().indexOf("r")?c._pathToAbsolute(m.path):m.path),"image"==e.type&&(e._.fillpos=[m.x,m.y],e._.fillsize=[m.width,m.height],z(e,1,1,0,0,0))),"transform"in i&&e.transform(i.transform),r){var y=+m.cx,B=+m.cy,D=+m.rx||+m.r||0,E=+m.ry||+m.r||0;l.path=c.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",f((y-D)*u),f((B-E)*u),f((y+D)*u),f((B+E)*u),f(y*u)),e._.dirty=1}if("clip-rect"in i){var G=b(i["clip-rect"]).split(k);if(4==G.length){G[2]=+G[2]+ +G[0],G[3]=+G[3]+ +G[1];var H=l.clipRect||c._g.doc.createElement("div"),I=H.style;I.clip=c.format("rect({1}px {2}px {3}px {0}px)",G),l.clipRect||(I.position="absolute",I.top=0,I.left=0,I.width=e.paper.width+"px",I.height=e.paper.height+"px",l.parentNode.insertBefore(H,l),H.appendChild(l),l.clipRect=H)}i["clip-rect"]||l.clipRect&&(l.clipRect.style.clip="auto")}if(e.textpath){var J=e.textpath.style;i.font&&(J.font=i.font),i["font-family"]&&(J.fontFamily='"'+i["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,o)+'"'),i["font-size"]&&(J.fontSize=i["font-size"]),i["font-weight"]&&(J.fontWeight=i["font-weight"]),i["font-style"]&&(J.fontStyle=i["font-style"])}if("arrow-start"in i&&A(s,i["arrow-start"]),"arrow-end"in i&&A(s,i["arrow-end"],1),null!=i.opacity||null!=i["stroke-width"]||null!=i.fill||null!=i.src||null!=i.stroke||null!=i["stroke-width"]||null!=i["stroke-opacity"]||null!=i["fill-opacity"]||null!=i["stroke-dasharray"]||null!=i["stroke-miterlimit"]||null!=i["stroke-linejoin"]||null!=i["stroke-linecap"]){var K=l.getElementsByTagName(j),L=!1;if(K=K&&K[0],!K&&(L=K=F(j)),"image"==e.type&&i.src&&(K.src=i.src),i.fill&&(K.on=!0),(null==K.on||"none"==i.fill||null===i.fill)&&(K.on=!1),K.on&&i.fill){var M=b(i.fill).match(c._ISURL);if(M){K.parentNode==l&&l.removeChild(K),K.rotate=!0,K.src=M[1],K.type="tile";var N=e.getBBox(1);K.position=N.x+n+N.y,e._.fillpos=[N.x,N.y],c._preload(M[1],function(){e._.fillsize=[this.offsetWidth,this.offsetHeight]})}else K.color=c.getRGB(i.fill).hex,K.src=o,K.type="solid",c.getRGB(i.fill).error&&(s.type in{circle:1,ellipse:1}||"r"!=b(i.fill).charAt())&&C(s,i.fill,K)&&(m.fill="none",m.gradient=i.fill,K.rotate=!1)}if("fill-opacity"in i||"opacity"in i){var O=((+m["fill-opacity"]+1||2)-1)*((+m.opacity+1||2)-1)*((+c.getRGB(i.fill).o+1||2)-1);O=h(g(O,0),1),K.opacity=O,K.src&&(K.color="none")}l.appendChild(K);var P=l.getElementsByTagName("stroke")&&l.getElementsByTagName("stroke")[0],Q=!1;!P&&(Q=P=F("stroke")),(i.stroke&&"none"!=i.stroke||i["stroke-width"]||null!=i["stroke-opacity"]||i["stroke-dasharray"]||i["stroke-miterlimit"]||i["stroke-linejoin"]||i["stroke-linecap"])&&(P.on=!0),("none"==i.stroke||null===i.stroke||null==P.on||0==i.stroke||0==i["stroke-width"])&&(P.on=!1);var R=c.getRGB(i.stroke);P.on&&i.stroke&&(P.color=R.hex),O=((+m["stroke-opacity"]+1||2)-1)*((+m.opacity+1||2)-1)*((+R.o+1||2)-1);var S=.75*(d(i["stroke-width"])||1);if(O=h(g(O,0),1),null==i["stroke-width"]&&(S=m["stroke-width"]),i["stroke-width"]&&(P.weight=S),S&&1>S&&(O*=S)&&(P.weight=1),P.opacity=O,i["stroke-linejoin"]&&(P.joinstyle=i["stroke-linejoin"]||"miter"),P.miterlimit=i["stroke-miterlimit"]||8,i["stroke-linecap"]&&(P.endcap="butt"==i["stroke-linecap"]?"flat":"square"==i["stroke-linecap"]?"square":"round"),"stroke-dasharray"in i){var T={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};P.dashstyle=T[a](i["stroke-dasharray"])?T[i["stroke-dasharray"]]:o}Q&&l.appendChild(P)}if("text"==s.type){s.paper.canvas.style.display=o;var U=s.paper.span,V=100,W=m.font&&m.font.match(/\d+(?:\.\d*)?(?=px)/);p=U.style,m.font&&(p.font=m.font),m["font-family"]&&(p.fontFamily=m["font-family"]),m["font-weight"]&&(p.fontWeight=m["font-weight"]),m["font-style"]&&(p.fontStyle=m["font-style"]),W=d(m["font-size"]||W&&W[0])||10,p.fontSize=W*V+"px",s.textpath.string&&(U.innerHTML=b(s.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var X=U.getBoundingClientRect();s.W=m.w=(X.right-X.left)/V,s.H=m.h=(X.bottom-X.top)/V,s.X=m.x,s.Y=m.y+s.H/2,("x"in i||"y"in i)&&(s.path.v=c.format("m{0},{1}l{2},{1}",f(m.x*u),f(m.y*u),f(m.x*u)+1));for(var Y=["x","y","text","font","font-family","font-weight","font-style","font-size"],Z=0,$=Y.length;$>Z;Z++)if(Y[Z]in i){s._.dirty=1;break}switch(m["text-anchor"]){case"start":s.textpath.style["v-text-align"]="left",s.bbx=s.W/2;break;case"end":s.textpath.style["v-text-align"]="right",s.bbx=-s.W/2;break;default:s.textpath.style["v-text-align"]="center",s.bbx=0}s.textpath.style["v-text-kern"]=!0}},C=function(a,f,g){a.attrs=a.attrs||{};var h=(a.attrs,Math.pow),i="linear",j=".5 .5";if(a.attrs.gradient=f,f=b(f).replace(c._radial_gradient,function(a,b,c){return i="radial",b&&c&&(b=d(b),c=d(c),h(b-.5,2)+h(c-.5,2)>.25&&(c=e.sqrt(.25-h(b-.5,2))*(2*(c>.5)-1)+.5),j=b+n+c),o}),f=f.split(/\s*\-\s*/),"linear"==i){var k=f.shift();if(k=-d(k),isNaN(k))return null}var l=c._parseDots(f);if(!l)return null;if(a=a.shape||a.node,l.length){a.removeChild(g),g.on=!0,g.method="none",g.color=l[0].color,g.color2=l[l.length-1].color;for(var m=[],p=0,q=l.length;q>p;p++)l[p].offset&&m.push(l[p].offset+n+l[p].color);g.colors=m.length?m.join():"0% "+g.color,"radial"==i?(g.type="gradientTitle",g.focus="100%",g.focussize="0 0",g.focusposition=j,g.angle=0):(g.type="gradient",g.angle=(270-k)%360),a.appendChild(g)}return 1},D=function(a,b){this[0]=this.node=a,a.raphael=!0,this.id=c._oid++,a.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=b,this.matrix=c.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!b.bottom&&(b.bottom=this),this.prev=b.top,b.top&&(b.top.next=this),b.top=this,this.next=null},E=c.el;D.prototype=E,E.constructor=D,E.transform=function(a){if(null==a)return this._.transform;var d,e=this.paper._viewBoxShift,f=e?"s"+[e.scale,e.scale]+"-1-1t"+[e.dx,e.dy]:o;e&&(d=a=b(a).replace(/\.{3}|\u2026/g,this._.transform||o)),c._extractTransform(this,f+a);var g,h=this.matrix.clone(),i=this.skew,j=this.node,k=~b(this.attrs.fill).indexOf("-"),l=!b(this.attrs.fill).indexOf("url(");if(h.translate(1,1),l||k||"image"==this.type)if(i.matrix="1 0 0 1",i.offset="0 0",g=h.split(),k&&g.noRotation||!g.isSimple){j.style.filter=h.toFilter();var m=this.getBBox(),p=this.getBBox(1),q=m.x-p.x,r=m.y-p.y;j.coordorigin=q*-u+n+r*-u,z(this,1,1,q,r,0)}else j.style.filter=o,z(this,g.scalex,g.scaley,g.dx,g.dy,g.rotate);else j.style.filter=o,i.matrix=b(h),i.offset=h.offset();return d&&(this._.transform=d),this},E.rotate=function(a,c,e){if(this.removed)return this;if(null!=a){if(a=b(a).split(k),a.length-1&&(c=d(a[1]),e=d(a[2])),a=d(a[0]),null==e&&(c=e),null==c||null==e){var f=this.getBBox(1);c=f.x+f.width/2,e=f.y+f.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",a,c,e]])),this}},E.translate=function(a,c){return this.removed?this:(a=b(a).split(k),a.length-1&&(c=d(a[1])),a=d(a[0])||0,c=+c||0,this._.bbox&&(this._.bbox.x+=a,this._.bbox.y+=c),this.transform(this._.transform.concat([["t",a,c]])),this)},E.scale=function(a,c,e,f){if(this.removed)return this;if(a=b(a).split(k),a.length-1&&(c=d(a[1]),e=d(a[2]),f=d(a[3]),isNaN(e)&&(e=null),isNaN(f)&&(f=null)),a=d(a[0]),null==c&&(c=a),null==f&&(e=f),null==e||null==f)var g=this.getBBox(1);return e=null==e?g.x+g.width/2:e,f=null==f?g.y+g.height/2:f,this.transform(this._.transform.concat([["s",a,c,e,f]])),this._.dirtyT=1,this},E.hide=function(){return!this.removed&&(this.node.style.display="none"),this},E.show=function(){return!this.removed&&(this.node.style.display=o),this},E._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},E.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),c.eve.unbind("raphael.*.*."+this.id),c._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var a in this)this[a]="function"==typeof this[a]?c._removedFactory(a):null;this.removed=!0}},E.attr=function(b,d){if(this.removed)return this;if(null==b){var e={};for(var f in this.attrs)this.attrs[a](f)&&(e[f]=this.attrs[f]);return e.gradient&&"none"==e.fill&&(e.fill=e.gradient)&&delete e.gradient,e.transform=this._.transform,e}if(null==d&&c.is(b,"string")){if(b==j&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var g=b.split(k),h={},i=0,m=g.length;m>i;i++)b=g[i],h[b]=b in this.attrs?this.attrs[b]:c.is(this.paper.customAttributes[b],"function")?this.paper.customAttributes[b].def:c._availableAttrs[b];return m-1?h:h[g[0]]}if(this.attrs&&null==d&&c.is(b,"array")){for(h={},i=0,m=b.length;m>i;i++)h[b[i]]=this.attr(b[i]);return h}var n;null!=d&&(n={},n[b]=d),null==d&&c.is(b,"object")&&(n=b);for(var o in n)l("raphael.attr."+o+"."+this.id,this,n[o]);if(n){for(o in this.paper.customAttributes)if(this.paper.customAttributes[a](o)&&n[a](o)&&c.is(this.paper.customAttributes[o],"function")){var p=this.paper.customAttributes[o].apply(this,[].concat(n[o]));this.attrs[o]=n[o];for(var q in p)p[a](q)&&(n[q]=p[q])}n.text&&"text"==this.type&&(this.textpath.string=n.text),B(this,n)}return this},E.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&c._tofront(this,this.paper),this},E.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),c._toback(this,this.paper)),this)},E.insertAfter=function(a){return this.removed?this:(a.constructor==c.st.constructor&&(a=a[a.length-1]),a.node.nextSibling?a.node.parentNode.insertBefore(this.node,a.node.nextSibling):a.node.parentNode.appendChild(this.node),c._insertafter(this,a,this.paper),this)},E.insertBefore=function(a){return this.removed?this:(a.constructor==c.st.constructor&&(a=a[0]),a.node.parentNode.insertBefore(this.node,a.node),c._insertbefore(this,a,this.paper),this)},E.blur=function(a){var b=this.node.runtimeStyle,d=b.filter;return d=d.replace(r,o),0!==+a?(this.attrs.blur=a,b.filter=d+n+m+".Blur(pixelradius="+(+a||1.5)+")",b.margin=c.format("-{0}px 0 0 -{0}px",f(+a||1.5))):(b.filter=d,b.margin=0,delete this.attrs.blur),this},c._engine.path=function(a,b){var c=F("shape");c.style.cssText=t,c.coordsize=u+n+u,c.coordorigin=b.coordorigin;var d=new D(c,b),e={fill:"none",stroke:"#000"};a&&(e.path=a),d.type="path",d.path=[],d.Path=o,B(d,e),b.canvas.appendChild(c);var f=F("skew");return f.on=!0,c.appendChild(f),d.skew=f,d.transform(o),d},c._engine.rect=function(a,b,d,e,f,g){var h=c._rectPath(b,d,e,f,g),i=a.path(h),j=i.attrs;return i.X=j.x=b,i.Y=j.y=d,i.W=j.width=e,i.H=j.height=f,j.r=g,j.path=h,i.type="rect",i},c._engine.ellipse=function(a,b,c,d,e){{var f=a.path();f.attrs}return f.X=b-d,f.Y=c-e,f.W=2*d,f.H=2*e,f.type="ellipse",B(f,{cx:b,cy:c,rx:d,ry:e}),f},c._engine.circle=function(a,b,c,d){{var e=a.path();e.attrs}return e.X=b-d,e.Y=c-d,e.W=e.H=2*d,e.type="circle",B(e,{cx:b,cy:c,r:d}),e},c._engine.image=function(a,b,d,e,f,g){var h=c._rectPath(d,e,f,g),i=a.path(h).attr({stroke:"none"}),k=i.attrs,l=i.node,m=l.getElementsByTagName(j)[0];return k.src=b,i.X=k.x=d,i.Y=k.y=e,i.W=k.width=f,i.H=k.height=g,k.path=h,i.type="image",m.parentNode==l&&l.removeChild(m),m.rotate=!0,m.src=b,m.type="tile",i._.fillpos=[d,e],i._.fillsize=[f,g],l.appendChild(m),z(i,1,1,0,0,0),i},c._engine.text=function(a,d,e,g){var h=F("shape"),i=F("path"),j=F("textpath");d=d||0,e=e||0,g=g||"",i.v=c.format("m{0},{1}l{2},{1}",f(d*u),f(e*u),f(d*u)+1),i.textpathok=!0,j.string=b(g),j.on=!0,h.style.cssText=t,h.coordsize=u+n+u,h.coordorigin="0 0";var k=new D(h,a),l={fill:"#000",stroke:"none",font:c._availableAttrs.font,text:g};k.shape=h,k.path=i,k.textpath=j,k.type="text",k.attrs.text=b(g),k.attrs.x=d,k.attrs.y=e,k.attrs.w=1,k.attrs.h=1,B(k,l),h.appendChild(j),h.appendChild(i),a.canvas.appendChild(h);var m=F("skew");return m.on=!0,h.appendChild(m),k.skew=m,k.transform(o),k},c._engine.setSize=function(a,b){var d=this.canvas.style;return this.width=a,this.height=b,a==+a&&(a+="px"),b==+b&&(b+="px"),d.width=a,d.height=b,d.clip="rect(0 "+a+" "+b+" 0)",this._viewBox&&c._engine.setViewBox.apply(this,this._viewBox),this},c._engine.setViewBox=function(a,b,d,e,f){c.eve("raphael.setViewBox",this,this._viewBox,[a,b,d,e,f]);var h,i,j=this.width,k=this.height,l=1/g(d/j,e/k);return f&&(h=k/e,i=j/d,j>d*h&&(a-=(j-d*h)/2/h),k>e*i&&(b-=(k-e*i)/2/i)),this._viewBox=[a,b,d,e,!!f],this._viewBoxShift={dx:-a,dy:-b,scale:l},this.forEach(function(a){a.transform("...")}),this};var F;c._engine.initWin=function(a){var b=a.document;b.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!b.namespaces.rvml&&b.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),F=function(a){return b.createElement("<rvml:"+a+' class="rvml">')}}catch(c){F=function(a){return b.createElement("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},c._engine.initWin(c._g.win),c._engine.create=function(){var a=c._getContainer.apply(0,arguments),b=a.container,d=a.height,e=a.width,f=a.x,g=a.y;if(!b)throw new Error("VML container not found.");var h=new c._Paper,i=h.canvas=c._g.doc.createElement("div"),j=i.style;return f=f||0,g=g||0,e=e||512,d=d||342,h.width=e,h.height=d,e==+e&&(e+="px"),d==+d&&(d+="px"),h.coordsize=1e3*u+n+1e3*u,h.coordorigin="0 0",h.span=c._g.doc.createElement("span"),h.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",i.appendChild(h.span),j.cssText=c.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",e,d),1==b?(c._g.doc.body.appendChild(i),j.left=f+"px",j.top=g+"px",j.position="absolute"):b.firstChild?b.insertBefore(i,b.firstChild):b.appendChild(i),h.renderfix=function(){},h},c.prototype.clear=function(){c.eve("raphael.clear",this),this.canvas.innerHTML=o,this.span=c._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},c.prototype.remove=function(){c.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var a in this)this[a]="function"==typeof this[a]?c._removedFactory(a):null;return!0};var G=c.st;for(var H in E)E[a](H)&&!G[a](H)&&(G[H]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a].apply(c,b)})}}(H))}}(),B.was?A.win.Raphael=c:Raphael=c,c});

/*====================================================*/
/* FILE /plugins/spam-captcha/js/elycharts.min.js*/
/*====================================================*/
/*!*********************************************************************
 * ELYCHARTS v2.1.5-SNAPSHOT $Id: elycharts.min.js 95 2014-02-06 22:01:29Z stefano.bagnara@gmail.com $ 
 * A Javascript library to generate interactive charts with vectorial graphics.
 *
 * Copyright (c) 2010-2014 Void Labs s.n.c. (http://void.it)
 * Licensed under the MIT (http://creativecommons.org/licenses/MIT/) license.
 **********************************************************************/
(function(a){if(!a.elycharts){a.elycharts={}}a.elycharts.templates={common:{margins:[10,10,10,10],interactive:true,defaultSeries:{visible:true,tooltip:{active:true,width:100,height:50,roundedCorners:5,padding:[6,6],offset:[20,0],frameProps:{fill:"white","stroke-width":2},contentStyle:{"font-family":"Arial","font-size":"12px","line-height":"16px",color:"black"}},highlight:{scaleSpeed:100,scaleEasing:"",moveSpeed:100,moveEasing:"",restoreSpeed:0,restoreEasing:""},anchor:{},startAnimation:{type:"simple",speed:600,delay:0,propsFrom:{},propsTo:{},easing:""},label:{active:false,html:false,props:{fill:"black",stroke:"none","font-family":"Arial","font-size":"16px"},style:{cursor:"default"}}},series:{empty:{label:{active:false},tooltip:{active:false}}},features:{tooltip:{fadeDelay:100,moveDelay:300},mousearea:{type:"single",indexCenter:"auto",areaMoveDelay:500,syncTag:false,onMouseEnter:false,onMouseExit:false,onMouseChanged:false,onMouseOver:false,onMouseOut:false},highlight:{indexHighlightProps:{opacity:1}},animation:{startAnimation:{speed:600,delay:0,easing:""},stepAnimation:{speed:600,delay:0,easing:""}},frameAnimation:{active:false,cssFrom:{opacity:0},cssTo:{opacity:1},speed:"slow",easing:"linear"},pixelWorkAround:{active:Raphael.svg},label:{},shadows:{active:false,offset:[2,2],props:{"stroke-width":0,"stroke-opacity":0,fill:"black","fill-opacity":0.3}},balloons:{active:false,style:{},padding:[5,5],left:10,line:[[0,0],[0,0]],lineProps:{}},legend:{horizontal:false,x:"auto",y:10,width:"auto",height:20,itemWidth:"fixed",margins:[0,0,0,0],dotMargins:[10,5],borderProps:{fill:"white",stroke:"black","stroke-width":1},dotType:"rect",dotWidth:10,dotHeight:10,dotR:4,dotProps:{type:"rect",width:10,height:10},textProps:{font:"12px Arial",fill:"#000"}},debug:{active:false}},enableInternalCaching:true,nop:0},line:{template:"common",barMargins:0,barOverlapPerc:0,avgOverNulls:true,defaultAxis:{normalize:2,min:0,labels:false,labelsDistance:8,labelsRotate:0,labelsProps:{font:"10px Arial",fill:"#000"},titleDistance:25,titleDistanceIE:0.75,titleProps:{font:"12px Arial",fill:"#000","font-weight":"bold"}},axis:{x:{titleDistanceIE:1.2}},defaultSeries:{type:"line",axis:"l",cumulative:false,rounded:1,lineCenter:"auto",plotProps:{"stroke-width":1,"stroke-linejoin":"round"},barWidthPerc:100,fill:false,fillProps:{stroke:"none","stroke-width":0,"stroke-opacity":0,opacity:0.3},dot:false,dotProps:{size:4,stroke:"#000",zindex:5},dotShowOnNull:false,mouseareaShowOnNull:false,startAnimation:{plotPropsFrom:false,fillPropsFrom:false,dotPropsFrom:false,shadowPropsFrom:false}},features:{grid:{nx:"auto",ny:4,draw:false,forceBorder:false,props:{stroke:"#e0e0e0","stroke-width":1},extra:[0,0,0,0],labelsCenter:"auto",evenVProps:false,oddVProps:false,evenHProps:false,oddHProps:false,ticks:{active:[false,false,false],size:[10,10],props:{stroke:"#e0e0e0","stroke-width":1}}}},nop:0},pie:{template:"common",startAngle:0,clockwise:false,valueThresold:0.006,margins:[0,0,0,0],defaultSeries:{}},funnel:{template:"common",rh:0,method:"width",topSector:0,topSectorProps:{fill:"#d0d0d0"},bottomSector:0.1,bottomSectorProps:{fill:"#d0d0d0"},edgeProps:{fill:"#c0c0c0","stroke-width":1,opacity:1},nop:0},barline:{template:"common",direction:"ltr"}}})(jQuery);(function(c){if(!c.elycharts){c.elycharts={}}c.elycharts.lastId=0;c.fn.chart=function(j){if(!this.length){return this}var n=this.data("elycharts_env");if(typeof j=="string"){if(j.toLowerCase()=="config"){return n?n.opt:false}if(j.toLowerCase()=="clear"){if(n){if(c.elycharts.featuresmanager){c.elycharts.featuresmanager.clear(n)}n.paper.clear();n.cache=false;if(n.autoresize){c(window).unbind("resize",n.autoresize)}this.html("");this.data("elycharts_env",false)}}return this}if(!n){if(j){j=d(j)}if(!j||!j.type||!c.elycharts.templates[j.type]){alert("ElyCharts ERROR: chart type is not specified");return false}n=i(this,j);this.data("elycharts_env",n)}else{if(!j){j={}}j=b(j,n.opt);n.oldopt=f._clone(n.opt);n.opt=c.extend(true,n.opt,j);n.newopt=j;n.oldwidth=n.width;n.oldheight=n.height}n.cache=j.enableInternalCaching?{}:false;e(n,j);if(n.opt.autoresize){if(!n.autoresize){var m=this;n.autoresize=h(function(){m.chart()});c(window).bind("resize",n.autoresize)}}else{if(n.autoresize){c(window).unbind("resize",n.autoresize);n.autoresize=false}}var l=c.elycharts[n.opt.type].draw(n);if(n.pieces){l=g(n,n.pieces,l)}f._show(n,l);n.pieces=l;return this};function g(t,m,l,u,r,q){var o=[],s;var n=0;for(var p=0;p<m.length;p++){if(l&&(n>=l.length||!f.samePiecePath(m[p],l[n]))){if(!q){m[p].show=false;o.push(m[p])}else{s={path:false,attr:false};s.show=true;s.animation={element:m[p].element?m[p].element:false,speed:0,easing:"",delay:0};o.push(s)}}else{s=l?l[n]:{path:false,attr:false};s.show=true;if(typeof m[p].paths=="undefined"){s.animation={element:m[p].element?m[p].element:false,speed:0,easing:"",delay:0}}else{s.paths=g(t,m[p].paths,l[n].paths,m[p].section,m[p].serie,true)}o.push(s);n++}}if(l){for(;n<l.length;n++){o.push(l[n])}}return o}function h(n,j,l){var o;return function m(){var r=this,q=arguments;function p(){if(!l){n.apply(r,q)}o=null}if(o){clearTimeout(o)}else{if(l){n.apply(r,q)}}o=setTimeout(p,j||100)}}function i(m,j){var l={id:c.elycharts.lastId++,paper:f._RaphaelInstance(m.get()[0],0,0),container:m,plots:[],opt:j};l.paper.rect(0,0,1,1).attr({opacity:0});c.elycharts[j.type].init(l);return l}function e(l,j){if(j.style){l.container.css(j.style)}l.width=j.width?j.width:l.container.width();l.height=j.height?j.height:l.container.height();l.paper.setSize(l.width,l.height)}function d(j){var l;if(c.elysia_charts){if(c.elysia_charts.default_options){for(l in c.elysia_charts.default_options){c.elycharts.templates[l]=c.elysia_charts.default_options[l]}}if(c.elysia_charts.templates){for(l in c.elysia_charts.templates){c.elycharts.templates[l]=c.elysia_charts.templates[l]}}}while(j.template){var m=j.template;delete j.template;j=c.extend(true,{},c.elycharts.templates[m],j)}if(!j.template&&j.type){j.template=j.type;while(j.template){m=j.template;delete j.template;j=c.extend(true,{},c.elycharts.templates[m],j)}}return b(j,j)}function b(j,l){if(j.type=="pie"||j.type=="funnel"){if(j.values&&c.isArray(j.values)&&!c.isArray(j.values[0])){j.values={root:j.values}}if(j.tooltips&&c.isArray(j.tooltips)&&!c.isArray(j.tooltips[0])){j.tooltips={root:j.tooltips}}if(j.anchors&&c.isArray(j.anchors)&&!c.isArray(j.anchors[0])){j.anchors={root:j.anchors}}if(j.balloons&&c.isArray(j.balloons)&&!c.isArray(j.balloons[0])){j.balloons={root:j.balloons}}if(j.legend&&c.isArray(j.legend)&&!c.isArray(j.legend[0])){j.legend={root:j.legend}}}if(j.defaultSeries){var o=j.defaultSeries.type?j.defaultSeries.type:(l.defaultSeries.type?l.defaultSeries.type:l.type);a(j.defaultSeries,l.type,o,l)}if(j.series){for(var n in j.series){var p=j.series[n].type?j.series[n].type:(l.series[n].type?l.series[n].type:(o?o:l.type));a(j.series[n],l.type,p,l)}}if(j.type=="line"){if(!j.features){j.features={}}if(!j.features.grid){j.features.grid={}}if(typeof j.gridNX!="undefined"){j.features.grid.nx=j.gridNX;delete j.gridNX}if(typeof j.gridNY!="undefined"){j.features.grid.ny=j.gridNY;delete j.gridNY}if(typeof j.gridProps!="undefined"){j.features.grid.props=j.gridProps;delete j.gridProps}if(typeof j.gridExtra!="undefined"){j.features.grid.extra=j.gridExtra;delete j.gridExtra}if(typeof j.gridForceBorder!="undefined"){j.features.grid.forceBorder=j.gridForceBorder;delete j.gridForceBorder}if(j.defaultAxis&&j.defaultAxis.normalize&&(j.defaultAxis.normalize=="auto"||j.defaultAxis.normalize=="autony")){j.defaultAxis.normalize=2}if(j.axis){for(var m in j.axis){if(j.axis[m]&&j.axis[m].normalize&&(j.axis[m].normalize=="auto"||j.axis[m].normalize=="autony")){j.axis[m].normalize=2}}}}return j}function a(n,j,l,m){if(n.stackedWith){n.stacked=n.stackedWith;delete n.stackedWith}}c.elycharts.common={_RaphaelInstance:function(n,j,l){var m=Raphael(n,j,l);m.customAttributes.slice=function(o,v,s,q,u,t){a1=360-t;a2=360-u;var p=(a2-a1)>180;a1=(a1%360)*Math.PI/180;a2=(a2%360)*Math.PI/180;if(a1==a2&&u!=t){a2+=359.99*Math.PI/180}return{path:q?[["M",o+s*Math.cos(a1),v+s*Math.sin(a1)],["A",s,s,0,+p,1,o+s*Math.cos(a2),v+s*Math.sin(a2)],["L",o+q*Math.cos(a2),v+q*Math.sin(a2)],["A",q,q,0,+p,0,o+q*Math.cos(a1),v+q*Math.sin(a1)],["z"]]:[["M",o,v],["l",s*Math.cos(a1),s*Math.sin(a1)],["A",s,s,0,+p,1,o+s*Math.cos(a2),v+s*Math.sin(a2)],["z"]]}};return m},_clone:function(m){if(m==null||typeof(m)!="object"){return m}if(m.constructor==Array){return[].concat(m)}var j=new m.constructor();for(var l in m){j[l]=this._clone(m[l])}return j},compactUnits:function(n,l){for(var m=l.length-1;m>=0;m--){var j=n/Math.pow(1000,m+1);if(j>=1&&j*10%10==0){return j+l[m]}}return n},getElementOriginalAttrs:function(l){var j=c(l.node).data("original-attr");if(!j){j=l.attr();c(l.node).data("original-attr",j)}return j},findInPieces:function(n,p,m,j,o){for(var l=0;l<n.length;l++){if((typeof p==undefined||p==-1||p==false||n[l].section==p)&&(typeof m==undefined||m==-1||m==false||n[l].serie==m)&&(typeof j==undefined||j==-1||j==false||n[l].index==j)&&(typeof o==undefined||o==-1||o==false||n[l].subSection==o)){return n[l]}}return false},samePiecePath:function(l,j){return(((typeof l.section==undefined||l.section==-1||l.section==false)&&(typeof j.section==undefined||j.section==-1||j.section==false))||l.section==j.section)&&(((typeof l.serie==undefined||l.serie==-1||l.serie==false)&&(typeof j.serie==undefined||j.serie==-1||j.serie==false))||l.serie==j.serie)&&(((typeof l.index==undefined||l.index==-1||l.index==false)&&(typeof j.index==undefined||j.index==-1||j.index==false))||l.index==j.index)&&(((typeof l.subSection==undefined||l.subSection==-1||l.subSection==false)&&(typeof j.subSection==undefined||j.subSection==-1||j.subSection==false))||l.subSection==j.subSection)},executeIfChanged:function(o,n){if(!o.newopt){return true}for(var m=0;m<n.length;m++){if(n[m][n[m].length-1]=="*"){for(var l in o.newopt){if(l.substring(0,n[m].length-1)+"*"==n[m]){return true}}}else{if(n[m]=="series"&&(o.newopt.series||o.newopt.defaultSeries)){return true}else{if(n[m]=="axis"&&(o.newopt.axis||o.newopt.defaultAxis)){return true}else{if(n[m]=="width"&&(o.oldwidth!=o.width)){return true}else{if(n[m]=="height"&&(o.oldheight!=o.height)){return true}else{if(n[m].substring(0,9)=="features."){n[m]=n[m].substring(9);if(o.newopt.features&&o.newopt.features[n[m]]){return true}}else{if(typeof o.newopt[n[m]]!="undefined"){return true}}}}}}}}return false},getItemColor:function(n,o,l){var m=this.areaProps(n,"Series",o,l);if(m.color){return m.color}if(l!==false&&m.valuesPalette){return m.valuesPalette[l%m.valuesPalette.length]}if(n.opt.seriesPalette){var j=0;for(seriekey in n.opt.values){if(o==seriekey){return n.opt.seriesPalette[j%n.opt.seriesPalette.length]}else{j++}}}},colorize:function(o,n,l,j){if(j){for(k in l){var q=n;var m=0;for(m=0;m<l[k].length-1;m++){if(!q[l[k][m]]){q[l[k][m]]={}}q=q[l[k][m]]}if(!q[l[k][l[k].length-1]]){q[l[k][l[k].length-1]]=j}}}},areaProps:function(m,r,l,n,j){var q;var s=m.opt[r.toLowerCase()];if(!j){if(typeof l=="undefined"||!l){q=s}else{var o=r+"/"+l+"/"+n;if(m.cache&&m.cache.areaPropsCache&&m.cache.areaPropsCache[o]){q=m.cache.areaPropsCache[o]}else{q=this._clone(m.opt["default"+r]);if(s&&s[l]){q=c.extend(true,q,s[l])}if((typeof n!="undefined")&&n>=0&&q.values&&q.values[n]){q=c.extend(true,q,q.values[n])}if(m.cache){if(!m.cache.areaPropsCache){m.cache.areaPropsCache={}}m.cache.areaPropsCache[o]=q}}}}else{var p=j.toLowerCase();q=this._clone(m.opt[p]);if(typeof l=="undefined"||!l){if(s&&s[p]){q=c.extend(true,q,s[p])}}else{if(m.opt["default"+r]&&m.opt["default"+r][p]){q=c.extend(true,q,m.opt["default"+r][p])}if(s&&s[l]&&s[l][p]){q=c.extend(true,q,s[l][p])}if((typeof n!="undefined")&&n>0&&q.values&&q.values[n]){q=c.extend(true,q,q.values[n])}}}return q},_absrectpath:function(l,o,j,n,p){if(p){var m=[["M",l,o+p],["a",p,p,0,0,1,p,-p],["L",j-p,o],["a",p,p,0,0,1,p,p],["L",j,n-p],["a",p,p,0,0,1,-p,p],["L",l+p,n],["a",p,p,0,0,1,-p,-p],["z"]];return m}else{return[["M",l,o],["L",l,n],["L",j,n],["L",j,o],["z"]]}},_linepathAnchors:function(m,l,x,v,s,r,o){var j=1;if(o&&o.length){j=o[1];o=o[0]}if(!o){o=1}var p=(x-m)/2,n=(s-x)/2,y=Math.atan(Math.abs(x-m)/Math.abs(v-l)),w=Math.atan(Math.abs(s-x)/Math.abs(v-r));y=(l<v&&x>m)||(l>v&&x<m)?Math.PI-y:y;w=(r<v&&s>x)||(r>v&&s<x)?Math.PI-w:w;if(j==2){if((y-Math.PI/2)*(w-Math.PI/2)>0){y=0;w=0}else{if(Math.abs(y-Math.PI/2)<Math.abs(w-Math.PI/2)){w=Math.PI-y}else{y=Math.PI-w}}}var q=Math.PI/2-((y+w)%(Math.PI*2))/2,A=p*Math.sin(q+y)/2/o,u=p*Math.cos(q+y)/2/o,z=n*Math.sin(q+w)/2/o,t=n*Math.cos(q+w)/2/o;return{x1:x-A,y1:v+u,x2:x+z,y2:v+t}},_linepath:function(v,n){var w=[];if(n){var q=false;for(var o=0,r=v.length;o<r;o++){var u=v[o][0],s=v[o][1];if(u!=null&&s!=null){if(q){if(o+1!=r&&v[o+1][0]!=null&&v[o+1][1]!=null){var t=this._linepathAnchors(v[o-1][0],v[o-1][1],v[o][0],v[o][1],v[o+1][0],v[o+1][1],n);w.push(["C",q[0],q[1],t.x1,t.y1,v[o][0],v[o][1]]);q=[t.x2,t.y2]}else{w.push(["C",q[0],q[1],v[o][0],v[o][1],v[o][0],v[o][1]]);q=[v[o][0],v[o][1]]}}else{w.push(["M",v[o][0],v[o][1]]);q=[v[o][0],v[o][1]]}}else{q=false}}}else{var m=null;var l=null;for(var p=0;p<v.length;p++){var u=v[p][0],s=v[p][1];if(u!=null&&s!=null){w.push([m==null||l==null?"M":"L",u,s])}m=u;l=s}}return w},_lineareapath:function(t,r,l){var s=this._linepath(t,l);var q=this._linepath(r.reverse(),l);var p=[];var o=null;for(var n=0;n<=s.length;n++){if(n==s.length||s[n][0]=="M"){if(o!=null){for(var m=s.length-n;m<=s.length-o;m++){if(q[m][0]=="M"){p.push(["L",q[m][1],q[m][2]])}else{p.push(q[m])}}p.push(["z"]);o=null}if(n!=s.length){p.push(s[n])}}else{p.push(s[n]);if(o==null){o=n}}}return p},getX:function(j,l){switch(j[0]){case"CIRCLE":return j[1];case"RECT":return j[!l?1:3];case"SLICE":return j[1];default:return j[j.length-2]}},getY:function(j,l){switch(j[0]){case"CIRCLE":return j[2];case"RECT":return j[!l?2:4];case"SLICE":return j[2];default:return j[j.length-1]}},getCenter:function(n,o){if(!n.path){return false}if(n.path.length==0){return false}if(!o){o=[0,0]}if(n.center){return[n.center[0]+o[0],n.center[1]+o[1]]}var m=n.path[0];switch(m[0]){case"CIRCLE":return[m[1]+o[0],m[2]+o[1]];case"RECT":return[(m[1]+m[2])/2+o[0],(m[3]+m[4])/2+o[1]];case"SLICE":var l=m[5]+(m[6]-m[5])/2;var j=Math.PI/180;return[m[1]+(m[4]+((m[3]-m[4])/2)+o[0])*Math.cos(-l*j)+o[1]*Math.cos((-l-90)*j),m[2]+(m[4]+((m[3]-m[4])/2)+o[0])*Math.sin(-l*j)+o[1]*Math.sin((-l-90)*j)]}alert("ElyCharts: getCenter with complex path not supported");return false},movePath:function(w,D,u,s,l){var m=[],v;if(D.length==1&&D[0][0]=="RECT"){return[[D[0][0],this._movePathX(w,D[0][1],u[0],s),this._movePathY(w,D[0][2],u[1],s),this._movePathX(w,D[0][3],u[0],s),this._movePathY(w,D[0][4],u[1],s),D[0][5]]]}if(D.length==1&&D[0][0]=="SLICE"){if(!l){var C=D[0][5]+(D[0][6]-D[0][5])/2;var z=Math.PI/180;var B=D[0][1]+u[0]*Math.cos(-C*z)+u[1]*Math.cos((-C-90)*z);var A=D[0][2]+u[0]*Math.sin(-C*z)+u[1]*Math.cos((-C-90)*z);return[[D[0][0],B,A,D[0][3],D[0][4],D[0][5],D[0][6]]]}else{return[[D[0][0],D[0][1]+u[0],D[0][2]+u[1],D[0][3],D[0][4],D[0][5],D[0][6]]]}}if(D.length==1&&D[0][0]=="CIRCLE"){return[[D[0][0],D[0][1]+u[0],D[0][2]+u[1],D[0][3]]]}if(D.length==1&&D[0][0]=="TEXT"){return[[D[0][0],D[0][1],D[0][2]+u[0],D[0][3]+u[1]]]}if(D.length==1&&D[0][0]=="LINE"){for(v=0;v<D[0][1].length;v++){m.push([this._movePathX(w,D[0][1][v][0],u[0],s),this._movePathY(w,D[0][1][v][1],u[1],s)])}return[[D[0][0],m,D[0][2]]]}if(D.length==1&&D[0][0]=="LINEAREA"){for(v=0;v<D[0][1].length;v++){m.push([this._movePathX(w,D[0][1][v][0],u[0],s),this._movePathY(w,D[0][1][v][1],u[1],s)])}var q=[];for(v=0;v<D[0][2].length;v++){q.push([this._movePathX(w,D[0][2][v][0],u[0],s),this._movePathY(w,D[0][2][v][1],u[1],s)])}return[[D[0][0],m,q,D[0][3]]]}var r=[];for(var t=0;t<D.length;t++){var n=D[t];switch(n[0]){case"M":case"m":case"L":case"l":case"T":case"t":r.push([n[0],this._movePathX(w,n[1],u[0],s),this._movePathY(w,n[2],u[1],s)]);break;case"A":case"a":r.push([n[0],n[1],n[2],n[3],n[4],n[5],this._movePathX(w,n[6],u[0],s),this._movePathY(w,n[7],u[1],s)]);break;case"C":case"c":r.push([n[0],this._movePathX(w,n[1],u[0],s),this._movePathY(w,n[2],u[1],s),this._movePathX(w,n[3],u[0],s),this._movePathY(w,n[4],u[1],s),this._movePathX(w,n[5],u[0],s),this._movePathY(w,n[6],u[1],s)]);break;case"S":case"s":case"Q":case"q":r.push([n[0],this._movePathX(w,n[1],u[0],s),this._movePathY(w,n[2],u[1],s),this._movePathX(w,n[3],u[0],s),this._movePathY(w,n[4],u[1],s)]);break;case"z":case"Z":r.push([n[0]]);break}}return r},_movePathX:function(m,j,l,n){if(j==null){return null}if(!n){return j+l}j=j+l;return l>0&&j>m.width-m.opt.margins[1]?m.width-m.opt.margins[1]:(l<0&&j<m.opt.margins[3]?m.opt.margins[3]:j)},_movePathY:function(l,n,j,m){if(n==null){return null}if(!m){return n+j}n=n+j;return j>0&&n>l.height-l.opt.margins[2]?l.height-l.opt.margins[2]:(j<0&&n<l.opt.margins[0]?l.opt.margins[0]:n)},getSVGProps:function(n,q,j){var p=this._preparePathShow(n,q);var m=j?j:{};var l="path",o;if(p.length==1&&p[0][0]=="RECT"){o=f._absrectpath(p[0][1],p[0][2],p[0][3],p[0][4],p[0][5])}else{if(p.length==1&&p[0][0]=="SLICE"){l="slice";o=[p[0][1],p[0][2],p[0][3],p[0][4],p[0][5],p[0][6]]}else{if(p.length==1&&p[0][0]=="LINE"){o=f._linepath(p[0][1],p[0][2])}else{if(p.length==1&&p[0][0]=="LINEAREA"){o=f._lineareapath(p[0][1],p[0][2],p[0][3])}else{if(p.length==1&&(p[0][0]=="CIRCLE"||p[0][0]=="TEXT"||p[0][0]=="DOMELEMENT"||p[0][0]=="RELEMENT")){return j?j:false}else{o=p}}}}}if(l!="path"||(o&&o.length>0)){m[l]=o}else{if(!j){return false}}return m},showPath:function(n,o,p){if(!p){p=n.paper}if(o.length==1&&o[0][0]=="CIRCLE"){o=this._preparePathShow(n,o);return p.circle(o[0][1],o[0][2],o[0][3])}if(o.length==1&&o[0][0]=="TEXT"){o=this._preparePathShow(n,o);return p.text(o[0][2],o[0][3],o[0][1])}var m=this.getSVGProps(n,o);var l=false;for(var j in m){l=true;break}return m&&l?p.path().attr(m):false},_preparePathShow:function(j,l){return j.opt.features.pixelWorkAround.active?this.movePath(j,this._clone(l),[0.5,0.5],false,true):l},getPieceFullAttr:function(l,j){if(!j.fullattr){j.fullattr=this._clone(j.attr);if(j.path){switch(j.path[0][0]){case"CIRCLE":var m=this._preparePathShow(l,j.path);j.fullattr.cx=m[0][1];j.fullattr.cy=m[0][2];j.fullattr.r=m[0][3];break;case"TEXT":case"DOMELEMENT":case"RELEMENT":break;default:j.fullattr=this.getSVGProps(l,j.path,j.fullattr)}}if(typeof j.fullattr.opacity=="undefined"){j.fullattr.opacity=1}}return j.fullattr},_show:function(o,m){if(c.elycharts.featuresmanager){c.elycharts.featuresmanager.beforeShow(o,m)}pieces=this._getSortedPathData(m);this._animationStackStart(o);var j=false;for(var l=0;l<pieces.length;l++){var n=pieces[l];if((typeof n.show=="undefined"||n.show)&&(typeof n.parent=="undefined"||typeof n.parent.show=="undefined"||n.parent.show)){n.element=n.animation&&n.animation.element?n.animation.element:false;n.hide=false;if(!n.path){n.hide=true}else{if(n.path.length==1&&n.path[0][0]=="TEXT"){if(n.element){f.animationStackPush(o,n,n.element,false,n.animation.speed,n.animation.easing,n.animation.delay,true);n.animation.element=false}n.element=this.showPath(o,n.path);if(n.element&&o.newopt&&j){n.element.insertAfter(j)}}else{if(n.path.length==1&&n.path[0][0]=="DOMELEMENT"){}else{if(n.path.length==1&&n.path[0][0]=="RELEMENT"){if(n.element){f.animationStackPush(o,n,n.element,false,n.animation.speed,n.animation.easing,n.animation.delay,true);n.animation.element=false}n.element=n.path[0][1];if(n.element&&j){n.element.insertAfter(j)}n.attr=false}else{if(!n.element){if(n.animation&&n.animation.startPath&&n.animation.startPath.length){n.element=this.showPath(o,n.animation.startPath)}else{n.element=this.showPath(o,n.path)}if(n.element&&o.newopt&&j){n.element.insertAfter(j)}}}}}}if(n.element){if(n.attr){if(!n.animation){if(typeof n.attr.opacity=="undefined"){n.attr.opacity=1}n.element.attr(n.attr)}else{if(!n.animation.element){n.element.attr(n.animation.startAttr?n.animation.startAttr:n.attr)}f.animationStackPush(o,n,n.element,this.getPieceFullAttr(o,n),n.animation.speed,n.animation.easing,n.animation.delay)}}else{if(n.hide){f.animationStackPush(o,n,n.element,false,n.animation.speed,n.animation.easing,n.animation.delay)}}j=n.element}}}this._animationStackEnd(o);if(c.elycharts.featuresmanager){c.elycharts.featuresmanager.afterShow(o,m)}},_getSortedPathData:function(o){res=[];for(var m=0;m<o.length;m++){var n=o[m];if(n.paths){for(var l=0;l<n.paths.length;l++){n.paths[l].pos=res.length;n.paths[l].parent=n;res.push(n.paths[l])}}else{n.pos=res.length;n.parent=false;res.push(n)}}return res.sort(function(p,j){var r=typeof p.attr=="undefined"||typeof p.attr.zindex=="undefined"?(!p.parent||typeof p.parent.attr=="undefined"||typeof p.parent.attr.zindex=="undefined"?0:p.parent.attr.zindex):p.attr.zindex;var q=typeof j.attr=="undefined"||typeof j.attr.zindex=="undefined"?(!j.parent||typeof j.parent.attr=="undefined"||typeof j.parent.attr.zindex=="undefined"?0:j.parent.attr.zindex):j.attr.zindex;return r<q?-1:(r>q?1:(p.pos<j.pos?-1:(p.pos>j.pos?1:0)))})},_animationStackStart:function(j){if(!j.animationStackDepth||j.animationStackDepth==0){j.animationStackDepth=0;j.animationStack={}}j.animationStackDepth++},_animationStackEnd:function(l){l.animationStackDepth--;if(l.animationStackDepth==0){for(var j in l.animationStack){this._animationStackAnimate(l.animationStack[j],j);delete l.animationStack[j]}l.animationStack={}}},animationStackPush:function(o,n,m,j,q,r,l,p){if(typeof l=="undefined"){l=0}if(!o.animationStackDepth||o.animationStackDepth==0){this._animationStackAnimate([{piece:n,object:m,props:j,speed:q,easing:r,force:p}],l)}else{if(!o.animationStack[l]){o.animationStack[l]=[]}o.animationStack[l].push({piece:n,object:m,props:j,speed:q,easing:r,force:p})}},_animationStackAnimate:function(j,m){var l=this;var n=function(){var p=j.pop();var q=l._animationStackAnimateElement(p);while(j.length>0){var o=j.pop();l._animationStackAnimateElement(o,p,q)}};if(m>0){setTimeout(n,m)}else{n()}},_animationStackAnimateElement:function(j,o,n){if(j.force||!j.piece.animationInProgress){j.object.stop();if(!j.props){j.props={opacity:0}}if(!j.speed||j.speed<=0){j.object.attr(j.props);j.piece.animationInProgress=false;return}j.piece.animationInProgress=true;var l=function(){j.piece.animationInProgress=false};if(Raphael.animation){var m=Raphael.animation(j.props,j.speed,j.easing?j.easing:"linear",l);if(o){j.object.animateWith(o,n,m)}else{j.object.animate(m)}return m}else{if(o){j.object.animateWith(o,j.props,j.speed,j.easing?j.easing:"linear",l)}else{j.object.animate(j.props,j.speed,j.easing?j.easing:"linear",l)}return null}}return null}};var f=c.elycharts.common;c.elycharts.featuresmanager={managers:[],initialized:false,register:function(l,j){c.elycharts.featuresmanager.managers.push([j,l]);c.elycharts.featuresmanager.initialized=false},init:function(){c.elycharts.featuresmanager.managers.sort(function(l,j){return l[0]<j[0]?-1:(l[0]==j[0]?0:1)});c.elycharts.featuresmanager.initialized=true},clear:function(l){if(!c.elycharts.featuresmanager.initialized){this.init()}for(var j=c.elycharts.featuresmanager.managers.length-1;j>=0;j--){if(c.elycharts.featuresmanager.managers[j][1].clear){c.elycharts.featuresmanager.managers[j][1].clear(l)}}},beforeShow:function(l,m){if(!c.elycharts.featuresmanager.initialized){this.init()}for(var j=0;j<c.elycharts.featuresmanager.managers.length;j++){if(c.elycharts.featuresmanager.managers[j][1].beforeShow){c.elycharts.featuresmanager.managers[j][1].beforeShow(l,m)}}},afterShow:function(l,m){if(!c.elycharts.featuresmanager.initialized){this.init()}for(var j=0;j<c.elycharts.featuresmanager.managers.length;j++){if(c.elycharts.featuresmanager.managers[j][1].afterShow){c.elycharts.featuresmanager.managers[j][1].afterShow(l,m)}}},onMouseOver:function(n,o,l,j){if(!c.elycharts.featuresmanager.initialized){this.init()}for(var m=0;m<c.elycharts.featuresmanager.managers.length;m++){if(c.elycharts.featuresmanager.managers[m][1].onMouseOver){c.elycharts.featuresmanager.managers[m][1].onMouseOver(n,o,l,j)}}},onMouseOut:function(n,o,l,j){if(!c.elycharts.featuresmanager.initialized){this.init()}for(var m=0;m<c.elycharts.featuresmanager.managers.length;m++){if(c.elycharts.featuresmanager.managers[m][1].onMouseOut){c.elycharts.featuresmanager.managers[m][1].onMouseOut(n,o,l,j)}}},onMouseEnter:function(n,o,l,j){if(!c.elycharts.featuresmanager.initialized){this.init()}for(var m=0;m<c.elycharts.featuresmanager.managers.length;m++){if(c.elycharts.featuresmanager.managers[m][1].onMouseEnter){c.elycharts.featuresmanager.managers[m][1].onMouseEnter(n,o,l,j)}}},onMouseChanged:function(n,o,l,j){if(!c.elycharts.featuresmanager.initialized){this.init()}for(var m=0;m<c.elycharts.featuresmanager.managers.length;m++){if(c.elycharts.featuresmanager.managers[m][1].onMouseChanged){c.elycharts.featuresmanager.managers[m][1].onMouseChanged(n,o,l,j)}}},onMouseExit:function(n,o,l,j){if(!c.elycharts.featuresmanager.initialized){this.init()}for(var m=0;m<c.elycharts.featuresmanager.managers.length;m++){if(c.elycharts.featuresmanager.managers[m][1].onMouseExit){c.elycharts.featuresmanager.managers[m][1].onMouseExit(n,o,l,j)}}}}})(jQuery);(function(b){var a=b.elycharts.common;b.elycharts.anchormanager={afterShow:function(e,g){if(!e.opt.anchors){return}if(!e.anchorBinds){e.anchorBinds=[]}while(e.anchorBinds.length){var c=e.anchorBinds.pop();b(c[0]).unbind(c[1],c[2])}for(var d=0;d<e.mouseAreas.length;d++){var f=e.mouseAreas[d].piece?e.mouseAreas[d].piece.serie:false;var h;if(f){h=e.opt.anchors[f][e.mouseAreas[d].index]}else{h=e.opt.anchors[e.mouseAreas[d].index]}if(h&&e.mouseAreas[d].props.anchor&&e.mouseAreas[d].props.anchor.highlight){(function(m,j,n,l){var i=function(){l.anchorMouseOver(m,j)};var o=function(){l.anchorMouseOut(m,j)};if(!m.mouseAreas[d].props.anchor.useMouseEnter){m.anchorBinds.push([n,"mouseover",i]);m.anchorBinds.push([n,"mouseout",o]);b(n).mouseover(i);b(n).mouseout(o)}else{m.anchorBinds.push([n,"mouseenter",i]);m.anchorBinds.push([n,"mouseleave",o]);b(n).mouseenter(i);b(n).mouseleave(o)}})(e,e.mouseAreas[d],h,this)}}e.onAnchors=[]},anchorMouseOver:function(d,c){b.elycharts.highlightmanager.onMouseOver(d,c.piece?c.piece.serie:false,c.index,c)},anchorMouseOut:function(d,c){b.elycharts.highlightmanager.onMouseOut(d,c.piece?c.piece.serie:false,c.index,c)},onMouseOver:function(e,f,d,c){if(!e.opt.anchors){return}if(c.props.anchor&&c.props.anchor.addClass){var g;if(f){g=e.opt.anchors[f][c.index]}else{g=e.opt.anchors[c.index]}if(g){b(g).addClass(c.props.anchor.addClass);e.onAnchors.push([g,c.props.anchor.addClass])}}},onMouseOut:function(e,f,d,c){if(!e.opt.anchors){return}while(e.onAnchors.length>0){var g=e.onAnchors.pop();b(g[0]).removeClass(g[1])}}};b.elycharts.featuresmanager.register(b.elycharts.anchormanager,30)})(jQuery);(function(b){var a=b.elycharts.common;b.elycharts.animationmanager={beforeShow:function(c,d){if(!c.newopt){this.startAnimation(c,d)}else{this.stepAnimation(c,d)}},stepAnimation:function(c,d){d=this._stepAnimationInt(c,d)},_stepAnimationInt:function(e,h,j,g,c){for(var d=0;d<h.length;d++){var f=a.areaProps(e,j?j:h[d].section,g?g:h[d].serie);if(f&&f.stepAnimation){f=f.stepAnimation}else{f=e.opt.features.animation.stepAnimation}if(typeof h[d].paths=="undefined"){if(f&&f.active&&h[d].animation){h[d].animation.speed=f&&f.speed?f.speed:300;h[d].animation.easing=f&&f.easing?f.easing:"";h[d].animation.delay=f&&f.delay?f.delay:0;if(!h[d].animation.element){h[d].animation.startAttr={opacity:0}}}}else{this._stepAnimationInt(e,h[d].paths,h[d].section,h[d].serie,true)}}},startAnimation:function(e,f){for(var c=0;c<f.length;c++){if(f[c].paths||f[c].path){var d=a.areaProps(e,f[c].section,f[c].serie);if(d&&d.startAnimation){d=d.startAnimation}else{d=e.opt.features.animation.startAnimation}if(d&&d.active){if(d.type=="simple"||f[c].section!="Series"){this.animationSimple(e,d,f[c])}if(d.type=="grow"){this.animationGrow(e,d,f[c])}if(d.type=="avg"){this.animationAvg(e,d,f[c])}if(d.type=="reg"){this.animationReg(e,d,f[c])}}}}},_animationPiece:function(d,f,e){if(d.paths){for(var c=0;c<d.paths.length;c++){this._animationPiece(d.paths[c],f,e)}}else{if(d.path){d.animation={speed:f.speed,easing:f.easing,delay:f.delay,startPath:[],startAttr:a._clone(d.attr)};if(f.propsTo){d.attr=b.extend(true,d.attr,f.propsTo)}if(f.propsFrom){d.animation.startAttr=b.extend(true,d.animation.startAttr,f.propsFrom)}if(e&&f[e.toLowerCase()+"PropsFrom"]){d.animation.startAttr=b.extend(true,d.animation.startAttr,f[e.toLowerCase()+"PropsFrom"])}if(typeof d.animation.startAttr.opacity!="undefined"&&typeof d.attr.opacity=="undefined"){d.attr.opacity=1}}}},animationSimple:function(e,d,c){this._animationPiece(c,d,c.subSection)},animationGrow:function(g,f,e){this._animationPiece(e,f,e.subSection);var d,h,j;switch(g.opt.type){case"line":j=g.height-g.opt.margins[2];switch(e.subSection){case"Plot":if(!e.paths){h=["LINE",[],e.path[0][2]];for(d=0;d<e.path[0][1].length;d++){h[1].push([e.path[0][1][d][0],j])}e.animation.startPath.push(h)}else{for(d=0;d<e.paths.length;d++){if(e.paths[d].path){e.paths[d].animation.startPath.push(["RECT",e.paths[d].path[0][1],j,e.paths[d].path[0][3],j])}}}break;case"Fill":h=["LINEAREA",[],[],e.path[0][3]];for(d=0;d<e.path[0][1].length;d++){h[1].push([e.path[0][1][d][0],j]);h[2].push([e.path[0][2][d][0],j])}e.animation.startPath.push(h);break;case"Dot":for(d=0;d<e.paths.length;d++){if(e.paths[d].path){e.paths[d].animation.startPath.push(["CIRCLE",e.paths[d].path[0][1],j,e.paths[d].path[0][3]])}}break}break;case"pie":if(e.subSection=="Plot"){for(d=0;d<e.paths.length;d++){if(e.paths[d].path&&e.paths[d].path[0][0]=="SLICE"){e.paths[d].animation.startPath.push(["SLICE",e.paths[d].path[0][1],e.paths[d].path[0][2],e.paths[d].path[0][4]+e.paths[d].path[0][3]*0.1,e.paths[d].path[0][4],e.paths[d].path[0][5],e.paths[d].path[0][6]])}}}break;case"funnel":alert("Unsupported animation GROW for funnel");break;case"barline":var c;if(e.section=="Series"&&e.subSection=="Plot"){if(!f.subType){c=g.opt.direction!="rtl"?g.opt.margins[3]:g.width-g.opt.margins[1]}else{if(f.subType==1){c=g.opt.direction!="rtl"?g.width-g.opt.margins[1]:g.opt.margins[3]}}for(d=0;d<e.paths.length;d++){if(e.paths[d].path){if(!f.subType||f.subType==1){e.paths[d].animation.startPath.push(["RECT",c,e.paths[d].path[0][2],c,e.paths[d].path[0][4],e.paths[d].path[0][5]])}else{j=(e.paths[d].path[0][2]+e.paths[d].path[0][4])/2;e.paths[d].animation.startPath.push(["RECT",e.paths[d].path[0][1],j,e.paths[d].path[0][3],j,e.paths[d].path[0][5]])}}}}break}},_animationAvgXYArray:function(c){var e=[],f=0,d;for(d=0;d<c.length;d++){f+=c[d][1]}f=f/c.length;for(d=0;d<c.length;d++){e.push([c[d][0],f])}return e},animationAvg:function(g,f,e){this._animationPiece(e,f,e.subSection);var h=0,d,c;switch(g.opt.type){case"line":switch(e.subSection){case"Plot":if(!e.paths){e.animation.startPath.push(["LINE",this._animationAvgXYArray(e.path[0][1]),e.path[0][2]])}else{c=0;for(d=0;d<e.paths.length;d++){if(e.paths[d].path){c++;h+=e.paths[d].path[0][2]}}h=h/c;for(d=0;d<e.paths.length;d++){if(e.paths[d].path){e.paths[d].animation.startPath.push(["RECT",e.paths[d].path[0][1],h,e.paths[d].path[0][3],e.paths[d].path[0][4]])}}}break;case"Fill":e.animation.startPath.push(["LINEAREA",this._animationAvgXYArray(e.path[0][1]),this._animationAvgXYArray(e.path[0][2]),e.path[0][3]]);break;case"Dot":c=0;for(d=0;d<e.paths.length;d++){if(e.paths[d].path){c++;h+=e.paths[d].path[0][2]}}h=h/c;for(d=0;d<e.paths.length;d++){if(e.paths[d].path){e.paths[d].animation.startPath.push(["CIRCLE",e.paths[d].path[0][1],h,e.paths[d].path[0][3]])}}break}break;case"pie":var j=360/e.paths.length;if(e.subSection=="Plot"){for(d=0;d<e.paths.length;d++){if(e.paths[d].path&&e.paths[d].path[0][0]=="SLICE"){e.paths[d].animation.startPath.push(["SLICE",e.paths[d].path[0][1],e.paths[d].path[0][2],e.paths[d].path[0][3],e.paths[d].path[0][4],d*j,(d+1)*j])}}}break;case"funnel":alert("Unsupported animation AVG for funnel");break;case"barline":alert("Unsupported animation AVG for barline");break}},_animationRegXYArray:function(d){var g=[];var j=d.length;var h=d[0][1];var f=d[j-1][1];for(var e=0;e<d.length;e++){g.push([d[e][0],h+(f-h)/(j-1)*e])}return g},animationReg:function(j,h,g){this._animationPiece(g,h,g.subSection);var e,l,f,d;switch(j.opt.type){case"line":switch(g.subSection){case"Plot":if(!g.paths){g.animation.startPath.push(["LINE",this._animationRegXYArray(g.path[0][1]),g.path[0][2]])}else{l=g.paths.length;if(l>1){for(e=0;!g.paths[e].path&&e<g.paths.length;e++){}f=g.paths[e].path?a.getY(g.paths[e].path[0]):0;for(e=g.paths.length-1;!g.paths[e].path&&e>=0;e--){}d=g.paths[e].path?a.getY(g.paths[e].path[0]):0;for(e=0;e<g.paths.length;e++){if(g.paths[e].path){g.paths[e].animation.startPath.push(["RECT",g.paths[e].path[0][1],f+(d-f)/(l-1)*e,g.paths[e].path[0][3],g.paths[e].path[0][4]])}}}}break;case"Fill":g.animation.startPath.push(["LINEAREA",this._animationRegXYArray(g.path[0][1]),this._animationRegXYArray(g.path[0][2]),g.path[0][3]]);break;case"Dot":l=g.paths.length;if(l>1){for(e=0;!g.paths[e].path&&e<g.paths.length;e++){}f=g.paths[e].path?a.getY(g.paths[e].path[0]):0;for(e=g.paths.length-1;!g.paths[e].path&&e>=0;e--){}d=g.paths[e].path?a.getY(g.paths[e].path[0]):0;for(e=0;e<g.paths.length;e++){if(g.paths[e].path){g.paths[e].animation.startPath.push(["CIRCLE",g.paths[e].path[0][1],f+(d-f)/(l-1)*e,g.paths[e].path[0][3]])}}}break}break;case"pie":alert("Unsupported animation REG for pie");break;case"funnel":alert("Unsupported animation REG for funnel");break;case"barline":alert("Unsupported animation REG for barline");break}}};b.elycharts.featuresmanager.register(b.elycharts.animationmanager,10);b.elycharts.frameanimationmanager={beforeShow:function(c,d){if(c.opt.features.frameAnimation.active){b(c.container.get(0)).css(c.opt.features.frameAnimation.cssFrom)}},afterShow:function(c,d){if(c.opt.features.frameAnimation.active){c.container.animate(c.opt.features.frameAnimation.cssTo,c.opt.features.frameAnimation.speed,c.opt.features.frameAnimation.easing)}}};b.elycharts.featuresmanager.register(b.elycharts.frameanimationmanager,90)})(jQuery);(function(b){var a=b.elycharts.common;b.elycharts.highlightmanager={removeHighlighted:function(d,c){if(d.highlighted){while(d.highlighted.length>0){var e=d.highlighted.pop();if(e.piece){if(c){a.animationStackPush(d,e.piece,e.piece.element,a.getPieceFullAttr(d,e.piece),e.cfg.restoreSpeed,e.cfg.restoreEasing,0,true)}}else{e.element.remove()}}}},afterShow:function(c,d){if(c.highlighted&&c.highlighted.length>0){this.removeHighlighted(c,false)}c.highlighted=[]},onMouseOver:function(D,u,j,H){var s,c;for(var B=0;B<H.pieces.length;B++){if(H.pieces[B].section=="Series"&&H.pieces[B].paths&&(!u||H.pieces[B].serie==u)&&H.pieces[B].paths[j]&&H.pieces[B].paths[j].element){var e=H.pieces[B].paths[j];c=e.element;s=e.path;var v=a.getElementOriginalAttrs(c);var F=false;var f=u?H.props:a.areaProps(D,H.pieces[B].section,H.pieces[B].serie);var r,G,y;if(s&&f.highlight){if(f.highlight.scale){var J=f.highlight.scale;if(typeof J=="number"){J=[J,J]}if(s[0][0]=="RECT"){var o=s[0][3]-s[0][1];var C=s[0][4]-s[0][2];s=[["RECT",s[0][1],s[0][2]-C*(J[1]-1),s[0][3]+o*(J[0]-1),s[0][4]]];a.animationStackPush(D,e,c,a.getSVGProps(D,s),f.highlight.scaleSpeed,f.highlight.scaleEasing)}else{if(s[0][0]=="CIRCLE"){F={r:s[0][3]*J[0]};a.animationStackPush(D,e,c,F,f.highlight.scaleSpeed,f.highlight.scaleEasing)}else{if(s[0][0]=="SLICE"){var E=(s[0][6]-s[0][5])*(J[1]-1)/2;if(E>90){E=90}s=[["SLICE",s[0][1],s[0][2],s[0][3]*J[0],s[0][4],s[0][5]-E,s[0][6]+E]];a.animationStackPush(D,e,c,a.getSVGProps(D,s),f.highlight.scaleSpeed,f.highlight.scaleEasing)}else{if(D.opt.type=="funnel"){var p=(e.rect[2]-e.rect[0])*(J[0]-1)/2;var n=(e.rect[3]-e.rect[1])*(J[1]-1)/2;s=[a.movePath(D,[s[0]],[-p,-n])[0],a.movePath(D,[s[1]],[+p,-n])[0],a.movePath(D,[s[2]],[+p,+n])[0],a.movePath(D,[s[3]],[-p,+n])[0],s[4]];a.animationStackPush(D,e,c,a.getSVGProps(D,s),f.highlight.scaleSpeed,f.highlight.scaleEasing,0,true);r=false;if(j>0){G=H.pieces[B].paths[j-1];r=G.element;y=G.path}else{G=a.findInPieces(H.pieces,"Sector","top");if(G){r=G.element;y=G.path}}if(r){y=[y[0],y[1],a.movePath(D,[y[2]],[+p,-n])[0],a.movePath(D,[y[3]],[-p,-n])[0],y[4]];a.animationStackPush(D,G,r,a.getSVGProps(D,y),f.highlight.scaleSpeed,f.highlight.scaleEasing,0,true);D.highlighted.push({piece:G,cfg:f.highlight})}r=false;if(j<H.pieces[B].paths.length-1){G=H.pieces[B].paths[j+1];r=G.element;y=G.path}else{G=a.findInPieces(H.pieces,"Sector","bottom");if(G){r=G.element;y=G.path}}if(r){y=[a.movePath(D,[y[0]],[-p,+n])[0],a.movePath(D,[y[1]],[+p,+n])[0],y[2],y[3],y[4]];a.animationStackPush(D,G,r,a.getSVGProps(D,y),f.highlight.scaleSpeed,f.highlight.scaleEasing,0,true);D.highlighted.push({piece:G,cfg:f.highlight})}}}}}}if(f.highlight.newProps){for(var I in f.highlight.newProps){if(typeof v[I]=="undefined"){v[I]=false}}a.animationStackPush(D,e,c,f.highlight.newProps)}if(f.highlight.move){var g=b.isArray(f.highlight.move)?f.highlight.move:[f.highlight.move,0];s=a.movePath(D,s,g);a.animationStackPush(D,e,c,a.getSVGProps(D,s),f.highlight.moveSpeed,f.highlight.moveEasing)}D.highlighted.push({piece:e,cfg:f.highlight});if(f.highlight.overlayProps){c=a.showPath(D,s);if(F){c.attr(F)}c.attr(f.highlight.overlayProps);v=false;D.highlighted.push({element:c,attr:v,cfg:f.highlight})}}}}if(D.opt.features.highlight.indexHighlight&&D.opt.type=="line"){var q=D.opt.features.highlight.indexHighlight;if(q=="auto"){q=(D.indexCenter=="bar"?"bar":"line")}var A=(D.width-D.opt.margins[3]-D.opt.margins[1])/(D.opt.labels.length>0?D.opt.labels.length:1);var z=(D.width-D.opt.margins[3]-D.opt.margins[1])/(D.opt.labels.length>1?D.opt.labels.length-1:1);var m=true;switch(q){case"bar":s=[["RECT",D.opt.margins[3]+j*A,D.opt.margins[0],D.opt.margins[3]+(j+1)*A,D.height-D.opt.margins[2]]];break;case"line":m=false;case"barline":var l=Math.round((m?A/2:0)+D.opt.margins[3]+j*(m?A:z));s=[["M",l,D.opt.margins[0]],["L",l,D.height-D.opt.margins[2]]]}if(s){c=a.showPath(D,s).attr(D.opt.features.highlight.indexHighlightProps);D.highlighted.push({element:c,attr:false,cfg:D.opt.features.highlight})}}},onMouseOut:function(e,f,d,c){this.removeHighlighted(e,true)}};b.elycharts.featuresmanager.register(b.elycharts.highlightmanager,21)})(jQuery);(function(b){var a=b.elycharts.common;b.elycharts.labelmanager={beforeShow:function(f,g){if(!a.executeIfChanged(f,["labels","values","series"])){return}if(f.opt.labels&&(f.opt.type=="pie"||f.opt.type=="funnel")){var j=false;var h;for(var d=0;d<g.length;d++){if(g[d].section=="Series"&&g[d].subSection=="Plot"){var e=a.areaProps(f,"Series",g[d].serie);if(f.emptySeries&&f.opt.series.empty){e.label=b.extend(true,e.label,f.opt.series.empty.label)}if(e&&e.label&&e.label.active){h=[];for(var c=0;c<g[d].paths.length;c++){if(g[d].paths[c].path){j=c;h.push(this.showLabel(f,g[d],g[d].paths[c],g[d].serie,c,g))}else{h.push({path:false,attr:false})}}g.push({section:g[d].section,serie:g[d].serie,subSection:"Label",paths:h})}}else{if(g[d].section=="Sector"&&g[d].serie=="bottom"&&!g[d].subSection&&j<f.opt.labels.length-1){h=[];h.push(this.showLabel(f,g[d],g[d],"Series",f.opt.labels.length-1,g));g.push({section:g[d].section,serie:g[d].serie,subSection:"Label",paths:h})}}}}},showLabel:function(o,u,t,m,q,l){var j=a.areaProps(o,"Series",m,q);if(o.opt.labels[q]||j.label.label){var h=t;var s=j.label.label?j.label.label:o.opt.labels[q];var d=a.getCenter(h,j.label.offset);if(!j.label.html){var r=j.label.props;if(j.label.frameAnchor){r=a._clone(j.label.props);r["text-anchor"]=j.label.frameAnchor[0];r["alignment-baseline"]=j.label.frameAnchor[1]}return{path:[["TEXT",s,d[0],d[1]]],attr:r}}else{var n=1;var g=a._clone(j.label.style);var f=(typeof g.opacity!="undefined");if(f){n=g.opacity;g.opacity=0}g.position="absolute";g["z-index"]=25;var i;if(typeof s=="string"){i=b("<div>"+s+"</div>").css(g).prependTo(o.container)}else{i=b(s).css(g).prependTo(o.container)}if(o.opt.features.debug.active&&i.height()==0){alert("DEBUG: Al gestore label e' stata passata una label ancora senza dimensioni, quindi ancora non disegnata. Per questo motivo il posizionamento potrebbe non essere correto.")}var e=d[0];var c=d[1];if(!j.label.frameAnchor||j.label.frameAnchor[0]=="middle"){e-=i.width()/2}else{if(j.label.frameAnchor&&j.label.frameAnchor[0]=="end"){e-=i.width()}}if(!j.label.frameAnchor||j.label.frameAnchor[1]=="middle"){c-=i.height()/2}else{if(j.label.frameAnchor&&j.label.frameAnchor[1]=="top"){c-=i.height()}}if(f){i.css({margin:c+"px 0 0 "+e+"px",opacity:n})}else{i.css({margin:c+"px 0 0 "+e+"px"})}return{path:[["DOMELEMENT",i]],attr:false}}}return false}};b.elycharts.featuresmanager.register(b.elycharts.labelmanager,5)})(jQuery);(function(b){var a=b.elycharts.common;b.elycharts.legendmanager={afterShow:function(L,l){if(L.legenditems){for(item in L.legenditems){L.legenditems[item].remove()}L.legenditems=false}if(!L.opt.legend||L.opt.legend.length==0){return}var d=L.opt.features.legend;if(d===false){return}var e=d.x;if(e=="auto"){var D=1;e=0}var c=d.width;if(c=="auto"){var o=1;c=L.width}var H=0;var A=[];var f=0;var B,M,K,r,q,p,G;for(B in L.opt.legend){if(L.opt.type!="pie"){f++}else{f+=L.opt.legend[B].length}}var J=0;for(B in L.opt.legend){if(L.opt.type!="pie"){M=[L.opt.legend[B]]}else{M=L.opt.legend[B]}for(var I=0;I<M.length;I++){var m=a.areaProps(L,"Series",B,L.opt.type=="pie"?I:false);var C=b.extend(true,{},d);if(m.legend){C=b.extend(true,C,m.legend)}var F=a.getItemColor(L,B,L.opt.type=="pie"?I:false);if(F){a.colorize(L,C,[["dotProps","fill"]],F)}if(!C.dotProps.fill&&L.opt.type=="pie"){if(m.plotProps&&m.plotProps.fill){C.dotProps.fill=m.plotProps.fill}}var g=d.margins?d.margins[0]+d.margins[2]:0;var n=d.margins?d.margins[1]+d.margins[3]:0;var N=d.margins?d.margins[0]:0;var z=d.margins?d.margins[3]:0;if(!d.horizontal){K=(d.height-g)/f;r=c-n;q=Math.floor(e+z);p=Math.floor(d.y+N+K*J)}else{K=d.height-g;if(!d.itemWidth||d.itemWidth=="fixed"){r=(c-n)/f;q=Math.floor(e+z+r*J)}else{r=(c-n)-H;q=e+z+H}p=Math.floor(d.y+N)}if(C.dotType=="rect"){A.push(a.showPath(L,[["RECT",d.dotMargins[0]+q,p+Math.floor((K-C.dotHeight)/2),d.dotMargins[0]+q+C.dotWidth,p+Math.floor((K-C.dotHeight)/2)+C.dotHeight,C.dotR]]).attr(C.dotProps));G=d.dotMargins[0]+C.dotWidth+d.dotMargins[1]}else{if(C.dotType=="circle"){A.push(a.showPath(L,[["CIRCLE",d.dotMargins[0]+q+C.dotR,p+(K/2),C.dotR]]).attr(C.dotProps));G=d.dotMargins[0]+C.dotR*2+d.dotMargins[1]}}var v=M[I];var u=a.showPath(L,[["TEXT",v,q+G,p+Math.ceil(K/2)+(Raphael.VML?2:0)]]).attr({"text-anchor":"start"}).attr(C.textProps);A.push(u);while(u.getBBox().width>(r-G)&&u.getBBox().width>10){v=v.substring(0,v.length-1);u.attr({text:v})}u.show();if(d.horizontal&&d.itemWidth=="auto"){H+=G+u.getBBox().width+4}else{if(!d.horizontal&&o){H=u.getBBox().width+G>H?u.getBBox().width+G:H}else{H+=r}}J++}}if(o){c=H+d.margins[3]+d.margins[1]-1}if(D){e=Math.floor((L.width-c)/2);for(J in A){if(A[J].attrs.x){A[J].attr("x",A[J].attrs.x+e)}else{A[J].attr("path",a.movePath(L,A[J].attrs.path,[e,0]))}}}var s=[["RECT",e,d.y,e+c,d.y+d.height,d.r]];var E=a.showPath(L,s).attr(d.borderProps);for(J in A){A[J].toFront()}A.unshift(E);L.legenditems=A}};b.elycharts.featuresmanager.register(b.elycharts.legendmanager,90)})(jQuery);(function(c){var a=c.elycharts.featuresmanager;var b=c.elycharts.common;c.elycharts.mousemanager={clear:function(d){if(d.mouseLayer){d.mouseLayer.remove();d.mouseLayer=null;d.mousePaper.clear();d.mousePaper.remove();d.mousePaper=null;d.mouseTimer=null;d.mouseAreas=null}},afterShow:function(n,g){if(!n.opt.interactive){return}this.clear(n);n.mouseLayer=c("<div></div>").css({position:"absolute","z-index":20,opacity:1}).prependTo(n.container);n.mousePaper=b._RaphaelInstance(n.mouseLayer.get(0),n.width,n.height);var f=n.mousePaper;if(n.opt.features.debug.active&&typeof DP_Debug!="undefined"){n.paper.text(n.width,n.height-5,"DEBUG").attr({"text-anchor":"end",stroke:"red",opacity:0.1});f.text(n.width,n.height-5,"DEBUG").attr({"text-anchor":"end",stroke:"red",opacity:0.1}).click(function(){DP_Debug.dump(n.opt,"",false,4)})}var l,h;n.mouseAreas=[];if(n.opt.features.mousearea.type=="single"){for(l=0;l<g.length;l++){if(g[l].mousearea){if(!g[l].paths){if(g[l].path.length>=1&&(g[l].path[0][0]=="LINE"||g[l].path[0][0]=="LINEAREA")){for(h=0;h<g[l].path[0][1].length;h++){var o=b.areaProps(n,g[l].section,g[l].serie);if(o.mouseareaShowOnNull||g[l].section!="Series"||n.opt.values[g[l].serie][h]!=null){n.mouseAreas.push({path:[["CIRCLE",g[l].path[0][1][h][0],g[l].path[0][1][h][1],10]],piece:g[l],pieces:g,index:h,props:o})}}}else{for(h=0;h<g[l].path.length;h++){n.mouseAreas.push({path:[["CIRCLE",b.getX(g[l].path[h]),b.getY(g[l].path[h]),10]],piece:g[l],pieces:g,index:h,props:b.areaProps(n,g[l].section,g[l].serie)})}}}else{if(g[l].paths){for(h=0;h<g[l].paths.length;h++){if(g[l].paths[h].path){n.mouseAreas.push({path:g[l].paths[h].path,piece:g[l],pieces:g,index:h,props:b.areaProps(n,g[l].section,g[l].serie)})}}}}}}}else{var d=n.opt.features.mousearea.indexCenter;if(d=="auto"){d=n.indexCenter}var e,r;if(d=="bar"){r=(n.width-n.opt.margins[3]-n.opt.margins[1])/(n.opt.labels.length>0?n.opt.labels.length:1);e=n.opt.margins[3]}else{r=(n.width-n.opt.margins[3]-n.opt.margins[1])/(n.opt.labels.length>1?n.opt.labels.length-1:1);e=n.opt.margins[3]-r/2}for(var q in n.opt.labels){var m=parseInt(q);n.mouseAreas.push({path:[["RECT",e+m*r,n.height-n.opt.margins[2],e+(m+1)*r,n.opt.margins[0]]],piece:false,pieces:g,index:parseInt(m),props:n.opt.defaultSeries})}}var p=false;if(!n.opt.features.mousearea.syncTag){n.mouseareaenv={chartEnv:false,mouseObj:false,caller:false,inArea:-1,timer:false};p=n.mouseareaenv}else{if(!c.elycharts.mouseareaenv){c.elycharts.mouseareaenv={}}if(!c.elycharts.mouseareaenv[n.opt.features.mousearea.syncTag]){c.elycharts.mouseareaenv[n.opt.features.mousearea.syncTag]={chartEnv:false,mouseObj:false,caller:false,inArea:-1,timer:false}}p=c.elycharts.mouseareaenv[n.opt.features.mousearea.syncTag]}for(l=0;l<n.mouseAreas.length;l++){n.mouseAreas[l].area=b.showPath(n,n.mouseAreas[l].path,f).attr({stroke:"#000",fill:"#fff",opacity:0});(function(u,w,v,s,j){var t=w.piece;var i=w.index;w.mouseover=function(x){w.event=x;clearTimeout(j.timer);s.onMouseOverArea(u,t,i,w);if(j.chartEnv&&j.chartEnv.id!=u.id){j.caller.onMouseExitArea(j.chartEnv,j.mouseObj.piece,j.mouseObj.index,j.mouseObj);s.onMouseEnterArea(u,t,i,w)}else{if(j.inArea!=v){if(j.inArea<0){s.onMouseEnterArea(u,t,i,w)}else{s.onMouseChangedArea(u,t,i,w)}}}j.chartEnv=u;j.mouseObj=w;j.caller=s;j.inArea=v};w.mouseout=function(x){w.event=x;clearTimeout(j.timer);s.onMouseOutArea(u,t,i,w);j.timer=setTimeout(function(){j.timer=false;s.onMouseExitArea(u,t,i,w);j.chartEnv=false;j.inArea=-1},u.opt.features.mousearea.areaMoveDelay)};c(w.area.node).mouseover(w.mouseover);c(w.area.node).mouseout(w.mouseout)})(n,n.mouseAreas[l],l,this,p)}},onMouseOverArea:function(g,f,e,d){if(g.opt.features.mousearea.onMouseOver){g.opt.features.mousearea.onMouseOver(g,d.piece?d.piece.serie:false,d.index,d)}a.onMouseOver(g,d.piece?d.piece.serie:false,d.index,d)},onMouseOutArea:function(g,f,e,d){if(g.opt.features.mousearea.onMouseOut){g.opt.features.mousearea.onMouseOut(g,d.piece?d.piece.serie:false,d.index,d)}a.onMouseOut(g,d.piece?d.piece.serie:false,d.index,d)},onMouseEnterArea:function(g,f,e,d){if(g.opt.features.mousearea.onMouseEnter){g.opt.features.mousearea.onMouseEnter(g,d.piece?d.piece.serie:false,d.index,d)}a.onMouseEnter(g,d.piece?d.piece.serie:false,d.index,d)},onMouseChangedArea:function(g,f,e,d){if(g.opt.features.mousearea.onMouseChanged){g.opt.features.mousearea.onMouseChanged(g,d.piece?d.piece.serie:false,d.index,d)}a.onMouseChanged(g,d.piece?d.piece.serie:false,d.index,d)},onMouseExitArea:function(g,f,e,d){if(g.opt.features.mousearea.onMouseExit){g.opt.features.mousearea.onMouseExit(g,d.piece?d.piece.serie:false,d.index,d)}a.onMouseExit(g,d.piece?d.piece.serie:false,d.index,d)}};c.elycharts.featuresmanager.register(c.elycharts.mousemanager,0)})(jQuery);(function(b){var a=b.elycharts.common;b.elycharts.tooltipmanager={clear:function(c){if(c.tooltipContainer){c.tooltipFrame.clear();c.tooltipFrame.remove();c.tooltipFrame=null;c.tooltipFrameElement=null;c.tooltipContent.remove();c.tooltipContent=null;c.tooltipContainer.remove();c.tooltipContainer=null}},afterShow:function(c,d){this.clear(c);if(!b.elycharts.tooltipid){b.elycharts.tooltipid=0}b.elycharts.tooltipid++;c.tooltipContainer=b('<div id="elycharts_tooltip_'+b.elycharts.tooltipid+'" style="position: absolute; top: 100; left: 100; z-index: 10; overflow: hidden; white-space: nowrap; display: none"><div id="elycharts_tooltip_'+b.elycharts.tooltipid+'_frame" style="position: absolute; top: 0; left: 0; z-index: -1"></div><div id="elycharts_tooltip_'+b.elycharts.tooltipid+'_content" style="cursor: default"></div></div>').appendTo(document.body);c.tooltipFrame=a._RaphaelInstance("elycharts_tooltip_"+b.elycharts.tooltipid+"_frame",500,500);c.tooltipContent=b("#elycharts_tooltip_"+b.elycharts.tooltipid+"_content")},_prepareShow:function(e,d,c,g){if(d.width&&d.width!="auto"&&d.height&&d.height!="auto"){var j=d.frameProps&&d.frameProps["stroke-width"]?d.frameProps["stroke-width"]:0;e.tooltipContainer.width(d.width+j+1).height(d.height+j+1);if(!e.tooltipFrameElement&&d.frameProps){var f=[["RECT",j/2,j/2,d.width,d.height,d.roundedCorners]];e.tooltipFrameElement=a.showPath(e,f,e.tooltipFrame).attr(d.frameProps)}}if(e.tooltipFrameElement){e.tooltipFrameElement.attr(d.frameProps)}if(d.padding){e.tooltipContent.css({padding:d.padding[0]+"px "+d.padding[1]+"px"})}e.tooltipContent.css(d.contentStyle);e.tooltipContent.html(g);var h=b(e.container).offset();if(e.opt.features.tooltip.fixedPos){h.top+=e.opt.features.tooltip.fixedPos[1];h.left+=e.opt.features.tooltip.fixedPos[0]}else{var i=this.getXY(e,d,c);if(!i[2]){h.left+=i[0];while(h.top+i[1]<0){i[1]+=20}h.top+=i[1]}else{h.left=i[0];h.top=i[1]}}return{top:h.top,left:h.left}},getXY:function(e,i,c){var m=0,l=0;if(c.path[0][0]=="RECT"){m=a.getX(c.path[0])-i.offset[1];l=a.getY(c.path[0])-i.height-i.offset[0]}else{if(c.path[0][0]=="CIRCLE"){m=a.getX(c.path[0])-i.offset[1];l=a.getY(c.path[0])-i.height-i.offset[0]}else{if(c.path[0][0]=="SLICE"){var p=c.path[0];var n=i.width&&i.width!="auto"?i.width:100;var d=i.height&&i.height!="auto"?i.height:100;var f=Math.sqrt(Math.pow(n,2)+Math.pow(d,2))/2;if(f>e.opt.r){f=e.opt.r}var o=p[5]+(p[6]-p[5])/2+180;var g=Math.PI/180;m=p[1]+f*Math.cos(-o*g)-n/2;l=p[2]+f*Math.sin(-o*g)-d/2}else{if(c.piece&&c.piece.paths&&c.index>=0&&c.piece.paths[c.index]&&c.piece.paths[c.index].rect){var j=c.piece.paths[c.index].rect;m=j[0]-i.offset[1];l=j[1]-i.height-i.offset[0]}}}}if(e.opt.features.tooltip.positionHandler){return e.opt.features.tooltip.positionHandler(e,i,c,m,l)}else{return[m,l]}},getTip:function(d,e,c){var f=false;if(d.opt.tooltips){if(typeof d.opt.tooltips=="function"){f=d.opt.tooltips(d,e,c,e&&d.opt.values[e]&&d.opt.values[e][c]?d.opt.values[e][c]:false,d.opt.labels&&d.opt.labels[c]?d.opt.labels[c]:false)}else{if(e&&d.opt.tooltips[e]&&d.opt.tooltips[e][c]){f=d.opt.tooltips[e][c]}else{if(!e&&d.opt.tooltips[c]){f=d.opt.tooltips[c]}}}}return f},_getProps:function(g,h,e,d){var f=d.props.tooltip;if(g.emptySeries&&g.opt.series.empty){f=b.extend(true,f,g.opt.series.empty.tooltip)}if(!f||!f.active){return false}if(f.frameProps){var c=a.getItemColor(g,h,e);if(c){f=a._clone(f);a.colorize(g,f,[["frameProps","stroke"]],c)}}return f},_fadeOut:function(c){c.tooltipContainer.fadeOut(c.opt.features.tooltip.fadeDelay)},onMouseEnter:function(f,g,d,c){var e=this._getProps(f,g,d,c);if(!e){return false}var h=this.getTip(f,g,d);if(!h){this._fadeOut(f);return true}f.tooltipContainer.css(this._prepareShow(f,e,c,h)).fadeIn(f.opt.features.tooltip.fadeDelay);return true},onMouseChanged:function(f,g,d,c){var e=this._getProps(f,g,d,c);if(!e){return false}var h=this.getTip(f,g,d);if(!h){this._fadeOut(f);return true}f.tooltipContainer.clearQueue();f.tooltipContainer.fadeIn(f.opt.features.tooltip.fadeDelay);f.tooltipContainer.animate(this._prepareShow(f,e,c,h),f.opt.features.tooltip.moveDelay,"linear");return true},onMouseExit:function(f,g,d,c){var e=this._getProps(f,g,d,c);if(!e){return false}this._fadeOut(f);return true}};b.elycharts.featuresmanager.register(b.elycharts.tooltipmanager,20)})(jQuery);(function(b){var a=b.elycharts.common;b.elycharts.line={init:function(c){},_getColorizationKey:function(c){if(c=="line"){return[["plotProps","stroke"],["dotProps","fill"],["fillProps","fill"]]}else{return[["plotProps","stroke"],["plotProps","fill"]]}},draw:function(n){if(a.executeIfChanged(n,["values","series"])){n.plots={};n.axis={x:{}};n.barno=0;n.indexCenter="line"}var z=n.opt;var N=n.plots;var A=n.axis;var f=n.paper;var X=n.opt.values;var q=n.opt.labels;var S,o,E,B,e,m;if(a.executeIfChanged(n,["values","series"])){var V=0;var O=false;for(B in X){e={index:V,type:false,visible:false};N[B]=e;if(X[B]){E=a.areaProps(n,"Series",B);e.type=E.type;if(E.type=="bar"){n.indexCenter="bar"}if(E.visible){e.visible=true;if(!m||m<X[B].length){m=X[B].length}var I=[];for(S=0;S<X[B].length;S++){var F=X[B][S];if(E.avgOverNulls&&F==null){if(E.type=="bar"){F=0}else{for(var R=S+1;R<X[B].length&&X[B][R]==null;R++){}var h=R<X[B].length?X[B][R]:null;for(var Q=S-1;Q>=0&&X[B][Q]==null;Q--){}var H=Q>=0?X[B][Q]:null;F=h!=null?(H!=null?(h*(S-Q)+H*(R-S))/(R-Q):h):H}}I.push(F)}if(E.stacked&&!(typeof E.stacked=="string")){E.stacked=O}if(typeof E.stacked=="undefined"||E.stacked==B||E.stacked<0||!N[E.stacked]||!N[E.stacked].visible||N[E.stacked].type!=e.type){e.ref=B;if(E.type=="bar"){e.barno=n.barno++}e.from=[];if(!E.cumulative){e.to=I}else{e.to=[];o=0;for(S=0;S<I.length;S++){e.to.push(o+=I[S]!=null?I[S]:0)}}for(S=0;S<I.length;S++){e.from.push(e.to[S]!=null?0:null)}}else{e.ref=E.stacked;if(E.type=="bar"){e.barno=N[E.stacked].barno}e.from=N[E.stacked].stack;e.to=[];o=0;if(!E.cumulative){for(S=0;S<I.length;S++){e.to.push(e.from[S]+(I[S]!=null?I[S]:0))}}else{for(S=0;S<I.length;S++){e.to.push(e.from[S]+(o+=(I[S]!=null?I[S]:0)))}}N[E.stacked].stack=e.to}e.stack=e.to;e.max=Math.max.apply(Math,e.from.concat(e.to));e.min=Math.min.apply(Math,e.from.concat(e.to));if(E.axis){if(!A[E.axis]){A[E.axis]={plots:[]}}A[E.axis].plots.push(B);if(typeof A[E.axis].max=="undefined"){A[E.axis].max=e.max}else{A[E.axis].max=Math.max(A[E.axis].max,e.max)}if(typeof A[E.axis].min=="undefined"){A[E.axis].min=e.min}else{A[E.axis].min=Math.min(A[E.axis].min,e.min)}}O=B}}}}if(!q){q=[]}while(m>q.length){q.push(null)}m=q.length;n.opt.labels=q;if(a.executeIfChanged(n,["values","series","axis"])){for(var s in A){E=a.areaProps(n,"Axis",s);A[s].props=E;if(typeof E.max!="undefined"){A[s].max=E.max}if(typeof E.min!="undefined"){A[s].min=E.min}if(A[s].min==A[s].max){A[s].max=A[s].min+1}if(E.normalize&&E.normalize>0){var M=Math.abs(A[s].max);if(A[s].min&&Math.abs(A[s].min)>M){M=Math.abs(A[s].min)}if(M){var C=Math.floor(Math.log(M)/Math.LN10)-(E.normalize-1);C=C>=0?Math.pow(10,C):1/Math.pow(10,-C);M=Math.ceil(M/C/(z.features.grid.ny?z.features.grid.ny:1))*C*(z.features.grid.ny?z.features.grid.ny:1);M=Math.round(M/C)*C;A[s].normalizationBase=C;if(A[s].max){A[s].max=Math.ceil(A[s].max/M)*M}if(A[s].min){A[s].min=Math.floor(A[s].min/M)*M}}}if(A[s].plots){for(var J=0;J<A[s].plots.length;J++){N[A[s].plots[J]].max=A[s].max;N[A[s].plots[J]].min=A[s].min}}}}var T=[];this.grid(n,T);var t=(n.width-z.margins[3]-z.margins[1])/(q.length>1?q.length-1:1);var P=(n.width-z.margins[3]-z.margins[1])/(q.length>0?q.length:1);for(B in X){E=a.areaProps(n,"Series",B);e=N[B];a.colorize(n,E,this._getColorizationKey(E.type),a.getItemColor(n,B));if(E.lineCenter&&E.lineCenter=="auto"){E.lineCenter=(n.indexCenter=="bar")}else{if(E.lineCenter&&n.indexCenter=="line"){n.indexCenter="bar"}}if(X[B]&&E.visible){var r=(n.height-z.margins[2]-z.margins[0])/(e.max-e.min);if(E.type=="line"){var D=["LINE",[],E.rounded];var g=["LINEAREA",[],[],E.rounded];var W=[];for(S=0,J=q.length;S<J;S++){if(e.to.length>S){var Y=a.areaProps(n,"Series",B,S);a.colorize(n,Y,this._getColorizationKey(E.type),a.getItemColor(n,B,S));var L=Math.round((E.lineCenter?P/2:0)+z.margins[3]+S*(E.lineCenter?P:t));var K=null;if(e.to[S]!=null){var U=e.to[S]>e.max?e.max:(e.to[S]<e.min?e.min:e.to[S]);K=Math.round(n.height-z.margins[2]-r*(U-e.min))}var p=null;if(e.from[S]!=null){var u=e.from[S]>e.max?e.max:(e.from[S]<e.min?e.min:e.from[S]);p=Math.round(n.height-z.margins[2]-r*(u-e.min))+(Raphael.VML?1:0)}D[1].push([L,K]);if(E.fill){g[1].push([L,K]);g[2].push([L,p])}if(Y.dot){if(X[B][S]==null&&!Y.dotShowOnNull){W.push({path:false,attr:false})}else{W.push({path:[["CIRCLE",L,K,Y.dotProps.size]],attr:Y.dotProps})}}}}if(E.fill){T.push({section:"Series",serie:B,subSection:"Fill",path:[g],attr:E.fillProps})}else{T.push({section:"Series",serie:B,subSection:"Fill",path:false,attr:false})}T.push({section:"Series",serie:B,subSection:"Plot",path:[D],attr:E.plotProps,mousearea:"pathsteps"});if(W.length){T.push({section:"Series",serie:B,subSection:"Dot",paths:W})}else{T.push({section:"Series",serie:B,subSection:"Dot",path:false,attr:false})}}else{pieceBar=[];for(S=0,J=q.length;S<J;S++){if(e.to.length>S){if(e.from[S]!=e.to[S]){var Y=a.areaProps(n,"Series",B,S);a.colorize(n,Y,this._getColorizationKey(E.type),a.getItemColor(n,B,S));var l=Math.floor((P-z.barMargins)/(1+(n.barno-1)*(100-z.barOverlapPerc)/100));var G=l*(100-E.barWidthPerc)/200;var c=z.barMargins/2+e.barno*(l*(100-z.barOverlapPerc)/100);var w=Math.floor(z.margins[3]+S*P+c+G);var aa=Math.round(n.height-z.margins[2]-r*(e.to[S]-e.min));var Z=Math.round(n.height-z.margins[2]-r*(e.from[S]-e.min));pieceBar.push({path:[["RECT",w,aa,w+l-G*2,Z]],attr:Y.plotProps})}else{pieceBar.push({path:false,attr:false})}}}if(pieceBar.length){T.push({section:"Series",serie:B,subSection:"Plot",paths:pieceBar,mousearea:"paths"})}else{T.push({section:"Series",serie:B,subSection:"Plot",path:false,attr:false,mousearea:"paths"})}}}else{if(E.type=="line"){T.push({section:"Series",serie:B,subSection:"Fill",path:false,attr:false})}T.push({section:"Series",serie:B,subSection:"Plot",path:false,attr:false,mousearea:"paths"});if(E.type=="line"){T.push({section:"Series",serie:B,subSection:"Dot",path:false,attr:false})}}}return T},grid:function(l,ab){if(a.executeIfChanged(l,["values","series","axis","labels","margins","width","height","features.grid"])){var C=l.opt;var I=l.opt.features.grid;var c=l.paper;var E=l.axis;var r=l.opt.labels;var w=(l.width-C.margins[3]-C.margins[1])/(r.length>1?r.length-1:1);var W=(l.width-C.margins[3]-C.margins[1])/(r.length>0?r.length:1);var aa,Z,R,Q,G,X,V,e,J,o;var M=[];var m=I.labelsCenter;if(m=="auto"){m=(l.indexCenter=="bar")}if(E.x&&E.x.props.labels){var H=false;var u=E.x.props.labelsAnchor||"auto";if(u=="auto"){u=E.x.props.labelsRotate>0?"start":(E.x.props.labelsRotate==0?"middle":"end")}var ac=E.x.props.labelsPos||"auto";if(ac=="auto"){ac=m?(E.x.props.labelsRotate==0?u:"middle"):"start"}for(aa=0;aa<r.length;aa++){if((typeof r[aa]!="boolean"&&r[aa]!=null)||r[aa]){if(!E.x.props.labelsSkip||aa>=E.x.props.labelsSkip){J=r[aa];if(E.x.props.labelsFormatHandler){J=E.x.props.labelsFormatHandler(J)}o=(E.x.props.prefix?E.x.props.prefix:"")+J+(E.x.props.suffix?E.x.props.suffix:"");X=C.margins[3]+aa*(m?W:w)+(E.x.props.labelsMargin?E.x.props.labelsMargin:0);if(ac=="middle"){X+=(m?W:w)/2}if(ac=="end"){X+=(m?W:w)}V=l.height-C.margins[2]+E.x.props.labelsDistance;e=c.text(X,V,o).attr(E.x.props.labelsProps).toBack();e.attr({"text-anchor":u});var g=false;var D=e.getBBox();var ae={x:D.x,y:D.y};var ad={x:D.x+D.width,y:D.y+D.height};var q={x:X,y:V};rotate=function(j,i){var y=j.x*Math.cos(i)-j.y*Math.sin(i),x=j.x*Math.sin(i)+j.y*Math.cos(i);return{x:y,y:x}};collide=function(j,i,ah){xor=function(aj,ai){return(aj||ai)&&!(aj&&ai)};if(j.alpha!=i.alpha){throw"collide doens't support rects with different rotations"}var af=rotate({x:j.p1.x-ah,y:j.p1.y-ah},-j.alpha);var ag=rotate({x:j.p2.x+ah,y:j.p2.y+ah},-j.alpha);var x=rotate({x:i.p1.x-ah,y:i.p1.y-ah},-i.alpha);var y=rotate({x:i.p2.x+ah,y:i.p2.y+ah},-i.alpha);return !xor(Math.min(af.x,ag.x)>Math.max(x.x,y.x),Math.max(af.x,ag.x)<Math.min(x.x,y.x))&&!xor(Math.min(af.y,ag.y)>Math.max(x.y,y.y),Math.max(af.y,ag.y)<Math.min(x.y,y.y))};rotated=function(x,i,af){translate=function(ah,ag){return{x:ah.x+ag.x,y:ah.y+ag.y}};negate=function(ag){return{x:-ag.x,y:-ag.y}};var y=translate(rotate(translate(x.p1,negate(i)),af),i);var j=translate(rotate(translate(x.p2,negate(i)),af),i);return{p1:y,p2:j,alpha:x.alpha+af}};D=function(y){if(y.alpha==0){return{x:y.p1.x,y:y.p1.y,width:y.p2.x-y.p1.x,height:y.p2.y-y.p1.y}}else{var j=[];j.push({x:0,y:0});j.push({x:y.p2.x-y.p1.x,y:0});j.push({x:0,y:y.p2.y-y.p1.y});j.push({x:y.p2.x-y.p1.x,y:y.p2.y-y.p1.y});var ai=[];ai.left=0;ai.right=0;ai.top=0;ai.bottom=0;for(_px=0;_px<j.length;_px++){var ag=j[_px];var ah=parseInt((ag.x*Math.cos(y.alpha))+(ag.y*Math.sin(y.alpha)));var af=parseInt((ag.x*Math.sin(y.alpha))+(ag.y*Math.cos(y.alpha)));ai.left=Math.min(ai.left,ah);ai.right=Math.max(ai.right,ah);ai.top=Math.min(ai.top,af);ai.bottom=Math.max(ai.bottom,af)}var x=parseInt(Math.abs(ai.right-ai.left));var i=parseInt(Math.abs(ai.bottom-ai.top));var ah=((y.p1.x+y.p2.x)/2)-x/2;var af=((y.p1.y+y.p2.y)/2)-i/2;return{x:ah,y:af,width:x,height:i}}};var Y=Raphael.rad(E.x.props.labelsRotate);var K=rotated({p1:ae,p2:ad,alpha:0},q,Y);var h=E.x.props.labelsMarginRight?E.x.props.labelsMarginRight/2:0;if(E.x.props.labelsHideCovered&&H&&collide(K,H,h)){e.hide()}else{g=D(K);if(I.nx=="auto"&&(g.x<0||g.x+g.width>l.width)){e.hide()}else{H=K}}if(E.x.props.labelsRotate){if(Raphael.animation){e.transform(Raphael.format("r{0},{1},{2}",E.x.props.labelsRotate,X,V)).toBack()}else{e.rotate(E.x.props.labelsRotate,X,V).toBack()}}M.push({path:[["RELEMENT",e]],attr:false})}}}}ab.push({section:"Axis",serie:"x",subSection:"Label",paths:M});if(E.x&&E.x.props.title){R=C.margins[3]+Math.floor((l.width-C.margins[1]-C.margins[3])/2);Q=l.height-C.margins[2]+E.x.props.titleDistance*(Raphael.VML?E.x.props.titleDistanceIE:1);ab.push({section:"Axis",serie:"x",subSection:"Title",path:[["TEXT",E.x.props.title,R,Q]],attr:E.x.props.titleProps})}else{ab.push({section:"Axis",serie:"x",subSection:"Title",path:false,attr:false})}for(var z in ["l","r"]){Z=["l","r"][z];if(E[Z]&&E[Z].props.labels&&I.ny){M=[];for(aa=E[Z].props.labelsSkip?E[Z].props.labelsSkip:0;aa<=I.ny;aa++){var t=(l.height-C.margins[2]-C.margins[0])/I.ny;if(Z=="r"){X=l.width-C.margins[1]+E[Z].props.labelsDistance;if(!E[Z].props.labelsProps["text-anchor"]){E[Z].props.labelsProps["text-anchor"]="start"}}else{X=C.margins[3]-E[Z].props.labelsDistance;if(!E[Z].props.labelsProps["text-anchor"]){E[Z].props.labelsProps["text-anchor"]="end"}}if(E[Z].props.labelsAnchor&&E[Z].props.labelsAnchor!="auto"){E[Z].props.labelsProps["text-anchor"]=E[Z].props.labelsAnchor}J=(E[Z].min+(aa*((E[Z].max-E[Z].min)/I.ny)));if(E[Z].normalizationBase){J=Math.round(J/E[Z].normalizationBase)/(1/E[Z].normalizationBase)}if(E[Z].props.labelsFormatHandler){J=E[Z].props.labelsFormatHandler(J)}if(E[Z].props.labelsCompactUnits){J=a.compactUnits(J,E[Z].props.labelsCompactUnits)}o=(E[Z].props.prefix?E[Z].props.prefix:"")+J+(E[Z].props.suffix?E[Z].props.suffix:"");V=l.height-C.margins[2]-aa*t;M.push({path:[["TEXT",o,X,V+(E[Z].props.labelsMargin?E[Z].props.labelsMargin:0)]],attr:E[Z].props.labelsProps})}ab.push({section:"Axis",serie:Z,subSection:"Label",paths:M})}else{ab.push({section:"Axis",serie:Z,subSection:"Label",paths:[]})}if(E[Z]&&E[Z].props.title){if(Z=="r"){R=l.width-C.margins[1]+E[Z].props.titleDistance*(Raphael.VML?E[Z].props.titleDistanceIE:1)}else{R=C.margins[3]-E[Z].props.titleDistance*(Raphael.VML?E[Z].props.titleDistanceIE:1)}var B=a._clone(E[Z].props.titleProps);var L=Z=="l"?270:90;var Q=C.margins[0]+Math.floor((l.height-C.margins[0]-C.margins[2])/2);if(Raphael.animation){var e=c.text(R,Q,E[Z].props.title).attr(B).transform(Raphael.format("r{0}",L)).toBack();ab.push({section:"Axis",serie:Z,subSection:"Title",path:[["RELEMENT",e]],attr:false})}else{B.rotation=L;ab.push({section:"Axis",serie:Z,subSection:"Title",path:[["TEXT",E[Z].props.title,R,Q]],attr:B})}}else{ab.push({section:"Axis",serie:Z,subSection:"Title",path:false,attr:false})}}if(I.nx||I.ny){var S=[],A=[],n=[],U=I.nx=="auto"?(m?r.length:r.length-1):I.nx,T=I.ny,f=(l.height-C.margins[2]-C.margins[0])/(T?T:1),p=(l.width-C.margins[1]-C.margins[3])/(U?U:1),P=typeof I.forceBorder=="object"?I.forceBorder[3]:I.forceBorder,O=typeof I.forceBorder=="object"?I.forceBorder[1]:I.forceBorder,v=typeof I.forceBorder=="object"?I.forceBorder[0]:I.forceBorder,s=typeof I.forceBorder=="object"?I.forceBorder[2]:I.forceBorder,N=T>0?(typeof I.draw=="object"?I.draw[0]:I.draw):false,F=U>0?typeof I.draw=="object"?I.draw[1]:I.draw:false;if(T>0){for(aa=0;aa<T+1;aa++){if(v&&aa==0||s&&aa==T||N&&aa>0&&aa<T){S.push(["M",C.margins[3]-I.extra[3],C.margins[0]+Math.round(aa*f)]);S.push(["L",l.width-C.margins[1]+I.extra[1],C.margins[0]+Math.round(aa*f)])}if(aa<T){if(aa%2==0&&I.evenHProps||aa%2==1&&I.oddHProps){A.push({path:[["RECT",C.margins[3]-I.extra[3],C.margins[0]+Math.round(aa*f),l.width-C.margins[1]+I.extra[1],C.margins[0]+Math.round((aa+1)*f)]],attr:aa%2==0?I.evenHProps:I.oddHProps})}else{A.push({path:false,attr:false})}}}}for(aa=0;aa<U+1;aa++){if(P&&aa==0||O&&aa==U||F&&((I.nx!="auto"&&aa>0&&aa<U)||(I.nx=="auto"&&(typeof r[aa]!="boolean"||r[aa])))){S.push(["M",C.margins[3]+Math.round(aa*p),C.margins[0]-I.extra[0]]);S.push(["L",C.margins[3]+Math.round(aa*p),l.height-C.margins[2]+I.extra[2]])}if(aa<U){if(aa%2==0&&I.evenVProps||aa%2==1&&I.oddVProps){n.push({path:[["RECT",C.margins[3]+Math.round(aa*p),C.margins[0]-I.extra[0],C.margins[3]+Math.round((aa+1)*p),l.height-C.margins[2]+I.extra[2],]],attr:aa%2==0?I.evenVProps:I.oddVProps})}else{n.push({path:false,attr:false})}}}ab.push({section:"Grid",path:S.length?S:false,attr:S.length?I.props:false});ab.push({section:"GridBandH",paths:A});ab.push({section:"GridBandV",paths:n});var d=[];if(I.ticks.active&&(typeof I.ticks.active!="object"||I.ticks.active[0])){for(aa=0;aa<U+1;aa++){if(I.nx!="auto"||typeof r[aa]!="boolean"||r[aa]){d.push(["M",C.margins[3]+Math.round(aa*p),l.height-C.margins[2]-I.ticks.size[1]]);d.push(["L",C.margins[3]+Math.round(aa*p),l.height-C.margins[2]+I.ticks.size[0]])}}}if(I.ticks.active&&(typeof I.ticks.active!="object"||I.ticks.active[1])){for(aa=0;aa<T+1;aa++){d.push(["M",C.margins[3]-I.ticks.size[0],C.margins[0]+Math.round(aa*f)]);d.push(["L",C.margins[3]+I.ticks.size[1],C.margins[0]+Math.round(aa*f)])}}if(I.ticks.active&&(typeof I.ticks.active!="object"||I.ticks.active[2])){for(aa=0;aa<T+1;aa++){d.push(["M",l.width-C.margins[1]-I.ticks.size[1],C.margins[0]+Math.round(aa*f)]);d.push(["L",l.width-C.margins[1]+I.ticks.size[0],C.margins[0]+Math.round(aa*f)])}}ab.push({section:"Ticks",path:d.length?d:false,attr:d.length?I.ticks.props:false})}}}}})(jQuery);(function(b){var a=b.elycharts.common;b.elycharts.pie={init:function(c){},draw:function(E){var d=E.opt;var p=E.width-E.opt.margins[1]-E.opt.margins[3];var C=E.height-E.opt.margins[0]-E.opt.margins[2];var t=E.opt.r?E.opt.r:Math.floor((p<C?p:C)/2*(E.opt.rPerc?E.opt.rPerc/100:0.8));var f=(E.opt.cx?E.opt.cx:Math.floor(p/2))+E.opt.margins[3];var e=(E.opt.cy?E.opt.cy:Math.floor(C/2))+E.opt.margins[0];var A=0,B,s,v,z,g;for(v in d.values){z={visible:false,total:0,values:[]};E.plots[v]=z;var c=a.areaProps(E,"Series",v);a.colorize(E,c,[["plotProps","stroke"],["plotProps","fill"]],a.getItemColor(E,v));if(c.visible){z.visible=true;A++;z.values=d.values[v];for(B=0,s=z.values.length;B<s;B++){if(z.values[B]>0){g=a.areaProps(E,"Series",v,B);a.colorize(E,g,[["plotProps","stroke"],["plotProps","fill"]],a.getItemColor(E,v,B));if(typeof g.inside=="undefined"||g.inside<0){z.total+=z.values[B]}}}for(B=0;B<s;B++){if(z.values[B]<z.total*d.valueThresold){z.total=z.total-z.values[B];z.values[B]=0}}}}var u=t/A;var m=-u,j=0;var n=[];for(v in d.values){z=E.plots[v];var y=[];if(z.visible){m+=u;j+=u;var F=E.opt.startAngle,D=0,l=0;if(z.total==0){E.emptySeries=true;g=a.areaProps(E,"Series","empty");a.colorize(E,g,[["plotProps","stroke"],["plotProps","fill"]],a.getItemColor(E,v));y.push({path:[["CIRCLE",f,e,t]],attr:g.plotProps})}else{E.emptySeries=false;for(B=0,s=z.values.length;B<s;B++){var x=z.values[B];if(x>0){g=a.areaProps(E,"Series",v,B);a.colorize(E,g,[["plotProps","stroke"],["plotProps","fill"]],a.getItemColor(E,v,B));if(typeof g.inside=="undefined"||g.inside<0){F+=l;D=360*x/z.total;l=D}else{D=360*values[g.inside]/z.total*x/values[g.inside]}var o=m,q=j;if(g.r){if(g.r>0){if(g.r<=1){q=m+u*g.r}else{q=m+g.r}}else{if(g.r>=-1){o=m+u*(-g.r)}else{o=m-g.r}}}if(!E.opt.clockwise){y.push({path:[["SLICE",f,e,q,o,F,F+D]],attr:g.plotProps})}else{y.push({path:[["SLICE",f,e,q,o,-F-D,-F]],attr:g.plotProps})}}else{y.push({path:false,attr:false})}}}}else{if(d.values[v]&&d.values[v].length){for(B=0,s=d.values[v].length;B<s;B++){y.push({path:false,attr:false})}}}n.push({section:"Series",serie:v,subSection:"Plot",paths:y,mousearea:"paths"})}return n}}})(jQuery);
