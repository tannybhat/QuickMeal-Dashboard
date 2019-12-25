$(init);

function init()
{
    $("#accordion").accordion();
    $("#myAccordion").accordion();
}


function CheckOrder() {
    if ($('#items li').length == 0) {alert('Cart is empty!'); return false;}
    else {return true;}}

function getCal(ui) {

    if (ui.draggable.attr("alt") == 'Fries')
        return '400 cal';
    else if (ui.draggable.attr("alt") == 'Burger')
        return '480 cal';
    else if (ui.draggable.attr("alt") == 'Sandwich')
        return '360 cal';
    else if(ui.draggable.attr("alt") == 'Burrito')
        return '750 cal';
    else if (ui.draggable.attr("alt") == 'Quesadilla')
        return '600 cal';
    else if (ui.draggable.attr("alt") == 'Lunch Box')
        return '655 cal';
    else if (ui.draggable.attr("alt") == 'Panipuri')
        return '220 cal';
    else if (ui.draggable.attr("alt") == 'Sevpuri')
        return '300 cal';
    else if (ui.draggable.attr("alt") == 'Bhel')
        return '180 cal';
    else
        return '0';
}