// resources: http://www.dwuser.com/education/content/creating-a-jquery-image-scroller/

$(document).ready(function(){

// toggle h1 
    $('h1').toggle( "slow", "swing", "complete" );
});

// all done btn
$("#checkAll").click(function(){
    AllDone();
});

//create list
$('.add-todo').on('keypress',function (e){
      e.preventDefault;
      if (e.which == 13) {
           if($(this).val() !== ''){
           var todo = $(this).val();
            createTodo(todo);
            countTodos();
           }else{
               // some validation
           }
      }
  });

// mark task as done
$('.todolist').on('change','#sortable li input[type="checkbox"]',function(){
    if($(this).prop('checked')){
        var doneItem = $(this).parent().parent().find('label').text();
        $(this).parent().parent().parent().addClass('remove');
        done(doneItem);
        countTodos();
    }
});

//delete done task from "already done"
$('.todolist').on('click','.remove-item',function(){
    removeItem(this);
});

// count tasks
function countTodos(){
    var count = $("#sortable li").length;
    $('.count-todos').html(count);
}

//create task
function createTodo(text){
    var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
    $('#sortable').append(markup);
    $('.add-todo').val('');
}

//mark task as done
function done(doneItem){
    var done = doneItem;
    var markup = '<li>'+ done +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
    $('#done-items').append(markup);
    $('.remove').remove();
}

//mark all tasks as done
function AllDone(){
    var myArray = [];

    $('#sortable li').each( function() {
        myArray.push($(this).text());
    });
    
    // add to done
    for (i = 0; i < myArray.length; i++) {
        $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
    }
    
    // myArray
    $('#sortable li').remove();
    countTodos();
}

//remove done task from list
function removeItem(element){
    $(element).parent().remove();

}

$(document).ready(function(){

    var scroller = $('#scroller div.innerScrollArea');
    var scrollerContent = scroller.children('ul');
    scrollerContent.children().clone().appendTo(scrollerContent);
    var curX = 0;
        scrollerContent.children().each(function(){
            var $this = $(this);
            $this.css('left', curX);
            curX += $this.outerWidth(true);
    });
    var fullW = curX / 2;
    var viewportW = scroller.width();
    scroller.css('overflow-x', 'auto');
});

