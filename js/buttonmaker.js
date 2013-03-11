var cssText              = '',
    forValue             = '';

var cssStuff = new Array();

cssStuff['buttonPadding']      = "5px 10px";
cssStuff['backgroundBottom']   = "#65a9d7";
cssStuff['backgroundTop']      = "#3e779d";
cssStuff['borderTopColor']     = "#96d1f8";
cssStuff['borderRadius']       = "8px";
cssStuff['textColor']          = "white";
cssStuff['hoverColor']         = "#ccc";
cssStuff['hoverBackground']    = "#28597a";
cssStuff['activeBackground']   = "#1b435e";
cssStuff['fontSize']           = "14px";
cssStuff['fontStack']          = "Georgia, serif";
    
function createCSS() {  

    $(".prettyprint").removeClass('prettyprinted');


    cssText              = "  .button { \n";
    cssText             += "     border-top: 1px solid " + cssStuff['borderTopColor'] + ";\n";
    
    cssText             += "     background: " + cssStuff['backgroundBottom'] + ";\n";
    cssText             += "     background: -webkit-gradient(linear, left top, left bottom, from(" + cssStuff['backgroundTop'] + "), to(" + cssStuff['backgroundBottom'] + "));\n";
    cssText             += "     background: -moz-linear-gradient(top, " + cssStuff['backgroundTop'] + ", " + cssStuff['backgroundBottom'] + ");\n";
    
    cssText             += "     padding: " + cssStuff['buttonPadding'] + ";\n";
    
    cssText             += "     -webkit-border-radius: " + cssStuff['borderRadius'] + ";\n";
    cssText             += "     -moz-border-radius: " + cssStuff['borderRadius'] + ";\n";
    cssText             += "     border-radius: " + cssStuff['borderRadius'] + ";\n";
    
    cssText             += "     -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;\n";
    cssText             += "     -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;\n";
    cssText             += "     box-shadow: rgba(0,0,0,1) 0 1px 0;\n";
    
    cssText             += "     text-shadow: rgba(0,0,0,.4) 0 1px 0;\n";
    
    cssText             += "     color: " + cssStuff['textColor'] + ";\n";
    cssText             += "     font-size: " + cssStuff['fontSize'] + ";\n";
    cssText             += "     font-family: " + cssStuff['fontStack'] + ";\n";
    cssText             += "     text-decoration: none;\n";
    cssText             += "     vertical-align: middle;\n";
    
    cssText             += "  }";
    
    cssText             += "  .button:hover { \n";
    cssText             += "     border-top-color: " + cssStuff['hoverBackground'] + ";\n";
    cssText             += "     background: " + cssStuff['hoverBackground'] + ";\n";
    cssText             += "     color: " + cssStuff['hoverColor'] + ";\n";
    cssText             += "  }\n";
    
    cssText             += "  .button:active { \n";
    cssText             += "     border-top-color: " + cssStuff['activeBackground'] + ";\n";
    cssText             += "     background: " + cssStuff['activeBackground'] + ";\n";
    cssText             += "  }";
            
    $("style").replaceWith("<style type='text/css'>" + cssText + "</style>");
  //  $("#the-css").text(cssText);
    $("#the-code").text(cssText);

    prettyPrint(); //call prettify function
}

function reCenterButton() {
    $(".button").position({
    	"my": "center center",
    	"at": "center center",
    	"of": $("#button-box")
    });
};

$(function() {

    $("head").append("<style type='text/css'></style>");

    reCenterButton();
    createCSS();
    
    $('#sizer').slider({
		values: [10],
		min: 4,
		max: 40,
		slide: function(event, ui) {
		    cssStuff['buttonPadding'] = ui.value/2 + "px " + ui.value + "px";
		    reCenterButton();
		    createCSS();
		}
	});
	
	$('#font-sizer').slider({
		values: [12],
		min: 8,
		max: 24,
		slide: function(event, ui) {
		    cssStuff['fontSize'] = ui.value + "px";
		    reCenterButton();
		    createCSS();
		}
	});
	
	$('#border-rounder').slider({
		values: [8],
		min: 0,
		max: 40,
		slide: function(event, ui) {
		    cssStuff['borderRadius'] = ui.value + "px";
		    createCSS();
		}
	});
	
	$('.pickable').ColorPicker({
    	onSubmit: function(hsb, hex, rgb, el) {
    		$(el).val(hex).css("background", "#" + hex);
    		$(el).ColorPickerHide();
    		
    		forValue = $(el).attr("rel");
    		    		
    		cssStuff[forValue] = "#" + hex;
    		createCSS();
    		
    	},
    	onChange: function(hsb, hex, rgb, el) {
    	
    		$($(this).data('colorpicker').el).val(hex).css("background", "#" + hex);
    		
    		forValue = $($(this).data('colorpicker').el).attr("rel");
    		    		
    		cssStuff[forValue] = "#" + hex;
    		createCSS();
    		
    	},
    	onBeforeShow: function () {
    		$(this).ColorPickerSetColor(this.value);
    	}
    });
    
    $("#fontSelector").change(function() {
    
        cssStuff['fontStack'] = $(this).val();
        createCSS();
    
    });
    
    $(".button").click(function() {
        $("#the-css").dialog('open');
    });
    
    /*initialize the dialog*/
    $("#the-css").dialog({
            "title": "The CSS",
            "width": 440,
            resizable: false,
            autoOpen: false
        });

});